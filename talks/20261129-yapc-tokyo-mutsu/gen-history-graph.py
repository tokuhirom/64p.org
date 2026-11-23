# 使い方: python3 gen-history-graph.py ../../../mutsu/HISTORY.tsv history-pass.svg
# HISTORY.tsv の旧来の数え方 (files/pass) を青線で描く。
# spec_files/spec_pass 列 (spectest.data 基準, mutsu #19043 で追加) に値があれば橙線で重ねる。
import sys, datetime as dt

lines = [l.rstrip('\n').split('\t') for l in open(sys.argv[1])]
head, rows = lines[0], lines[1:]
col = {name: i for i, name in enumerate(head)}

def num(r, name):
    i = col.get(name)
    if i is None or i >= len(r) or not r[i].strip():
        return None
    return int(r[i])

legacy, spec = [], []
prev = 0
for r in rows:
    if not r or not r[0]:
        continue
    d = dt.datetime.fromisoformat(r[0])
    p, tot = num(r, 'pass'), num(r, 'files')
    if p is not None and not (prev and p < prev * 0.8):  # クラッシュした計測は除外
        legacy.append((d, p, tot)); prev = p
    sp, st = num(r, 'spec_pass'), num(r, 'spec_files')
    if sp is not None and st:
        spec.append((d, sp, st))

W, H, L, R, T, B = 1280, 720, 90, 40, 60, 80
t0, t1 = dt.datetime(2026, 2, 1), dt.datetime(2026, 12, 1)
YMAX = 1500
X = lambda d: L + (d - t0).total_seconds() / (t1 - t0).total_seconds() * (W - L - R)
Y = lambda v: H - B - v / YMAX * (H - T - B)

o = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="sans-serif">',
     '<rect width="100%" height="100%" fill="#fff"/>',
     f'<text x="{W/2}" y="38" text-anchor="middle" font-size="26">Roast 通過ファイル数の推移</text>']
for v in range(0, YMAX + 1, 250):
    o.append(f'<line x1="{L}" x2="{W-R}" y1="{Y(v)}" y2="{Y(v)}" stroke="#eee"/><text x="{L-10}" y="{Y(v)+6}" text-anchor="end" font-size="18">{v}</text>')
for m in range(2, 13):
    d = dt.datetime(2026, m, 1)
    o.append(f'<line x1="{X(d)}" x2="{X(d)}" y1="{T}" y2="{H-B}" stroke="#eee"/><text x="{X(d)}" y="{H-B+28}" text-anchor="middle" font-size="18">{m}月</text>')

def series(pts, color, label):
    tot = pts[-1][2]
    o.append(f'<line x1="{L}" x2="{W-R}" y1="{Y(tot)}" y2="{Y(tot)}" stroke="{color}" stroke-opacity=".6" stroke-dasharray="8,6"/>'
             f'<text x="{W-R}" y="{Y(tot)-8}" text-anchor="end" fill="{color}" font-size="18">{label}: 全 {tot} ファイル</text>')
    if len(pts) == 1:
        d, p, _ = pts[0]
        o.append(f'<circle cx="{X(d):.1f}" cy="{Y(p):.1f}" r="7" fill="{color}"/>')
    else:
        o.append(f'<polyline fill="none" stroke="{color}" stroke-width="4" points="' +
                 ' '.join(f'{X(d):.1f},{Y(p):.1f}' for d, p, _ in pts) + '"/>')

series(legacy, '#2457d6', '旧来の数え方')
note = f'旧来 {legacy[-1][0]:%Y-%m-%d}: {legacy[-1][1]}/{legacy[-1][2]}'
if spec:
    series(spec, '#ea580c', 'spectest.data')
    note += f' / spectest.data {spec[-1][0]:%Y-%m-%d}: {spec[-1][1]}/{spec[-1][2]}'
o.append(f'<text x="{L}" y="{H-20}" font-size="16" fill="#666">出典: tokuhirom/mutsu HISTORY.tsv（計測失敗の点は除外） {note}</text></svg>')
open(sys.argv[2], 'w').write('\n'.join(o))
print(len(legacy), legacy[-1], len(spec), spec[-1] if spec else None)
