---
created: 2026-08-15 22:18
updated: 2026-08-15 22:18
---
# SCIM (Smart Common Input Method)

Linux/BSDなどPOSIX系OS向けの入力メソッドフレームワーク(IMF)。中国語・日本語・韓国語(CJK)を含む30以上の言語の入力をサポートすることを目的に、James Su (Su Zhe) によって2001年頃開発が始まった。

## アーキテクチャ

モジュール化された設計で、各言語の入力エンジンを動的ロード可能なコンポーネントとして実装できる。これにより、SCIM向けに書かれた入力メソッドを、環境ごとに書き直したり再コンパイルしたりせずに使い回せることを狙っていた。実装言語は当初C++だったが、1.4.14以降は純Cに移行している。

## 採用history

Red Hat Enterprise Linux 5やFedora 10などでデフォルトの入力メソッドフレームワークとして採用されていた時期がある。その後、[[ibus|IBus]]がFedora 11(2009年)でデフォルトの座を置き換え、同時期にUbuntuでも[[ibus|IBus]]への移行が進んだ。[[fcitx|Fcitx]]もほぼ同時期(2002年〜)に開発が始まった別系統のIMFで、SCIMの後継というよりは並行して存在していたプロジェクト。

現在の主要ディストリビューションではSCIMは基本的にデフォルト採用されておらず、歴史的な位置づけの存在になっている。

## [[input-method-framework|入力メソッドフレームワーク]]の中での位置づけ

[[ibus|IBus]]・[[fcitx|Fcitx]]以前から存在する初期のLinux向けIMFの一つ。後発の2つに主要ディストリのデフォルトの座を譲った。

## 出典

- [Smart Common Input Method - Wikipedia](https://en.wikipedia.org/wiki/Smart_Common_Input_Method)
- [Smart Common Input Method - ArchWiki](https://wiki.archlinux.org/title/Smart_Common_Input_Method)
- [Chapter 7. Smart Common Input Method - Red Hat Enterprise Linux 5 Documentation](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/5/html/international_language_support_guide/red_hat_enterprise_linux_international_language_support_guide-smart_common_input_method)

#linux #ime
