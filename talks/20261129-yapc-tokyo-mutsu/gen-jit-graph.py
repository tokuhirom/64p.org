#!/usr/bin/env python3
"""Render the committed bench CI snapshot as a self-contained SVG."""

import csv
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent
with (ROOT / "jit-on-off.tsv").open() as source:
    rows = list(csv.DictReader((line for line in source if not line.startswith("#")), delimiter="\t"))

labels = {
    "fib": "fib",
    "num-arith": "数値演算",
    "time-parts": "日時の計算",
    "method-call": "メソッド呼び出し",
}
assert [row["benchmark"] for row in rows] == list(labels)

svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680" role="img" aria-labelledby="title desc">',
    '<title id="title">JIT on/off の実行時間比較</title>',
    '<desc id="desc">4種類のベンチマークについて、JIT off を100%として JIT on の実行時間を比較。fib 65%、数値演算62%、日時の計算48%、メソッド呼び出し101%。</desc>',
    '<rect width="1200" height="680" fill="#fff"/>',
    '<text x="58" y="64" font-size="38" font-weight="700" fill="#17223b" font-family="sans-serif">JIT を有効にすると、どこが速くなる？</text>',
    '<text x="60" y="104" font-size="22" fill="#42526b" font-family="sans-serif">相対実行時間（JIT off = 100%）・短いほど速い</text>',
    '<rect x="830" y="76" width="22" height="18" fill="#b8c2d3"/>',
    '<text x="861" y="92" font-size="19" fill="#25324a" font-family="sans-serif">JIT off</text>',
    '<rect x="958" y="76" width="22" height="18" fill="#2877cc"/>',
    '<text x="989" y="92" font-size="19" fill="#25324a" font-family="sans-serif">JIT on</text>',
]

bar_x, full_width = 330, 600
for index, row in enumerate(rows):
    top = 140 + index * 119
    name = row["benchmark"]
    off_ms = float(row["off_s"]) * 1000
    on_ms = float(row["on_s"]) * 1000
    pct = on_ms / off_ms * 100
    diff = (on_ms / off_ms - 1) * 100
    svg.extend([
        f'<text x="58" y="{top + 37}" font-size="27" font-weight="600" fill="#17223b" font-family="sans-serif">{escape(labels[name])}</text>',
        f'<rect x="{bar_x}" y="{top}" width="{full_width}" height="32" rx="5" fill="#b8c2d3"/>',
        f'<rect x="{bar_x}" y="{top + 40}" width="{full_width * pct / 100:.1f}" height="32" rx="5" fill="#2877cc"/>',
        f'<text x="950" y="{top + 25}" font-size="21" fill="#25324a" font-family="sans-serif">{off_ms:.1f} ms</text>',
        f'<text x="950" y="{top + 65}" font-size="21" font-weight="600" fill="#175aab" font-family="sans-serif">{on_ms:.1f} ms ({diff:+.0f}%)</text>',
    ])

svg.extend([
    '<line x1="58" y1="622" x2="1142" y2="622" stroke="#d4dce7"/>',
    '<text x="60" y="652" font-size="17" fill="#516077" font-family="sans-serif">mutsu bench CI・2026-11-23・同一コミット / 同一 runner・各7回の中央値</text>',
    '</svg>',
])
(ROOT / "jit-on-off.svg").write_text("\n".join(svg) + "\n")
