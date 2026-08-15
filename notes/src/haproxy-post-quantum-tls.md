---
created: 2026-08-15 21:29
updated: 2026-08-15 21:29
---
# HAProxyでの耐量子暗号(PQC) TLS対応

HAProxy Enterprise 3.2以降、およびHAProxy Community 3.3以降は、AWS-LCライブラリを通じて耐量子暗号（Post-Quantum Cryptography, PQC）をネイティブサポートする。

## ハイブリッド鍵交換

古典的な鍵交換アルゴリズム（ECDHE）と耐量子アルゴリズム（ML-KEM）を組み合わせた「ハイブリッド鍵交換」を用いる。双方の出力を組み合わせて共有秘密を導出する方式で、どちらか一方だけでは秘密を再構成できない。対応する組み合わせ:

- **X25519MLKEM768** — Curve25519 + ML-KEM-768
- **SecP256r1MLKEM768** — NIST P-256 + ML-KEM-768

## 要件

- **TLS 1.3が必須**。TLS 1.2では耐量子コンポーネントを搬送する「named groups extension」自体が存在しない。

## 設定例

```
ssl-default-server-curves X25519MLKEM768:SecP256r1MLKEM768:X25519:P-384:P-256
ssl-default-bind-curves X25519MLKEM768:SecP256r1MLKEM768:X25519:P-384:P-256
ssl-min-ver TLSv1.3
```

曲線リストの順序が重要で、耐量子曲線を先頭に置きつつ古典的なECDHE曲線を後方に並べておくことで、対応していないクライアントに対しては自動的に古典的ECDHEへフォールバックする。

## 注意点

- クライアント側の互換性: `curl`で検証する場合はOpenSSL 3.5.0以降（2025年4月リリース以降）が必要。それより古いOpenSSL環境ではBoringSSLの`bssl`クライアントでのテストが推奨されている。
- ML-KEM-768の鍵サイズは約1,184バイトで、古典的なX25519（32バイト）より大幅に大きく、TLSハンドシェイクでパケット分割が発生する可能性がある。
- 検証は`bssl`クライアントで接続し、出力に`ECDHE group: SecP256r1MLKEM768`のような表示が出れば耐量子鍵交換が成立している。

#tls #cryptography #haproxy

## 出典

- [How to enable post-quantum cryptography and TLS termination with HAProxy](https://www.haproxy.com/blog/how-to-enable-post-quantum-cryptography-and-tls-termination-with-haproxy)
