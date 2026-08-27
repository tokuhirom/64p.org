---
created: 2026-08-27 21:59
updated: 2026-08-27 21:59
---
# CBOR (Concise Binary Object Representation)

RFC 8949で定義されたバイナリシリアライゼーション形式。JSONの成功したデータモデル(数値・文字列・配列・マップ・真偽値・null)を土台に、スキーマなしで自己記述的にバイナリエンコードする。2020年発行のRFC 8949は2013年のRFC 7049を置き換えたもので、相互運用性を保ったまま編集上の改善・詳細追加・正誤修正を加えている。

## 設計目標

- 極めて小さい実装コードサイズ
- 比較的小さいメッセージサイズ
- バージョンネゴシエーション不要な拡張性

これらの目標により、ASN.1のような従来のバイナリシリアライゼーションとは異なる設計になっている。[[messagepack|MessagePack]]が「コンパクトさ最優先・自己記述性は二の次」という設計思想であるのに対し、CBORはMessagePackの発想を拡張しつつ、バイト文字列・日付・多倍長整数(bignum)・型付き配列といった追加のデータ型をタグ機構でネイティブサポートする。

## スキーマフリー形式とスキーマ駆動形式の違い

- **スキーマフリー・自己記述的**([[messagepack|MessagePack]]、CBOR、JSON) — 型情報をデータ自体に埋め込むため、事前にスキーマを知らなくてもパースできる。
- **スキーマ駆動**([[protocol-buffers|Protocol Buffers]]) — `.proto`で定義したスキーマに基づいてフィールド名を省略してエンコードするため、外部にスキーマ定義がないとデータの意味を復元できない。ペイロードはさらに小さく・パースも速いが、自己記述性を犠牲にしている。

## 採用事例

- **COSE (CBOR Object Signing and Encryption)** — WebAuthn/FIDO2のCTAP仕様で使われる署名・鍵表現の標準。認証器が返す`attestationObject`内の公開鍵はCOSE Key形式(CBORベース)で格納される。RFC 8812がWebAuthn/CTAPで使うアルゴリズムのCOSE登録を定義している。
- **[[tailcat|Tailcat]]** の接続トークン(ConnBlob) — サーバーの公開鍵・DERPリージョン情報をCBORでエンコードし、`tc`プレフィックス+base64にしたものをトークンとして発行している。

#serialization #protocol

## 出典

- [CBOR — Concise Binary Object Representation | Overview](https://cbor.io/)
- [RFC 8949 - Concise Binary Object Representation (CBOR)](https://datatracker.ietf.org/doc/html/rfc8949)
- [RFC 8812 - CBOR Object Signing and Encryption (COSE) and JSON Object Signing and Encryption (JOSE) Registrations for Web Authentication (WebAuthn) Algorithms](https://datatracker.ietf.org/doc/rfc8812/)
- [WebAuthn pubKeyCredParams & credentialPublicKey: CBOR & COSE - Corbado](https://www.corbado.com/blog/webauthn-pubkeycredparams-credentialpublickey)
