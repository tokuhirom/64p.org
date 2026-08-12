---
created: 2026-08-12 18:44
updated: 2026-08-12 18:44
---
# VRRP (Virtual Router Redundancy Protocol)

#networking #protocol #linux

複数台のルータ(またはサーバ)で1つの仮想IPアドレス(VIP)を共有し、デフォルトゲートウェイやサービスを冗長化するプロトコル。IETFで標準化されており、現行版はIPv4/IPv6両対応のRFC 5798(VRRPv3。IPv4のみのRFC 3768を obsolete)。

## 仕組み

- 参加ルータには 0〜255 の priority を設定する(デフォルト100)。priorityが最も高いルータが **MASTER** としてVIP宛の通信を処理し、他は **BACKUP** としてMASTERの生存を監視する。優先度が同じ場合は主IPアドレスが大きい方が採用される。
- MASTERは一定間隔(デフォルト1秒)で **VRRP Advertisement** をマルチキャストアドレス`224.0.0.18`(IPv4、IPプロトコル番号112)へ送信する。BACKUPはこれを受信できなくなると、自身がMASTERに昇格する。
- Advertisementが途絶えてからMASTERに昇格するまでの待ち時間は次の式で決まる。priorityが高いBACKUPほど短い時間で昇格できる。

  ```
  Skew_Time = (256 - priority) / 256 × Advertisement間隔
  Master_Down_Interval = 3 × Advertisement間隔 + Skew_Time
  ```

- priority=255 はVIPのアドレス所有者を示す特別な値で、設定に関わらず常にMASTERになる。priority=0 は「現在のMASTERが降りる」という通知で、これを受け取ったBACKUPは通常より短いSkew_Timeだけ待てばよいため、意図的な停止時のフェイルオーバーを高速化できる。
- 稼働中の低priority MASTERに対して、後から復帰した高priorityのBACKUPが制御を奪い返すかどうかは **Preemptモード** で制御する(デフォルトは奪う設定)。ただしpriority=255(アドレス所有者)はPreemptモードの設定に関わらず常に昇格する。

## Linuxでの実装: keepalived

Linuxでは`keepalived`がVRRPの代表的な実装。HAProxyやNginxなどのロードバランサの前段に2台以上のサーバを並べ、VIPをフェイルオーバーさせる用途でよく使われる。LVS(IPVS)によるL4ロードバランシングの死活監視と、VRRPによるルータ/サーバ冗長化の両方を兼ね備えたデーモンとして設計されている。

## 可視化デモ

MASTER選出・フェイルオーバー・Preemptの挙動を、実際のタイマーで動かしながら確認できるデモを作った。

https://claude.ai/code/artifact/d86922b8-5e59-49a7-b13f-8a434ac28213

lb1/lb2の2ノード構成で、リンクダウンやpriority変更がMASTER選出にどう波及するかを、VRRP AdvertisementとクライアントのVIP宛通信をアニメーションで見ながら確認できる。

## 出典

- [RFC 5798 - Virtual Router Redundancy Protocol (VRRP) Version 3 for IPv4 and IPv6](https://www.rfc-editor.org/rfc/rfc5798)
- [Keepalived for Linux](https://www.keepalived.org/)
