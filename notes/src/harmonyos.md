---
created: 2026-08-09 12:33
updated: 2026-08-09 14:11
---

# HarmonyOSとは

Huawei（華為技術）が開発しているOS。当初はIoT機器向けだったが、現在はスマホ・タブレット・車載機器、さらに[[harmonyos-pc]]まで幅広いデバイスに展開されている。

## 背景

- 開発自体は2012年頃から始まり、2019年に「HarmonyOS」として正式発表された。
- 米国の対中制裁でGoogleのAndroidサービス（GMS）が使えなくなったことを受けて、Huaweiが自社スマホ向けの代替OSとして本格展開した。

## 分散OSという設計思想

マイクロカーネルベースの「分散OS」を謳っており、異なる種類のデバイス間でシームレスに連携・リソースを共有できることを狙って設計されている。

オープンソース版（OpenHarmony）は、金融・教育・医療・工業・交通など幅広い産業のデジタル基盤としても採用が進んでいる。

## HarmonyOS NEXT（2024年〜）という転換点

- 2024年発表の「HarmonyOS NEXT」から、それまでベースにしていたAndroid由来のAOSP（Android Open Source Project）コードとLinuxカーネルを置き換え、独自カーネルのみで動くOSになった。
- Androidアプリはそのままでは動かなくなり、開発者はHarmonyOS向けに書き直す必要がある。AndroidやiOSに次ぐ「第3のモバイルOS」という位置づけで語られることが多い。
- 中国国内でのHuaweiスマホ・タブレット向けが主戦場で、中国市場でのAndroid/Google依存脱却という狙いも大きい。

この「脱Android・脱Google」路線は、PC版である[[harmonyos-pc]]でも同じ方向性で展開されている。

## 出典

- [オープンソース「HarmonyOS」 多くの産業でデジタル基盤構築｜日経BP 総合研究所](https://project.nikkeibp.co.jp/bpi/atcl/column/19/013000696/)
- [HarmonyOSはAndroidフリーになりHarmonyOS NEXTへ | gihyo.jp](https://gihyo.jp/article/2024/12/android-weekly-topics-241205)
- [脱Android、Huaweiが独自OS「HarmonyOS NEXT」を発表 | gihyo.jp](https://gihyo.jp/article/2024/02/android-weekly-topics-240201)
- [HarmonyOS 5 (NEXT) - Wikipedia](https://en.wikipedia.org/wiki/HarmonyOS_NEXT)
