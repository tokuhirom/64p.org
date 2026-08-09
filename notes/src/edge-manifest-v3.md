---
created: 2026-08-09
updated: 2026-08-09
---
# Microsoft Edge、拡張機能をManifest V3へ完全移行

#browser #extensions

[Edgeチームのブログ記事](https://blogs.windows.com/msedgedev/2026/08/07/moving-the-microsoft-edge-extensions-ecosystem-forward-with-manifest-version-3/)(2026年8月7日付)で、Edge拡張機能のManifest V2(MV2)を廃止しManifest V3(MV3)へ完全移行する方針とスケジュールが発表された。

## MV2廃止のスケジュール

- **2026年8月**: 一般ユーザー向けにMV2廃止を開始。ユーザーには段階的に通知され、MV3版への移行を促す。
- **2026年末**: 一般ユーザー向け移行を完了させる目標。
- **2027年初頭**: エンタープライズ環境での廃止を開始。

## エコシステムの現状

利用数上位のMV2拡張機能のうち95%以上がすでにMV3へ移行済み。意味のある利用数を持つMV2拡張は58個のみで、そのうちMV3版が未提供なのはわずか3個。

## 開発者への呼びかけ

未移行の開発者はMicrosoft Partner Center経由で速やかにアップデートを提出するよう求められている。Edgeチームは移行支援も提供予定。

## Chromeとの比較

Chromeは一足先にMV2廃止を進めており、2024年6月から警告表示を開始、同年10月からstable版でMV2拡張をデフォルト無効化、2026年8月31日にChromeウェブストアから残存MV2拡張を完全削除する予定。EdgeはChromiumベースであるため、概ねこの流れを追う形になっている。

## 出典

- [Moving the Microsoft Edge extensions ecosystem forward with Manifest Version 3](https://blogs.windows.com/msedgedev/2026/08/07/moving-the-microsoft-edge-extensions-ecosystem-forward-with-manifest-version-3/)
- [Manifest V2 support timeline - Chrome for Developers](https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline)
