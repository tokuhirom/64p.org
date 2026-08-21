---
created: 2026-08-22 07:28
updated: 2026-08-22 07:28
---
# TLSフィンガープリンティング

TLSハンドシェイクの構造（ClientHelloの内容）だけから、通信相手のクライアント実装（ブラウザの種類・バージョンやHTTPライブラリなど）を、HTTPヘッダ等アプリケーション層のデータを一切見ずに識別する技術。同じTLSライブラリ・同じバージョンの実装は、暗号スイートや拡張機能の並び順・組み合わせがほぼ同一になる性質を利用する。

## JA3

Salesforceが公開した最初期の実装。ClientHelloから次の5フィールドを10進数のバイト値で取り出し、`SSLVersion,Cipher,SSLExtension,EllipticCurve,EllipticCurvePointFormat`の順にカンマ・ハイフン区切りで連結した文字列をMD5ハッシュ化し、32文字の16進数フィンガープリントを得る。

- 例: `769,47-53-5-10-...,...,...,...` → `ada70206e40642a3e4461f35503241d5`
- 検出回避を狙ったGoogleの"GREASE"拡張は無視して計算する

## JA4

FoxIOが開発したJA3の後継。`a_b_c`形式でフィンガープリントを複数セクションに分割し、部分一致検索も可能にした。

- **暗号スイート・拡張機能をソートしてから計算する**点がJA3との大きな違い。ブラウザ側が検出回避や2023年のChromium更新で拡張機能の順序をランダム化するようになったため、順序に依存しないJA3では精度が落ちる問題に対応した
- 署名アルゴリズムの情報も追加し、堅牢性を高めている
- ファミリーとして、TLSサーバー応答向けの**JA4S**、HTTPクライアント向けの**JA4H**、X.509証明書向けの**JA4X**、TCPクライアント向けの**JA4T**、SSHトラフィック向けの**JA4SSH**、DHCP向けの**JA4D**などが存在し、TLS以外の層のフィンガープリンティングにも応用されている

## 使われどころ

- BOT検知・スクレイピング対策: 「User-AgentはChromeを名乗っているのに、TLSフィンガープリントはPythonの`requests`(OpenSSLデフォルト)のものだった」というように、UAとTLSフィンガープリントの不一致からなりすましを検出する。CloudflareやAkamaiなどのボット対策製品で使われる
- ネットワークセキュリティにおけるマルウェア・C2通信の識別（TLS内部のペイロードが暗号化されていても、ハンドシェイクの特徴だけで既知の攻撃ツールを識別できる場合がある）
- [[rama]]のようなプロキシ/クライアントフレームワークは、フィンガープリンティング機能自体を提供したり、逆にブラウザのフィンガープリントを模倣してBOT検知を回避する目的でも使われる

## 出典

- [salesforce/ja3 - GitHub](https://github.com/salesforce/ja3)
- [FoxIO-LLC/ja4 - GitHub](https://github.com/FoxIO-LLC/ja4)
- [JA3/JA4 TLS Fingerprinting Guide for Web Scraping - Scrapfly](https://scrapfly.io/blog/posts/ja3-ja4-tls-fingerprinting-guide-to-detection-and-evasion)

#networking #security #tls
