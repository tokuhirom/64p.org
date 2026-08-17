---
created: 2026-08-17 12:14
updated: 2026-08-17 12:14
---
# IDOR（Insecure Direct Object Reference）

データベースキー・ファイル名・レコードIDなど内部のオブジェクト参照値をアプリケーションがそのままURLやリクエストパラメータに露出し、リクエスト元がそのオブジェクトへアクセスする権限を持っているかをサーバー側で検証していない場合に生じるアクセス制御の脆弱性。[[owasp|OWASP]]の2007年版Top Tenで広まった用語。

## 典型例

`/api/users/123/profile`のようなURLで、ログイン中のユーザーがパスパラメータの`123`を`124`に書き換えるだけで他人のプロフィールを閲覧・改ざんできてしまうケース。連番のID、ファイル名、注文番号などが対象になりやすい。

## 原因

認証（authentication、「誰であるか」の確認）は通っているが、認可（authorization、「そのリソースにアクセスしてよいか」の確認）のチェックがオブジェクト単位で漏れていること。サーバーがクライアントから送られてきたIDを「存在するかどうか」だけで処理し、「リクエストした本人がそのIDのリソースにアクセスする権限を持つか」を確認していない点が本質。

## OWASP Top 10における位置づけ

[[owasp-top-10|OWASP Top 10]]では、より広いカテゴリである「A01: Broken Access Control（認可の不備）」の一種として扱われる。API文脈での対応物として、[[owasp-api-security-top-10|OWASP API Security Top 10]]でAPI1:2023に位置づけられる[[bola|BOLA（Broken Object Level Authorization）]]がある。BOLAはIDORの考え方をAPIのオブジェクトレベル認可に特化させたカテゴリという関係。

## 対策

- サーバー側で、リクエストされたオブジェクトに対してそのユーザーがアクセス権を持つかを毎回検証する（認可チェックをアクセス制御レイヤーに一元化し、各エンドポイントで個別に実装漏れが起きないようにする）。
- 推測しやすい連番IDではなく、UUID(v4)のようなランダムな識別子を使う。ただし、これは列挙攻撃を難しくする多層防御であり、認可チェックそのものの代替にはならない。
- セッション/トークンから特定したユーザーが所有・許可されたリソースのみを返す設計にする。

## 関連

- [[owasp-wstg|WSTG]] — Authorization Testingのカテゴリに、IDORのテスト手順（`WSTG-ATHZ-04` Testing for Insecure Direct Object References）が含まれる。
- [[owasp-cheat-sheet-series|OWASP Cheat Sheet Series]] — "Insecure Direct Object Reference Prevention Cheat Sheet"として対策の実装指針が用意されている。
- [[ai-agent-gym-booking-hack]] — AIエージェントがBOLA/IDOR系の脆弱性を自ら発見・悪用してしまった事例。

## 出典

- [Insecure direct object references (IDOR) | Web Security Academy](https://portswigger.net/web-security/access-control/idor)
- [Insecure Direct Object Reference (IDOR) | OWASP Foundation](https://owasp.org/www-community/attacks/insecure_direct_object_reference)
- [Insecure Direct Object Reference Prevention - OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html)
- [Testing for Insecure Direct Object References (IDOR) - OWASP WSTG](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/04-Testing_for_Insecure_Direct_Object_References)

#security
