---
created: 2026-09-26 05:57
updated: 2026-09-26 08:01
---
# Semaphore UI（Ansible/Terraform向けWeb UI）

[[ansible|Ansible]]のPlaybookや[[terraform|Terraform]]/[[opentofu|OpenTofu]]、シェルスクリプトなどを、Webブラウザからボタン一つで実行できるようにするセルフホスト型のWeb UI + API。Go製（フロントはJavaScript）、MITライセンス。旧名は **Ansible Semaphore** で、当初はAnsible専用のUIだったが対応ツールが増えたため「Semaphore UI」に改名された。並行制御の[[semaphore|セマフォ]]とは無関係。

- リポジトリ: `semaphoreui/semaphore`（2026年9月時点でstar数1.4万程度）
- 対応ツール: Ansible, Terraform, OpenTofu, Terragrunt, Bash, PowerShell, Python
- DB: SQLite / MySQL / PostgreSQL。以前使えたBoltDBは非推奨で、2.17でSQL系DBへの移行ツールが入った
- インストール: Docker, バイナリ, deb/rpm, Snap, 各クラウドのマーケットプレイスVM
- 最新安定版は2.19系（2.19.12, 2026-08-30）

## 実行モデル

基本は「gitリポジトリをcloneして、その中のPlaybook/スクリプトをSemaphoreのホスト（またはrunner）上で実行し、ログをWebに流す」だけ。[[ansible|Ansible]]自体がagentlessなので、Semaphoreも対象ノードに何も入れない。コントロールノードをWeb化したもの、と捉えるとわかりやすい。

## 構成要素

プロジェクト単位で以下のリソースを持つ。

- **Project** — 以下のリソースをまとめる単位。チームメンバーと権限もプロジェクトごと。
- **Repository** — Playbook/スクリプトが入ったgitリポジトリ（GitHub, Bitbucketなど）。
- **Key Store** — SSH鍵、ログインパスワード、Ansible Vaultパスワードなどを暗号化して保存する。2.17からはファイルや環境変数からの読み込み（Kubernetesのsecret注入、[[vault|HashiCorp Vault]] Agent連携）やDevolutions Serverもバックエンドに使える。
- **Inventory** — Ansible向けの対象ホスト一覧。Terraformの場合はworkspaceに相当するものを選ぶ。
- **Variable Groups**（旧Environment） — 変数・シークレットの組。テンプレートに複数組み合わせて注入できる。
- **Task Template** — 「どのリポジトリのどのファイルを、どのinventory・変数で実行するか」の定義。ブランチ指定、CLI引数（`["-vvv"]`のようなJSON配列）、実行時にユーザーへ入力を求めるsurvey変数も設定できる。
- **Task** — テンプレートを実際に実行した1回分。ログと結果が残る。
- **Schedule** — テンプレートをcronで定期実行。2.17で一回限り（日時指定）のスケジュールも追加。

### テンプレートの3種類

| 種類 | 役割 |
|------|------|
| Task | 普通の実行。デフォルト |
| Build | 成果物を作り、自動インクリメントのバージョン番号を振る（開始バージョンを`1.0.0`などで指定） |
| Deploy | Buildテンプレートが作ったバージョンをデプロイする。Build成功時に自動実行（Autorun）も可 |

バージョン情報などは`semaphore_vars`経由でPlaybookに渡る。単なる「Playbook実行ボタン」ではなく、簡易的なビルド→デプロイのパイプラインも組めるようになっている。

## Runner

タスクをSemaphore本体とは別のサーバで実行させる仕組み。

- `semaphore runner register`でサーバ発行の登録トークンを使って登録し、以後は`X-Runner-Token`で認証する。
- **runner側からのポーリング**（デフォルト1秒間隔、`check_interval_seconds`で調整）で仕事を取りに行く。サーバからrunnerへ接続しに行く方式ではないので、runnerを閉じたネットワークに置きやすい。
- runnerがリポジトリをcloneしてAnsible/Terraform等を実行し、結果をサーバへ返す。
- プロジェクト単位のrunner（Project Runners）やrunnerのタグ指定はPro機能。

## エディション

- **Community** — OSS版（GitHubのもの）。
- **Pro / Enterprise** — 有償（Proは月20ドル〜）。Workflows（タスクの連結）、プロジェクトrunner、runnerタグ、カスタムロールによるRBAC拡張、Redisを使ったactive-active HA（Enterprise）などが入る。

## AWXとの比較

同じ「AnsibleにWeb UIを被せる」系のOSSとして[[ansible|AWX]]（Ansible Automation Platformのupstream）がある。AWXはKubernetes上に[[kubernetes-operator|Operator]]で載せる前提の大掛かりな構成なのに対し、Semaphoreは単一のGoバイナリ（+ DB、SQLiteなら外部DBすら不要）で動く。小規模チームで「Playbookを誰でも安全に叩けるようにしたい」「定期実行したい」程度ならSemaphoreの方が導入コストが低い。一方でAnsible専用ではなくTerraform等も同列に扱う点は方向性の違い。（AWXのデプロイ方式は一般的な知識によるもので、このノート作成時に裏取りはしていない）

#ansible #infrastructure-as-code #go

## 出典

- [semaphoreui/semaphore - GitHub](https://github.com/semaphoreui/semaphore)
- [Semaphore UI Documentation](https://semaphoreui.com/docs/)
- [Task templates | Semaphore UI](https://semaphoreui.com/docs/user-guide/task-templates)
- [Runners | Semaphore UI](https://semaphoreui.com/docs/admin-guide/runners)
- [Project runners (Pro) | Semaphore UI](https://semaphoreui.com/docs/user-guide/projects/runners)
- [Semaphore 2.17 リリースノート](https://semaphoreui.com/releases/semaphore-v2_17)
- [Semaphore (software) - Wikipedia](https://en.wikipedia.org/wiki/Semaphore_(software))
