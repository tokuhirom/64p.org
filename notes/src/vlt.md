---
created: 2026-08-15 19:32
updated: 2026-08-15 19:32
---
# vlt (vōlt)

npm互換のセキュリティ重視型JavaScriptパッケージマネージャ。vlt technology社が開発し、2026年8月にv1.0に到達した。

## 開発チーム

中心メンバーはnpm自体の創設者・元メンテナー(Darcy Clarke、Ruy Adorno、Luke Karrysら)。「npmを作った人たちが、npmを作り直している」というプロジェクト。

## npmとの関係・互換性

- コマンド体系がnpmと同じで、既存プロジェクトへのドロップイン代替として使える。
- npm、pnpm、yarn、bun、denoいずれの環境でも動作するnpm互換レジストリAPIを提供する。

## 特徴

- **セキュリティ重視**: OSVなどの脆弱性データベースを参照し、27万5千件以上の不正・マルウェアパッケージを検出・ブロックしている。創設者Darcy Clarke氏は「installと打つだけで、何も勝手にマシン上で実行されないように設計した」と説明している。
- **パフォーマンス**: エッジロケーションからの配信により、クリーンインストールがnpmより最大38%高速。
- **グラフネイティブなクエリ機能**: 依存関係をグラフとして扱い、60以上の疑似セレクタ(`:host(local)`など)で依存関係を横断検索・フィルタリングできる。Mermaid形式でのエクスポートやGUIも用意されている。
- **vlt.jsonのグラフモディファイア**: DSS(依存関係セレクタ構文)で依存関係を直接オーバーライドできる。
- **フェーズインストール**: スクリプト実行前にダウンロードを完了させる仕組み。
- **OIDCによる信頼できる公開**: 複数のCI/CDプラットフォームに対応した、トークンレスでのパッケージ公開。

## vsr (Serverless Registry)

vltとセットで、npm互換のFair Sourceなサーバーレスレジストリシステムであるvsrも展開している。オンプレ・セルフホスト・クラウド管理型のいずれでも運用可能で、プライベートレジストリは2GBまで無料。従来のチーム/メンテナー単位を超えた細粒度のアクセス制御である「Granular Access Tokens」が特徴。

#javascript #npm #package-manager #security

## 出典

- [npmを作った人たちが再びnpmを作り直した？ vlt 1.0公開 - Publickey](https://www.publickey1.jp/blog/26/npmvlt10npm.html)
- [vlt 1.0 & Hosted Package Registries](https://www.vlt.io/blog/1-0)
- [Introducing the vlt Package Manager & Serverless Registry](https://www.vlt.io/blog/introducing-vlt-and-vsr)
- [vlt Debuts New JavaScript Package Manager and Serverless Registry - Socket.dev](https://socket.dev/blog/vlt-debuts-new-javascript-package-manager-and-serverless-registry)
