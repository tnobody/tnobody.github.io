'use strict';

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

console.log('TEst');
var script = {
    data() {
        return {
            ignore_chars: 'Hello wordl',
            required_chars: Array(5).fill({ char: 'A' }),
            fixed_chars: Array(5).fill({ char: ' ' })
        }
    },
    methods: {
        updateWords() {
            console.log('Hello');
        }
    },
    computed: {
        required_chars_str() {
            return this.required_chars.map(c => c.char).join('')
        }
    }
};

module.exports = script;
