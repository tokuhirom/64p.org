---
created: 2026-08-09
updated: 2026-08-09
---
# Network Doctor (netdoc)

[heymaikol/network-doctor](https://github.com/heymaikol/network-doctor) — Go製のクロスプラットフォーム対応ネットワーク診断TUIツール。コマンド名は`netdoc`。

## コンセプト

「接続がどこで破綻しているか」を、DNS → TCP → TLS → HTTP → プロキシの各層で切り分けて特定する。単なる`ping`や`dig`の出力ではなく、「ネットワークの問題かサービス側の問題か」を実用的に診断するのが狙い。

## 技術スタック

- Go 1.25+
- Bubble Tea / Bubbles / Lip Gloss（TUIフレームワーク一式）
- Linux / macOS / Windows ネイティブバイナリ対応

## 主な機能

- 依存関係グラフに基づく複数の独立診断、結果は5段階評価（✓ Pass / ! Warn / ✗ Fail / ⊘ Skip / – N/A）
- ルート権限なしで動作（パスMTUチェックも含む）
- ドリルダウンツール（ping、traceroute、mtr、nmap、ssh等）呼び出し
- LANスキャン・ネットワークマップ表示、SSHログイン機能
- `--watch`モードで5秒間隔の継続監視
- 出力はTUI / JSON / NDJSON（watch時）に対応

## インストール

Scoop（Windows）、Homebrew（macOS）、COPR（Fedora）、`.deb`/`.rpm`/`.apk`、`go install`など各種パッケージマネージャに対応。

## 使用例

```bash
netdoc github.com           # DNS → TCP → TLS → HTTP 診断
netdoc github.com:22        # SSH パスとバナー診断
netdoc --watch host         # 間欠的障害の追跡
netdoc --json host          # スクリプト向けの構造化レポート
```

## その他

GitHub上で156スター、560コミット。ライセンスはGPLv3以上。

#go #tui #network #cli

## 出典

- [heymaikol/network-doctor - GitHub](https://github.com/heymaikol/network-doctor)
