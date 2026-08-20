---
created: 2026-08-20 15:26
updated: 2026-08-20 15:41
---
# Microsoft eXecution Container (MXC)

Microsoftが2026年2月に公開した、信頼できないコード(モデル出力・プラグイン・ツール)をサンドボックス実行するためのシステム。Windows・Linux・macOSをまたいで、複数のコンテインメント(隔離)バックエンドを統一されたJSON設定スキーマとTypeScript SDKの下に束ねる構成になっている。

- リポジトリ: https://github.com/microsoft/mxc
- ライセンス: MIT
- 現時点(2026-08時点)では早期プレビュー段階で、READMEにも「セキュリティ境界として使うな」という趣旨の警告がある。

## 想定ユースケース

READMEでは "MXC is a sandboxed code execution system for running untrusted code (model output, plugins, tools)" と明記されている。つまりAIエージェント・LLMが生成したコードや、プラグイン・外部ツールをホストOS上で安全に実行するための隔離基盤として設計されている。

## アーキテクチャ

リポジトリ構成:

- `src/` — Rustワークスペース(ネイティブバイナリ+共有ライブラリcrate群)
- `sdk/` — TypeScript SDK(npmパッケージ `@microsoft/mxc-sdk`)
- `schemas/` — JSON Schema定義(`stable/`と`dev/`に分離)

## Containment Backend

プラットフォームごとにデフォルトのバックエンドが決まっており、それとは別に実験的なバックエンドも用意されている。

| プラットフォーム | デフォルト | 選択可能な代替 |
|---|---|---|
| Windows 11 24H2+ | processcontainer | Windows Sandbox, WSLC, MicroVM, [[hyperlight\|Hyperlight]], IsolationSession |
| Linux x64/ARM64 | [[bubblewrap]] | [[lxc\|LXC]], MicroVM, [[hyperlight\|Hyperlight]] |
| macOS ARM64/x64 | seatbelt | (なし) |

安定版(実験フラグ不要)として ProcessContainer(WindowsのAppContainer/BaseContainerを利用)、[[bubblewrap|Bubblewrap]]、[[lxc|LXC]]、Seatbelt(macOSネイティブ)の4つが提供される。一方、Windows Sandbox・WSLC・[[microvm|MicroVM]]・[[hyperlight|Hyperlight]]・IsolationSessionは`experimental: true`を指定しないと使えない実験的バックエンドという位置づけ。[[microvm-ecosystem|コンテナ向け軽量VM技術]]で扱っているようなmicroVM系技術を、複数OSの隔離手段のひとつとして横断的に選択できるようにしている点が特徴。

## ポリシー制御

JSON設定で以下の三層を細かく制御できる。

1. **ファイルシステム** — 読み取り専用パス、読み書き可能パスの指定
2. **ネットワーク** — プロキシ、アウトバウンド許可/ブロック、ホストフィルタリング
3. **UI** — クリップボード、ディスプレイ、GUIアクセスの制御

[[seccomp]]や[[least-privilege|最小権限の原則]]、[[linux-privilege-mechanisms|Linuxの権限分離・権限昇格の仕組み]]で見てきたOSレベルの隔離プリミティブを、クロスプラットフォームなポリシー記述に抽象化しているイメージ。

## SDKの使い方

ワンショットAPI(単発実行)とステートフルAPI(長寿命サンドボックス)の2種類がある。

ワンショット例:

```javascript
const config = createConfigFromPolicy({
  version: '0.6.0-alpha',
  filesystem: { readonlyPaths, readwritePaths },
  network: { allowOutbound: false },
  timeoutMs: 30_000,
});
const child = spawnSandboxFromConfig(config);
```

ステートフルAPIは `provisionSandbox` → `startSandbox` → `execInSandboxAsync` → `stopSandbox` → `deprovisionSandbox` という多段階のライフサイクルを持つ。

## 診断・デバッグ

- `--debug` フラグで詳細出力
- `--audit` フラグで学習モードを実行し、実際の挙動からポリシー生成を支援
- Windows上ではETW(Event Tracing for Windows)によるテレメトリ収集にも対応(デフォルト無効)

## スキーマバージョニング

`schemas/stable/`に不変のスキーマを、`schemas/dev/`に実験的スキーマを分けて管理。2026-08時点の推奨安定版は`0.6.0-alpha`。

#sandbox #ai-agent #microsoft

## 出典

- [microsoft/mxc README](https://github.com/microsoft/mxc/blob/main/README.md)
