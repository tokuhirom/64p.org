---
created: 2026-08-19 12:48
updated: 2026-09-02 22:18
---
# Certificate Transparency (CT)

CA(認証局)が発行したTLS証明書の発行記録を、改ざん検知可能な形で公開・監視するための仕組み。現行仕様は**RFC 9162**(Certificate Transparency Version 2.0)で、2021年12月に旧**RFC 6962**を置き換えた。CAが単独で不正な証明書を発行しても、CTログに載ることで第三者が検知できるようにするのが目的。[[transparency-log|透明性ログ]]という一般的な仕組みの、最も成功した実例でもある。 #security #pki

## 仕組み

- 証明書がCTログ(append-onlyな**Merkle木**構造のデータベース)に投稿されると、ログは**SCT(Signed Certificate Timestamp)**を返す。SCTは「この証明書をMerkle木に追加すると約束する」というログの署名付きレシートで、ブラウザはSCTを検証することでその証明書がCTログに登録済みであることを確認できる。
- **monitor**(監視者)がログの内部一貫性を検証し、**auditor**が**STH(Signed Tree Head)**――Merkle木のルートハッシュのスナップショット――を突き合わせる「gossip」を行うことで、ログが過去の履歴を改ざん(append-only性への違反)していないかを検知する。
- CTログは肥大化するため、時間単位の「シャード」に分割して運用されるのが一般的。
- 複数の主要CAは自身でもCTログを運用している。[[lets-encrypt|Let's Encrypt]]は「Sycamore」「Willow」「Twig」という複数のCTログを運用し、発行した証明書を複数の独立したログへ冗長的に投稿している。

## 副作用としての情報漏洩

証明書には対象ホスト名(CN/SAN)を記載する必要があるため、CTログを検索するとDNSスキャンでは見つからないサブドメインや内部ホスト名が判明することがある。ワイルドカード証明書やマルチSAN証明書は特に多くのホスト名を一度に晒すことになる。このCTログを検索・監視するための[[ct-monitoring-tools|各種ツール]]は、自組織のアタックサーフェス調査からOSINT/ペネトレーションテストでのサブドメイン列挙まで幅広く使われている。

## 出典

- [What Is Certificate Transparency? | Sectigo](https://www.sectigo.com/blog/what-is-certificate-transparency)
- [Certificate Transparency (CT) Logs - Let's Encrypt](https://letsencrypt.org/docs/ct-logs/)
- [RFC 9162: Certificate Transparency Version 2.0](https://www.rfc-editor.org/rfc/rfc9162.html)
