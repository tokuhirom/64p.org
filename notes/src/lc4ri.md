---
created: 2026-09-26 02:02
updated: 2026-09-26 02:02
---
# LC4RI (Literate Computing for Reproducible Infrastructure)

「再構築可能なインフラのための文芸的コンピューティング」。国立情報学研究所(NII)のクラウド運用チームが提唱・実践している、Jupyter Notebookを手順書兼作業証跡として使うインフラ運用の方法論。Notebookに「なぜやるか・前提・実行コマンド・結果・確認」を一緒に残し、実行可能で再現可能な手順書にする。

## 考え方

- 公式の説明: 自動化された運用を live code として記述し、予測される結果・再現可能な結果を、技術者と非技術者の双方がナラティブ(物語)の形で共有する。
- **Automated Operation と Automation を区別する**。完全に蒸留された自動化(Automation)ではなく、常に人間がループの中にいて状況に縛られた「自動化された運用」を目指す。技術は人間の専門性を置き換えるのではなく補うもの、という立場。
- CEDEC2019の講演では「過度な自動化への依存を防ぎ、チーム内でのノウハウ移転を促進する」ことで運用を強靭にする、という主張だった。
- Qiitaの解説(yacchin1205)では、自分が理解していない部分をコード化すると問題発生時にかえって理解が難しくなる、と指摘。自動化(Automation)ではなく、チーム全体で対象システムへの理解を深める(Communication)方向を重視する。

## 役割分担: Jupyter + Ansible

- [[ansible|Ansible]] — 対象システムへのコマンド実行を担当。
- Jupyter Notebook — 実行結果を含めた「体験」を人間が読める形で保存する。単なる実行ログではなく、運用チームで知見を共有するコミュニケーション媒体。
- すべての操作をコード化する必要はない、としている。代わりに以下を自然言語で書く:
  - 前提条件の確認(OS、パッケージバージョンなど)
  - 実行結果の確認(意図が満たされたとどう判断したか)
  - 背景(このNotebookを実施するに至った経緯)

## 成熟度の3段階(Qiita解説より)

1. **とにかく残す** — 体験を記録して共有する。
2. **単純にする** — 似たパターンを整理し、「健康な状態」を定義する(診断用Notebook)。症状と対処を体系化。
3. **適用範囲を広げる** — 設計→設定の流れを明示し、環境依存値を分離して再利用性を上げる。

## ツール群

NII-cloud-operation がOSSとして公開しているJupyter拡張・カーネル。

| ツール | 役割 |
|---|---|
| LC_run_through | 見出しで折りたたんだセクション内のセルをワンクリックで一括実行。セルの状態を色付きブロックで表示(灰=未実行、緑=成功、ピンク=失敗)。成功したセルは自動で **Freeze** され、誤って再実行できなくなる。セルのロック(読み取り専用化)も可能 |
| LC_wrapper | IPythonカーネルとNotebookサーバの間に挟まる中継カーネル。`!!`で始まるセル(または`lc_wrapper_force=on`)の大量出力を要約して表示し、全出力は`.log/YYYYMMDD/`配下に保存してセルのメタデータにログパスを記録する。`lc_wrapper_regex`で重要なエラー行を要約に残し、`lc_wrapper_masking_pattern`でAPIキー等をマスクできる |
| multi_outputs | 通常は実行ごとに上書きされるセル出力を、タブとして複数保持(ピン留め)できる。ピン留めした出力と現在の出力のdiffも見られる |
| nblineage | Notebookと全セルに *meme* と呼ぶ追跡ID(UUID1)をメタデータとして振る。コピー・派生したNotebookにも引き継がれるので、手順書の系譜を追える |
| LC_index | Jupyterのファイル一覧画面に README.svg / README.md を表示する |
| sidestickies | 各セルにEtherpadやScrapboxを使った付箋(注釈)を付ける。Notebook本体のナラティブとは別のメタ・振り返り的コミュニケーション用 |
| nbsearch | 自分が作ったNotebookをキーワード・更新日時・memeで検索 |

実践環境をまとめたものとして OperationHub がある。小規模な運用チーム向けの、単一サーバ上のJupyterHub(ユーザーごとにDockerコンテナで分離、PAM認証、Notebook共有ディレクトリ)。

- LC_run_throughのFreezeは「一度成功した手順を二度流さない」ための仕組みで、冪等でない操作が混じる運用手順書と相性がよい。
- LC_wrapperのログ保存は、Notebookを作業証跡(エビデンス)として扱うための仕組み。

## 歴史・関係者

- NIIクラウド運用チーム。CEDEC2019講演者の長久勝(ライフマティックス/NII)、共同研究者として政谷好伸・谷沢智史・中川晋吾・合田憲人。
- 2019年 CEDEC「Jupyter Notebook が変える、あなたのチームの運用作業」。
- 2020年 Software Design 2020年5月号「Jupyter Notebookで解決するインフラ管理の手順書づくり LC4RI――再構築可能なインフラのための文芸的コンピューティングのすすめ」(監修: 長久勝・政谷好伸)。14のベストプラクティスを紹介。
- NIIの情報処理技術セミナー(クラウド編)でも題材になっている。

## 考えたこと

- [[devops|DevOps]]/SRE文脈で「[[toil|トイル]]は自動化せよ」と言われがちなのに対して、あえて人間を中心に置く立場。完全自動化の手前にある「手順書+半自動実行」の層をきちんと道具化したもの、と捉えられる。
- [[configuration-management-tools|構成管理ツール]]による宣言的なIaCが「あるべき状態」を記述するのに対し、LC4RIは「その場で何をやって何が起きたか」を記述する。補完関係。
- 実行可能な手順書という点では、最近のAIエージェントに渡す手順書([[skill-md|SKILL.md]]など)とも発想が近い。

#devops #jupyter #infrastructure-as-code

## 出典

- [What is LC4RI?(en) | Literate Computing for Reproducible Infrastructure](https://literate-computing.github.io/fastpages/introduction_en/)
- [LC4RIツール(ja) | Literate Computing for Reproducible Infrastructure](https://literate-computing.github.io/fastpages/tools_ja/)
- [NII-cloud-operation/Jupyter-LC_run_through](https://github.com/NII-cloud-operation/Jupyter-LC_run_through)
- [NII-cloud-operation/Jupyter-LC_wrapper](https://github.com/NII-cloud-operation/Jupyter-LC_wrapper)
- [NII-cloud-operation/Jupyter-multi_outputs](https://github.com/NII-cloud-operation/Jupyter-multi_outputs)
- [NII-cloud-operation/Jupyter-LC_nblineage](https://github.com/NII-cloud-operation/Jupyter-LC_nblineage)
- [NII-cloud-operation/Jupyter-LC_index](https://github.com/NII-cloud-operation/Jupyter-LC_index)
- [NII-cloud-operation/sidestickies](https://github.com/NII-cloud-operation/sidestickies)
- [NII-cloud-operation/nbsearch](https://github.com/NII-cloud-operation/nbsearch)
- [NII-cloud-operation/OperationHub](https://github.com/NII-cloud-operation/OperationHub)
- [CEDEC2019: Jupyter Notebook が変える、あなたのチームの運用作業](https://cedec.cesa.or.jp/2019/session/detail/s5c9f1002670d8.html)
- [Software Design 2020年5月号 | 技術評論社](https://gihyo.jp/dp/ebook/2020/978-4-297-11280-6)
- [Jupyter+Ansibleを使ったインフラ運用の考え方2017 - Qiita](https://qiita.com/yacchin1205/items/8bd1b79942418e0d0888)
- [LC4RIに関するメモ - Qiita](https://qiita.com/manabuishiirb/items/ae60196fdcf86193b815)
- [情報処理技術セミナー（クラウド編） | 国立情報学研究所](https://contents.nii.ac.jp/hrd/joho-karuizawa-cloud/2024)
