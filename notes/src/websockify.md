---
created: 2026-08-11 07:39
updated: 2026-08-12 20:41
---
# websockify

[[websocket|WebSocket]] ⇔ TCP のプロキシ／ブリッジ。ブラウザがWebSocket経由で任意のTCPベースのアプリケーション／サーバーに接続できるようにする。[[novnc]]の姉妹プロジェクトとして開発された。

## 存在理由

- [[browser-raw-tcp-restriction|ブラウザはセキュリティ制約上、生のTCP/UDPソケットを直接開けない]]ため、HTTP/HTTPSかWebSocketでしか外向き接続を確立できない。一方、標準的なVNCサーバーはポート5900+（[[rfb]]プロトコル）でTCPソケット通信を行う。
- websockifyはこの間を仲介するプロトコル変換役として動作し、noVNCクライアントからのWebSocket接続を受け付け、TCPソケット経由でVNCサーバーへデータを転送する。
- 重要な点として、websockify自身はVNCプロトコルのデータをパース・改変せず、WebSocketフレームとTCPストリームの間でバイト列を単純に中継するだけ。

## 実装

Python・C・Node.js・Rubyでの実装が存在する。最も一般的なのはPython版で、プロキシ機能に加えて[[novnc]]のクライアントファイルを配信するミニWebサーバー機能もオプションで含む。

## 出典

- [GitHub - novnc/websockify](https://github.com/novnc/websockify)
- [websockify/README.md at master · novnc/websockify](https://github.com/novnc/websockify/blob/master/README.md)
- [websockify(1): WebSockets to TCP socket bridge - Linux man page](https://linux.die.net/man/1/websockify)

#protocol #remote-desktop
