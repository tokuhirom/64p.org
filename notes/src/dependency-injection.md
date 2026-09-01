---
created: 2026-09-01 09:14
updated: 2026-09-01 09:14
---
# 依存性注入 (Dependency Injection)

#software-engineering #architecture

オブジェクトが必要とする依存を、自分で取りに行くのではなく外から渡してもらう仕組み。Martin Fowlerが2004年の記事「Inversion of Control Containers and the Dependency Injection pattern」で命名した。

## なぜ「DI」という名前になったか

もともとこの手のコンテナは「IoC（Inversion of Control, 制御の反転）コンテナ」と呼ばれていた。しかしFowler曰く、

> Inversion of Control is too generic a term, and thus people find it confusing.
> （制御の反転という語は一般的すぎて、みな混乱する）

IoCはフレームワーク一般に共通する性質（フレームワークがアプリのコードを呼ぶ）を指す語であって、「何の制御が反転しているのか」を特定していない。ここで反転しているのは**依存の解決**なので、Fowlerらはより具体的な「Dependency Injection」という名前に落ち着かせた。

## 3つの注入形式

Fowlerが挙げている分類。

| 形式 | 渡し方 | 代表例 |
|---|---|---|
| コンストラクタ・インジェクション | コンストラクタ引数で渡す | PicoContainer |
| セッター・インジェクション | セッターメソッドで渡す | Spring |
| インターフェース・インジェクション | 注入用メソッドを定義したインターフェースを実装させる | Avalon |

コンストラクタ注入は「生成した時点で常に妥当なオブジェクトになる」利点があり、セッター注入は引数が多すぎてコンストラクタが煩雑になる場合に有利、とされる。インターフェース注入は書くインターフェースが増えるぶん侵襲的。

## Service Locatorとの比較

対立する選択肢が Service Locator。こちらはアプリケーション側が「レジストリに問い合わせて依存を取ってくる」。

決定的な違いは、Service Locatorだと**サービスの利用者全員がロケータ自体への依存を持つ**こと。注入ならその結合すら消える。Fowlerは、自分のアプリの中だけで完結するなら Service Locator でよく、他人が書くアプリケーションに提供するコンポーネントなら Dependency Injection を選ぶ、としている。

そのうえで、どちらを選ぶかより大事なこととして次を挙げている。

> The choice between Service Locator and Dependency Injection is less important than the principle of separating service configuration from the use of services within an application.
> （Service LocatorとDependency Injectionのどちらを選ぶかは、「サービスの設定」と「アプリケーション内でのサービスの利用」を分離するという原則ほど重要ではない）

## DIとDIP（依存性逆転の原則）は別物

混同されやすいが、レイヤが違う。

- **[[solid-principles|DIP]]** は設計原則。「上位モジュールが必要とする抽象を上位側で定義し、下位がそれを実装することで、ソースコードの依存の向きを反転させよ」
- **DI** は実装テクニック。「その具象実装を、実行時に外から渡す」

DIPを守っていなくてもDIは使える（具象クラスをコンストラクタで渡すだけでもDIではある）し、原理的にはDIコンテナなしでDIPを実現することもできる（`main`で手で組み立てればよい）。[[clean-architecture|クリーンアーキテクチャ]]や[[onion-architecture|オニオンアーキテクチャ]]が要求しているのはDIPの方で、DIコンテナはそれを実務的に組み立てる道具にすぎない。

## テストとの関係

被依存を外から差し替えられるので、[[tdd|TDD]]でモックやスタブを差し込む口として使われる。[[hexagonal-architecture|ヘキサゴナルアーキテクチャ]]で言えば、被駆動ポート（secondary port）にテスト用アダプタを差す操作がこれにあたる。

## 出典

- [Inversion of Control Containers and the Dependency Injection pattern (Martin Fowler, 2004)](https://martinfowler.com/articles/injection.html)
