---
created: 2026-08-30 20:07
updated: 2026-08-30 20:07
---
# パストラバーサル

Webサーバーやアプリケーションが、リクエスト由来のパス文字列を検証せずにファイルシステム上のパスへ変換した結果、公開ディレクトリ(docroot)の外にあるファイルを読み書きできてしまう脆弱性。`../` を含むパスを与えて上位ディレクトリへ遡る形が基本形。ディレクトリトラバーサル、Local File Inclusion (LFI) とも呼ばれる。CWE-22 (Improper Limitation of a Pathname to a Restricted Directory)。

#security

## エンコード変種

素の `../` を弾くだけでは足りず、同じ意味になる表現が多数ある。

| 表現 | 内容 |
| --- | --- |
| `..%2f` / `%2e%2e%2f` | パーセントエンコード。`%2f` が `/`、`%2e` が `.` |
| `..%252f` / `%252e%252e%252f` | 二重エンコード。1回デコードすると `..%2f` に戻る |
| `..\` / `..%5c` | Windowsのパス区切り |
| `%c0%ae` | 不正なUTF-8のoverlong encodingによる `.` の表現 |
| `....//` | `../` を1回だけ除去する実装だと、除去後に `../` が残る |

このため、文字列マッチによる拒否リスト方式は破られやすい。処理順序を正した正規化のほうが堅い → [[decode-then-normalize]]

## 汎用スキャナに標準で載っている

パストラバーサルの探索は、特定の製品を狙わない汎用ペイロードとして各種スキャナに古くから同梱されている。nucleiのテンプレート集(2026年8月時点)を数えると次の通り。

```sh
git clone --depth 1 --filter=blob:none --sparse https://github.com/projectdiscovery/nuclei-templates.git
cd nuclei-templates && git sparse-checkout set http
find http -name '*.yaml' | wc -l                                          # 11298
grep -rlE '\.\.(%2f|%252f|/|\\)' http --include='*.yaml' | wc -l           # 696
grep -rliE '%2e%2e|\.\.%2f|%252e|%c0%af' http --include='*.yaml' | wc -l   # 130
```

このうち `http/vulnerabilities/generic/generic-linux-lfi.yaml` はタグが `linux,lfi,generic,vuln` で、対象の実装を特定(fingerprint)せずに全ホストへ投げられる。1ホストあたり32本のリクエストを送り、ペイロードには以下が含まれる。

```yaml
payloads:
  paths:
    - "/etc/passwd"
    - "/..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2f..%2fetc/passwd"
    - "/%2e%2e%2e%2e%2e%2e%2e%2e%2e%2e%2e%2e%2e%2e%2e%2eetc/passwd"
    - "/.%252e/.%252e/.%252e/.%252e/.%252e/.%252e/.%252e/etc/passwd"
    - "/%c0%ae%c0%ae/%c0%ae%c0%ae/%c0%ae%c0%ae/etc/passwd"
```

`%c0%ae` は2001年頃のIIS Unicodeディレクトリトラバーサル由来の表現で、20年以上ワードリストに残り続けている。パーセントエンコードされたトラバーサル文字列は、インターネットに面したホストなら常時受け取る背景トラフィックの一部になっている。

## 事例

- [[cohttp-path-traversal-2026]] — OCamlのHTTPライブラリcohttpで、パスの正規化とパーセントデコードの順序が原因で発生(OSEC-2026-16 / CVE-2026-82481)
- Keras CVE-2026-11816 — v3.15.1で修正([[keras]])

## 出典

- [CWE-22: Improper Limitation of a Pathname to a Restricted Directory](https://cwe.mitre.org/data/definitions/22.html)
- [projectdiscovery/nuclei-templates](https://github.com/projectdiscovery/nuclei-templates)
