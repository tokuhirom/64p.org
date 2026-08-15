---
created: 2026-08-15 23:34
updated: 2026-08-15 23:34
---
# JMAP (JSON Meta Application Protocol)

メール・カレンダー・連絡先などのデータをクライアントとサーバー間で同期するために設計されたJSON/HTTPベースのプロトコル。IMAP・SMTP・CardDAV・CalDAVを置き換えることを目指すIETF標準。設計の中心となったのはFastmailで、自社のWebクライアントとサーバー間で使っていた内製JSONプロトコルの知見をIETFワーキンググループに持ち込む形で標準化された。

## 仕様の構成

- **RFC 8620 (JMAP Core)** — データ型に依存しない汎用的な通信の仕組みを定義。
- **RFC 8621 (JMAP for Mail)** — Coreの上にメール固有のデータモデルを定義した拡張仕様(2019年8月公開)。
- 他にもContacts、Calendars、Sharing(RFC 9670)、WebSocket(RFC 8887)などの拡張がある。

## RFC 8620: Coreの仕組み

- **セッションリソース** — 認証済みGETで取得する`Session`オブジェクトに、APIエンドポイント、アップロード/ダウンロードURL、push用URL、アカウント一覧などが含まれる。
- **メソッド呼び出しのバッチ化** — 1回のHTTP POSTに`[メソッド名, 引数, 呼び出しID]`という配列を複数まとめて送れる。サーバーは順番に処理するため往復回数を削減できる。
- **バックリファレンス/結果参照** — 前の呼び出し結果(JSON Pointerで指定)を後続呼び出しの引数として使える。例えば「新規メールボックスを作成→そのIDでメールを検索」を1リクエストで完結できる。
- **push通知** — EventSource(Server-Sent Events)やWebPushで、サーバー側の状態変化(`StateChange`)を即座にクライアントへ通知。ポーリング不要。
- **バイナリのアップロード/ダウンロード** — 添付ファイル等はJSON構造から分離し、専用エンドポイントで`blobId`を介してやり取りする。
- **マルチアカウント対応** — 1セッションで複数アカウント(個人用・共有アカウント等)にアクセス可能。

## RFC 8621: Mail拡張のデータモデル

- **Mailbox** — フォルダ/ラベル相当。親子関係を持つ木構造で、`role`属性で受信箱等の役割を識別。
- **Email** — メッセージ本体。生MIME構造だけでなく、テキスト/HTML/添付ファイルを平坦化したビューでも取得でき、クライアント側でのMIMEパース負担を減らしている。
- **Thread** — 関連メッセージのグルーピング。
- **Identity / EmailSubmission** — 送信元アドレスの管理と送信操作(遅延送信含む)。
- **VacationResponse** — 自動応答(不在通知)設定。

各データ型には`get`/`set`/`changes`/`query`/`queryChanges`という統一されたCRUD/差分取得メソッド群があり、これがJMAP全体の設計原則(データ型ごとに一貫したAPI形状)になっている。IMAPとの互換性を保つため、`$seen`や`$flagged`などIMAP標準キーワードもそのまま踏襲している。

## IMAPとの比較

Fastmail側が挙げている比較として、以下がある。

- 実機計測でIMAPの2〜3倍省電力。
- 大きめメールボックスの再同期で通信量が2.9MB→13.1KBまで削減。
- 仕様書のボリュームがIMAP(約27万語)に対しJMAPは約5.1万語と大幅に小さい。
- HTTP/TLS・JSON・OAuth2という既存インフラにそのまま乗る設計で、nginxやCDN等の汎用HTTPツールが使い回せる。

## 実装・普及状況

サーバー側実装としては、Fastmailのエンジニアが開発しているCyrus IMAP、Apache James、JMAPをコアに据えたStalwart Mail Serverなどがある。

一方で2023年頃のHacker Newsの議論では「Fastmail以外での採用がほぼゼロ」という指摘もあり、規格自体は2019年に標準化されたものの、実運用でのシェアはIMAPに比べればまだ限定的、という見方もある。

## 出典

- [JSON Meta Application Protocol Specification (JMAP)](https://jmap.io/)
- [JMAP Software Implementations](https://jmap.io/software/)
- [JSON Meta Application Protocol (JMAP) :: Apache James](https://james.staged.apache.org/james-project/3.9.0/concepts/protocols/jmap.html)
- [RFC 8621: The JSON Meta Application Protocol (JMAP) for Mail](https://www.rfc-editor.org/rfc/rfc8621.html)
- [RFC 8620 - The JSON Meta Application Protocol (JMAP)](https://datatracker.ietf.org/doc/html/rfc8620)
- [We're Making Email More Modern With JMAP | Fastmail](https://www.fastmail.com/blog/jmap-new-email-open-standard/)
- [The fact that JMAP has ~zero adoption outside Fastmail... | Hacker News](https://news.ycombinator.com/item?id=36128468)

#jmap #imap #email #rfc #ietf
