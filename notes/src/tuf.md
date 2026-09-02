---
created: 2026-09-02 22:18
updated: 2026-09-02 22:18
---
# TUF (The Update Framework)

ソフトウェア更新システムを、鍵の漏洩やリポジトリの侵害があっても最悪の事態にならないように設計するための枠組み。CNCFのgraduatedプロジェクト。 #security #supply-chain-attack #signing

## 前提としている脅威

「更新サーバが乗っ取られたら終わり」「署名鍵が1本漏れたら終わり」という状態を避けたい、という発想が出発点。TUFが明示的に対処しようとする攻撃には次のようなものがある。

- **rollback攻撃** — 古い(脆弱性が残った)バージョンを最新だと偽って配る
- **freeze攻撃** — 更新が出ていないふりをして、クライアントを古いバージョンに留め置く
- **mix-and-match攻撃** — 個々には正規だが、組み合わせとしては存在しなかったパッケージ群を配る
- **鍵の漏洩** — 1本の鍵が漏れても全体が崩れないようにする

## 4つのロール

責務を分割し、**それぞれ別の鍵で署名する**。鍵が漏れたときの被害範囲(blast radius)がロールごとに閉じるのが肝。

| ロール | 役割 | 更新頻度 | 鍵の置き場所 |
|---|---|---|---|
| **root** | 他の全ロールの公開鍵を管理する信頼の起点。鍵の追加・削除・失効を行う | 稀 | オフライン。最も厳重に保護 |
| **targets** | 実際の配布ファイルのハッシュとサイズを列挙する。他のロールへの委譲もできる | ファイル追加時 | オフライン推奨 |
| **snapshot** | その時点の全メタデータのバージョン/ハッシュを列挙し、一貫したビューを保証する | targets更新時 | オンライン可 |
| **timestamp** | snapshotのハッシュとサイズを短い有効期限付きで署名する。クライアントが最初に取りに行くファイル | 頻繁(数時間〜1日) | オンライン |

timestamp の有効期限が短いことで freeze攻撃を、snapshot が全体の整合を取ることで mix-and-match攻撃を、バージョン番号の単調増加チェックで rollback攻撃を防ぐ構造になっている。

## しきい値署名と鍵ローテーション

各ロールには **threshold**(必要な署名数)が設定でき、「5本のうち3本」といった形にできる。1本盗まれただけでは悪意ある更新を押し込めない。鍵ローテーションはインシデント対応の特別手順ではなく、rootメタデータの更新として通常の設計に組み込まれている。

## 委譲 (delegation)

targets ロールは、特定のパスやパッケージについて別のロールへ信頼を委譲できる。「このnamespaceのパッケージについてはこのチームの鍵を信頼する」といった分割が可能で、大規模なパッケージリポジトリでの運用を成立させている。

## 使われている場所

- [[sigstore|Sigstore]] — Fulcioのルート証明書やRekorの公開鍵といった「信頼の起点」の配布にTUFを使っている
- PyPI — PEP 458/480 でTUFの採用が定められている
- Docker Notary、RustupやDatadogのagent配布など

## 出典

- [Roles and metadata | TUF](https://theupdateframework.io/docs/metadata/)
- [The Update Framework Specification](https://theupdateframework.github.io/specification/latest/)
- [The Update Framework - Wikipedia](https://en.wikipedia.org/wiki/The_Update_Framework)
