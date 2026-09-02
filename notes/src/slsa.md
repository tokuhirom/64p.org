---
created: 2026-09-02 20:50
updated: 2026-09-02 22:18
---
# SLSA (Supply-chain Levels for Software Artifacts)

ビルドパイプラインのセキュリティ成熟度を段階的なレベルで表現するフレームワーク。読みは「サルサ」。[[openssf|OpenSSF]]傘下のプロジェクトで、Googleが社内で使っていた Binary Authorization for Borg の考え方が原型。 #security #supply-chain-attack #ci-cd

## 何のためのものか

[[supply-chain-attack|サプライチェーン攻撃]]の多くは「ソースコードは正しいのに、ビルド過程で何かが混入する」という形を取る。SLSAは、**成果物がどう作られたかを機械可読な形で証明する(provenance)** ことと、**そのビルド環境がどれだけ改竄に強いか**を、生産者と消費者の共通言語として定義する。

## Build トラックのレベル

v1.0では Build トラックのL0〜L3が定義されている(旧版のLevel 4とソース関連の要件は将来版に先送りされた)。

| レベル | 要件 | 意味 |
|---|---|---|
| **L0** | なし | provenanceがない |
| **L1** | provenanceが存在する | 署名されていなくてよい。事故は防げるが偽造は容易 |
| **L2** | ホスト型ビルドプラットフォームがprovenanceを生成し**署名**する | 個人のワークステーションではなくGitHub Actionsのようなホスト型基盤で動く。偽造には設定ミスではなく明示的な攻撃が必要になる |
| **L3** | ビルドプラットフォームが強い改竄耐性を持つ | ビルド同士が隔離され、署名鍵はユーザー定義のビルドステップから触れない。認証情報の漏洩や内部犯行によるビルド時改竄を防ぐ |

L2とL3の分かれ目は「**署名鍵にビルドステップが触れるか**」。ユーザーが書いたビルドスクリプトから署名鍵にアクセスできてしまうと、任意のprovenanceを偽造できるため、L3では鍵をビルド実行環境の外に置くことが求められる。

## provenance の中身

「どのソース(コミットハッシュ)を、どのビルダーが、どのパラメータで、いつビルドしたか」を記述したドキュメント。[[in-toto|in-toto Attestation]] の形式で表現され、[[sigstore|Sigstore]]で署名されることが多い。

## 実際にどう満たすか

- **GitHub Actions**: `slsa-framework/slsa-github-generator` を使うと、reusable workflow側で署名を行うことでL3相当を満たせる。
- **npm**: `npm publish --provenance` でGitHub Actionsからのpublish時にprovenanceが付き、npmjs.com上に「Provenance」として表示される。
- **[[chainguard|Chainguard]]**: Chainguard Factory でビルドされる成果物はSLSA Build Level 3を主張している。

## 出典

- [SLSA • Security levels (v1.0)](https://slsa.dev/spec/v1.0/levels)
- [SLSA • What's new in SLSA v1.0](https://slsa.dev/spec/v1.0/whats-new)
