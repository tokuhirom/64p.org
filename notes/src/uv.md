---
created: 2026-08-14 18:37
updated: 2026-08-14 18:37
---
# uv

Astral社([[ruff|Ruff]]と同じ開発元)が開発している、Rust製の高速なPythonパッケージ・プロジェクトマネージャー。pip、pip-tools、virtualenv、pyenv、pipx、twine、poetryなど複数の既存ツールを1つのバイナリに統合することを目指している。 #python #rust

## 主な機能

- **Python版管理**: 複数のPythonバージョンのインストール・切り替え(pyenv相当)
- **プロジェクト管理**: `pyproject.toml`ベースのプロジェクト初期化、依存解決、`uv.lock`によるロックファイル管理、ビルド・公開
- **スクリプト実行**: 単体の`.py`ファイルをそのまま実行(後述)
- **ツール実行**: `uvx`(`uv tool run`のエイリアス)で、PyPIパッケージを一時環境にインストールせず即実行(pipx相当)
- **pip互換インターフェース**: `uv pip install`など、従来のpipワークフローをそのまま高速化して使う手段も用意されている

## スクリプト内に依存関係を書く方法(PEP 723 インラインスクリプトメタデータ)

`pyproject.toml`を作らずに、単一の`.py`ファイル内に依存関係を埋め込める。PEP 723で標準化された記法で、ファイル先頭に`# /// script` 〜 `# ///`のTOMLブロックを書く。

```python
# /// script
# dependencies = [
#   "requests<3",
#   "rich",
# ]
# requires-python = ">=3.12"
# ///

import requests
resp = requests.get("https://peps.python.org/api/peps.json")
print(resp.json())
```

- 手打ちせず`uv add --script example.py 'requests<3' 'rich'`でこのブロックを自動生成・編集できる
- `uv run example.py`とするだけで、uvが自動的に依存関係を解決した一時環境を作って実行してくれる(`pyproject.toml`があるプロジェクト内でも、このメタデータがあればそちらが優先される)
- 依存関係が1ファイルに閉じるので、ちょっとしたスクリプトを配布・共有するのに向いている

## 出典

- [uv - Astral Docs](https://docs.astral.sh/uv/)
- [Getting started | uv - Astral Docs](https://docs.astral.sh/uv/getting-started/)
- [Features | uv - Astral Docs](https://docs.astral.sh/uv/getting-started/features/)
- [Running scripts | uv - Astral Docs](https://docs.astral.sh/uv/guides/scripts/)
- [GitHub - astral-sh/uv](https://github.com/astral-sh/uv)
