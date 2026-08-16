---
created: 2026-08-16 23:15
updated: 2026-08-16 23:15
---
# scrypt

Colin Percivalが2009年3月、自身が開発するオンラインバックアップサービスTarsnap向けに設計したパスワードベース鍵導出関数(KDF)。2009年5月のBSDCan'09で"Stronger Key Derivation via Sequential Memory-Hard Functions"として発表された。2016年にIETFにより[RFC 7914](https://datatracker.ietf.org/doc/html/rfc7914)として標準化されている。

## メモリハード関数

[[argon2id]]と同様、専用ハードウェアによる大規模ブルートフォース攻撃を高コスト化するため、大量のメモリを要求する「メモリハード関数」として設計された最初期の実装の1つ。Percival自身の試算では、同じ5秒の計算時間をかけた場合、scryptに対するハードウェアブルートフォース攻撃のコストはbcryptに対する攻撃の約4000倍、PBKDF2に対する攻撃の約20000倍になるとされる。

## [[password-hashing-algorithms]]の中での位置づけ

PBKDF2・bcryptよりも後、Argon2よりも前に登場したメモリハード関数の先駆け。2015年のPassword Hashing Competition([[password-hashing-competition]])では、scryptから派生したyescryptが特別表彰(Special Recognition)を受けているが、優勝はArgon2(→[[argon2id]])だった。

#security #cryptography

## 出典

- [Scrypt – Wikipedia](https://en.wikipedia.org/wiki/Scrypt)
- [Tarsnap - The scrypt key derivation function and encryption utility](https://www.tarsnap.com/scrypt.html)
- [RFC 7914 - The scrypt Password-Based Key Derivation Function](https://datatracker.ietf.org/doc/html/rfc7914)
