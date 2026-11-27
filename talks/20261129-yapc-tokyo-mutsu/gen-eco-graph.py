#!/usr/bin/env python3
"""ecosystem の dist parity の推移をスライド用の SVG にする。

使い方:
  # mutsu の ecosystem-data から取り直す（mutsu リポジトリが隣にある前提）
  git -C ../../../mutsu fetch origin ecosystem-data
  git -C ../../../mutsu show FETCH_HEAD:ecosystem/history.tsv > ecosystem-history.tsv
  git -C ../../../mutsu show FETCH_HEAD:ecosystem/summary.json > ecosystem-summary.json
  python3 gen-eco-graph.py
出力: ecosystem-history.svg
"""
import csv
import json
import datetime as dt
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parent
rows = list(csv.DictReader(open(ROOT / "ecosystem-history.tsv"), delimiter="\t"))
# 同じ日に複数回測っていれば、その日の最後の値を使う
by_day = {}
for r in rows:
    by_day[r["date"]] = r
days = sorted(by_day)
pts = [(dt.date.fromisoformat(d), float(by_day[d]["dist_parity"]), by_day[d]["raku_version"]) for d in days]
# 公開している KPI は summary.json（最後の集計）。最終点はそちらに合わせる
summary = json.load(open(ROOT / "ecosystem-summary.json"))
sd = dt.date.fromisoformat(summary["generated"])
if sd >= pts[-1][0]:
    if sd == pts[-1][0]:
        pts.pop()
    pts.append((sd, float(summary["dist_parity"]), pts[-1][2]))

W, H, L, R, T, B = 1280, 720, 110, 70, 150, 90
t0, t1 = pts[0][0], pts[-1][0]
X = lambda d: L + (d - t0).days / max(1, (t1 - t0).days) * (W - L - R)
Y = lambda v: H - B - v / 100 * (H - T - B)
INK, MUTED, GRID, LINE = "#1f2937", "#5b6472", "#e5e7eb", "#257de0"

last = by_day[days[-1]]
s = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" font-family="sans-serif">',
     '<title>ecosystem parity</title>',
     f'<rect width="{W}" height="{H}" fill="#fff"/>',
     f'<text x="60" y="70" font-size="40" font-weight="700" fill="{INK}">Rakudo で通るモジュールが、mutsu でも通る割合</text>',
     f'<text x="62" y="112" font-size="22" fill="{MUTED}">ecosystem の各 dist のテストを両方で実行（Rakudo で通る dist が分母）</text>']
for v in range(0, 101, 20):
    s.append(f'<line x1="{L}" x2="{W - R}" y1="{Y(v):.1f}" y2="{Y(v):.1f}" stroke="{GRID}"/>'
             f'<text x="{L - 14}" y="{Y(v) + 7:.1f}" font-size="20" fill="{MUTED}" text-anchor="end">{v}%</text>')
# 月の目盛り
d = dt.date(t0.year, t0.month, 1)
while d <= t1:
    if d >= t0:
        s.append(f'<text x="{X(d):.1f}" y="{H - B + 34}" font-size="20" fill="{MUTED}" text-anchor="middle">{d.month}月</text>')
    d = dt.date(d.year + (d.month == 12), d.month % 12 + 1, 1)
# Rakudo のバージョンが変わった（分母の取り直し）位置
for (a, _, va), (b, _, vb) in zip(pts, pts[1:]):
    if va != vb:
        x = X(b)
        s.append(f'<line x1="{x:.1f}" x2="{x:.1f}" y1="{T}" y2="{H - B}" stroke="#9ca3af" stroke-dasharray="6,6"/>'
                 f'<text x="{x + 8:.1f}" y="{Y(8):.1f}" font-size="17" fill="{MUTED}">Rakudo {escape(vb)} に更新</text>')
s.append(f'<polyline fill="none" stroke="{LINE}" stroke-width="4" stroke-linejoin="round" points="'
         + " ".join(f"{X(d):.1f},{Y(v):.1f}" for d, v, _ in pts) + '"/>')
d0, v0, _ = pts[0]
d1, v1, _ = pts[-1]
s.append(f'<circle cx="{X(d0):.1f}" cy="{Y(v0):.1f}" r="8" fill="{LINE}"/>'
         f'<text x="{X(d0) + 14:.1f}" y="{Y(v0) + 8:.1f}" font-size="30" font-weight="700" fill="{INK}">{v0:.1f}%</text>')
s.append(f'<circle cx="{X(d1):.1f}" cy="{Y(v1):.1f}" r="8" fill="{LINE}"/>'
         f'<text x="{X(d1) - 14:.1f}" y="{Y(v1) + 80:.1f}" font-size="30" font-weight="700" fill="{INK}" text-anchor="end">{v1:g}%（{summary["green_distributions"]:,} / {summary["graded_distributions"]:,}）</text>')
s.append(f'<text x="60" y="{H - 22}" font-size="15" fill="{MUTED}">出典: tokuhirom/mutsu ecosystem-data の ecosystem/history.tsv（{escape(days[0])}〜{escape(days[-1])}、'
         f'最新の集計 {escape(summary["generated"])}、Rakudo {escape(last["raku_version"])}）</text>')
s.append("</svg>")
(ROOT / "ecosystem-history.svg").write_text("\n".join(s) + "\n")
print(len(pts), pts[0], pts[-1])
