---
created: 2026-08-10 20:34
updated: 2026-08-10 20:37
---
# AIO Launcher

Android向けのホームランチャーアプリ(開発元: execbit、パッケージ名 `ru.execbit.aiolauncher`)。 #android

## コンセプト

ホーム画面がアイコン羅列ではなく、**ウィジェットのリスト**で構成される(iOSの左側の「今日」画面に近い形式)。縦スワイプで複数ウィジェットを一覧できる。

## 特徴

- 内蔵ウィジェットが30種類以上あり、天気、通知、メッセンジャー、音楽再生コントロール、頻繁に使うアプリ、連絡先、テンキー、タイマー、メール、メモ、タスク、ニュース、カレンダー、為替レート、システムモニターなどをホーム画面上に直接表示できる
- Android標準ウィジェットにも対応
- **[[lua|Lua]]スクリプト**でウィジェットや検索結果を自作・拡張できる(v4.0以降)。スクリプト集は[GitHub (zobnin/aiolauncher_scripts)](https://github.com/zobnin/aiolauncher_scripts)で公開されている(ランチャー本体はオープンソースではない)
- Tasker連携で日常タスクの自動化が可能
- 強力な検索機能で、Web・アプリ・連絡先・ウィジェットを一箇所から横断検索できる
- ChatGPT統合(サブスクリプション機能)で、アプリの自動分類や検索結果への応答なども可能

## 料金

本体は基本無料(フリーミアム)。ChatGPT統合など一部機能はサブスクリプション。

## 過去のブログ記事での評価

2022年6月に[「AIO Launcher がライフチェンジングだった件」](https://blog.64p.org/entry/2022/06/20/040944)で取り上げた。以下の点を高く評価している。

- 通知がホーム画面に直接表示される点
- 複数ウィジェットを縦スワイプで一覧できる操作性
- 折りたたみ式端末でも画面崩れが起きない安定性
- フローティングSearchボタン長押しで設定にアクセスできる簡潔さ

日本語非対応という制約はありつつも「ほんとにオススメ」と結論づけている。

## 出典

- [「AIO Launcher」 - Androidアプリ - APPLION](https://applion.jp/android/app/ru.execbit.aiolauncher/)
- [AIO Launcher - Google Play のアプリ](https://play.google.com/store/apps/details?id=ru.execbit.aiolauncher&hl=en_US)
- [GitHub - zobnin/aiolauncher_scripts](https://github.com/zobnin/aiolauncher_scripts)
- [This Android launcher goes all in on widgets | Android Authority](https://www.androidauthority.com/aio-launcher-3607681/)
- [AIO Launcher がライフチェンジングだった件 - Blog](https://blog.64p.org/entry/2022/06/20/040944)
