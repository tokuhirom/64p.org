---
created: 2026-08-14 09:50
updated: 2026-08-14 09:59
---
# AGPL

#license #open-source #copyleft

GNU Affero General Public License。GPLの「ASPループホール（SaaSループホール）」を塞ぐためのコピーレフトライセンス。通常のGPLの義務は「頒布（distribute）」した時にしか発動しないため、GPLコードを改変してサーバー上でSaaSとして運用する限りソース公開義務を負わない。AGPLは「ネットワーク越しにユーザーと対話するソフトウェア」にもコピーレフトを及ぼす（ネットワークコピーレフト）。

## 歴史

- **2002年**: Henri Poole の会社 Affero, Inc. が GPLv2 ベースの「Affero GPL v1」を公開。名前はこの会社に由来する。
- **2007年**: FSF が [[gplv3|GPLv3]] をベースに **GNU AGPLv3** を公開。OSI承認・FSF公認の自由ソフトウェアライセンス。GPLv3とは相互にリンク可能とする条項が双方の第13条に入っている。

## 中核: 第13条 (Remote Network Interaction)

- **改変した場合のみ**発動する。改変版をネットワーク経由でユーザーに使わせるなら、そのユーザーに対して改変版の Corresponding Source を無償でネットワーク経由で提供する機会を「prominently offer」しなければならない。
- 逆に言うと、無改変のままSaaSとして運用するだけなら第13条のソース提供義務は発動しない（誤解が多いポイント）。
- 「remote network interaction」の範囲や「Corresponding Source」の境界（どこまでが派生物か）には条文上の曖昧さが指摘されている。弁護士 Kyle Mitchell による精読記事 [Reading AGPL](https://writing.kemitchell.com/2021/01/24/Reading-AGPL) が詳しい。

## 企業側の受け止め

- **Googleは全面禁止**: 主力製品がすべてネットワークサービスであり、エンジニアが誤ってAGPL依存を持ち込んだ際のリスクが大きすぎるとして、社内でのAGPLソフトウェア使用をポリシーで一律禁止している。同様のポリシーを持つ企業は他にも多い。
- 一方で、AGPL忌避を過剰反応とする反論もある（例: Drew DeVault「The falsehoods of anti-AGPL propaganda」）。
- FSF自身は、AGPLでも「SaaSS (Service as a Software Substitute)」問題（ユーザーが自分の計算処理を他人のサーバーに委ねること自体）は解決できないと明言している。

## 採用プロジェクトの動き

商用オープンソース企業が「クラウドベンダーのタダ乗り防止」として採用するケースが目立つ。

- **MongoDB**: 長らくAGPLv3だったが、AGPLでも不十分として2018年により強い独自ライセンス[[sspl|SSPL]]へ移行（SSPLはOSI非承認）。
- **Grafana**: 2021年に Apache 2.0 から AGPLv3 へ変更。
- **Elasticsearch/Kibana**: 2021年にSSPL化した後、2024年9月にAGPLv3を選択肢に追加して「オープンソース復帰」を宣言。
- **[[redis|Redis]]**: 2024年のSSPL化の後、2025年5月のRedis 8でAGPLv3を選択肢に加えてOSI承認ライセンスに復帰。この間に[[valkey|Valkey]]がフォークとして誕生している。
- **[[mold-linker|mold]]**: AGPL/商用のデュアルライセンスでのマネタイズを試みたが期待通りにいかず、2.0でMITへ移行。

「強すぎて企業に嫌われる」性質が、逆に商用OSSベンダーにとっては競合クラウドベンダーの牽制と商用ライセンス販売（デュアルライセンス）の道具として機能している、という二面性がある。

## [[software-licenses|ソフトウェアライセンス]]の中での位置づけ

[[gplv3|GPLv3]]にネットワークコピーレフトを加えた拡張。これでも足りないとして生まれたのが[[sspl|SSPL]]。

## 出典

- [Why the Affero GPL - GNU Project](https://www.gnu.org/licenses/why-affero-gpl.html)
- [Reading AGPL — /dev/lawyer](https://writing.kemitchell.com/2021/01/24/Reading-AGPL)
- [AGPL Policy | Google Open Source](https://opensource.google/documentation/reference/using/agpl-policy)
- [Open Source Software Licenses 101: The AGPL License | FOSSA Blog](https://fossa.com/blog/open-source-software-licenses-101-agpl-license/)
- [Elasticsearch Is Open Source. Again! | Elastic Blog](https://www.elastic.co/blog/elasticsearch-is-open-source-again)
- [Q&A with Grafana Labs CEO Raj Dutt about our licensing changes | Grafana Labs](https://grafana.com/blog/qa-with-our-ceo-on-relicensing/)
- [GNU Affero General Public License - Wikipedia](https://en.wikipedia.org/wiki/GNU_Affero_General_Public_License)
