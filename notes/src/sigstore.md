---
created: 2026-09-02 20:50
updated: 2026-09-02 22:18
---
# Sigstore

ソフトウェアアーティファクトの署名・検証を、長期保管する秘密鍵なしで行えるようにする [[openssf|OpenSSF]] のプロジェクト群。 #security #supply-chain-attack #signing

## 解こうとしている問題

従来のコード署名(GPGなど)は、秘密鍵を長期間安全に保管し、公開鍵を利用者に配布し、失効を管理する必要があった。この運用コストの高さが、OSSでの署名普及を阻んできた。Sigstoreの答えは「**鍵ではなくアイデンティティに署名を紐づけ、鍵は数分で捨てる**」というもの。

## 構成要素

- **Cosign** — OCIアーティファクト(コンテナイメージ)やファイルへの署名・検証を行うCLI。署名をレジストリ上にイメージと並べて格納する。
- **Fulcio** — 短命な証明書を発行する無料のCA。OIDCで認証されたアイデンティティ(GitHub Actionsのワークフロー識別子、Googleアカウントなど)と一時鍵を結びつけた証明書を発行する。有効期限は10分程度。
- **Rekor** — 署名の[[transparency-log|透明性ログ]]。誰がいつ何に署名したかが追記専用のログに記録され、後から監査できる。[[certificate-transparency|Certificate Transparency]]のソフトウェア署名版と考えるとわかりやすい。

信頼の起点(Fulcioのルート証明書、Rekorの公開鍵)は [[tuf|TUF (The Update Framework)]] 経由で配布される。

## keyless署名の流れ

1. 署名者がOIDCで認証する(CIならワークロードアイデンティティ、人間ならブラウザ経由のOIDCフロー)
2. その場で鍵ペアを生成し、Fulcioが「このアイデンティティがこの公開鍵を持つ」という短命証明書を発行
3. その鍵でアーティファクトに署名し、署名・証明書をRekorに記録
4. **秘密鍵を破棄する**

秘密鍵の寿命が数分しかないので、盗まれても署名済み証明書の有効期限外では使えない。「その署名がいつ行われたか」の証明はRekorのログエントリが担う。

## 検証側から見ると

検証時に問うのは「この鍵の署名か」ではなく「**このアイデンティティによる署名か**」になる。

```sh
cosign verify \
  --certificate-identity-regexp='https://github\.com/myorg/myrepo/\.github/workflows/.*' \
  --certificate-oidc-issuer='https://token.actions.githubusercontent.com' \
  ghcr.io/myorg/myimage:v1.0.0
```

「myorg/myrepo のGitHub Actionsワークフローがビルドしたイメージだけを受け入れる」というポリシーが、鍵を配布せずに書ける。

## 使われている場所

[[chainguard|Chainguard]]のコンテナイメージ、Kubernetes本体のリリース、npm の provenance、[[slsa|SLSA]] provenance の署名など。Sigstoreは [[slsa|SLSA]] Build Level 2以上で要求される「署名されたprovenance」の実装手段としてよく使われる。

## 出典

- [Sigstore documentation](https://docs.sigstore.dev/cosign/signing/overview/)
- [sigstore/cosign (GitHub)](https://github.com/sigstore/cosign)
- [Scaling Up Supply Chain Security: Implementing Sigstore (OpenSSF)](https://openssf.org/blog/2024/02/16/scaling-up-supply-chain-security-implementing-sigstore-for-seamless-container-image-signing/)
