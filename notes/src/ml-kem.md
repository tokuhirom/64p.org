---
created: 2026-08-15 21:34
updated: 2026-08-15 21:34
---
# ML-KEM

NISTがFIPS 203として標準化した、格子暗号ベースの耐量子鍵カプセル化メカニズム(Key Encapsulation Mechanism, KEM)。正式名称はModule-Lattice-Based Key-Encapsulation Mechanism。2024年8月に標準化された。

## 目的

RSAや古典的なDiffie-Hellman鍵交換など、量子コンピュータに対して脆弱な方式を置き換え、安全でない通信路上で2者が共有秘密を確立できるようにする。

## 仕組み

以下の3ステップで構成される。

1. **KeyGen（鍵生成）** — 公開鍵と秘密鍵のペアを生成する
2. **Encapsulation（カプセル化）** — 公開鍵を用いて共有秘密を暗号化し、暗号文を生成する
3. **Decapsulation（デカプセル化）** — 秘密鍵を使って暗号文から共有秘密を復号する

## 安全性根拠

Module Learning With Errors (M-LWE) 問題とcyclotomic ringsの組み合わせに基づく、格子暗号としての計算困難性を安全性の根拠とする。古典計算機だけでなく量子コンピュータに対しても耐性を持つよう設計されている。

## パラメータセット

3つのセキュリティレベルが定義されている。

| パラメータセット | NISTセキュリティレベル | 概算の古典的安全性 |
|---|---|---|
| ML-KEM-512 | レベル1 | 約128bit |
| ML-KEM-768 | レベル3 | 約192bit |
| ML-KEM-1024 | レベル5 | 約256bit |

ML-KEM-768がサイズと性能のバランスから一般用途の既定値として広く推奨されている。同パラメータでの鍵・暗号文サイズは、秘密鍵2400バイト・公開鍵1184バイト・暗号文1088バイトで、古典的なX25519の公開鍵(32バイト)などと比べて大幅に大きい。

## CRYSTALS-Kyberとの関係

ML-KEMは元々「Kyber」という名前で知られていた。2005年にOded Regevが発表した手法に基づき、「Cryptographic Suite for Algebraic Lattices」(CRYSTALS)の一部として開発された。同じCRYSTALSの署名スキームがML-DSA(旧Dilithium)。NISTのポスト量子暗号標準化プロセスでは2017年の提出後、Round 2で公開鍵圧縮の削除とパラメータ調整（Kyber v2）、Round 3でFujisaki-Okamoto変換の修正とサンプリング改善を経て、「初めて標準化されたKEM」として最終選定された。

## 利用例

TLSでは古典的な鍵交換と組み合わせる[[hybrid-key-exchange|ハイブリッド鍵交換]]の一方の要素として使われる（例: [[haproxy-post-quantum-tls|HAProxyの耐量子暗号TLS対応]]におけるX25519MLKEM768・SecP256r1MLKEM768)。AWS KMSやSignalなど実運用システムでも採用されている。

#cryptography #post-quantum #tls

## 出典

- [ML-KEM - Wikipedia](https://en.wikipedia.org/wiki/ML-KEM)
- [FIPS 203, Module-Lattice-Based Key-Encapsulation Mechanism Standard | CSRC (NIST)](https://csrc.nist.gov/pubs/fips/203/final)
