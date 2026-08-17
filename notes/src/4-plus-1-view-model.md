---
created: 2026-08-17 17:45
updated: 2026-08-17 17:45
---
# 4+1ビューモデル

ソフトウェアアーキテクチャを、単一の図ではなく複数の並行するビュー(視点)で記述するモデル。1995年11月にPhilippe Kruchtenが提唱した。複雑なシステムを、エンドユーザー・開発者・システムエンジニア・プロジェクトマネージャーといった異なる利害関係者の視点から描写するために作られた。

## 5つのビュー

「4つのビュー」+「シナリオ」という構成になっている。

- **Logical View(論理ビュー)** — エンドユーザーに提供する機能。クラス図・状態図などのUML図で表現される。
- **Process View(プロセスビュー)** — システムの動的側面。プロセス間通信・実行時の振る舞い。シーケンス図などで表現される。
- **Development View(開発ビュー)** — プログラマー視点のソフトウェア管理。パッケージ図・コンポーネント図で表現される。
- **Physical View(物理ビュー)** — システムエンジニア視点。物理層上のコンポーネントのトポロジー。デプロイメント図で表現される。
- **Scenarios(シナリオ)** — 「+1」の5番目のビュー。ユースケース・相互作用の流れを使い、上記4つのビューの妥当性を検証する役割を持つ。

## 特徴

特定の表記法・ツール・設計手法に縛られない汎用的なモデルであり、UML以外の記法でも表現できる。

## [[arc42]]との関係

[[arc42]]はより実践的・ミニマルなテンプレートで、4+1ビューモデルと比べてドキュメントが肥大化しにくい構成になっている。arc42のBuilding Block View/Runtime View/Deployment Viewは、4+1ビューモデルのDevelopment View/Process View/Physical Viewにそれぞれ近い関心事を扱う。

## 出典

- [4+1 architectural view model - Wikipedia](https://en.wikipedia.org/wiki/4%2B1_architectural_view_model)
- [Architectural Blueprints: The 4+1 View Model of Software Architecture (arXiv)](https://arxiv.org/abs/2006.04975)

#software-engineering
