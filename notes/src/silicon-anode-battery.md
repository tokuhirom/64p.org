---
created: 2026-08-28 14:57
updated: 2026-08-28 14:57
---
# シリコン負極電池

#hardware #battery #electronics

リチウムイオン電池の負極材を、従来の黒鉛（グラファイト）からシリコンに置き換える／混ぜることでエネルギー密度を上げるアプローチ。次世代電池の中では最も実用化が近く、すでに一部のスマートフォンに搭載されている。

## なぜシリコンなのか

理論容量が桁違いに大きい。

- 黒鉛: 372 mAh/g（LiC₆ に相当）
- シリコン: 3579 mAh/g（室温でのLi₁₅Si₄形成時）

およそ10倍。同じ容量なら負極を薄くでき、同じ体積ならより多くのエネルギーを詰められる。

## 最大の課題は「膨らむ」こと

シリコンはリチウムを吸蔵・放出する過程で**体積が約300%変化する**。この機械的なストレスが以下を引き起こす。

- シリコン粒子の割れ、電極からの脱落・電気的な孤立
- 新しい表面が露出するたびにSEIが再形成され、電解液を消費し続ける → 容量劣化とガス発生

つまり[[lithium-ion-battery-swelling|セルの膨張]]という現象が、材料レベルでそのまま課題になっている。ナノ構造化、シリコンとグラファイトの複合化（Si-Gr）、炭素コーティング、バインダーの工夫（PAA系など）、電解液添加剤といった対策が研究・実装されている。現行の製品はシリコン100%ではなく、黒鉛にシリコンを数%〜十数%混ぜた複合負極が主流。

## 2026年時点の状況

- スマートフォンでは中国メーカーを中心にシリコン混合負極が実用化済み。
- ノートPC向けでは、Lenovoが上海交通大学と共同開発した「ED1000」を2026年3月のNVIDIA GTCで発表。体積エネルギー密度1,000Wh/Lで、従来比10%以上の向上。筐体サイズを変えずに最大99.9Whを実現するとしている。ただしproof-of-concept段階で、製品搭載時期は明示されていない。
- ノートPC用電池市場では、シリコン負極と[[solid-state-battery|全固体電池]]を合わせてもパイロット生産ラインの11%程度、代替化学系全体で市場の4%未満。

漸進的な密度向上であって、[[lithium-ion-battery-swelling|膨張]]や発火リスクを根本から消す転換ではない点に注意。

## 出典

- [Lenovo unveils world-first 1,000Wh/L silicon-anode battery for laptops](https://interestingengineering.com/science/lenovo-world-first-silicon-anode-battery-laptop)
- [The Effect of Silicon Grade and Electrode Architecture on the Performance of Advanced Anodes (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC8708259/)
- [Comparison of Silicon and Graphite Anodes (IOPscience)](https://iopscience.iop.org/article/10.1149/1945-7111/acc09d)
- [Silicon Anode Battery Technology 2026 (PatSnap)](https://www.patsnap.com/resources/blog/rd-blog/silicon-anode-battery-technology-2026-patsnap-eureka/)
- [Laptop Battery Market Growth Analysis 2026-2035](https://www.businessresearchinsights.com/market-reports/laptop-battery-market-123950)
