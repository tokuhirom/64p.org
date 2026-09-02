---
created: 2026-08-20 15:41
updated: 2026-09-02 19:13
---
# Hyperlight

Microsoftが開発する、アプリケーションに組み込んで使う軽量なVMM(Virtual Machine Manager)。Rust製ライブラリで、KVM(Linux)やHyper-V(Windows)といったハイパーバイザー技術を直接叩き、フルOSを起動しないマイクロVM内で信頼できないコードを実行する。2025年2月に[[cncf|CNCF]] Sandboxプロジェクトへ採択された。ライセンスはApache 2.0。

- リポジトリ: https://github.com/hyperlight-dev/hyperlight

## 高速な理由: OSを起動しない

一般的なVMやコンテナと異なり、Hyperlightのマイクロ VMは完全なOSを起動しない。ゲストにはカーネルの代わりに最小限のランタイムだけが載っており、スタック・ヒープ・通信バッファといったメモリ領域とvCPUを事前割り当て・初期化しておくことで、コールドスタートを数百マイクロ秒〜数ミリ秒に抑えている。公式ブログのデモでは、事前にゲストをメモリへロードし待機させた状態から1回の呼び出しを0.0009秒で完了させている。

ゲスト内のコードは標準出力のような基本的なシステムコールすら持たず、ホストOS側へのコールバック経由でI/Oを行う構成になっており、実行できることが強く制限されたサンドボックスになっている。

対応する実行フォーマット:

- x86_64ネイティブELFバイナリ
- WebAssembly
- JavaScript

## Hyperlight Wasm

Hyperlightの上でWasm Component Model準拠のワークロードを実行するための「マイクロゲスト」。2025年3月にオープンソース化された。ゲスト側にOSを載せず、Hyperlightのハードウェア保護された境界の中でWasmコンポーネントを直接実行する構成になっている。

## ユースケース

- サーバーレス/FaaSプラットフォームでの信頼できないコードの高速実行
- マイクロ秒単位の応答が求められるリアルタイムワークロード
- 本番環境でのハードウェア保護を伴う安全なコード実行(AIエージェントが生成したコードの実行など)

[[microsoft-mxc|Microsoft eXecution Container (MXC)]]では、Windows/Linux向けの実験的containment backendの一つとしてHyperlightが選択できる。[[microvm-ecosystem|コンテナ向け軽量VM技術]]・[[microvm]]・[[firecracker]]・[[crosvm]]などと同じ「フルVMより軽く、コンテナより隔離が強い」マイクロVM系技術の系譜に位置づけられる。

#sandbox #microvm #microsoft #wasm

## 出典

- [Hyperlight: Achieving 0.0009-second micro-VM execution time (Microsoft Open Source Blog)](https://opensource.microsoft.com/blog/2025/02/11/hyperlight-creating-a-0-0009-second-micro-vm-execution-time/)
- [Hyperlight Wasm: Fast, secure, and OS-free (Microsoft Open Source Blog)](https://opensource.microsoft.com/blog/2025/03/26/hyperlight-wasm-fast-secure-and-os-free/)
- [hyperlight-dev/hyperlight](https://github.com/hyperlight-dev/hyperlight)
