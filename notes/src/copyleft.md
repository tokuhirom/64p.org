---
created: 2026-08-14 12:02
updated: 2026-08-14 12:02
---
# コピーレフト

#license #open-source

著作権（copyright）の仕組みを逆手に取り、「このソフトを利用・改変した派生物にも同じ自由（ソース公開・再頒布の自由）を与えなければならない」と義務づけるライセンス手法。Richard StallmanがGNUプロジェクトで確立し、GPLが最初に広く使われたコピーレフトライセンスとなった。権利を放棄するパブリックドメインとは違い、著作権を保持したまま「自由を守るための制約」を課すのがポイント。

## 語源

- Don Hopkinsが1984〜85年頃にStallmanへ送った手紙に書かれていた「Copyleft – all rights reversed.」（"all rights reserved"のもじり）をStallmanが気に入り、概念の名前として採用した
- さらに遡ると、1976年のLi-Chen WangによるPalo Alto Tiny BASICの配布告知に「@COPYLEFT ALL WRONGS RESERVED」という使用例がある

## 強いコピーレフトと弱いコピーレフト

- **強いコピーレフト**: GPL系。リンクして結合された作品全体に同一ライセンスを要求する
- **弱いコピーレフト**: LGPL・MPL 2.0・CDDLなど。コピーレフトが及ぶ範囲を当該ファイルやライブラリ自体の改変に限定し、それを利用するアプリケーション側はプロプライエタリでもよい

これとは別に「どの行為で義務が発動するか」という軸もあり、頒布時のみ（GPL）→ ネットワーク経由の利用（[[agpl|AGPL]]）→ サービス提供全般（[[sspl|SSPL]]、ただしOSI非承認）と強度が上がっていく。全体の見取り図は[[software-licenses|ソフトウェアライセンス]]を参照。

## ソフトウェア以外への展開

Creative Commonsの**Share-Alike（SA）**条件（CC BY-SAなど）は、文書・画像などの著作物にコピーレフトの考え方を適用したもの。Wikipediaの本文がCC BY-SAなのが代表例。

## 受け止め

義務が結合作品全体へ伝播する性質から、批判的な文脈では「viral license（ウイルス的ライセンス）」と呼ばれることがある。企業のOSSポリシーでは、パーミッシブライセンスと区別してコピーレフト系（特にAGPL）の利用に審査を課すことが多い（[[agpl|AGPL]]のGoogleの例を参照）。

## [[software-licenses|ソフトウェアライセンス]]の中での位置づけ

GPLv3・AGPL・SSPLと続く系譜全体を貫く基礎概念。対極がMIT・BSD・Apache 2.0などのパーミッシブライセンス。

## 出典

- [What is Copyleft? - GNU Project](https://www.gnu.org/licenses/copyleft.en.html)
- [Copyleft - Wikipedia](https://en.wikipedia.org/wiki/Copyleft)
- [All About Copyleft Licenses | FOSSA Blog](https://fossa.com/blog/all-about-copyleft-licenses/)
