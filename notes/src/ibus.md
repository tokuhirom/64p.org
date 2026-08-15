---
created: 2026-08-15 22:18
updated: 2026-08-15 22:18
---
# IBus (Intelligent Input Bus)

Linux/Unix向けの入力メソッドフレームワーク(IMF)。Red HatのHuang Pengが開発し、2008年に初リリースされた。名前の「Bus」は、その名の通りバス的なアーキテクチャに由来する。

## アーキテクチャ

D-Busを使って`ibus-daemon`・各入力エンジン・アプリケーション(IMクライアント: 端末エミュレータ、エディタ、ブラウザなど)間を通信させる、モジュール式のD-Busベース設計。`ibus-daemon`が中心的なハブとなり、アプリケーションからの入力イベントを入力エンジンへルーティングし、エンジンからのUI更新をアプリケーションやパネルへ返す役割を担う。主要コンポーネントはdaemon・input context・engine proxy・panel proxyで構成される。

[[fcitx|Fcitx]]が`.so`共有ライブラリを`dlopen`で動的ロードするアドオン機構でエンジンやフロントエンドを拡張するのに対し、IBusはD-Busのメッセージングを介してプロセス間で疎結合にエンジンと連携する点がアーキテクチャ上の対比点。

## 採用history

2009年、Fedora 11で[[scim|SCIM]]を置き換えてデフォルトの入力メソッドフレームワークになり、同年Ubuntu 9.10でもSCIMからの移行が進んだ。現在もGNOMEに深く統合されており、GNOME環境でのデフォルトIMFという位置づけが強い。

## 手元での観測

[[bpftrace-experiment|bpftraceの実験]]で`do_nanosleep`を追跡した際、`ibus-ui-gtk3`が定期的にポーリング/スリープしているデーモンプロセスとして観測された。

## [[input-method-framework|入力メソッドフレームワーク]]の中での位置づけ

[[scim|SCIM]]の後継としてFedora/Ubuntuのデフォルトの座を得たIMF。D-Busベースの疎結合な設計で、特にGNOME環境との親和性が高い。

## 出典

- [ibus/ibus | DeepWiki](https://deepwiki.com/ibus/ibus/1-overview)
- [Intelligent Input Bus - Wikipedia](https://en.wikipedia.org/wiki/Intelligent_Input_Bus)
- [Features/IBus - Fedora Project Wiki](https://fedoraproject.org/wiki/Features/IBus)
- [IBus - ArchWiki](https://wiki.archlinux.org/title/IBus)

#linux #ime
