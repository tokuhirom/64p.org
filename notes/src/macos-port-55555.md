---
created: 2026-08-31 13:01
updated: 2026-08-31 13:01
---
# macOSでTCPポート55555が使えない

macOS 11 (Big Sur) / iOS 14 以降、**TCPの55555番ポートがシステムに予約されていて`bind()`できない**。しかもどのプロセスが握っているのかOSのポート一覧にまったく現れないので、原因究明がしづらい。

## 症状

```sh
$ nc -l 55555
nc: Address already in use

$ sudo lsof -i tcp:55555
（何も出ない）
```

`telnet localhost 55555`しても誰も応答しない。「使用中」と言われるのに、使っている主体が見えない。

## 原因

Apple DTS(Developer Technical Support)のエンジニアQuinnがフォーラムで次のように述べている。

> This fix frees up port 55555 for UDP. The port is still used by the system for TCP. Fixing that would be more challenging.

- **UDP 55555** — iOS 14でSSDPが動かなくなる不具合として報告され(Apple内部バグ r.68571291)、iOS 14.3のベータで解放された
- **TCP 55555** — システムが使い続けており、「直すのはより難しい」として現在も予約されたまま

どのシステムコンポーネントが掴んでいるのかはAppleから公開されていない。公式ドキュメントにも記載がない。

## 踏んだプロダクト

- **Solace PubSub+** — SMFのデフォルトポートが55555。Docker版の公式手順が`-p 55554:55555`のようにホスト側をずらすマッピングに変更された
- **webpack-plugin-serve** — デフォルトポートを55555から変えるissueが立った
- **vscode-csharp** — `waitForDebugger`が55555固定で、`debugger-agent: Unable to listen on 3`というエラーで動かなくなった

## 回避策

別のポートを使う以外にない。55554 / 55556 / 55566あたりに逃がすのが定番。コンテナならホスト側だけずらせばよい。

```sh
docker run -p 55554:55555 ...
```

## そもそも55555を選ぶべきでない

55555はmacOSの[[ephemeral-port|エフェメラルポート]]範囲(10.7以降は49152–65535)のど真ん中でもある。

```sh
$ sysctl net.inet.ip.portrange.first net.inet.ip.portrange.last
net.inet.ip.portrange.first: 49152
net.inet.ip.portrange.last: 65535
```

この範囲はOSが外向き接続の送信元ポートとして自由に割り当てる領域なので、Appleによる予約がなかったとしても、サーバーのlistenポートに固定で使うと他プロセスの外向き接続と衝突する可能性がある。ゾロ目で覚えやすいという理由で選ばれがちな番号だが、listen用には1024–49151から選ぶのが本来の作法。なおLinuxのエフェメラル範囲は32768–60999とmacOSと切り方が違うので、Linuxで問題なく動いていた構成がmacOSで踏む、という形にもなりやすい。

## 出典

- [iOS 14 can't use port '55555' for socket connection - Apple Developer Forums](https://developer.apple.com/forums/thread/659864)
- [SSDP Failing On iOS 14 devices - Apple Developer Forums](https://developer.apple.com/forums/thread/659524)
- [In recent MacOS BigSur update; port 55555 is blocked - Apple Developer Forums](https://developer.apple.com/forums/thread/672220)
- [Port 55555 in use on Mac OS Big Sur - Apple Developer Forums](https://developer.apple.com/forums/thread/671197)
- [Port 55555 blocked at MacOS Big Sur - Solace Community](https://community.solace.com/t/port-55555-blocked-at-macos-big-sur/585)
- [Port 55555 used for "waitForDebugger" is unavailable since macOS 11 - dotnet/vscode-csharp#5121](https://github.com/dotnet/vscode-csharp/issues/5121)
- [default port should no longer be 55555 - shellscape/webpack-plugin-serve#222](https://github.com/shellscape/webpack-plugin-serve/issues/222)

#macos #networking
