---
created: 2026-08-14 12:02
updated: 2026-08-14 12:02
---
# OSI (Open Source Initiative)

#license #open-source

「オープンソース」の定義（Open Source Definition, OSD）を管理し、ライセンスがそれに適合するかを審査・承認する非営利団体。1998年2月にEric RaymondとBruce Perensが設立した。あるライセンスが「オープンソースライセンスかどうか」の事実上の判定主体であり、[[sspl|SSPL]]や[[business-source-license|BSL]]が「source-availableでありオープンソースではない」とされる根拠もここにある。

## 設立の経緯

- 1998年1月のNetscapeによるブラウザのソース公開（後のMozilla）を機に、「free software」よりも企業に受け入れられやすい用語として「open source」を推進する動きが起こった。語自体はChristine Petersonの発案
- Eric Raymondが初代presidentに、Bruce Perensがvice-presidentに就任
- 「open source」という語そのものは商標として確保できなかったため、「OSDに適合しOSIが承認したライセンス」という運用が事実上の基準として機能している

## Open Source Definition (OSD)

Bruce Perensが起草し1997年にDebianプロジェクトが採択した**Debian Free Software Guidelines (DFSG)**から、Debian固有の記述を除いて作られた10項目の基準。主なもの:

- 第1項: 自由な再頒布（販売・無償配布を制限しない）
- 第2項: ソースコードの入手可能性
- 第3項: 派生物の作成・再頒布の許可
- 第5項: 個人・グループへの差別の禁止
- 第6項: **利用分野（fields of endeavor）への差別の禁止** — 商用利用やサービス提供など特定の使い方を制限してはならない
- 第7項: ライセンスは再頒布先にも自動的に適用される

第6項が実務上の試金石で、[[sspl|SSPL]]は「サービス提供という利用分野への差別」としてこの項に反するとされ承認されなかった。本番利用自体を制限する[[business-source-license|BSL]]も同様にオープンソースには該当しない。

## FSFの自由ソフトウェア定義との関係

FSFは「4つの自由」（実行・研究改変・再頒布・改変版の再頒布）で自由ソフトウェアを定義する。OSDとはほぼ同じライセンス群を認める結果になるが、FSFが倫理・思想（ユーザーの自由）を軸にするのに対し、OSIは開発手法としての実利を前面に出すという立場の違いがある。

## Open Source AI Definition (OSAID)

2024年10月に、AIシステム向けの定義**OSAID 1.0**を公開した。学習データそのものの公開を必須とせず「データに関する十分に詳細な情報」で足りるとした点をめぐり、「オープンソースの基準を緩めた」という批判と「現実的な妥協」という擁護で論争になった。

## [[software-licenses|ソフトウェアライセンス]]の中での位置づけ

個々のライセンスではなく、「何がオープンソースか」の線引きをする審判役。source-availableライセンスの隆盛は、この線の外側で商用OSSベンダーが生存戦略を模索している現象と言える。

## 出典

- [History of the Open Source Initiative](https://opensource.org/about/history-of-the-open-source-initiative)
- [The Open Source Definition - Open Source Initiative](https://opensource.org/osd)
- [Bruce Perens - The Open Source Definition (O'Reilly Open Sources)](https://www.oreilly.com/openbook/opensources/book/perens.html)
- [The Open Source AI Definition - Open Source Initiative](https://opensource.org/ai)
- [The Open Source Definition - Wikipedia](https://en.wikipedia.org/wiki/The_Open_Source_Definition)
