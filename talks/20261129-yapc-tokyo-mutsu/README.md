# mutsu - 令和の時代に JIT 搭載の Raku インタープリタを実装した話

YAPC::Tokyo 2026 (2026-11-29) のトーク。

## ファイル

- `main.txt` — スライド本体（presen5 の Hatena 記法）
- `index.html` — presen5 のビューア
- `demo.html` — WebAssembly 版 mutsu のデモ（`?ex=hello|grammar|multi|concurrency`）。スライドから iframe で埋め込んでいる
- `history-pass.svg` / `gen-history-graph.py` — Roast 通過ファイル数の推移グラフとその生成スクリプト
- `fetch-mutsu-wasm.sh` — デモ用の wasm を取得するスクリプト
- `add-english.py` — 各スライドに英語字幕 (`<div class="en">`) を付けるスクリプト。英訳はスクリプト内の辞書（スライドの最初の行がキー）。スライドを足したり直したりしたら辞書を更新して `python3 add-english.py` を再実行する（何度実行しても同じ結果になる）。未訳があると一覧を出して失敗する
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

グラフを最新にする場合（mutsu リポジトリが隣にチェックアウトされている前提）:

```sh
python3 gen-history-graph.py ../../../mutsu/HISTORY.tsv history-pass.svg
```

## 発表時

```sh
cd talks
python3 -m http.server 8000
# http://localhost:8000/20261129-yapc-tokyo-mutsu/ を開く
```

- `j`/`k` や矢印キーでページ送り。
- デモのステータスに `(local)` と出ていればローカルの wasm で動いている。オレンジ色の `(CDN)` はローカルに無くて CDN から読んでいる状態なので、`fetch-mutsu-wasm.sh` を実行し直す。
- デモの iframe 内にフォーカスがあるとページ送りできない。外側をクリックしてから送る。

## オフライン確認

Wi-Fi を切った状態で上の手順で開き、デモ4つが `(local)` で動くことを確認する。
