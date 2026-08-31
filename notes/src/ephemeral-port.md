---
created: 2026-08-31 13:01
updated: 2026-08-31 13:01
---
# エフェメラルポート

クライアントが外向きに接続するとき、送信元ポートとしてOSが自動的に割り当てる短命なポート番号のこと。一時ポート・動的ポート(dynamic port)・プライベートポートとも呼ぶ。`connect()`する際や、ポート番号0を指定して`bind()`した際にカーネルが範囲内から未使用のものを選ぶ。

例えばHTTPSサイトを開くと、宛先は443番だが、手元のマシン側は`52431`のような番号が都度割り当てられる。TCPの接続は「送信元IP・送信元ポート・宛先IP・宛先ポート」の4つ組で識別されるので、同じサーバーに何本も接続を張れるのはこの送信元ポートが毎回違うおかげ。

## 範囲はOSによって違う

RFC 6335でIANAは **49152–65535** をDynamic/Private Portsとして定義しており、「登録は行わない、自動割り当て用」という位置づけになっている。ただし実際の範囲はOSごとにばらばら。

| OS | 範囲 | 確認方法 |
|---|---|---|
| Linux | 32768–60999 | `sysctl net.ipv4.ip_local_port_range` |
| macOS | 49152–65535 | `sysctl net.inet.ip.portrange.first net.inet.ip.portrange.last` |
| Windows (Vista以降) | 49152–65535 | `netsh int ipv4 show dynamicport tcp` |

Linuxだけ32768始まりなのは歴史的経緯で、IANAの範囲に合わせる提案がLKMLに出たこともあるが、既存の環境で32768–49151に置かれているサービスを壊す懸念などから現在も独自の範囲が使われている。手元のPop!_OS (Linux 7.0.11)でも:

```sh
$ sysctl net.ipv4.ip_local_port_range
net.ipv4.ip_local_port_range = 32768	60999
```

macOSは10.7以降が49152–65535で、IANAの範囲と一致するかわりに16383個しかない。

## listenするポートに使ってはいけない

エフェメラルポート範囲はOSが自由に使ってよい領域なので、サーバーのlistenポートをこの範囲に固定で置くと、起動前に他プロセスの外向き接続がたまたま同じ番号を掴んでいて`bind()`が`EADDRINUSE`で失敗することがある。しかも再現性が低く、「たまに起動に失敗する」という形で現れるので厄介。

サービス用のポートは1024–49151(registered ports)のうち、他で使われていない番号から選ぶのが本来の作法。実際に範囲内の番号を固定で使って問題になった例として[[macos-port-55555]]がある(こちらはOS自身の予約という別要因も絡む)。

Linuxではどうしてもエフェメラル範囲内の番号を使いたい場合、`net.ipv4.ip_local_reserved_ports`にその番号を並べておくと自動割り当ての対象から外せる。カーネルドキュメントいわく "These ports will not be used by automatic port assignments (e.g. when calling connect() or bind() with port number 0)." で、`1,2-4,10-10`のようなカンマ区切り・範囲指定の書式。明示的に番号を指定した`bind()`は影響を受けない。

## 枯渇

1台のクライアントから同一の宛先IP:ポートへ大量に接続を張ると、4つ組のうち動かせるのが送信元ポートだけなので、範囲のサイズが同時接続数の上限になる。加えてTCPのアクティブクローズ側は`TIME_WAIT`(通常60秒)の間ポートを保持するため、短い接続を高頻度で張り直すワークロードでは実効的な上限がさらに下がる。

対策としては、範囲を広げる(`ip_local_port_range`を`10000 65535`にするなど)、コネクションをkeep-aliveで使い回す、`net.ipv4.tcp_tw_reuse`を有効にする、宛先を複数のIPに分散する、といった手が取られる。

[[nat|NAPT]]配下では、複数の端末の接続をルーター側の少数のグローバルIPに集約する際にもこの送信元ポートが使われるので、NAT機器の側でも同じ枯渇問題が起きる。

## 出典

- [RFC 6335 - Internet Assigned Numbers Authority (IANA) Procedures for the Management of the Service Name and Transport Protocol Port Number Registry](https://www.rfc-editor.org/rfc/rfc6335)
- [IP Sysctl — The Linux Kernel documentation](https://www.kernel.org/doc/html/latest/networking/ip-sysctl.html)
- [Increase ephemeral port range on macOS](https://gist.github.com/ryenus/17b251da9244848545ecd37905f1cb15)
- [LKML: net: Use standardized (IANA) local port range (PATCH v2)](https://lkml.iu.edu/hypermail/linux/kernel/2008.3/07535.html)
- [What are dynamic port numbers and how do they work? - TechTarget](https://www.techtarget.com/searchnetworking/definition/dynamic-port-numbers)

#networking #linux #macos
