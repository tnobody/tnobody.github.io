from http.server import BaseHTTPRequestHandler
from collections import Counter
from os import listdir, path
import json
from urllib.parse import parse_qs, urlparse


def get_lines(file: str):
    with open(file, 'r') as file:
        lines = file.readlines()
    return lines


try:
    matrix = [list(word.strip()) for word in get_lines(
        path.join('api', 'hacking-wordle', 'words.txt'))]
except Exception:
    matrix = []

matrix_t = [list(word) for word in zip(*matrix)]

char_counts = [Counter(word) for word in matrix_t]

blank = ' '


def word_is_allowed(word, ignore_chars=[], fixed_chars="     ", required_chars="     "):
    ignore_chars = set(ignore_chars) - set(fixed_chars + required_chars)
    no_ignored_chars = all([c not in ignore_chars for c in word])
    matches_fixed_chars = all(
        [c == word[i] for (i, c) in enumerate(fixed_chars) if c is not blank])
    required_but_not_at = all([c is not word[i] for (
        i, c) in enumerate(required_chars) if c is not blank])
    contains_requires = all(
        [c in word for c in required_chars if c is not blank])
    return no_ignored_chars and matches_fixed_chars and required_but_not_at and contains_requires


def get_word_score(word):
    return sum([
        char_counts[i][c]
        for (i, c) in enumerate(word)
    ])


def get_best_words(ignore_chars=[], required_chars="     ", fixed_chars="     "):
    print(ignore_chars, required_chars, fixed_chars)
    return sorted([
        (get_word_score(word), "".join(word))
        for word in matrix
        if word_is_allowed(word, ignore_chars=ignore_chars, required_chars=required_chars, fixed_chars=fixed_chars)
    ], key=lambda r: r[0], reverse=True)


def possible_words_table(best_words):

    return f"""
    <table>
        <tr>
            <th>Word</th>
            <th>Score</th>
        </tr>
        {"".join([
            f"<tr><td>{word}</td><td>{score}</td></tr>"
            for (score, word) in best_words
        ])}
    </table>
    """


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        url = urlparse(self.path)
        params = parse_qs(url.query)
        best_words = get_best_words(
            ignore_chars=list(params.get('ignore_chars', [''])[0]),
            required_chars=params.get('required_chars', ['     '])[0],
            fixed_chars=params.get('fixed_chars', ['     '])[0]
        )

        response_json = json.dumps(best_words[:10])
        self.wfile.write(possible_words_table(best_words[:10]).encode("utf-8"))
        return
