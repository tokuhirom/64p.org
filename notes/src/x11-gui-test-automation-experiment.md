---
created: 2026-09-05 09:40
updated: 2026-09-05 09:40
---
# X11 GUI自動操作の実験

#linux #x11 #test #実験

[[x11-gui-test-automation|LinuxでGUIアプリの操作を自動化してテストする]]で調べたことを、実際に手元のマシンで動かして確認した記録。

## 環境と素材

- Ubuntu、`XDG_SESSION_TYPE=x11`
- `Xvfb`（仮想Xサーバー）、`xdotool 3.20160805.1`、`i3`（軽量WM）、ImageMagickの`import`/`compare`
- 操作対象は`zenity --entry`（GTK 4.14.5）。テキスト入力ダイアログで、確定した文字列をstdoutに吐くので**「入力が本当に届いたか」をファイル経由で機械的に検証できる**のが都合がよい
- 実験はすべて`DISPLAY=:99`のXvfb内で完結させ、実際に使っている`:0`には触れていない

## 実験1: Xvfb内のGTKアプリにキー入力を注入する

```sh
export DISPLAY=:99
Xvfb :99 -screen 0 1280x800x24 -nolisten tcp &
zenity --entry --title=EntryTest --text="type here" > /tmp/zenity-out.txt &

WID=$(xdotool search --sync --name '^EntryTest$' | head -1)
xdotool windowfocus --sync "$WID"
xdotool type --delay 30 'hello-xtest'
xdotool key --clearmodifiers Return
```

結果、`/tmp/zenity-out.txt`の中身は`hello-xtest`。GPUもディスプレイもない仮想Xサーバー上で、GTKアプリに外から入力を通せることを確認できた。

`xdotool search --sync`がウィンドウ出現までブロックした時間は実測1.54秒。`sleep 3`のような固定待ちを撒くより明確に良い。

## 躓いた点: WMがないと`windowactivate`が使えない

Xvfbだけを立てて`xdotool windowactivate`を呼ぶと失敗する。

```
Your windowmanager claims not to support _NET_ACTIVE_WINDOW,
so the attempt to activate the window was aborted.
```

`windowactivate`はEWMHの`_NET_ACTIVE_WINDOW`メッセージをWMに送る実装なので、WMがいない環境では原理的に動かない。一方`windowfocus`は`XSetInputFocus`を直接呼ぶだけなので、WMなしでも通る。

```
== windowactivate (EWMH経由 = WM必要) ==  activate FAILED
== windowfocus (XSetInputFocus = WM不要) == focus OK
```

WMを上げるとどうなるかも確認した。`i3 -c /dev/null`を起動すると`_NET_SUPPORTING_WM_CHECK`が立ち、`windowactivate`が成功するようになる。2枚のダイアログを開いて交互にactivateし、それぞれに別々の文字列をタイプしたところ、狙い通りに振り分けられた。

```
== windowactivate A ==  activate A OK   focus=10485764 (A)
== windowactivate B ==  activate B OK   focus=12582916 (B)
A=[typed-into-A]  B=[typed-into-B]
```

複数ウィンドウを行き来するテストを書くならWMは必須、単一ウィンドウなら`windowfocus`だけで足りる、という切り分けになる。

## 実験2: XTESTとXSendEventの違い

`xdotool type`はXTEST経由でグローバルに注入するが、`--window <id>`を付けるとXSendEventで特定ウィンドウに直接送る実装に切り替わる。「では裏にあるウィンドウを直接叩けるのか」を確かめた。

**フォーカスが当たっている状態**でXSendEventを送ると、GTK4のzenityは普通に受け取った。

```
(a) xdotool type --window $WID 'SENDEVENT'
(b) xdotool type 'XTEST'
→ zenityが受け取った文字列: [SENDEVENTXTEST]
```

つまり「GTKは`send_event`フラグの立ったイベントを一律に無視する」わけではない。

ところが**フォーカスが別ウィンドウにある状態**で、非フォーカスのウィンドウBにXSendEventを送ると届かない。Bにフォーカスを移してからXTESTで追記・確定させて中身を見た。

```
1. フォーカスをAに固定
2. xdotool type --window $B 'sendevent-while-unfocused'   ← XSendEvent
3. フォーカスをBに移して xdotool type '|xtest' + Return   ← XTEST

Bが最終的に持っていた文字列: [|xtest]
```

`sendevent-while-unfocused`は完全に消えている。X サーバーはイベントをBに配送しているはずなので、捨てているのはツールキット側。GDKが自前のフォーカス状態を見て、フォーカスを持たないトップレベルへのキーイベントを破棄していると考えられる。

**結論**: `--window`指定は「裏のウィンドウをこっそり操作する」用途には使えない。素直にフォーカスを移してXTESTで叩く。

## 実験3: スクリーンショットは再現するのか

スナップショットテストが成立するかを確かめるため、**Xvfbごと2回起動し直して**同じダイアログを撮り、ピクセル比較した。

```sh
compare -metric AE /tmp/snap1.png /tmp/snap2.png /tmp/snapdiff.png
```

```
/tmp/snap1.png PNG 310x237 ... 189c 2545B
/tmp/snap2.png PNG 310x237 ... 189c 2545B
差分(AE = 異なるピクセル数): 0
```

同一マシン・同一Xvfb設定なら、プロセスを立て直しても**1ピクセルも変わらない**。ファイルサイズも色数も完全一致した。X11のレンダリングは十分に決定論的で、スナップショットテスト自体は成立する。

問題になるのは環境をまたいだときで、崩れる要因はX11ではなくフォント・DPI・テーマ側にある。CIでやるならそちらを固定しに行く必要がある、という読み方になる。

## コードから読み取れること

- `xdotool`の各サブコマンドは、裏でどのX APIを使っているかで**WMへの依存度が違う**。`windowactivate`（EWMH）・`windowfocus`（XSetInputFocus）・`type`（XTEST）・`type --window`（XSendEvent）はそれぞれ別物で、失敗したときはまずどの層で落ちているかを切り分ける。
- `--sync`が付けられるサブコマンドは積極的に使う。GUI自動化の[[flaky-test|flaky test]]の大半は「まだ出ていないウィンドウを触る」ことに起因する。
- 検証は「スクリーンショットを見る」よりも、**アプリの出力をファイルや終了コードで受け取れる形に持ち込む**ほうが遥かに楽で確実。zenityのようにstdoutへ結果を吐く小さな部品をテスト用に用意する発想は、自作アプリのテストでも使える。
