---
created: 2026-08-10 19:14
updated: 2026-08-10 19:14
---
# Ruff

Rustで書かれた、非常に高速なPython用リンター兼コードフォーマッター。Astral社(パッケージマネージャ`uv`と同じ開発元)が開発している。 #python #rust

## 特徴

- 既存のリンター(Flake8など)やフォーマッター(Blackなど)と比べて10〜100倍高速
- Flake8、Black、isort、pyupgrade、pydocstyleなど複数ツールの機能を1つのスタンドアロンバイナリに統合しており、これらの多くに対するドロップイン置き換えを目指している
- 900以上の組み込みルールを持ち、flake8-bugbearなど人気のFlake8プラグインをネイティブに再実装している
- ランタイム依存のないスタンドアロンバイナリとして配布されるため、インストールが速くバージョン競合の心配もない
- 設定は`pyproject.toml`、`ruff.toml`、`.ruff.toml`で行う

## 位置づけ

Lintと整形(フォーマット)を1つのCLIに統合した、高性能なPython開発ツール。

## 出典

- [GitHub - astral-sh/ruff](https://github.com/astral-sh/ruff)
- [Ruff - Astral Docs](https://docs.astral.sh/ruff/)
- [Ruff: A Modern Python Linter for Error-Free and Maintainable Code – Real Python](https://realpython.com/ruff-python/)
- [The Ruff Formatter - Astral Docs](https://docs.astral.sh/ruff/formatter/)
