---
created: 2026-08-12 17:51
updated: 2026-08-12 18:47
---
# VXLAN

Virtual eXtensible Local Area Networkの略。L3ネットワークの上にL2のオーバーレイネットワークを構築するトンネリング技術。RFC 7348(2014年、Informational)で標準化されており、Cisco・VMware・Arista・Broadcom・Red Hatなど複数ベンダーが共著者として名を連ねている。 #network #sdn #datacenter

## 生まれた背景

従来の[[vlan|IEEE 802.1Q VLAN]]はVLAN IDが12bitしかなく、最大4094セグメントしか作れない。クラウド/データセンターの仮想化環境では、これが以下の理由で不足するようになった。

- マルチテナント環境で、テナントごとに複数VLANが必要になり数が枯渇する
- 1台のサーバに数百台のVMが載ることで、ToR(Top-of-Rack)スイッチのMACアドレステーブルへの圧力が増大する
- 複数ラック間でL2セグメントを「延伸」させたいニーズ(VM移行など)がある

VXLANは24bitのVNI(VXLAN Network Identifier)を使うことで、理論上1,600万以上のセグメントを識別可能にし、この制約を解消した。

## 仕組み

L2フレームをまるごとUDPパケットに包んでL3ネットワーク上を運ぶ、いわゆる「MAC over UDP」方式。

```
外側Ethernetヘッダ → 外側IPヘッダ → 外側UDPヘッダ(宛先ポート4789) → VXLANヘッダ(VNI 24bit) → 元のEthernetフレーム
```

- カプセル化・逆カプセル化を行う終端ノードを**VTEP(VXLAN Tunnel End Point)**と呼ぶ。ハイパーバイザー上のソフトウェアスイッチとして実装されることが多いが、物理スイッチに実装される場合もある。
- 宛先UDPポートはIANA割り当ての**4789**固定。送信元ポートは内部フレームの内容からハッシュ計算した動的ポートで、ECMPによる経路上の負荷分散を意図している。

## ブロードキャスト・マルチキャストの扱い

ARPなどのブロードキャストフレームは、VNIに対応付けられたIPマルチキャストグループへ送信される。応答フレームは、リクエスト受信時に学習した宛先VTEPのIPアドレスへユニキャストで返送されるため、不要なフラッディングを避けられる。コントロールプレーンにEVPNを使う実装では、このマルチキャストが不要な構成も存在する。

## 出典

- [RFC 7348 - Virtual eXtensible Local Area Network (VXLAN)](https://www.rfc-editor.org/rfc/rfc7348)
- [RFC 7348 info page](https://www.rfc-editor.org/info/rfc7348/)
