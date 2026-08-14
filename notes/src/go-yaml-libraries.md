---
created: 2026-08-15 06:50
updated: 2026-08-15 06:50
---
# GoのYAMLライブラリ事情

長年デファクトだった `gopkg.in/yaml`（`go-yaml/yaml`、作者Gustavo Niemeyer氏、7k stars超）が2025年4月1日にアーカイブされ、read-only化した。作者本人は「2010年から10年以上メンテしてきたが、個人・職業両面で自由時間が限られてきた。小規模グループへの引き継ぎは不可能で、悪用・不安定化のリスクがある」と説明している。

これを受けて乗り換え先が2系統に分かれた。

## goccy/go-yaml

- 2019年登場の後発ライブラリ（作者 @goccy 氏の個人プロジェクト）
- libyaml移植ではなく、YAML仕様ベースでGoからスクラッチ実装
- Goらしいインターフェース
- YAML Test Suite網羅率が高い（`gopkg.in/yaml.v3`比+60ケース、88% vs 73%、2024年12月時点）
- comment/anchorを保持したreversibleな変換、YAML Path、リッチなエラー表示が特徴

## go.yaml.in（YAML公式org継承フォーク）

- `go-yaml/yaml`作者Niemeyer氏との協議の末、YAML公式チームが正式にフォーク・継承
- 主要ダウンストリームプロジェクトの代表者を含むメンテナーチームを編成
- import pathは `go.yaml.in/yaml/v4`
- v1〜v3は凍結・セキュリティ修正のみとし、`gopkg.in/yaml.vX`からの移行を容易にする設計。新機能はすべてv4で開発
- v4では`Marshal`/`Unmarshal`に代わり`Load`/`Dump`という命名を採用（PyYAML等他言語との一貫性を意識）
- Kubernetes（2025-06-26付けで正式採用）・Prometheusが既に移行済み

## 現状の使い分けの目安

- 公式後継への安定した移行を求めるなら `go.yaml.in/yaml/v4`。Kubernetesという最大級の実績があり、`gopkg.in/yaml.v3`からの移行コストが低い
- 仕様準拠度・エラーメッセージの質・新機能を重視するなら `goccy/go-yaml`。個人プロジェクトゆえのメンテナンス継続性は留保点だが、Kubernetes公式採用でエコシステム全体の不安はやや緩和された
- 新規プロジェクトで理由なく`gopkg.in/yaml.v2`/`v3`を使い続けるのは避けたほうがよい（アーカイブ済みで更新されない）

## 考えたこと

songmuさんの記事をきっかけに調べた。songmuさんは記事内で「引き続き`goccy/go-yaml`を使い、推していく」と結論づけていた。個人的にも、公式org継承版が出た今もgoccyが仕様準拠度やエラーメッセージの質で優位という点は引き続き注目に値すると感じた。

songmuさんのブログ記事:

https://songmu.jp/riji/entry/2025-06-26-go-yaml.html

#golang #yaml

## 出典

- [gopkg.in/yaml のアーカイブと乗換先やメンテナンス継承議論 | songmu.jp](https://songmu.jp/riji/entry/2025-06-26-go-yaml.html)
- [GitHub - go-yaml/yaml（アーカイブ済み）](https://github.com/go-yaml/yaml)
- [GitHub - yaml/go-yaml: The YAML org maintained fork](https://github.com/yaml/go-yaml)
- [go.yaml.in/yaml/v4 - Go Packages](https://pkg.go.dev/go.yaml.in/yaml/v4)
- [A maintained YAML library for Go again! - zerokspot.com](https://zerokspot.com/weblog/2026/02/07/maintained-golang-yaml-library/)
- [GitHub - goccy/go-yaml](https://github.com/goccy/go-yaml)
