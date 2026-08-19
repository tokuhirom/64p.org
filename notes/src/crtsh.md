---
created: 2026-08-19 12:48
updated: 2026-08-19 12:48
---
# crt.sh

[[certificate-transparency|Certificate Transparency]]ログを横断的にインデックス化して検索できる、Sectigoが運営する無料の検索サービス。PostgreSQLベースのバックエンドがCTログを継続的に監視し、新規発行された証明書を取り込む。もっとも広く使われている公開CTログ検索エンジン。 #security #pki #osint

## 検索方法

- ドメイン名・組織名・SHA-1/SHA-256フィンガープリント・crt.sh IDなどで検索できる。
- APIキー不要、レート制限なし。クエリに`?output=json`を付けるとJSON形式で結果が返る。

```
# サブドメイン検索
https://crt.sh/?q=%25.{domain}&output=json

# 完全一致
https://crt.sh/?q={domain}&output=json

# 部分一致(ワイルドカード)
https://crt.sh/?q=%25{keyword}%25&output=json
```

レスポンスの`name_value`フィールドに証明書のCN/SAN(記載されたホスト名)が入っているため、ここを抽出・重複排除するとサブドメイン一覧が得られる。

## 用途

CTの「証明書にホスト名を含めなければならない」という副作用を利用して、DNSスキャンでは見つからないサブドメイン・内部ホスト名を発見できる。ワイルドカード証明書やマルチSAN証明書は特に多くのホスト名を一度に晒す。

- **防御側**: 自組織のアタックサーフェス調査・資産棚卸し、勝手に発行された証明書がないかの監視(shadow IT検知)
- **攻撃側/OSINT**: ペネトレーションテストや偵察フェーズでのサブドメイン列挙

## [[ct-monitoring-tools|CTログ監視・検索ツール]]の中での位置づけ

過去分も含めた蓄積データにクエリを投げる「検索型」ツール。新規発行をリアルタイムで捕捉したい場合は[[certstream|CertStream]]や[[gungnir|Gungnir]]のような「プッシュ型」ツールを使う。

## 出典

- [crt.sh Has a Free API — Find Every SSL Certificate for Any Domain - DEV Community](https://dev.to/0012303/crtsh-has-a-free-api-find-every-ssl-certificate-for-any-domain-3ph7)
- [crt.sh Review | OSINTBench](https://osintbench.com/tools/crt-sh-certificate-transparency-log-search/)
