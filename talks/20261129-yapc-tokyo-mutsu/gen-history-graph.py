# 使い方: python3 gen-history-graph.py ../../../mutsu/HISTORY.tsv history-pass.svg
import sys,datetime as dt
rows=[l.rstrip('\n').split('\t') for l in open(sys.argv[1])][1:]
pts=[];prev=0
for r in rows:
    if not r[0]: continue
    d=dt.datetime.fromisoformat(r[0]);p=int(r[3]);tot=int(r[2])
    if prev and p<prev*0.8: continue  # クラッシュした計測は除外
    pts.append((d,p,tot));prev=p
W,H,L,R,T,B=1280,720,90,40,60,80
t0=dt.datetime(2026,2,1);t1=dt.datetime(2026,12,1)
X=lambda d:L+(d-t0).total_seconds()/(t1-t0).total_seconds()*(W-L-R)
Y=lambda v:H-B-v/1300*(H-T-B)
o=[f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" font-family="sans-serif">','<rect width="100%" height="100%" fill="#fff"/>',
 f'<text x="{W/2}" y="38" text-anchor="middle" font-size="26">Roast 通過ファイル数の推移</text>']
for v in range(0,1301,250):
    o.append(f'<line x1="{L}" x2="{W-R}" y1="{Y(v)}" y2="{Y(v)}" stroke="#eee"/><text x="{L-10}" y="{Y(v)+6}" text-anchor="end" font-size="18">{v}</text>')
for m in range(2,13):
    d=dt.datetime(2026,m,1);o.append(f'<line x1="{X(d)}" x2="{X(d)}" y1="{T}" y2="{H-B}" stroke="#eee"/><text x="{X(d)}" y="{H-B+28}" text-anchor="middle" font-size="18">{m}月</text>')
tot=pts[-1][2];o.append(f'<line x1="{L}" x2="{W-R}" y1="{Y(tot)}" y2="{Y(tot)}" stroke="#d33" stroke-dasharray="8,6"/><text x="{W-R}" y="{Y(tot)-8}" text-anchor="end" fill="#d33" font-size="18">全 {tot} ファイル</text>')
o.append('<polyline fill="none" stroke="#2457d6" stroke-width="4" points="'+' '.join(f'{X(d):.1f},{Y(p):.1f}' for d,p,_ in pts)+'"/>')
for lab,d,p in [('2/28 500',None,500),('4/14 1000',None,1000)]: pass
o.append(f'<text x="{L}" y="{H-20}" font-size="16" fill="#666">出典: tokuhirom/mutsu HISTORY.tsv（計測失敗の点は除外） 最新 {pts[-1][0]:%Y-%m-%d}: {pts[-1][1]}/{tot}</text></svg>')
open(sys.argv[2],'w').write('\n'.join(o))
print(len(pts),pts[-1])
