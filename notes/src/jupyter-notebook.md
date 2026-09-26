---
created: 2026-09-26 02:07
updated: 2026-09-26 02:07
---
# Jupyter Notebook

ブラウザ上で、コード・Markdownテキスト・数式・実行結果(グラフやリッチメディア含む)を**セル**として順に並べて書ける計算ノートブック。Project Jupyterが開発。[[literate-programming|文芸的プログラミング]]を実行結果まで含めて拡張した「Literate Computing」の代表的な道具。

## 歴史

- 2001年 — Fernando PérezがPythonの対話シェルを拡張した IPython を作る。
- 2011年 — Pérez、Brian Granger、Min Ragan-Kelley が IPython Notebook の最初のバージョンをリリース。
- 2014年 — 言語非依存の部分を IPython から切り出して Project Jupyter が発足。名前は Julia・Python・R に由来し、ガリレオが木星の衛星の観測をノートに記録したことへのオマージュでもある。
- 2017年 — ACM Software System Award を受賞。
- 2018年2月 — JupyterLab リリース。
- 2023年 — Jupyter Notebook 7 リリース。JupyterLab のコンポーネントの上に作り直され、両者でコードベースと拡張機構を共有するようになった。デバッガ、ダークモード、目次、リアルタイム共同編集などが入った。
- GitHub上のNotebookは2015年に約20万、2018年に250万、2021年1月に約1000万。

## 仕組み

- **.ipynb** — JSONのファイル形式。バージョン付きスキーマで、メタデータ・フォーマットバージョン・セルの配列からなる。セルにはMarkdown、コード、出力が入る。出力もファイルに保存されるので、実行結果ごと共有・閲覧できる。
- **カーネル** — フロントエンドとコード実行環境を分離したアーキテクチャ。プロセス間通信にZeroMQを使うプロトコルで、Python(IPythonカーネル)以外にもJulia、R、Haskell、Rubyなど数十言語のカーネルがある。フロントエンドとカーネルの間に中継カーネルを挟むこともでき、[[lc4ri|LC4RI]]のLC_wrapperはこれで出力の要約やログ保存をしている。
- **フロントエンド** — Classic Notebook、JupyterLab、Notebook 7。VS Codeの拡張や Google Colab、Amazon SageMaker なども Jupyter 系。
- **JupyterHub** — 多数のユーザーそれぞれに Notebook サーバを立ち上げて管理するマルチユーザー環境。

## 再現性の問題

実行順を自由に選べるセル実行は探索的な作業には便利だが、隠れた状態・実行順の依存が残りやすい。

- Pimentelら(MSR 2019)はGitHub上の約140万Notebookを分析。実行を試みた有効な(Pythonバージョンと実行順が定義された)Notebook 863,878件のうち、**エラーなく実行できたのは24.11%、同じ結果を再現したのは4.03%**だった。
- この結果からベストプラクティスを提案し、Notebook用linterの Julynter も作っている。

LC4RIのLC_run_through(成功セルのFreeze)やnblineage(セルの系譜追跡)は、この「状態と実行順の管理」の問題に運用手順書の側から手当てしているもの、と見ることもできる。

#jupyter #python #programming

## 出典

- [Project Jupyter - Wikipedia](https://en.wikipedia.org/wiki/Project_Jupyter)
- [Announcing Jupyter Notebook 7 | Jupyter Blog](https://blog.jupyter.org/announcing-jupyter-notebook-7-8d6d66126dcf)
- [Build Jupyter Notebook v7 off of JupyterLab components (JEP 79)](https://jupyter.org/enhancement-proposals/79-notebook-v7/notebook-v7.html)
- [Pimentel et al., A Large-scale Study about Quality and Reproducibility of Jupyter Notebooks (MSR 2019)](http://www.ic.uff.br/~leomurta/papers/pimentel2019a.pdf)
