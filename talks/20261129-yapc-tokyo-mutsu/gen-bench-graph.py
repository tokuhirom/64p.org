#!/usr/bin/env python3
"""mutsu と Rakudo の実行時間比を、スライド用の SVG 2枚にする。

使い方:
  # bench-data から最新のスナップショットを取り直す（mutsu リポジトリが隣にある前提）
  git -C ../../../mutsu fetch origin bench-data
  git -C ../../../mutsu show FETCH_HEAD:bench-history.tsv > /tmp/bench-history.tsv
  python3 gen-bench-graph.py --from /tmp/bench-history.tsv [--rakudo 2026.11]

  # コミット済みのスナップショット (bench-vs-rakudo.tsv) から描き直すだけ
  python3 gen-bench-graph.py

出力: bench-vs-rakudo.tsv（スナップショット）, bench-whole.svg（起動込み）, bench-section.svg（処理部分だけ）
"""

import argparse
import csv
import math
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent
SNAPSHOT = ROOT / "bench-vs-rakudo.tsv"

# (bench-history.tsv の benchmark 名, スライドに出す名前)
WHOLE = [
    ("bench-startup+jit", "起動"),
    ("bench-grammar-json-tiny+jit", "Grammar (JSON::Tiny)"),
    ("bench-mandelbrot+jit", "マンデルブロ集合"),
    ("method-call+jit", "メソッド呼び出し"),
    ("bench-fib+jit", "fib"),
]
SECTION = [
    ("bench-grammar-json-tiny@section+jit", "Grammar (JSON::Tiny)"),
    ("bench-regex-match@section+jit", "正規表現マッチ"),
    ("bench-yaml-parse-big@section+jit", "YAML パース"),
    ("bench-json-fast-spdx@section+jit", "JSON::Fast"),
    ("bench-multi-dispatch@section+jit", "multi dispatch"),
]

FASTER = "#257de0"  # mutsu が速い（dataviz の参照パレット blue）
SLOWER = "#ec4647"  # Rakudo が速い（同 red）
INK, MUTED, GRID = "#1f2937", "#5b6472", "#e5e7eb"


def take_snapshot(src, rakudo):
    rows = list(csv.DictReader(open(src), delimiter="\t"))
    wanted = {b for b, _ in WHOLE + SECTION}
    by_commit = {}
    for r in rows:
        if r["benchmark"] in wanted and r["ratio_mutsu_over_raku"] not in ("", "NA") \
                and (rakudo is None or f"v{rakudo}." in r["rakudo"]):
            by_commit.setdefault((r["date"], r["commit"]), {})[r["benchmark"]] = r
    complete = [k for k, v in by_commit.items() if set(v) == wanted]
    if not complete:
        raise SystemExit(f"rakudo {rakudo} で全ベンチがそろっている計測がまだない")
    date, commit = max(complete)
    got = by_commit[(date, commit)]
    with SNAPSHOT.open("w") as f:
        f.write(f"# tokuhirom/mutsu bench-data, run {date}, commit {commit}\n")
        f.write(f"# rakudo: {next(iter(got.values()))['rakudo']}\n")
        f.write("# 7 回の中央値。ratio = mutsu / rakudo（小さいほど mutsu が速い）\n")
        f.write("benchmark\tmutsu_s\trakudo_s\tratio\n")
        for b, _ in WHOLE + SECTION:
            r = got[b]
            f.write(f"{b}\t{r['mutsu_median_s']}\t{r['raku_median_s']}\t{r['ratio_mutsu_over_raku']}\n")


def load_snapshot():
    meta = [l[2:].strip() for l in SNAPSHOT.open() if l.startswith("# ")]
    rows = csv.DictReader((l for l in SNAPSHOT.open() if not l.startswith("#")), delimiter="\t")
    data = {r["benchmark"]: r for r in rows}
    rakudo = next(m for m in meta if m.startswith("rakudo:")).split("v", 1)[1].split(".", 2)
    return data, f"{rakudo[0]}.{rakudo[1].rstrip('.')}", meta[0]


def label(ratio):
    if 0.9 <= ratio <= 1.1:
        return "ほぼ同じ"
    if ratio <= 1:
        x = 1 / ratio
        return f"{x:.0f}倍速い" if x >= 10 else f"{x:.1f}倍速い"
    return f"{ratio:.1f}倍遅い"


def render(items, data, title, subtitle, source, out):
    W, H = 1280, 720
    left, right = 330, 1180        # バーの描画範囲
    top, row = 190, 92
    lo, hi = math.log10(1 / 30), math.log10(2.5)   # 横軸: 30倍速い 〜 2.5倍遅い（対数）
    X = lambda ratio: left + (math.log10(ratio) - lo) / (hi - lo) * (right - left)
    x1 = X(1)
    s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" font-family="sans-serif">',
         f'<title>{escape(title)}</title>',
         f'<rect width="{W}" height="{H}" fill="#fff"/>',
         f'<text x="60" y="70" font-size="40" font-weight="700" fill="{INK}">{escape(title)}</text>',
         f'<text x="62" y="112" font-size="22" fill="{MUTED}">{escape(subtitle)}</text>']
    # 目盛り
    for ratio, text in [(1/30, "30倍速い"), (1/10, "10倍"), (1/5, "5倍"), (1/2, "2倍"), (1, "同じ"), (2, "2倍遅い")]:
        x = X(ratio)
        s.append(f'<line x1="{x:.1f}" x2="{x:.1f}" y1="{top - 20}" y2="{top + row * len(items) - 20}" stroke="{GRID}" stroke-width="1"/>')
        s.append(f'<text x="{x:.1f}" y="{top + row * len(items) + 10}" font-size="18" fill="{MUTED}" text-anchor="middle">{text}</text>')
    s.append(f'<text x="{x1 - 12:.1f}" y="{top - 34}" font-size="20" fill="{FASTER}" text-anchor="end" font-weight="700">← mutsu が速い</text>')
    s.append(f'<text x="{x1 + 12:.1f}" y="{top - 34}" font-size="20" fill="{SLOWER}" font-weight="700">Rakudo が速い →</text>')
    for i, (b, name) in enumerate(items):
        r = data[b]
        ratio = float(r["mutsu_s"]) / float(r["rakudo_s"])
        y = top + i * row
        x = X(ratio)
        color = FASTER if ratio <= 1 else SLOWER
        bx, bw = (x, x1 - x) if ratio <= 1 else (x1, x - x1)
        s.append(f'<text x="{left - 20}" y="{y + 30}" font-size="26" fill="{INK}" text-anchor="end">{escape(name)}</text>')
        s.append(f'<rect x="{bx:.1f}" y="{y + 8}" width="{max(bw, 3):.1f}" height="36" rx="4" fill="{color}"/>')
        if bw > 220:   # 長いバーはバーの中に白で書く（左の項目名とぶつからないように）
            lx, anchor, ink = (bx + 14, "start", "#fff") if ratio <= 1 else (bx + bw - 14, "end", "#fff")
        else:
            lx, anchor, ink = ((x - 12, "end", INK) if ratio <= 1 else (x + 12, "start", INK))
        s.append(f'<text x="{lx:.1f}" y="{y + 35}" font-size="24" font-weight="700" fill="{ink}" text-anchor="{anchor}">{label(ratio)}</text>')
    s.append(f'<line x1="{x1:.1f}" x2="{x1:.1f}" y1="{top - 20}" y2="{top + row * len(items) - 20}" stroke="{INK}" stroke-width="2"/>')
    s.append(f'<text x="60" y="{H - 24}" font-size="15" fill="{MUTED}">{escape(source)}</text>')
    s.append("</svg>")
    out.write_text("\n".join(s) + "\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--from", dest="src", help="bench-history.tsv からスナップショットを取り直す")
    ap.add_argument("--rakudo", default=None, help="この Rakudo バージョンの計測だけを使う（例: 2026.11）")
    args = ap.parse_args()
    if args.src:
        take_snapshot(args.src, args.rakudo)
    data, rakudo, source = load_snapshot()
    src = f"出典: {source}。JIT on。7回の中央値"
    render(WHOLE, data, "mutsu は Rakudo の何倍速い？（起動込み）",
           f"スクリプト全体の実行時間 / Rakudo v{rakudo} / 横軸は対数", src, ROOT / "bench-whole.svg")
    render(SECTION, data, "処理部分だけで比べると",
           f"起動とウォームアップを除いた時間 / Rakudo v{rakudo} / 横軸は対数", src, ROOT / "bench-section.svg")
    for b, _ in WHOLE + SECTION:
        ratio = float(data[b]["mutsu_s"]) / float(data[b]["rakudo_s"])
        print(b, f"{ratio:.3f}", label(ratio))


if __name__ == "__main__":
    main()
