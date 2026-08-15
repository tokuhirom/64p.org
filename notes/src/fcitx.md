---
created: 2026-08-15 22:18
updated: 2026-08-15 22:18
---
# Fcitx / Fcitx5

Linux/Unix向けの入力メソッドフレームワーク(IMF)。2002年、Yukingにより「Free Chinese Input Tool of X」として中国語専用の入力ツールとして開発が始まった([[scim|SCIM]]とほぼ同時期)。その後4.x系で汎用的なIMFへと発展し、Fcitx5はゼロから再設計された後継バージョンで、軽量なコア+アドオンによる拡張という構成、低レイテンシ、Wayland対応強化、Luaスクリプティングなどが特徴。

GNOME環境では[[ibus|IBus]]ほど統合が滑らかでない(Snapパッケージや一部アプリとの相性で追加設定が必要になることがある)一方、KDEユーザーや中華圏ユーザーの間で広く使われている。

## アドオンアーキテクチャ: `.so`ベースのプラグイン機構

Fcitx5の中核機能(フロントエンド・入力エンジン・UI・サポートモジュール)はすべて**アドオン**として実装され、実行時に動的ロードされる`.so`(共有ライブラリ)として提供される。

### 構成要素

- **AddonManager** — 全アドオンのライフサイクルを管理する中央オーケストレーター。メタデータ検出、依存関係解決、動的ライブラリのロード、インスタンス化を担当する。
- **AddonFactory** — `FCITX_ADDON_FACTORY_V2`マクロで実装されるファクトリパターン。各`.so`は`fcitx_addon_factory_instance`という`extern "C"`関数をエクスポートしており、SharedLibraryLoaderがこのシンボルを解決して`create()`を呼び出す。
- **AddonInstance** — 実際の機能を持つプラグインオブジェクト。アドオンの具体的な動作(入力エンジンのロジックなど)を実装する。

### ロード手順

1. `addon.conf`で指定された`Library`名から`.so`ファイルを特定
2. `StandardPath`経由でXDG準拠のディレクトリ(`lib/fcitx5`配下など)を検索
3. `dlopen`でライブラリをメモリにロード
4. `fcitx_addon_factory_instance`シンボルを`dlsym`で解決
5. factoryインスタンスの`create()`を呼び出し、AddonInstanceを取得

低レベルには`dlopen`/`dlsym`をラップした`Library`クラスが使われている。依存関係チェックでは「コアバージョン互換性」と「必須アドオンの存在確認」が行われ、オプション依存は`onDemand`フラグにより遅延ロードできる。

### `addon.conf`とCategory

各アドオンはINI形式の`addon.conf`でメタデータ(`Name`, `Category`, `Library`, `Dependencies`, `Enabled`など)を宣言する。設定の優先度は「コマンドライン > グローバル設定 > `addon.conf`のデフォルト」の順。

`Category`によってアドオンの役割が分かれる:

| Category | 役割 | 例 |
|---|---|---|
| Frontend | アプリケーションとの通信プロトコル | X11(XIM)、Wayland、DBusインターフェース |
| InputMethod | 入力エンジン | ピンイン、手書き認識などの変換エンジン |
| UI | ビジュアルインターフェース | classicui、kimpanelなど |
| Module | プラットフォーム機能 | XCB、Wayland、DBusモジュールなど |

`InputMethodManager`はこれらのアドオンをスキャンして利用可能な入力方式を構築する。この設計により、変換エンジン(Pinyin、Anthony、Mozcなど)やUIを`.so`単位で差し替え・追加でき、コア本体を軽量に保ったまま言語やデスクトップ環境ごとの拡張性を確保している。

## [[input-method-framework|入力メソッドフレームワーク]]の中での位置づけ

[[scim|SCIM]]とほぼ同時期に生まれ、中国語入力に特化した出自を持つIMF。Fcitx5でアーキテクチャを刷新し、KDE/中華圏を中心に[[ibus|IBus]]と並ぶ主要な選択肢になっている。

## 出典

- [Fcitx vs Ibus - Arch Linux Forums](https://bbs.archlinux.org/viewtopic.php?id=260838)
- [Fcitx5 - ArchWiki](https://wiki.archlinux.org/title/Fcitx5)
- [History - Fcitx](https://fcitx-im.org/wiki/Special:MyLanguage/History)
- [Fcitx - Wikipedia](https://en.wikipedia.org/wiki/Fcitx)
- [Addon System | fcitx/fcitx5 | DeepWiki](https://deepwiki.com/fcitx/fcitx5/2.3-addon-system)
- [Addon Type - Fcitx](https://fcitx-im.org/wiki/Addon_Type)
- [Register a addon in Fcitx - Fcitx Developer Handbook](http://fcitx.github.io/developer-handbook/article-register-addon.html)

#linux #ime
