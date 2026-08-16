---
created: 2026-08-16 23:15
updated: 2026-08-16 23:15
---
# bcrypt

Niels ProvosとDavid Mazièresが1999年にUSENIXで発表したパスワードハッシュ関数。Blowfish暗号を元に、意図的に鍵スケジュールを重くした"EksBlowfish"(expensive key schedule Blowfish)がベースになっている。名前の由来も"Blowfish crypt"から。

## コストファクター

bcrypt最大の特徴は「コストファクター」という2のべき乗で表される反復回数パラメータ。コストファクターが`N`のとき、Blowfishの鍵スケジュールを`2^N`回繰り返す。コストファクターを1増やすごとに計算時間は2倍になる。ハードウェアの高速化に合わせてコストファクターを引き上げることで、計算コストを追随させられる「適応型」ハッシュ関数として設計されている。

2024〜2026年時点でのOWASP推奨は「本番環境のハードウェアで1ハッシュあたり約250msを目標にする」で、多くのクラウドインスタンスではコストファクター12がその目安に相当するとされる。

## [[password-hashing-algorithms]]の中での位置づけ

CPU時間のみをコストに変換する方式で、[[argon2id]]や[[scrypt]]のような大容量メモリ確保を要求する「メモリハード」性は持たない。そのため専用ハードウェア(ASIC/GPU)による並列ブルートフォース耐性では、メモリハード関数に劣ると位置づけられる。とはいえ長年の実績と広範な実装がある、枯れた選択肢でもある。

#security #cryptography

## 出典

- [Bcrypt – Wikipedia](https://en.wikipedia.org/wiki/Bcrypt)
- [Bcrypt (Blowfish-hash-function) – martinstoeckli.ch](https://www.martinstoeckli.ch/hash/en/hash_bcrypt.php)
