---
created: 2026-08-16 23:06
updated: 2026-08-16 23:15
---
# Argon2id

パスワードハッシュ関数Argon2の3つのバリアント(Argon2d / Argon2i / Argon2id)のうちの1つ。Argon2d(データ依存メモリアクセスでGPU/ASIC耐性が高いが、サイドチャネル攻撃に弱い)とArgon2i(データ非依存アクセスでサイドチャネル耐性が高いが、GPU耐性はやや劣る)のハイブリッド。最初のパス(メモリ走査1回目)の前半をArgon2iとして、残りをArgon2dとして動作させることで両方の利点を両立させている。

Argon2は2015年の[[password-hashing-competition|Password Hashing Competition]](PHC)優勝アルゴリズムで、[RFC 9106](https://www.rfc-editor.org/rfc/rfc9106.pdf)として標準化されている。RFC 9106では「Argon2idはすべての実装でサポートが必須(MUST)」とされており、事実上パスワードハッシュ用途のデフォルト推奨バリアントになっている。

## メモリハード関数という特徴

[[bcrypt]]や[[pbkdf2|PBKDF2]]と違い、CPU時間だけでなく大量のメモリ確保を要求する「メモリハード関数」である点が最大の特徴。GPU・ASIC・FPGAは並列コアは多いがコアあたりのメモリ帯域が乏しいため、メモリコストを上げることでこうしたハードウェアによる並列ブルートフォース攻撃のコストを大きく引き上げられる。[[scrypt]]も同じくメモリハード関数の先駆けとして設計された。

## パラメータ

- メモリコスト(KiB単位)
- 時間コスト(反復回数)
- 並列度(レーン数)

の3つを調整できる。OWASPの[Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)では最低ラインとしてメモリ19 MiB・反復2回・並列度1を挙げており、リソースに余裕があれば46 MiB・反復1回・並列度1などの代替構成も紹介されている。

## [[password-hashing-algorithms]]の中での位置づけ

[[pbkdf2|PBKDF2]]・[[bcrypt]]というメモリハード性を持たない世代、[[scrypt]]というメモリハード関数の先駆けを経て登場した、現時点でのデファクトスタンダード。

#security #cryptography

## 出典

- [RFC 9106: Argon2 Memory-Hard Function for Password Hashing and Proof-of-Work Applications](https://www.rfc-editor.org/rfc/rfc9106.pdf)
- [RFC 9106 – RFC Editor](https://www.rfc-editor.org/info/rfc9106/)
- [Password Storage Cheat Sheet – OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
