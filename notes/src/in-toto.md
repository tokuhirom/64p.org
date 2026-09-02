---
created: 2026-09-02 22:18
updated: 2026-09-02 22:18
---
# in-toto

ソフトウェアサプライチェーンの各工程が「誰によって、何を入力に、何を出力して」実行されたかを検証可能にするフレームワーク。CNCFのプロジェクトで、2019年にsandbox入り、2023年にgraduated。 #security #supply-chain-attack #ci-cd

## 発想

ソフトウェアの完成品だけを署名しても、「そこに至るまでの工程が正しかったか」は分からない。in-totoは工程そのものを検証対象にする。

- **layout** — プロジェクトのオーナーが書く「あるべき工程の定義」。どのステップが、どの順で、誰(functionary)によって実行されるべきかと、各ステップの入出力の制約を宣言する。
- **link metadata** — 各ステップの実行者が実際に生成する記録。使ったコマンド、入力(materials)、出力(products)のハッシュが入り、実行者の鍵で署名される。
- 検証時に layout と link を突き合わせ、「宣言された工程どおりに実行され、あるステップの出力が次のステップの入力になっている」ことをチェーンとして確認する。

## in-toto Attestation Framework

近年よく目にするのはこちら。「あるアーティファクトについての、署名された主張」を表現する汎用フォーマットで、中身は以下の構造を取る。

```json
{
  "_type": "https://in-toto.io/Statement/v1",
  "subject": [{"name": "myimage", "digest": {"sha256": "abc..."}}],
  "predicateType": "https://slsa.dev/provenance/v1",
  "predicate": { "...": "主張の中身" }
}
```

- **subject** — 何についての主張か(アーティファクトとそのダイジェスト)
- **predicateType** — 主張の種類を示すURI
- **predicate** — 種類ごとに定義された中身

この `predicate` を差し替えることで、[[slsa|SLSA]] provenance、[[sbom|SBOM]]、[[vex|VEX]]、テスト結果、スキャン結果など何でも表現できる。「アーティファクトについての主張の入れ物」を統一したことが、このフレームワークが広く採用された理由。

署名は DSSE (Dead Simple Signing Envelope) というエンベロープで包み、実際の署名・透明性ログへの記録は [[sigstore|Sigstore]] が担うのが定番の組み合わせ。

## SLSAとの関係

[[slsa|SLSA]] は「何をどこまでやればどのレベルか」という要件を定め、in-toto Attestation は「その証拠をどう表現するか」というフォーマットを担う。SLSA provenance は in-toto Attestation の predicate のひとつとして定義されている。

## 出典

- [in-toto/attestation (GitHub)](https://github.com/in-toto/attestation)
- [in-toto/in-toto (GitHub)](https://github.com/in-toto/in-toto)
- [Unleashing in-toto: The API of DevSecOps (CNCF Blog)](https://www.cncf.io/blog/2023/08/17/unleashing-in-toto-the-api-of-devsecops/)
- [SLSA • in-toto and SLSA](https://slsa.dev/blog/2023/05/in-toto-and-slsa)
