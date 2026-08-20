---
created: 2026-08-15 19:32
updated: 2026-08-21 07:57
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

## pnpmとの違い

両者とも「フラットにhoistせず、宣言していない依存関係にアクセスできないようにする厳格なnode_modules」を志向する点は共通するが、実現方法とプロダクトの方向性が異なる。

- **アーキテクチャ**: pnpmはマシン全体で共有するcontent-addressable storeを持ち、パッケージの各バージョンをディスク上に一度だけ保存する。`node_modules/.pnpm`という仮想ストアにstoreからのハードリンクを配置し、そこから各パッケージ用の`node_modules`へsymlinkを張ることで宣言した依存だけが見える構造を作る(ディスク節約とマルチプロジェクト間の共有が主眼)。vltは内部的に`node_modules/.vlt/`という独自レイアウトを使い、依存関係を`@vltpkg/graph`というGraph(Node/Edgeで表現)としてモデル化してnode_modules構造を導出する。peer依存のバージョンが競合する場合はパッケージを複製して別々に配置する。
- **クエリ・セキュリティ機能**: vltはDependency Selector Syntax(DSS)というCSSセレクタ風のクエリ言語を持ち、`:malware` `:cve` `:vuln` `:unmaintained` `:outdated`など60以上の疑似セレクタ(うち約30がセキュリティ関連)で依存関係グラフを横断検索できる。`vlt.json`のGraph Modifiersでこれらのセレクタを使い特定パッケージのバージョンを強制上書きすることも可能。pnpmにも`overrides`によるバージョン上書きや`pnpm audit`はあるが、vltほど網羅的なクエリ・ポリシー言語は持たない。
- **レジストリの扱い**: pnpmはデフォルトでnpmレジストリを使うが、vltはデフォルトレジストリを持たず、設定しない限りパッケージの解決・取得コマンドはエラーになる(自前のホスト型レジストリvsrや複数レジストリ運用が前提)。
- **開発チーム・ポジショニング**: pnpmはZoltan Kochan氏を中心としたコミュニティ主導プロジェクトで、モノレポでのディスク効率・速度が主眼。vltはnpm自体の創設者・元メンテナーチームによる開発で、単なるクライアントではなく[[supply-chain-attack|サプライチェーン攻撃]]対策込みのプラットフォーム(レジストリ運用、マルウェア検出込み)として設計されている。
- **成熟度**: pnpmは2017年頃から存在し実運用実績が豊富。vltは2026年8月に1.0に到達したばかりで、エコシステム・実績はこれから。

#javascript #npm #package-manager #security

## 出典

- [npmを作った人たちが再びnpmを作り直した？ vlt 1.0公開 - Publickey](https://www.publickey1.jp/blog/26/npmvlt10npm.html)
- [vlt 1.0 & Hosted Package Registries](https://www.vlt.io/blog/1-0)
- [Introducing the vlt Package Manager & Serverless Registry](https://www.vlt.io/blog/introducing-vlt-and-vsr)
- [vlt Debuts New JavaScript Package Manager and Serverless Registry - Socket.dev](https://socket.dev/blog/vlt-debuts-new-javascript-package-manager-and-serverless-registry)
- [Migrating from pnpm to vlt](https://docs.vlt.sh/cli/migration/from-pnpm)
- [Symlinked node_modules structure - pnpm](https://pnpm.io/symlinked-node-modules-structure)
- [Dependency Selector Syntax - vlt docs](https://docs.vlt.sh/cli/selectors)
- [Taking Control with Graph Modifiers - vlt blog](https://blog.vlt.sh/blog/introducing-graph-modifiers)
- [@vltpkg/graph - npm](https://www.npmjs.com/package/@vltpkg/graph)
