---
created: 2026-08-16 23:15
updated: 2026-08-16 23:15
---
# Password Hashing Competition

2013年に発表された、パスワードハッシュ関数の推奨標準を選定するためのオープンコンペティション(通称PHC)。AES(Advanced Encryption Standard)選定プロセスやNISTのハッシュ関数コンペティション(SHA-3選定)をモデルにしつつ、NISTのような公的機関ではなく暗号学者・セキュリティ実務者が直接主催した点が特徴。

## 経緯

2015年7月20日、最終的な優勝アルゴリズムとして[[argon2id|Argon2]]が選出された。Argon2はルクセンブルク大学のAlex Biryukov、Daniel Dinu、Dmitry Khovratovichによって設計された。優勝と同時に、Catena・Lyra2・yescrypt・Makwaの4方式が特別表彰(Special Recognition)を受けている。

## [[password-hashing-algorithms]]の中での位置づけ

このコンペティションの優勝を経て、Argon2(特にそのハイブリッド版であるArgon2id)は事実上のデファクトスタンダードとしての地位を確立した。競技参加作の多く([[scrypt]]から派生したyescryptなど)もメモリハード関数の設計を踏襲しており、PBKDF2([[pbkdf2]])や[[bcrypt]]以降の「メモリハード関数」路線を後押しした競技という位置づけになる。

#security #cryptography

## 出典

- [Password Hashing Competition – Wikipedia](https://en.wikipedia.org/wiki/Password_Hashing_Competition)
- [Password Hashing Competition (公式サイト)](https://www.password-hashing.net/)
