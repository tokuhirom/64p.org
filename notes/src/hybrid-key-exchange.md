---
created: 2026-08-15 21:34
updated: 2026-08-15 21:34
---
# ハイブリッド鍵交換

複数の鍵交換アルゴリズムを同時に使い、その結果を組み合わせることで、構成要素のうちどれか1つを除く全てが破られても安全性を維持しようとする方式。耐量子暗号への移行を主な動機として、TLS 1.3向けにIETFで`draft-ietf-tls-hybrid-design`として仕様化が進められている。

## 動機

検討中のポスト量子暗号アルゴリズムの多くは比較的新しく、RSAや有限体・楕円曲線上のDiffie-Hellmanほど深く研究されていない。保守的な運用者は個々の新アルゴリズムだけに全面的な信頼を置けない場合があるため、実績のある古典的アルゴリズムと組み合わせることでリスクを分散する。

## 結合方式: 連結アプローチ

`draft-ietf-tls-hybrid-design`では、長さフィールドなどの追加構造を挟まず単純に連結する方式を採用している。

$$
\text{concatenated\_shared\_secret} = \text{ECDH.shared\_secret} \mathbin\Vert \text{PQKEM.shared\_secret}
$$

KDFベースの複雑な結合方式ではなくこのシンプルな設計を選んだ理由は、TLS 1.3の既存メカニズムへの変更を最小限に抑えるため。

## 安全性の根拠

Bindelらの研究に基づき、この構成はdual-PRF combinerに相当するとされる。IND-CCA2安全なKEMを使用していれば、鍵の再利用時にも安全性が維持される。Fujisaki-Okamoto変換などが適用された暗号学的に安全なKEMを選ぶことが前提条件となる。すべての公開鍵・暗号文・共有秘密は固定長である必要があり、可変長の秘密はLucky Thirteenのようなタイミング攻撃のリスクを招くため許容されない。

## 実例

[[haproxy-post-quantum-tls|HAProxyの耐量子暗号TLS対応]]では、古典的ECDHE(X25519やNIST P-256)と[[ml-kem|ML-KEM]]-768を組み合わせたX25519MLKEM768・SecP256r1MLKEM768という2種類のハイブリッド鍵交換グループが使われている。

#cryptography #post-quantum #tls

## 出典

- [draft-ietf-tls-hybrid-design-16 - Hybrid key exchange in TLS 1.3](https://datatracker.ietf.org/doc/draft-ietf-tls-hybrid-design/)
