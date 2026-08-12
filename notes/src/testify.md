---
created: 2026-08-12 18:40
updated: 2026-08-12 18:42
---
# testify

#go #testing

Go の標準 `testing` パッケージと組み合わせて使うテストツールキット（stretchr/testify）。MITライセンスで、GitHubスター26k超と、Goのテスト用ライブラリとしては最も広く使われている部類。Go標準にはJUnit的なアサーションAPIがなく `if got != want { t.Errorf(...) }` を繰り返し書くことになるため、それを読みやすく置き換えるのが主目的。

## パッケージ構成

- **assert** — `assert.Equal(t, expected, actual)` のようなアサーション群。失敗時に読みやすい差分メッセージを出す。失敗しても bool を返してテストは継続する。
- **require** — assert と同一のインターフェースだが、失敗した時点で `t.FailNow()` によりテストを即座に打ち切る。「この前提が崩れたら以降は無意味」という検証（`require.NoError(t, err)` 等）に使うのが定石。
- **mock** — `mock.Mock` を埋め込んだ構造体でインターフェースのモックを作り、`On(...).Return(...)` で期待動作を設定、`AssertExpectations(t)` で呼び出しを検証する。手書きはボイラープレートが多いので、モックコードを自動生成する **[[mockery]]** と組み合わせるのが一般的（公式ドキュメントでも推奨）。
- **suite** — SetupTest / TearDownTest などのフックを持つ xUnit 風のテストスイート構造。

```go
func TestSomething(t *testing.T) {
    result, err := DoSomething()
    require.NoError(t, err)              // ここで失敗したら即終了
    assert.Equal(t, "expected", result)  // 失敗しても他のassertは続行
}
```

## メンテナンス方針

「v1 として維持し、破壊的変更は受け付けない」ことが README に明記されている。v2 は別リポジトリのディスカッションで検討が進行中。

## 出典

- [stretchr/testify - GitHub](https://github.com/stretchr/testify)
- [mock package - pkg.go.dev](https://pkg.go.dev/github.com/stretchr/testify/mock)
