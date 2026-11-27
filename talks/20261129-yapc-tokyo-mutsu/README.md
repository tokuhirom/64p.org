# mutsu - 令和の時代に JIT 搭載の Raku インタープリタを実装した話

YAPC::Tokyo 2026 (2026-11-29) のトーク。

## ファイル

- `main.txt` — スライド本体（presen5 の Hatena 記法）
- `index.html` — presen5 のビューア
- `demo.html` — WebAssembly 版 mutsu のデモ（`?ex=hello|grammar|multi|concurrency`）。スライドから iframe で埋め込んでいる
- `history-pass.svg` / `gen-history-graph.py` — Roast 通過ファイル数の推移グラフとその生成スクリプト
- `jit-on-off.tsv` / `gen-jit-graph.py` / `jit-on-off.svg` — bench CI の同一コミット・同一 runner で測った JIT オン・オフの7回中央値と、そのグラフ
- `bench-vs-rakudo.tsv` / `gen-bench-graph.py` / `bench-whole.svg` / `bench-section.svg` — Rakudo との実行時間比のグラフ。bench-data のスナップショットを TSV でコミットし、そこから SVG を描く
- `gen-demo-shots.js` / `demo-*.png` — PDF（印刷）用のデモの静止画。印刷では iframe の中身が出ないので、代わりにこの画像を出す。デモを変えたら `node gen-demo-shots.js` で撮り直す（先に fetch-mutsu-wasm.sh が必要）
- `fetch-mutsu-wasm.sh` — デモ用の wasm を取得するスクリプト
- `add-english.py` — 各スライドに英語字幕 (`<div class="en">`) を付けるスクリプト。英訳はスクリプト内の辞書（スライドの最初の行がキー）。スライドを足したり直したりしたら辞書を更新して `python3 add-english.py` を再実行する（何度実行しても同じ結果になる）。未訳があると一覧を出して失敗する
- `fit.js` — ページごとに文字サイズを自動調整して、本文と英語字幕が画面に収まるようにする（下限あり）。presen5 本体は触らずこのトークだけで読み込む
- `check-layout.js` — 全スライドが PC (1920x1080 / 1280x720) とスマホ (iPhone 13 / Pixel 7) で画面内に収まり、文字が下限より小さくならないかを Playwright で検査する。デモ直前のキー操作と、各デモ内の「次のスライド」ボタンも確認する
- `package.json` / `package-lock.json` — レイアウト検査用の Playwright のバージョンを固定する
- `memo.md` — ネタメモ（採用/未採用、出典、当日更新リスト）

## 発表前の準備（ネットワークがあるうちに）

デモ用の WebAssembly 版 mutsu（約32MB）はリポジトリに入れていないので、事前に取得する。

```sh
cd talks/20261129-yapc-tokyo-mutsu
sh fetch-mutsu-wasm.sh            # demo.html の VERSION を取得
# sh fetch-mutsu-wasm.sh 1.0.0    # バージョンを指定する場合
```

npm から `@tokuhirom/mutsu` を取ってきて integrity を検証し、`vendor/mutsu-wasm/` に展開する（gitignore 済み）。
バージョンを変えるときは `demo.html` の `const VERSION = ...` も合わせて書き換える。

ベンチのグラフを最新の bench-data で描き直す場合:

```sh
git -C ../../../mutsu fetch origin bench-data
git -C ../../../mutsu show FETCH_HEAD:bench-history.tsv > /tmp/bench-history.tsv
python3 gen-bench-graph.py --from /tmp/bench-history.tsv --rakudo 2026.11
```

`--rakudo` で、そのバージョンの Rakudo と比べた計測だけを使う。「起動」スライドの ms も合わせて更新する。

Roast のグラフを最新にする場合（mutsu リポジトリが隣にチェックアウトされている前提）:

```sh
python3 gen-history-graph.py ../../../mutsu/HISTORY.tsv history-pass.svg
```

JIT 比較グラフの数値は [mutsu の bench-data](https://github.com/tokuhirom/mutsu/blob/9df948ba0/bench-history.tsv) の 2026-11-23 20:50:32 UTC、コミット `3346116673eaff78781d9824df6a48d1264a72f2` から抜き出したもの。数値を更新する場合は `jit-on-off.tsv` の同一実行に属するオン・オフの組を更新し、`python3 gen-jit-graph.py` で SVG を再生成する。

## 発表時

```sh
cd talks
python3 -m http.server 8000
# http://localhost:8000/20261129-yapc-tokyo-mutsu/ を開く
```

- `j`/`k` や矢印キーでページ送り。
- デモのステータスに `(local)` と出ていればローカルの wasm で動いている。オレンジ色の `(CDN)` はローカルに無くて CDN から読んでいる状態なので、`fetch-mutsu-wasm.sh` を実行し直す。
- デモの iframe 内にフォーカスがあるとページ送りできない。外側をクリックしてから送る。

## レイアウト検査

スライドを直したら必ず実行する（外部通信を遮断した状態で開くので、オフライン確認も兼ねる）。

```sh
npm ci
npx playwright install chromium
```

`npm ci` は初回と `package-lock.json` が変わったときに実行する。Chromium のインストールも初回のみでよい。

```sh
npm run check:layout                       # 全スライド × 4画面。NG があれば一覧を出して終了コード 1
SLIDES=0,56,133 SHOTS=/tmp/shots npm run check:layout   # 一部だけ、スクリーンショット付き
```

文字の下限は PC が画面の高さの 3.5%（最低 28px）、スマホが 16px。収まらないと NG になるので、そのスライドは分割する。

## オフライン確認

Wi-Fi を切った状態で上の手順で開き、デモ4つが `(local)` で動くことを確認する。
