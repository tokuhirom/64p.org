---
created: 2026-09-02 20:50
updated: 2026-09-02 22:18
---
# SBOM (Software Bill of Materials)

ソフトウェアに含まれるコンポーネント(ライブラリ、パッケージ、バージョン、ライセンス、依存関係)を機械可読な形で列挙したもの。製造業の「部品表(BOM)」のソフトウェア版。 #security #supply-chain-attack

## 何のためにあるのか

Log4Shell (CVE-2021-44228) のとき、多くの組織が最初に困ったのは脆弱性の修正ではなく「**自社のどの製品にlog4jが入っているのか分からない**」ことだった。SBOMは、この問い(影響範囲の特定)に即答できる状態を作るためのもの。

用途は大きく3つ。

- **脆弱性対応** — 新しいCVEが出たとき、影響を受ける成果物を検索で特定する
- **ライセンスコンプライアンス** — 何のライセンスのコードが入っているかを把握する
- **調達要件への対応** — 納品物にSBOMを添付することを契約で求められるケースが増えている

## 主要フォーマット

| | SPDX | CycloneDX |
|---|---|---|
| 策定 | Linux Foundation | OWASP |
| 標準化 | ISO/IEC 5962:2021 | ECMA-424 (2024年) |
| 出自 | ライセンスコンプライアンス | アプリケーションセキュリティ |
| 得意 | ライセンス式の表現力が高い | VEX をネイティブサポート、脆弱性管理向き |

どちらも米国大統領令14028に基づくNTIAの「最小要素」を満たす。実務では、必要に応じて両方を出力して相手の希望する方を渡す、というのが摩擦が少ない。

## 生成の仕方

- **ビルド時に生成する** — ビルドシステムが依存グラフを正確に知っているので最も正確。[[wolfi|Wolfi]]のmelangeや、[[chainguard|Chainguard]]のイメージはこの方式。
- **成果物からスキャンして生成する** — `syft` などでコンテナイメージやディレクトリを走査する。後付けで作れるが、静的リンクやvendoringされたコードは取りこぼしやすい。

```sh
# コンテナイメージからSPDX形式のSBOMを生成
syft ghcr.io/myorg/myimage:v1.0.0 -o spdx-json > sbom.spdx.json
# SBOMを入力に脆弱性スキャン
grype sbom:./sbom.spdx.json
```

## VEX との関係

SBOMは「何が入っているか」しか言わない。そのため「入ってはいるが、該当のコードパスを呼んでいないので影響を受けない」といった判断は表現できない。これを補うのが **[[vex|VEX]] (Vulnerability Exploitability eXchange)** で、CVEごとに「影響あり/なし/調査中」とその根拠を述べる。SBOMとVEXは補完関係にある。なお、SBOM自体を「アーティファクトについての署名された主張」として流通させる場合は、[[in-toto|in-toto Attestation]]のpredicateとして包むのが定番。

## 限界

- **SBOMがあっても直せるわけではない** — 影響範囲が分かるだけで、修正コストは別の話。
- **粒度と正確さがツール依存** — 同じイメージを別のツールでスキャンすると別のSBOMが出ることは珍しくない。
- **配布・保管の運用が要る** — 成果物のバージョンごとにSBOMを保管し、後から引ける状態にしておかないと役に立たない。

## 出典

- [Guide To Standard SBOM Formats (Wiz)](https://www.wiz.io/academy/application-security/standard-sbom-formats)
- [SPDX / CycloneDX standards (OpenSSF)](https://openssf.org/tag/spdx-cyclonedx-standards/)
