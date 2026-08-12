---
created: 2026-08-12 18:42
updated: 2026-08-12 18:42
---
# mockery

#go #testing

Go のインターフェース定義からモック実装コードを自動生成するCLIツール（vektra/mockery）。[[testify]] の mock パッケージを手で使うと `On(...)` / `Return(...)` まわりのボイラープレートが多くなるため、それを丸ごと生成して除去するのが目的。生成されたモックは testify のアサーション・期待値検証パターン（`EXPECT()` 形式の expecter メソッドを含む）にそのまま乗る。

## 使い方

設定は `.mockery.yaml` に書き、対象パッケージとインターフェースを宣言してから `mockery` コマンドを実行する方式。

```yaml
packages:
    github.com/org/repo:
        interfaces:
            DB:
```

`go generate` や task runner に組み込んで、インターフェース変更時にモックを再生成し続けるのが典型的な運用。

## v3

現行のメジャーバージョンは v3 で、テンプレートベースの生成に刷新された。従来の testify スタイルに加えて matryer/moq スタイルのモックも生成でき、独自テンプレートも書ける。モックを対象と同じパッケージに置くケースの自動検出など設定も整理された。同種のツールとしては gomock や moq がある。

## 出典

- [mockery 公式ドキュメント](https://vektra.github.io/mockery/latest/)
- [vektra/mockery - GitHub](https://github.com/vektra/mockery)
