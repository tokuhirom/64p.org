---
created: 2026-09-05 09:40
updated: 2026-09-05 09:40
---
# LinuxでGUIアプリの操作を自動化してテストする

#linux #x11 #test #gui

デスクトップアプリを「外側から」操作してテストする話。アプリ内部のテストフレームワーク（[[gpui-testing|GPUIアプリのテスト]]のようなもの）では検証できない領域——本当にウィンドウが出るか、ウィンドウマネージャとの連携、IME、クリップボードの実挙動——を確かめるために使う。

実際に手を動かした記録は[[x11-gui-test-automation-experiment|X11 GUI自動操作の実験]]にある。

## 土台: XTEST拡張

X11でのGUI自動化はほぼすべて**XTEST拡張**の上に載っている。Xサーバーに対して「本物の入力デバイスから来たかのように」イベントを注入する仕組みで、`XSendEvent`で特定ウィンドウにイベントを投げるのとは意味が違う。

| | XTEST | XSendEvent |
| --- | --- | --- |
| 注入先 | サーバーの入力パイプラインの根元（グローバル） | 指定したウィンドウ |
| 宛先の決まり方 | 現在のキーボードフォーカス／ポインタ位置に従う | 明示指定 |
| アプリからの見え方 | 本物の入力と区別できない | `send_event`フラグが立つ |

`xdotool`、`xte`(xautomation)、PyAutoGUI、Rustの`enigo`はどれも中身はXTEST。XTESTはグローバルなので、**入力前に必ずフォーカスを固定する**のが鉄則であり、そのために専用のXサーバー（Xvfb）を立てるのが定番になる。

`xdotool type --window <id>`のように宛先ウィンドウを明示するとXSendEventが使われるが、これで非フォーカスのウィンドウを裏から操作できるわけではない。GTK4で試した限り、ツールキット側の内部フォーカス状態を見て捨てられる（[[x11-gui-test-automation-experiment|実験]]参照）。挙動はツールキット依存なので、素直にフォーカスを移してからXTESTで叩くほうがよい。

## 3つのアプローチ

| 層 | 代表ツール | 操作の指定方法 | 弱点 |
| --- | --- | --- | --- |
| 座標ベース | `xdotool`, `xte`, PyAutoGUI, `enigo` | 「(320,150)をクリック」 | レイアウト変更で即死 |
| アクセシビリティツリー | dogtail, selenium-webdriver-at-spi, X11::GUITest | 「"保存"という名前のボタンを押す」 | 一番堅牢だが対応アプリが要る |
| 画像マッチング | openQA(os-autoinst)のneedle, SikuliX, OpenCV | 「この画像が写っている場所を押す」 | テーマ・フォントで壊れる |

**AT-SPI2（アクセシビリティ）が使えるなら最優先**。GTK / Qt / Electronは対応しているので、dogtailから`app.child('保存', roleName='push button').click()`のように意味レベルで書ける。ツリーの中身は`accerciser`で覗きながら開発する。KDE陣営の`selenium-webdriver-at-spi`は、これをWebDriverプロトコルに被せてSeleniumの各言語バインディングから叩けるようにしたもの。[[playwright|Playwright]]がブラウザに対してやっていることの、デスクトップ版に相当する。

逆に**[[gpui|GPUI]]のような「全部自前で描画する」フレームワークはAT-SPIツリーを出さない**（あるいは非常に薄い）ので、外側からは座標か画像でしか掴めない。ここがGUI自動化の分かれ目になる。

## ヘッドレス実行

一番簡単なのは`xvfb-run`。

```sh
xvfb-run -a -s "-screen 0 1280x800x24" cargo test --test e2e
```

ただしウィンドウマネージャがいないと、`xdotool windowactivate`（EWMHの`_NET_ACTIVE_WINDOW`経由）が使えない。実アプリのテストでは軽量WMを一緒に上げる。

```sh
#!/bin/sh
export DISPLAY=:99
Xvfb :99 -screen 0 1280x800x24 -nolisten tcp &
i3 -c /dev/null &     # or fluxbox / openbox
sleep 1

./target/debug/myapp &
WID=$(xdotool search --sync --name '^MyApp$' | head -1)
xdotool windowactivate --sync "$WID"
xdotool key --clearmodifiers ctrl+n
xdotool type --delay 20 'hello'
import -window "$WID" /tmp/shot.png
```

- `xdotool search --sync` — ウィンドウが出現するまでブロックする。`sleep`を撒くより遥かに安定する（[[flaky-test]]対策）。同様に`--sync`は`windowactivate`/`windowfocus`にも付けられる。
- `--clearmodifiers` — 前の操作で押しっぱなしになった修飾キーを解除してから叩く。
- WMを上げない場合は`windowactivate`ではなく`windowfocus`（`XSetInputFocus`を直接呼ぶ）を使えば単一ウィンドウなら足りる。
- デバッグ時はXvfbの代わりに**`Xephyr :99 -screen 1280x800`**を使うと、入れ子のXサーバーの中身を目で見ながら開発できる。CIではXvfb、手元ではXephyr、という使い分け。
- 録画は`x11vnc`+[[vnc|VNC]]クライアント、または`ffmpeg -f x11grab -i :99 out.mp4`。

## スクリーンショットによる検証

```sh
import -window "$WID" actual.png
compare -metric AE -fuzz 2% actual.png expected.png diff.png
```

同一マシン・同一Xvfb設定であれば、別プロセスとして起動し直しても描画は1ピクセルも変わらない（実験で`AE=0`を確認）。つまりスナップショットテスト自体は成立する。壊れるのは環境をまたいだときで、フォント・DPI・アンチエイリアス・テーマのどれかが違えば即座に差分が出る。CIでやるなら、

- テスト専用の`FONTCONFIG_FILE`でフォントを固定する
- Xvfbの解像度・色深度を固定する
- 画面全体ではなくopenQAのneedleのように小領域だけをあいまい一致で照合する

くらいまで揃える必要がある。

## Waylandでは

XTESTに相当する統一手段が**ない**。xdotool作者のJordan Sissel自身が、コンポジタごとに手段がバラバラな現状について「進め方に途方に暮れている」と書いている。

- **libei + XDG RemoteDesktop portal** — 標準路線。portal 1.17（2023年半ば）で統合され、1.21でセッション永続化（毎回の許可ダイアログを省く仕組み）が入った。ただしGNOME/KDEでは初回に許可ポップアップが出る。
- **wlroots系** — `virtual-keyboard-unstable-v1` / `virtual-pointer`プロトコル。`wtype`、`wdotool`など。
- **KDE** — `kdotool`。GNOMEでは動かない。
- **ydotool** — `/dev/uinput`に直接書くのでコンポジタ非依存だが、権限（rootかuinputグループ）が要り、フォーカスやパーミッションの概念を無視して盲目的に叩く。
- CI用のヘッドレスWaylandは`sway`の`WLR_BACKEND=headless`、または`weston --backend=headless`。

## Rustアプリの場合

入力注入は`enigo`クレートがX11 / Wayland / libeiをカバーする（Waylandとlibeiはexperimentalでフィーチャフラグの下にある）。X11では`libxdo-dev`が要る。

ただし[[gpui|GPUI]]アプリなら、まず[[gpui-testing|GPUI内蔵のテスト機構]]で内側からテストするほうが速くて安定する。外側のX11自動化は、内側では検証できないものに絞るのが現実的な線引き。

## 出典

- [ContinuousIntegration/GUI - Debian Wiki](https://wiki.debian.org/ContinuousIntegration/GUI)
- [Exploring the Fragmentation of Wayland, an xdotool adventure - semicomplete](https://www.semicomplete.com/blog/xdotool-and-exploring-wayland-fragmentation/)
- [libei integrations in the XDG RemoteDesktop and InputCapture portals - Who-T](http://who-t.blogspot.com/2026/07/libei-integrations-in-xdg-remotedesktop.html)
- [enigo-rs/enigo - GitHub](https://github.com/enigo-rs/enigo)
- [wdotool - GitHub](https://github.com/cushycush/wdotool)
