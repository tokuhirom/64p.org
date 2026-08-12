---
created: 2026-08-12 20:47
updated: 2026-08-12 20:47
---
# QUIC

UDP上に構築されたトランスポート層プロトコル。TLS 1.3による暗号化を必須で組み込んでおり、平文での通信を許さない設計になっている。GoogleのJim Roskindらによって2012年頃に考案され、IETFにより2021年5月に**RFC 9000**として標準化された。[[http3|HTTP/3]]や[[webtransport|WebTransport]]の基盤として使われる。 #protocol

## TCPとの違い

- **ハンドシェイク**: TCPは3-wayハンドシェイクの後に別途TLSネゴシエーションが必要で複数RTTを要するが、QUICはトランスポートのハンドシェイクにTLS 1.3を統合しており、既知のサーバーには0-RTTでの再接続も可能
- **ストリーム多重化**: 複数の独立したストリームをトランスポート層で多重化できる。1つのストリームでのパケットロスが他のストリームをブロックしない(Head-of-lineブロッキングの回避)。TCPは単一のバイトストリームしか扱えないため、この分離ができない
- **コネクションの識別**: IPアドレス+ポートの組ではなく、コネクションIDでコネクションを識別する。そのためWi-Fi⇔モバイル回線のようなネットワーク切り替えでも接続を維持できる

## 出典

- [RFC 9000: QUIC: A UDP-Based Multiplexed and Secure Transport](https://www.rfc-editor.org/rfc/rfc9000.html)
- [Comparing TCP and QUIC - APNIC Blog](https://blog.apnic.net/2022/11/03/comparing-tcp-and-quic/)
