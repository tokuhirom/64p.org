---
created: 2026-08-09 21:52
updated: 2026-08-09 21:52
---
# WireGuard

比較的新しい(開発は2015年頃〜)、シンプルさと高速性を重視したVPNプロトコル/実装。

## 設計思想

- コアのコードベースが約4,000行程度と非常に小さい。IPsec実装(10万行超)と比べて監査しやすく、攻撃対象領域(attack surface)が小さい。
- 暗号スイートが固定。Noiseプロトコルフレームワークの`Noise_IK`ハンドシェイクをベースに、鍵交換にCurve25519、対称暗号にChaCha20、メッセージ認証にPoly1305、ハッシュにBLAKE2sを採用。レガシー・オプションのアルゴリズムをサポートしないことで、ダウングレード攻撃や設定ミスによる脆弱性の余地をなくしている。
- `Noise_IK`パターンにより往復遅延(RTT)が1回で済むハンドシェイクを実現。

## 実装・利用面の特徴

- Linuxでは`wireguard`カーネルモジュールとして実装されており、Linux 5.6(2020年3月リリース)から標準搭載。ユーザー空間で動くOpenVPNより高速。
- UDPベースで、単一のUDPポート(デフォルト51820)のみを使用する。[[l2tp-ipsec|L2TP/IPsec]]のように複数ポート(500/4500/1701)を必要としない。
- 設定は公開鍵ベース。ピアの公開鍵・エンドポイント・AllowedIPsを書くだけのシンプルな設定ファイルで完結する。
- 未認証パケットには応答しない挙動のため、ポートスキャンで存在を検知されにくい。

## L2TP/IPsecとの対比

|  | L2TP/IPsec | WireGuard |
|---|---|---|
| 登場時期 | 2000年頃 | 2015年〜(2020年Linuxカーネル統合) |
| 実装規模 | 大きい(10万行超) | 小さい(約4,000行) |
| ポート | UDP 500/4500/1701 | UDP 51820(単一) |
| 暗号方式 | 選択可能(柔軟だが設定ミスの余地) | 固定(モダンな暗号のみ) |

## 出典

- [Protocol & Cryptography - WireGuard](https://www.wireguard.com/protocol/)
- [WireGuard: Next Generation Kernel Network Tunnel (公式論文PDF)](https://www.wireguard.com/papers/wireguard.pdf)
- [Linux Kernel 5.6 Officially Released with Built-In WireGuard Support - 9to5Linux](https://9to5linux.com/linux-kernel-5-6-officially-released-new-features)

#vpn #wireguard #networking
