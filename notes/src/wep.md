---
created: 2026-08-19 23:38
updated: 2026-08-19 23:41
---
# WEP

Wired Equivalent Privacy。1997年に最初のIEEE 802.11規格の一部として導入された無線LANの暗号化方式。名前の通り「有線LAN並みのプライバシー」を無線に与えることが目標だったが、設計上の欠陥が複数重なっており、2001年以降立て続けに攻撃が発見され、2004年のIEEE 802.11i-2004（WPA2の元になった規格改訂）で正式に廃止（deprecated）された。

## 仕組み

- 暗号化には[[rc4|RC4]]ストリーム暗号を使用。鍵長は40ビット（WEP-40、輸出規制時代の名残）または104ビット（WEP-104）。
- パケットごとに**24ビットのIV（初期化ベクトル）**を生成し、`IV || 共有鍵` を連結したものをRC4の鍵として使う。IVは平文のままパケットに付けて送信される。
- 完全性チェックにはCRC-32によるICV（Integrity Check Value）を使用。

## 何が悪かったのか

どれか一つではなく、設計ミスの合わせ技。

1. **IVが24ビットしかない** — 空間が小さすぎて、トラフィックの多いネットワークでは数時間でIVが再利用される。同じIV＝同じキーストリームなので、XORするだけで平文の情報が漏れる。
2. **IVを鍵の先頭に連結する構造** — RC4のKSAは鍵の先頭が既知だと出力に偏りが出る弱鍵問題を抱えており、IVが平文で見えているWEPはまさにこの条件を満たす。2001年のFMS攻撃（Fluhrer, Mantin, Shamir）で突かれ、パケットの受動収集だけで共有鍵を復元できることが示された。
3. **CRC-32はXORに対して線形** — 暗号学的MACではないため、暗号文を改竄してもICVの辻褄合わせができる。これを利用したchopchop攻撃では鍵なしでパケットを1バイトずつ復号できる。リプレイ攻撃への防御もない。
4. **鍵管理の仕組みがない** — 全端末が同じ静的な共有鍵を使い続ける前提で、ローテーションの仕組みがない。

## 攻撃の高速化の歴史

- **2001年: FMS攻撃** — 数十万パケットの受動収集で鍵を復元。直後にAirSnortなどのツールが登場し、誰でも実行可能になった。
- **2004年頃: KoreK攻撃・chopchop攻撃** — 必要パケット数がさらに減少。
- **2007年: PTW攻撃**（Pyshkin, Tews, Weinmann）— RC4の統計的偏りの解析を改良し、ARPリプレイで能動的にトラフィックを増やす手法と組み合わせて、約4万パケットで104ビット鍵を50%の確率で復元できるまでに高速化。[[aircrack-ng]]のデフォルト手法になっており、実時間で数分あれば破れるレベルになった。

## その後

2003年に暫定対策のWPA（TKIP）が登場。既存ハードのファームウェア更新だけで動くよう、RC4を残しつつIVの扱いを改善し、MIC（Michael）を導入した。2004年6月にIEEE 802.11i-2004が承認されてWEPは正式に廃止され、AESベースのCCMPを使うWPA2へ移行した。現在のOSやアクセスポイントではWEPのサポート自体が削除されつつある。

## 出典

- [IEEE 802.11i-2004 - Wikipedia](https://en.wikipedia.org/wiki/IEEE_802.11i-2004)
- [What Is Wired Equivalent Privacy (WEP)? | SecureW2](https://securew2.com/blog/what-is-wep-security)
- [Wired Equivalent Privacy - ScienceDirect Topics](https://www.sciencedirect.com/topics/engineering/wired-equivalent-privacy)
- [Aircrack-ng documentation](https://www.aircrack-ng.org/doku.php?id=aircrack-ng)
- [WEP Crack Explained | Deepwatch](https://www.deepwatch.com/glossary/wep-crack/)

#cryptography #security #wifi
