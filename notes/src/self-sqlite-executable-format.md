---
created: 2026-08-27 22:11
updated: 2026-08-27 22:11
---
# SELF(SQLiteをそのまま実行可能ファイル形式にするフォーマット)

Farid Zakaria氏が開発した、Linux上でELFの代わりにSQLiteデータベースファイルをそのまま実行可能ファイルとして扱う実験的フォーマット。「Structured Executable & Linkable Format」の略で`fzakaria/selfdb`として公開されている。[[sqlite]] #linux #binary-format

## 動機

著者の主張は「ELFはすでに手作りで実装されたデータベースである」というもの。文字列インターン用テーブル、セクション/シンボルのインデックス、外部キー的な参照関係(シンボル→セクション、リロケーション→シンボルなど)がELF仕様の中に散在しており、`sh_offset`/`sh_size`によるオフセット計算やハッシュテーブルが繰り返し独自実装されている。であれば最初からSQLiteという既存の枯れたデータベースエンジンにその役割を担わせよう、という発想。

同じ著者は以前に`fzakaria/sqlelf`という、既存のELFファイルをSQLの仮想テーブル経由で読み取り専用でクエリできるツールを作っており、SELFはその発展形として「読むだけでなく実行までSQLiteに任せる」方向に踏み込んだもの。

## 仕組み

- SQLiteファイル先頭68バイト目にある予約フィールド`application_id`に"SELF"を表すマジック値をセットし、通常のSQLiteファイルと区別する。`file`コマンドで見ると`SQLite 3.x database, application id 0x53454c46`のように表示される。
- ELFの構成要素をテーブルへ分解して格納する。主なテーブルは以下。
  - `segments` — プログラムヘッダー情報をBLOBとして格納
  - `symbols` — シンボルテーブル(名前・バージョン・バインディング情報を含む)
  - `self_meta` — 元のELFヘッダー相当のメタデータ
- Linuxの`binfmt_misc`サブシステムにこのapplication_idを登録し、SELFファイルの実行時にSQLiteをリンクした専用インタープリタ`self-exec`を起動する。`self-exec`はデータベースからプログラムヘッダーとシンボルテーブルを読み出し、セグメントをメモリにマップして本来のプログラムとして実行する。
- `self-exec`ローダーは`memfd`/`native`/`selfld`の3種類の実行モードを持つ。
- `elf2self`/`self2elf`という変換ツールがあり、既存のELFバイナリとSELFの間でロスレスに相互変換できる。

## できること(SQLで書ける操作の例)

- **依存ライブラリの確認**: `SELECT soname FROM ldd` のようなSQL一発で`ldd`相当の情報が取れる。
- **ストリップ**: `DELETE FROM sections; DELETE FROM notes; VACUUM;` で、オフセット計算を伴う従来の複雑な操作なしにデバッグ情報などオプション部分を削除できる。
- **クロージャのパッキング**: バイナリとその依存ライブラリ全部を1つのSQLiteファイルに束ねられる。著者の実験では723個の実行可能ファイルと400個の共有ライブラリ(元のELF群合計644.4 MiB)を1ファイルにまとめたところ611.9 MiBとなり、重複ライブラリの排除効果で約5%コンパクトになった。
- **`self-httpd`という実例**: ページ・プログラム本体・アクセスログが1つのファイルに収まったWebサーバー。`argv[0]`自身をSQLiteデータベースとして開き、`routes`テーブルから配信する。
- `LD_PRELOAD`の挿入のような変更をSQLiteのトランザクションとして行える(ロールバック可能)。

## トレードオフ

メリットは、`readelf`/`nm`など個別ツールの代わりにSQLという統一インターフェースでバイナリ情報にアクセスできる点、スキーマが明示的で自己記述的である点、複数バイナリ間でのライブラリ重複排除がしやすい点。

一方でデメリットも明確で、単一バイナリではファイルサイズが約2倍(ストリップ後は約1%増に縮小)、実行のたびに約5msの固定オーバーヘッドが発生する。最大の弱点は、ELFのようにテキストページを`mmap`で複数プロセス間に共有できないこと(各プロセスがデータベースから読み出したコピーを持つ)。

著者自身、NixOSのような強力なリビルド基盤があってこそ「ユーザーランド全体をSELF化する」という前提が成立すると述べており、既存のLinuxディストリビューションにそのまま置き換わるものではなく、研究的なプロトタイプという位置づけ。

## 考えたこと

ELFを「手作りのデータベース」と見なす視点自体は的を射ていて、`readelf -a`のような雑多な出力をSQLの`JOIN`一発に置き換えられる発想は面白い。ただしmmapによるテキストページ共有を手放す代償は大きく、実運用のバイナリフォーマットというより「バイナリフォーマットをリレーショナルDBとして再設計したらどうなるか」を突き詰めた思考実験として読むのが妥当だと思う。

## 出典

- [Your executable is a SQLite database | Farid Zakaria's Blog](https://fzakaria.com/2026/08/23/your-executable-is-a-sqlite-database)
- [Actually Queryable Executables | Farid Zakaria's Blog](https://fzakaria.com/2026/08/24/actually-queryable-executables)
- [GitHub - fzakaria/selfdb](https://github.com/fzakaria/selfdb)
- [GitHub - fzakaria/sqlelf: Explore ELF objects through the power of SQL](https://github.com/fzakaria/sqlelf)
