---
created: 2026-08-15 21:21
updated: 2026-08-15 21:26
---
# SpiderMonkey

Mozillaが開発するJavaScript/WebAssemblyエンジン。Firefoxに搭載されているほか、Rust製ブラウザエンジン[[servo|Servo]]などでも使われている。実装言語はC++・Rust・JavaScript。

## 歴史

世界初のJavaScriptエンジンにあたる。Brendan EichがNetscape社で1995年に開発した最初の実装は、Netscape Navigator 2.0に搭載された「Mocha」という名前だった。1996年秋、Eichが急ぎ出したことによる技術的負債を解消するためにMochaの大部分を書き直し、この新しい実装が「SpiderMonkey」と名付けられた。以来この名前がFirefoxのJSエンジンとして現在まで受け継がれている。

## アーキテクチャ

3段階の実行ティアからなる多層JIT構成。

1. **Baseline Interpreter** — バイトコードをシンプルな最適化のみで実行
2. **Baseline JIT** — 最小限の最適化で高速にマシンコードへコンパイル
3. **[[spidermonkey-jit|WarpMonkey]]**（旧IonMonkey。Firefox 83で改称） — ホットコードに対して積極的な最適化を行う

## 2026年の動き: asm.jsの非推奨化

Firefox 148でasm.jsの最適化がデフォルト無効化された。asm.jsのコード自体は今後も通常のJITパスで動作し続けるが、WebAssemblyへ再コンパイルした方がより高速な実行と小さいバイナリサイズを得られるとされている。将来的にはasm.js専用のコード自体を削除する予定。

## Rustからの利用

Servoでは、C++実装のSpiderMonkeyを`mozjs`というRustバインディングのクレート経由で統合している。`mozjs-sys`（SpiderMonkeyの低レベルなC++ API直接バインディング）と`mozjs`（Rustの安全性を活かした高レベルAPI）の2クレートに分かれている。

[[go-spidermonkey]]はこのSpiderMonkeyを一度[[wasm|WebAssembly]]にコンパイルし、[[wasm2go]]でGoのソースコードへ変換することでCGO無しにGoから利用できるようにしたライブラリ。

#javascript #webassembly #rust #firefox

## 出典

- [SpiderMonkey公式サイト](https://spidermonkey.dev/)
- [SpiderMonkey - Wikipedia](https://en.wikipedia.org/wiki/SpiderMonkey_(Javascript_engine))
- [Saying goodbye to asm.js | SpiderMonkey Blog](https://spidermonkey.dev/blog/2026/05/20/saying-goodbye-to-asmjs.html)
- [servo/mozjs README](https://github.com/servo/mozjs/blob/main/README.md)
- [Servo and SpiderMonkey Report](https://github.com/servo/servo/wiki/Servo-and-SpiderMonkey-Report)
