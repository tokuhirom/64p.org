---
created: 2026-09-02 22:24
updated: 2026-09-02 22:24
---
# タイルベースの透明性ログ

[[transparency-log|透明性ログ]]を「RPCサーバ＋データベース」ではなく、**静的ファイルの集まり**として配信する方式。[[merkle-tree|Merkle木]]を固定サイズの部分木（タイル）に切り出し、それを普通のHTTPで配る。 #security #cryptography

## Trillian v1 とその課題

Googleの **Trillian** は長らく[[certificate-transparency|CTログ]]やGoのchecksum databaseの実装基盤だった。MySQL/Spanner上にMerkleログを構築し、それをRPCで提供するマイクロサービス構成を取る。

この構成は動くが、CTログの運用者から見ると重い。読み取りリクエストがすべてサーバとDBを経由するため、読み取りスループットと可用性がバックエンドの性能に縛られる。CTログは「大量の検証者が読み続ける」ワークロードなので、ここがボトルネックになる。

## タイルという発想

Goのモジュールプロキシで使われている `golang.org/x/mod/sumdb/tlog` の設計が下敷きになっている。Merkle木を高さ8（256葉）などの固定サイズのタイルに分割し、各タイルを1つのファイルとして静的に配信する。

- 検証者は必要なタイルだけをGETすればよく、サーバ側に計算を要求しない
- 配信はCDNやオブジェクトストレージ（S3/GCS）にそのまま載せられる
- ログのAPIが「ファイルを取ってくる」だけになるので、実装の互換性が取りやすい

## Static CT API と実装

この方式をCTログ向けに仕様化したのが **Static CT API**（C2SP で仕様が管理されている）。ログはタイル群として表現され、検証者はそれをダウンロードする。

主な実装:

- **Sunlight** — Filippo Valsordaによる実装。[[lets-encrypt|Let's Encrypt]]が本番のCTログ（Sycamore等）で採用している。
- **TesseraCT** — transparency.devによる実装。Trillianの後継ライブラリ **Tessera** の上に構築されており、Static CT API準拠のタイルを直接公開する。
- そのほか Azul、Itko、CompactLog など、Static CT API準拠の実装が増えている。

## Tessera

Trillian v1の論理的な後継となるGoライブラリ。タイルの概念を全面的に取り入れ、クライアントが部分木のタイルへ直接アクセスできるTiles APIを提供する。マイクロサービス構成をやめ、より単純なデプロイモデルを取ることで、読み取りのスループットと可用性を大幅に上げられる設計になっている。

## なぜ流れが変わったのか

透明性ログは「ログ運営者を信頼しない」ための仕組みなので、サーバ側で何かを計算して返す形はそもそも設計と噛み合わない。検証に必要なデータをすべて静的に置き、クライアント側で計算させる方が、思想的にも運用的にも素直だった、という整理ができる。CTログの運用コストが下がることは、ログ運営者の多様性（＝仕組みの信頼性）にも直結する。

## 出典

- [Tile-Based Transparency Logs | Trillian](https://transparency.dev/articles/tile-based-logs/)
- [Introducing TesseraCT (transparency.dev blog)](https://blog.transparency.dev/introducing-tesseract)
- [Reflections on a Year of Sunlight (Let's Encrypt)](https://letsencrypt.org/2025/06/11/reflections-on-a-year-of-sunlight)
- [transparency-dev/tessera (GitHub)](https://github.com/transparency-dev/tessera)
