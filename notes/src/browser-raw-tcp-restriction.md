---
created: 2026-08-11 07:41
updated: 2026-08-12 20:41
---
# ブラウザの生TCP/UDPソケット制限

一般的なWebページ（通常のブラウザタブで開くサイト）は、悪用防止のため生のTCP/UDPソケットを直接開くことができない。`WebSocket`・`fetch`・`WebRTC`といった標準のWeb通信APIは、この制約を前提に意図的に設計されている。

これが[[websockify]]のような[[websocket|WebSocket]]⇔TCPブリッジが必要とされる理由そのものであり、[[novnc]]が[[rfb]]サーバーへ直接ではなくWebSocket経由で接続する構成を取る背景にもなっている。

## 例外：Direct Sockets API

ChromeなどでTCP/UDPソケットを直接開ける「**Direct Sockets API**」が開発されている。ただしこれは「**Isolated Web Apps（IWA）**」という特別なアプリ形態限定の機能で、通常のブラウザタブで開く一般的なWebサイトには公開されていない。悪用リスクが高いため、厳格なCSPやクロスオリジン分離などの追加セキュリティ条件を満たすIWAでのみ有効化される。

## 将来的な動き：WebTransport

HTTP/3（QUIC）ベースの新しい多重化通信API「WebTransport」の標準化も進行中（W3Cで2026年内にCandidate Recommendation入りを目指している段階）。ただしこれも任意の生TCPを喋れるようにするものではなく、QUIC/HTTP3上の多重化トランスポートという位置づけ。

## 出典

- [direct-sockets | Direct Sockets API for the web platform](https://wicg.github.io/direct-sockets/docs/explainer.html)
- [Direct Sockets | Isolated Web Apps (IWA) | Chrome for Developers](https://developer.chrome.com/docs/iwa/direct-sockets)
- [Intent to Ship: Direct Sockets API](https://groups.google.com/a/chromium.org/g/blink-dev/c/5R0P_aYBWQI)

#protocol #browser
