---
created: 2026-08-13 15:04
updated: 2026-08-13 15:04
---
# mutsuでCro::HTTPのhello worldを動かす実験

Rust製の自作[[raku-rakudo-perl6|Raku]]インタプリタ[mutsu](https://github.com/tokuhirom/mutsu)の0.21.0で[[cro|Cro]]::HTTPが使えるようになったので、hello world的なHTTPサーバを実際に書いて動かしてみた記録。

#raku #mutsu #web-framework #experiment

## 目的

mutsu 0.21.0のCro::HTTPサポートで、典型的なCroのサンプルコード（ルーティング定義＋サーバ起動）がそのまま動くかを確認する。

## 環境

- mutsu 0.21.0（miseでグローバルインストール: `~/.local/share/mise/installs/github-tokuhirom-mutsu/0.21.0/bin/mutsu`）
- Linux (Pop!_OS, kernel 6.18)

## コード

Cro公式のGetting startedにあるような、`Cro::HTTP::Router`の`route`/`get`でルーティングを定義して`Cro::HTTP::Server`で起動する典型パターン。パスパラメータ付きのルートも入れた。

```raku
use Cro::HTTP::Router;
use Cro::HTTP::Server;

my $application = route {
    get -> {
        content 'text/plain', "Hello, world from mutsu!\n";
    }
    get -> 'greet', $name {
        content 'text/plain', "Hello, $name!\n";
    }
};

my Cro::Service $service = Cro::HTTP::Server.new(
    :host<localhost>, :port<20000>, :$application
);
$service.start;
say "Started server at http://localhost:20000/";

react {
    whenever signal(SIGINT) {
        $service.stop;
        exit;
    }
}
```

これを`mutsu cro-hello.raku`で起動するだけ。zef等でのモジュールインストールは不要で、Cro::HTTPはmutsu本体にバンドルされている。

## 実行結果

両ルートとも期待どおり動いた。

```console
$ curl http://localhost:20000/
Hello, world from mutsu!
$ curl http://localhost:20000/greet/tokuhirom
Hello, tokuhirom!
```

レスポンスヘッダも正しく付く。

```console
$ curl -si http://localhost:20000/ | head -4
HTTP/1.1 200 OK
Content-type: text/plain; charset=utf-8
Content-length: 25
```

## 読み取れること

- `route`/`get`のDSL、`content`によるレスポンス生成、パスパラメータ（`get -> 'greet', $name`のようなシグネチャベースのルーティング）が動く。
- `Cro::HTTP::Server`の起動・停止（`$service.start`/`$service.stop`）が動く。
- `react whenever signal(SIGINT)`によるシグナル待ち受けの常駐パターンも動くので、Ctrl-Cで綺麗に落とせる。
- Content-typeへの`charset=utf-8`付与やContent-lengthの計算など、HTTP/1.1レスポンスの基本部分が揃っている。

## 躓いた点

特になし。Cro公式ドキュメント風のコードが初回でそのまま動いた。
