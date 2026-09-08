---
created: 2026-08-19 15:26
updated: 2026-09-08 15:07
---
# Ansible（構成管理ツール）

Red Hatが開発するPython製の構成管理ツール。最大の特徴はagentless(エージェントレス)な設計で、管理対象ノードに常駐エージェントを一切インストールせず、SSH(Linux/Unix)やWinRM(Windows)経由で設定を「push」する。

## 実行モデル

agentlessといっても、対象ノードで何も動かないわけではない。実際には次の流れで動く。

1. コントロールノード側でPlaybookを解釈し、実行すべきタスクを決める。
2. SSHで対象ノードに接続し、そのタスクに対応する**モジュール**(Pythonスクリプト)を一時ディレクトリへ転送する。
3. 対象ノードのPythonインタプリタでモジュールを実行し、結果をJSONで受け取る。
4. 転送した一時ファイルを削除して接続を閉じる。

つまり「常駐エージェントは不要だが、対象ノードにPythonは必要」という構成になっている。ansible-core 2.21の場合、コントロールノード側はPython 3.12〜3.14、管理対象ノード側はPython 3.9〜3.14をサポートする(WindowsはPowerShell 5.1〜7)。

冪等性はAnsible本体が保証するのではなく、個々のモジュールが「現在の状態を調べ、必要なときだけ変更する」ように実装されていることで成り立つ。実行結果が`ok`か`changed`かはモジュールが自己申告している。逆に言うと、`command`/`shell`のような素のコマンド実行モジュールは何もしなければ常に`changed`になるため、`creates`/`removes`や`changed_when`で書き手が冪等性を与えてやる必要がある。

## 構成要素

- **Inventory** — 管理対象ホストの一覧。INI形式かYAMLで静的に書くほか、クラウドAPIを叩いて動的にホストを列挙する**dynamic inventory**プラグインもある。ホストは任意のグループに束ねられ、グループ単位で変数を与えられる。
- **Playbook** — YAMLで書く、ホスト(のグループ)に対する`tasks`の並び。各taskは1つのモジュール呼び出しに対応する。宣言的というより「あるべき状態を作る手続き」の記述に近い。
- **Role** — Playbookの断片(`tasks/`, `handlers/`, `templates/`, `defaults/`, `vars/`など)を決まったディレクトリ構造にまとめ、再利用可能にしたもの。
- **Collection** — Role・モジュール・プラグイン・Playbookをまとめて配布する単位。Ansible Galaxyや`ansible-galaxy`コマンドで配布・導入する。
- **Facts** — 実行開始時に`setup`モジュールが対象ノードから収集するOS・ネットワーク・ハードウェア情報。`ansible_facts`として変数から参照できる。収集にコストがかかるため`gather_facts: false`で無効化することもある。
- **Handler** — taskが`changed`になったときだけ末尾でまとめて走る処理。設定ファイル更新時のサービス再起動などに使う。

Playbookの中の変数展開・条件分岐にはJinja2テンプレートを使う。JSON構造の絞り込みには`json_query`フィルタ経由で[[jmespath|JMESPath]]も使える。

## ansible-core と community package

配布物が2つに分かれている点は最初に混乱しやすいところ。

- **ansible-core** — 実行エンジン本体とコマンド群(`ansible`, `ansible-playbook`, `ansible-galaxy`など)、および`ansible.builtin`コレクションのみを含む最小構成。バージョンは`2.x`系で、年2回程度のペースでminorが上がる。2026年8月時点の最新は2.21(2026年5月リリース)で、2.19/2.20/2.21の3世代が保守対象。
- **ansible** (community package) — ansible-coreに、キュレーションされた多数のコレクションを同梱した「全部入り」パッケージ。かつてのAnsible 2.9以前の姿を引き継いだもの。バージョンは`12`, `13`のような単独の整数で、ansible-coreのminorリリースに追随して上がる(例: Ansible 12.0.0はansible-core 2.19.1に依存)。

コレクション側は「新しいansible-coreでテストが通ること」が同梱の条件で、追随できないコレクションはcommunity packageから外される。

## ansible-core 2.19 のテンプレート刷新

2.19ではテンプレート処理系が大きく作り直され、**Data Tagging**という仕組みが入った。変数の値に「どこから来たか」の来歴(provenance)タグを付けて回ることで、エラーメッセージにファイルパス・行・列を出せるようになり、非推奨要素にタグを付けて警告を出すこともできるようになった。

同時に「テンプレートとして評価してよい文字列」の扱いが厳格化され、Playbookやvarsファイル由来の文字列は信頼済みとして扱う一方、プラグインがテンプレートを埋め込んだ文字列を新たに作る場合は`ansible.template`の`trust_as_template`を通す必要が生じた。従来は見逃されていた曖昧なJinja/JMESPathの書き方が顕在化するため、移行時はporting guideを参照するのが前提になる。

## 周辺ツール

- **ansible-lint** — Playbook/Roleの書き方をチェックするlinter。
- **Molecule** — Roleやコレクションのテストフレームワーク。シナリオごとにコンテナ等の環境を作り、収束(converge)させ、**もう一度流して`changed`が出ないこと**で冪等性を検証し、最後に状態を検証する。
- **ansible-navigator** / **Execution Environment** — 実行に必要なansible-core・コレクション・Python依存をコンテナイメージ(EE)に固め、その中でPlaybookを流す方式。手元と本番で実行環境を揃えられる。
- **AWX** — Web UI・REST API・ジョブ実行エンジンをAnsibleの上に載せたOSSプロジェクト(Red Hatがスポンサー)。商用版が**Ansible Automation Platform (AAP)**。

## dry-runと安全側の実行

`--syntax-check`(構文検証のみ)と`--check --diff`(dry-run + 変更差分表示)という2段階のフラグがあり、[[cli-agent-confirmation-protocol|実行前の確認を段階化するCLI設計]]の実例としても参照できる。ただし`--check`が意味を持つのはモジュールがcheck modeに対応している場合で、素の`command`/`shell`はスキップされる。

## [[configuration-management-tools|構成管理ツール]]の中での位置づけ

[[chef|Chef]]・[[puppet|Puppet]]がagent常駐・pull型なのに対し、Ansibleはagentless・push型という対照的な設計を取る。DSLもRuby系の内部DSLではなくYAML + Jinja2ベース。同じくagentlessな[[itamae|Itamae]]の`itamae ssh`と比べると、Ansibleはモジュールを転送して対象ノード側のPythonで実行するのに対し、Itamaeは1操作ごとにSSH越しのコマンド実行を積み重ねる点が異なる。

#infrastructure-as-code #python

## 出典

- [Ansible (software) - Wikipedia](https://en.wikipedia.org/wiki/Ansible_(software))
- [Releases and maintenance — Ansible Community Documentation](https://docs.ansible.com/projects/ansible/latest/reference_appendices/release_and_maintenance.html)
- [Ansible-core | endoflife.date](https://endoflife.date/ansible-core)
- [Ansible-core 2.19 Porting Guide](https://docs.ansible.com/projects/ansible-core/devel/porting_guides/porting_guide_core_2.19.html)
- [Ansible project 12.0 — Ansible Community Documentation](https://docs.ansible.com/projects/ansible/devel/roadmap/COLLECTIONS_12.html)
- [Ansible ecosystem | Ansible documentation](https://docs.ansible.com/ecosystem.html)
- [Ansible Molecule documentation](https://docs.ansible.com/projects/molecule/)
- [はじめに — Ansible Documentation](https://docs.ansible.com/ansible/2.9_ja/user_guide/intro_getting_started.html)
