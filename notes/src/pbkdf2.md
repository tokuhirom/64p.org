---
created: 2026-08-16 23:15
updated: 2026-08-16 23:15
---
# PBKDF2

Password-Based Key Derivation Function 2の略。パスワードとソルト(salt)、反復回数(iteration count)を入力に、HMACなどの疑似ランダム関数を繰り返し適用して鍵を導出するアルゴリズム。PKCS #5 v2.1として仕様化され、現在は[RFC 8018](https://www.rfc-editor.org/rfc/rfc8018)(2017年公開)にまとまっている。Java、Spring Security、.NET、OpenSSLなど主要な言語・フレームワークで広くサポートされている。

## 特徴

反復回数を増やすことで1回のハッシュ計算にかかる時間を線形に引き伸ばし、ブルートフォース攻撃のコストを上げる。最低反復回数として1000回が推奨値として挙げられることが多いが、実運用では数十万〜数百万回のオーダーで設定されることが多い。

PBKDF2はCPU時間のみをコストパラメータとしており、メモリ使用量を要求しない。そのため専用ハードウェア(GPU/ASIC/FPGA)による並列化耐性は、[[scrypt]]や[[argon2id]]のようなメモリハード関数に比べて低いとされる。

## [[password-hashing-algorithms]]の中での位置づけ

PBKDF2・[[bcrypt]]は共にメモリハード性を持たない、より古い世代のパスワードハッシュ/KDF方式。後発の[[scrypt]]・[[argon2id]]はメモリハード性によってこの弱点を補う設計になっている。

#security #cryptography

## 出典

- [RFC 8018 – PKCS #5: Password-Based Cryptography Specification Version 2.1](https://www.rfc-editor.org/rfc/rfc8018)
