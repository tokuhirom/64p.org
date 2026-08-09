---
created: 2026-08-09
updated: 2026-08-09
---
# SakPilot

#go #typescript #wails

「さくらのクラウド」用の非公式(サードパーティ製)デスクトップクライアント。<https://github.com/tokuhirom/sakpilot> で個人開発中。GUI操作でさくらのクラウドの各種リソースを管理できる。CLI版として別プロジェクトの[sact](https://github.com/tokuhirom/sact)がある。

## 技術スタック

Go 1.25+ (バックエンド) + TypeScript(フロントエンド)を、[Wails](https://wails.io/) v2で束ねてデスクトップアプリ化している。Wailsは、Goで書いたバックエンドとWeb技術(HTML/CSS/JS)のフロントエンドを組み合わせてクロスプラットフォームのデスクトップアプリを作れるフレームワーク。GitHub上の言語比率はTypeScriptが最大で、Go、NSIS(Windowsインストーラ)、CSSなどが続く。作成日は2026-01-16、2026-08-09時点でstar数3。

## 主な機能

- usacloudプロファイル(`~/.usacloud/`)の読み込み・作成・編集・削除、認証情報検証
- ゾーン依存リソース: サーバー・ディスク・アーカイブ・データベース・スイッチ・パケットフィルタ・ProxyLB(エンハンスドロードバランサ)・AppRun(専有タイプ)の一覧・操作
- グローバルリソース: DNSゾーン・SSL証明書・GSLB・シンプル監視・エンハンスドデータベース・コンテナレジストリ・KMS鍵・AppRun(共有タイプ)・請求情報・オブジェクトストレージ
- 監視スイート: ログ・メトリクス・トレース一覧、Prometheus形式でのメトリクスクエリ
- プロファイル/シークレットはOSキーチェーン(keyring)に保存

## 配布

Homebrew (macOS、`brew install tokuhirom/tap/sakpilot`) およびGitHub ReleasesでmacOS/Windows/Linuxバイナリを配布。macOSビルドは非署名のため初回起動時にセキュリティ警告が出る。

## 開発体制の特徴

実クラウドに接続せずに動作確認できる`mise run demo`コマンドがあり、sacloud-sdk-go同梱のIaaS fakeドライバとsakumockのシードデータでGUIをブラウザから触って確認できる仕組みがある。E2Eテスト戦略は[[architecture-decision-record|ADR]](`docs/adr/0001-e2e-testing-strategy.md`)として記録されている。

## 出典

- [tokuhirom/sakpilot - GitHub](https://github.com/tokuhirom/sakpilot)(README.mdより)
