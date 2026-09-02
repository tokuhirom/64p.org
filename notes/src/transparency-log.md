---
created: 2026-09-02 22:18
updated: 2026-09-02 22:24
---
# 透明性ログ (transparency log)

「何が起きたかの記録を、追記専用かつ改竄検知可能な形で公開し、第三者が検証できるようにする」仕組みの総称。[[merkle-tree|Merkle木]]を使って、ログ運営者が過去の履歴を書き換えていないことを暗号学的に証明できるのが特徴。 #security #cryptography

## 発想

署名や証明書の仕組みは「正しい鍵で署名されたか」までは保証するが、「**その鍵の持ち主が裏でこっそり別のものにも署名していないか**」は保証しない。透明性ログは、発行・署名の記録をすべて公開の追記専用ログに載せることで、不正が必ず観測可能になる状態を作る。信頼を「悪いことができない」ではなく「**悪いことをしたら必ずバレる**」に置き換えるアプローチと言える。

## Merkle木と2つの証明

ログはエントリを葉とする[[merkle-tree|Merkle木]]として構成され、ルートハッシュ(tree head / checkpoint)に署名して公開する。ここから2種類の証明が導ける。

- **inclusion proof(包含証明)** — 「このエントリは、このルートハッシュを持つ木に含まれている」ことを、木全体をダウンロードせずに\(O(\log n)\)個のハッシュで証明する。
- **consistency proof(一貫性証明)** — 「新しいルートハッシュを持つ木は、古い木に**追記しただけ**のものである」ことを証明する。過去のエントリの削除・改変を検知できる。

利用者は前回見たチェックポイントを保存しておき、次に見たチェックポイントとの間で一貫性証明を検証することで、ログが履歴を書き換えていないことを継続的に確認できる。

## 具体例

- **[[certificate-transparency|Certificate Transparency]]** — TLS証明書の発行記録。最も成功した実例で、RFC 9162として標準化されている。ブラウザがSCTを要求することで、CTログに載っていない証明書は事実上使えない状態になっている。
- **Rekor** — [[sigstore|Sigstore]]の署名透明性ログ。誰がいつ何に署名したかが記録される。不審なパッケージリリースを検知するためのRekor監視という応用もある。
- **Go checksum database (`sum.golang.org`)** — Goモジュールのハッシュを記録する。`go` コマンドは毎回、前回見たtree headとの間で包含証明・一貫性証明を検証しており、エコシステム規模でクライアント側検証が回っている珍しい例。RFC 6962互換。

Googleの **Trillian** が長らくCTログとGo checksum databaseの実装基盤だった。近年はRPCサーバとDBを持たず、静的ファイルとしてログを配信する[[tile-based-transparency-log|タイルベースの方式]]へ移行が進んでいる。

## 限界

ログに載っていることは「観測可能である」ことしか意味しない。誰かが実際に**監視(monitor)している**ことが前提で、監視者がいなければ不正はログに残るだけで気づかれない。CTでは大手CAやセキュリティベンダーが監視者として機能しているが、新しい透明性ログを立てる際にはこの「見る人」の確保が実運用上の課題になる。

## 出典

- [An introduction to Rekor — Chainguard Academy](https://edu.chainguard.dev/open-source/sigstore/rekor/an-introduction-to-rekor/)
- [Catching malicious package releases using a transparency log (Trail of Bits)](https://blog.trailofbits.com/2025/12/12/catching-malicious-package-releases-using-a-transparency-log/)
- [RFC 9162: Certificate Transparency Version 2.0](https://www.rfc-editor.org/rfc/rfc9162.html)
