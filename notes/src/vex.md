---
created: 2026-09-02 22:18
updated: 2026-09-02 22:18
---
# VEX (Vulnerability Exploitability eXchange)

「この製品には確かにその脆弱なコンポーネントが入っているが、実際には悪用可能ではない」といった判断を、ベンダーが機械可読な形で表明するためのフォーマット。 #security #supply-chain-attack

## 何を解決するか

[[sbom|SBOM]]とスキャナを組み合わせると、大量のCVEが報告される。しかしその多くは、

- 脆弱なコードパスをそもそも呼んでいない
- 該当機能をビルド時に無効化している
- 攻撃者が到達できない場所にある

といった理由で実際には影響がない。この「影響しない理由」を人間が問い合わせのたびに説明するのは持たないので、ベンダー側から先回りして機械可読に出す、というのがVEXの発想。

## 4つのステータス

1つのVEXステートメントは、ある製品とあるCVEの組に対して、次の4つのうち**ちょうど1つ**を割り当てる。

| ステータス | 意味 |
|---|---|
| `not_affected` | 影響を受けない |
| `affected` | 影響を受ける。対処法の記述が求められる |
| `fixed` | 修正済み |
| `under_investigation` | 調査中 |

`not_affected` の場合は、**justification**(定型的な理由コード)か **impact_statement**(自由記述)のどちらかを必ず添える必要がある。justification には「component_not_present」「vulnerable_code_not_present」「vulnerable_code_not_in_execute_path」「vulnerable_code_cannot_be_controlled_by_adversary」「inline_mitigations_already_exist」といった値が定義されている。

## フォーマットの選択肢

- **CSAF (VEXプロファイル)** — OASISの Common Security Advisory Framework。エンタープライズ・政府系のアドバイザリ流通で使われる。表現力は高いが重い。
- **CycloneDX VEX** — CycloneDX BOMファミリにネイティブに組み込まれている。SBOMと同じドキュメント内に書ける。
- **OpenVEX** — OSSコミュニティ発の最小仕様。CISAの最小要件文書と並行して策定されたため、要件との対応が最も明快。

CISAが2023年4月に「Minimum Requirements for VEX」v1.0.0を公開しており、どのフォーマットを使うにせよこれを満たすことが基準になる。

## 実務上の位置づけ

VEXは「スキャナの結果を黙らせる」ための道具ではなく、**判断とその根拠を文書として残し、流通させる**ための道具。裏を返すと、判断を下す人間の工数は減らない。[[chainguard|Chainguard]]のように「そもそも余計なコンポーネントを入れない」アプローチは、VEXを書く必要自体を減らす方向の対策と言える。

## 出典

- [Minimum Requirements for Vulnerability Exploitability eXchange (VEX) — CISA](https://www.cisa.gov/sites/default/files/2023-04/minimum-requirements-for-vex-508c.pdf)
- [VEX Status Justification Document — CISA](https://www.cisa.gov/resources-tools/resources/vulnerability-exploitability-exchange-vex-status-justification-document-june-2022)
- [OpenVEX Specification](https://github.com/openvex/spec)
