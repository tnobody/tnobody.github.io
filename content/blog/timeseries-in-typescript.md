---
title: Timeseries in Typescript
---

# {{ title }}

While working on one of my pet projects I had the requirement to handle timeseries data. I dont want to bother with to much theory in this post (because I dont have any clue either). I also dont care too much about performance optimization since my project will not handle so much data points. What I rather want to archive is:

- A structure to store timeseries datapoints
- A Possibility to aggregate data into buckets (e.g. by Month, Week, Day... etc) and retrieve some basic statistics from this buckets (e.g. mean, median, sum... etc)

## What is a timeseries

**TLD:DR**: Simply spoken a timeseries a sequence of elements where each is associated with a timestamp.

Timeseries are used in a wide range of IT disciplines

- Log and monitoring data aggregation and processing
- Financial data like bank account activities or stock market events
- Data emitted by sensors for IOT applications
- Interactions of a user within a website (esp. mouse or pointer events)

In my case I want to monitor user activities that a user will create by it self. 

## Storing the Data

Storing seems to be the easy part at the first look but could become tricky as you start to think about it. Lets break down my simple definiton of a timeseries from above to get a better understanding of the model we want to build.

A timeseries is a _sequence_ of elements so it is natural to start with an `array` in TypeScript.  

```typescript
type TimeSeries = T[]
```

This snippet will lead us to the next question: Which type of elements should the array contain? The definition says _"[...] where each is associated with a timestamp"_. This association can be expressed in various ways. Here are a few, I thought about:

```typescript
type Timestamp = number;

// As a tuple type
type TimeEvent<T> = [Timestamp, T]

// As an object which contains the timestamp and data sepearated
type TimeEvent<T> = {timestamp: Timestamp, data: T}

// As an object of T which is extended by a timestamp
type TimeEvent<T> = T & {timestamp: Timestamp}
```

I decided for the first approach. I like to express associations with tuples because we are able to archieve the same as in approach two but without the overhead of an wrapper object. The third approach is just for the sake of completeness. So the model would look like this:

```typescript
type Timestamp = number;
type TimeEvent<T> = [Timestamp, T]
type TimeSeries<T> = TimeEvent<T>

// Some little helper:
const timeEvent = <T>(data: T) => [Date.now(), data] as const
const timeEventAt = <T>(data: T, timestamp: Timestamp | Date) => [
    typeof timestamp === 'number' ? timestamp : timestamp.getTime()
]
```

When we now review the definiton we will see that we might missed a tiny little detail: A sequence implies that the data is somehow ordered. When we have data structures like these it is a kind of desing decision to represent this behaviour at writing or at reading time of the data. Unfortunally there is no natural or native datatype (at least none that I know) which represents a sequence in JavaScript. So we need a way to express this behaviour somehow. Since my usecase has only few writing operations (esp. no bulk inserts) rather than a lot of reading operations, I decided to focus on a "read-optimized" approach. For this it seemed handy to create another helper function which is able to append an event at the correct position:

```typescript

const timeSeriesSortComparer = <T>([t1]: TimeEvent<T>,[t2]: TimeEvent<T>) => t1 - t2

const appendToSeries = <T>(event: TimeEvent<T>, series: TimeSeries<T> = []) => {
    return [...series, event].sort(timeSeriesSortComparer);
}

```

## Creating buckets

We can find a defintion of buckets (in computer science) from [Wikipedia](https://en.m.wikipedia.org/wiki/Bucket_(computing)):

> [...] A bucket is most commonly a type of data buffer or a type of document in which data is divided into regions.

I dont bother to much on the "Buffer" aspect and focus on the "divide into regions" part, which might be good enough since the use-case doesn't handles too much data.

The idea is to divide the timeseries into smaller timeseries - the buckets. Each event in the bucket timeseries will have a timestamp from the beginning of the most common bucket aggregation type. So if we want to bucketing the data into years the timestamps will roughly be something like this: `[2020-01-01 00:00:00, 2019-01-01 00:00:00, 2018-01-01 00:00:00, ...]` or for months: `[2020-06-01 00:00:00, 2020-05-01 00:00:00, 2020-04-01 00:00:00, ...]` I'm sure will get the point. To express this in Typescript we introduce a bucket type:  

```typescript

type Buckets<T> = TimeSeries<TimeSeries<T>>

```

To create these buckets we also add a helper function:

```typescript

const BucketType = {
    year: (ts: Timestamp) => new Date(new Date(ts).getFullYear(), 0).getTime(),
    month: (ts: Timestamp) => new Date(new Date(ts).getFullYear(), new Date(ts).getMonth()).getTime()
    // ...
} as const

const createBuckets = <T>(type: keyof BucketType, series: TimeSeries<T>) => {
    const getBucketTimestamp = BucketType[type]
    const buckets: Record<Timestamp, TimeSeries<T>> = {}
    for(let event of series) {
        const key = getBucketTimestamp(event[0])
        buckets[key] = appendToSeries(event, buckets[key] ?? [])
    }
    return buckets.entries().sort(timeSeriesSortComparer)
}

```

## Retrieve statistics from timeseries

```typescript

const seriesStats = <T>(series: Timeseries<T>, numericValue: (v:T) => number) => {
    const values = memo(() => series.map(([, v]) => numericValue(v)))
    const count = memo(() => series.lenght);
    const sum = memo(() => series.reduce((a,b) => , 0))
    const avg = memo(() => sum() / count())
    
    return ({
        get count: count,
        get sum: sum,
        get avg: avg
    })
}

const memo = <I,R>(fn: (i:I) => R) => {
    const cache = new Map<I ,R>();
    return (v: I): R => {
        if(cache.has(v)) {
            return cache.get(v) 
        } else {
            const result = fn(v)
            cache.set(v, result)
            return result;
        }
    }
}

``` 


