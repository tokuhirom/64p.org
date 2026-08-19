---
created: 2026-08-19 22:49
updated: 2026-08-19 22:49
---
# PyO3

RustとPythonを繋ぐバインディングライブラリ。RustでPythonのネイティブ拡張モジュール(`.so`/`.pyd`)を書いてPython側から`import`して使うことも、逆にRustのバイナリにPythonインタプリタを埋め込んでPythonコードを呼び出すこともできる。 #rust #python

## できること

- **RustでPython拡張モジュールを書く** — パフォーマンスが要求される処理をRustで実装し、Pythonの通常のモジュールとして公開する。NumPy/Pandas系ライブラリの内部実装や機械学習系ライブラリの高速化レイヤーなどでよく使われる用途。
- **RustからPythonを呼び出す** — Rustバイナリ内にPythonインタプリタを埋め込み、既存のPython資産(ライブラリ等)をRust側から利用する。
- Python⇔Rustの型変換(`PyObject`とRustの型の相互変換など)を自動でハンドリングしてくれる。

## maturin

PyO3を使ったPythonパッケージのビルド・配布には`maturin`というツールが使われるのが一般的。`maturin build`でwheelを生成し、PyPIへの配布まで面倒を見てくれる。

## 出典

- [GitHub - PyO3/pyo3: Rust bindings for the Python interpreter](https://github.com/PyO3/pyo3)
- [Introduction - PyO3 user guide](https://pyo3.rs/v0.12.3/)
- [What is PyO3 in Rust? Python Bindings Explained — Rustify Glossary](https://rustify.rs/glossary/pyo3)
