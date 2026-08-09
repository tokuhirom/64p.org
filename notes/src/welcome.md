# Notesコーナーへようこそ

ちょっと調べたこと、AIに調査してもらった結果、忘れたくないスニペットなどを気軽に書き残しておく場所です。

[ブログ](https://blog.64p.org/)はもう少しちゃんとした記事向けで、こちらはメモ書き程度のラフなものを想定しています。

## コードブロックの例

コードスニペットはシンタックスハイライト付きで表示されます。

```perl
use strict;
use warnings;

sub greet {
    my ($name) = @_;
    return "Hello, $name!";
}

print greet("world"), "\n";
```

```bash
# ちょっとしたシェルのワンライナー
find . -name '*.md' | xargs wc -l
```

## 新しいノートの追加方法

`notes/src/` 配下にMarkdownファイルを追加します。1行目がタイトルになります（`# タイトル` でもプレーンテキストでもOK）。追加したら以下を実行します。

```sh
perl regen-index.pl
```
