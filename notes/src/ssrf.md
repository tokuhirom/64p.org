---
created: 2026-08-14 14:20
updated: 2026-08-14 15:35
---
# SSRF（Server-Side Request Forgery）

サーバーサイドのアプリケーションが、ユーザー入力由来のURL・ホスト名を検証せずに外部リソースを取得（HTTPリクエスト送信など）してしまう脆弱性。攻撃者はこの挙動を悪用し、ファイアウォールやVPNの内側にいるサーバー自身に任意の宛先へリクエストを送らせることができる。[[owasp-top-10|OWASP Top 10]]の2021年版では単独カテゴリ「A10:2021 – Server-Side Request Forgery」として採用されていたが、2025年版ではBroken Access Controlカテゴリに統合された。[[owasp-api-security-top-10|OWASP API Security Top 10]]（2023年版）では引き続き「API7:2023 Server Side Request Forgery」として単独カテゴリになっている。

## 典型的な悪用例

- **クラウドメタデータサービスへのアクセス**: `http://169.254.169.254/`（AWS/GCP/Azureのインスタンスメタデータエンドポイント）にリクエストさせ、一時的なIAM認証情報などを窃取する。
- **内部ネットワークのポートスキャン**: `http://internal-host:port` への到達可否やレスポンス差分から内部構成を推測する。
- **内部限定サービスへのアクセス**: 外部公開されていない管理画面・DB・HTTP対応の内部APIへ到達し、読み取り・書き込みを行う。

「画像URLを指定させてサーバー側でフェッチする」「Webhook登録」「URLプレビュー生成」のように、サーバーが外部URLをユーザー入力から受け取って叩く機能が典型的な攻撃対象になる。

## 対策の方向性

- 入力URLのallowlist検証（スキーム・ホスト・ポートの制限）。
- **DNS解決結果やリダイレクト先も含めて**内部IPレンジ（loopback、link-local、プライベートIP等）への到達を遮断する。URL文字列だけを見た事前検証は、後述のDNS rebindingで回避されうる。
- ネットワークレイヤーでもサーバーからの内部宛て通信を制限する（多層防御）。

### DNS rebinding（TOCTOU）

URL検証時点で名前解決したIPが「安全」であっても、実際に接続する時点で同じホスト名が別のIPを返す（攻撃者が管理するDNSサーバーが最初のクエリでは無害なIPを返し、後続のクエリで内部IPを返す）と、検証をすり抜けて内部アドレスに接続してしまう。これがTime-of-Check to Time-of-Use（TOCTOU）としてのDNS rebinding。対策は「検証」と「接続」の間にDNS再解決の余地を残さないこと。

## Goでの対策実装

### `net.Dialer.Control` によるIP検証

Goの`net.Dialer`は`Control`フィールドにフックを渡せる。このフックはDNS解決が完了し、実際にTCP接続を確立する直前に呼ばれるため、「検証したIP」と「接続するIP」が一致することが保証され、DNS rebindingを構造的に防げる。

```go
package main

import (
	"fmt"
	"net"
	"net/http"
	"syscall"
)

func safeControl(network, address string, _ syscall.RawConn) error {
	host, port, err := net.SplitHostPort(address)
	if err != nil {
		return err
	}
	ip := net.ParseIP(host)
	if ip == nil {
		return fmt.Errorf("invalid IP: %s", host)
	}
	if ip.IsLoopback() || ip.IsPrivate() || ip.IsLinkLocalUnicast() ||
		ip.IsLinkLocalMulticast() || ip.IsUnspecified() {
		return fmt.Errorf("blocked SSRF target: %s", ip)
	}
	if port != "80" && port != "443" {
		return fmt.Errorf("blocked port: %s", port)
	}
	return nil
}

func main() {
	dialer := &net.Dialer{Control: safeControl}
	client := &http.Client{
		Transport: &http.Transport{DialContext: dialer.DialContext},
	}
	_ = client
}
```

`net.IP.IsPrivate()`（Go 1.17+）で `10.0.0.0/8` `172.16.0.0/12` `192.168.0.0/16` 等のRFC1918アドレスを、`IsLoopback()`/`IsLinkLocalUnicast()`等でその他の特殊用途アドレスを判定できる。`Control`は`network`/`protocol`にも関わらずTCP/UDPを使うあらゆる通信に効くので、HTTP以外のプロトコルでも同じ仕組みが使える。

### リダイレクトの扱い

`http.Client`はデフォルトでリダイレクトを追跡する。`CheckRedirect`でリダイレクト先を検証する方法もあるが、これは別途DNS解決をやり直す必要がある上、検証と実際の接続の間にTOCTOUの隙間ができうる。

一方、`Control`フックを使う方式ではリダイレクト追跡時も内部的に`DialContext`が呼び直され、その都度`Control`が発火する。そのため、追加の`CheckRedirect`実装をしなくても、リダイレクト先への接続も同じIP検証を通過する。

### 既存ライブラリ

自前実装の代わりに以下が使える。

- [code.dny.dev/ssrf](https://pkg.go.dev/code.dny.dev/ssrf) — IANA Special Purpose Registryと同期したブロックリストを持つ`Guardian`を`net.Dialer.Control`に差し込むだけで使える。デフォルトで許可ネットワークは`tcp4`/`tcp6`、許可ポートは`80`/`443`のみ。
- [doyensec/safeurl](https://github.com/doyensec/safeurl) — `net/http.Client`をラップし、allow/blockリストとDNS rebinding対策を備える。

## 関連

同じくAPIセキュリティ文脈の脆弱性カテゴリとして[[bola|BOLA]]（オブジェクトレベル認可の不備）がある。SSRFは「サーバーに任意の宛先へリクエストさせる」、BOLAは「他人のオブジェクトIDを指定させる」という、どちらもサーバー側が入力を過信することに起因する脆弱性。

## 出典

- [A10 Server Side Request Forgery (SSRF) - OWASP Top 10:2021](https://owasp.org/Top10/2021/A10_2021-Server-Side_Request_Forgery_(SSRF)/)
- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [Server Side Request Forgery | OWASP Foundation](https://owasp.org/www-community/attacks/Server_Side_Request_Forgery)
- [Server Side Request Forgery Prevention - OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/cheatsheets/Server_Side_Request_Forgery_Prevention_Cheat_Sheet.html)
- [What is SSRF (Server-side request forgery)? Tutorial & Examples | Web Security Academy](https://portswigger.net/web-security/ssrf)
- [Preventing Server-Side Request Forgery in Golang - agwa.name](https://www.agwa.name/blog/post/preventing_server_side_request_forgery_in_golang)
- [code.dny.dev/ssrf - Go Packages](https://pkg.go.dev/code.dny.dev/ssrf)

#security #go
