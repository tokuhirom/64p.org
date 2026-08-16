---
created: 2026-08-16 23:15
updated: 2026-08-16 23:15
---
# パスワードハッシュアルゴリズム

パスワード認証情報の保存に使われるハッシュ/鍵導出関数(KDF)を、登場順・設計思想別にまとめるハブノート。

## メモリハード性を持たない世代

- [[pbkdf2|PBKDF2]] — HMACなどの疑似ランダム関数を反復回数分繰り返すシンプルな方式。PKCS #5 / RFC 8018として標準化。CPU時間のみをコストパラメータとする。
- [[bcrypt]] — 1999年発表。Blowfishベースの"EksBlowfish"を用い、コストファクター(2のべき乗)で反復回数を制御する適応型ハッシュ関数。

## メモリハード関数の世代

- [[scrypt]] — 2009年、Colin PercivalがTarsnap向けに設計。専用ハードウェアへの耐性を高めるため、大量メモリの確保を要求する「メモリハード関数」の先駆け。RFC 7914。
- [[argon2id]] — [[password-hashing-competition|Password Hashing Competition]](2015年)優勝アルゴリズムArgon2のハイブリッド版。RFC 9106でパスワードハッシュ用途の必須(MUST)バリアントとされ、現在のデファクトスタンダード。

## 選定の経緯

[[password-hashing-competition|Password Hashing Competition]]は、PBKDF2・bcryptの弱点(メモリハード性の欠如)を踏まえ、より新しい世代のアルゴリズムを公募・審査したコンペティション。その結果としてArgon2(→Argon2id)が選ばれた経緯を持つ。

#security #cryptography #moc
