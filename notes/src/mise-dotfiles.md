---
created: 2026-09-07 23:21
updated: 2026-09-07 23:30
---
# miseのdotfiles自動同期

[[mise]]（旧rtx、Jeff Dickey / @jdx 作のツール・環境変数・タスクのマネージャ）が、mise 2026.9.2で`mise bootstrap`にdotfilesの**自動双方向同期**を追加した。ホームディレクトリの設定ファイルを普通のファイルのまま置いておき、編集をバックグラウンドプロセスが自動でGitに保存し、他のマシンへ流す、という仕組み。

## 従来のdotfiles管理モデルとの位置づけ

`mise bootstrap`はもともと2つのモデルに対応していた。

1. **シンボリックリンク方式** — リポジトリに実体を置き、ホームへsymlinkを張る（GNU Stow的）。
2. **生成方式** — 保存されたソースとテンプレートからライブファイルを生成する（chezmoi的）。

今回追加されたのが3つめの**track（追跡）モード**で、「すでに自分が編集しているファイルを、symlinkなしでそのまま双方向同期する」もの。ラップトップで`.zshrc`を書き換えたらmiseが保存・共有し、デスクトップ側に適用される。デスクトップで編集すれば逆向きに流れる。ライブファイルは元の場所に普通のファイルとして残るので、「編集をソースディレクトリにコピーし直す」「変更のたびに同期コマンドを打つ」といった手間が要らない。

著者による他ツールとの比較表（記事より）。「Auto」はどのエディタ・アプリからの変更でもバックグラウンドプロセスが拾うこと、「External」は自前のGit/同期ワークフローを持ち込むことを指す。

| ツール | ライブファイル | Git履歴 | 双方向同期 |
| --- | --- | --- | --- |
| mise | 普通のファイル | 自動 | 自動 |
| yadm | 普通のファイル | 手動 | 手動 |
| Stow | symlink | 外部 | 外部 |
| chezmoi | 生成 | コマンド実行時 | 手動 |
| DotState | symlink | コマンド実行時 | コマンド実行時 |
| Dotbot | symlink | 外部 | 外部 |
| Mackup | コピー/リンク | 外部 | クラウド（※） |

※ Mackupの自動クラウド同期はsymlinkを要求し、コピーモードではbackup/restoreの明示実行が必要、と注記されている。yadmも実体ファイルをその場で編集できる点は同じで、chezmoiも自身のコマンド経由の変更なら自動commit/pushができる。

## ファイルをtrackする

既存のファイルをそのまま追跡対象にできる。

```sh
mise bootstrap dotfiles track ~/.zshrc
```

実行すると即座に現在の内容が保存され（baselineチェックポイント）、`~/.config/mise/config.toml`に宣言が追加される。

```toml
[dotfiles]
"~/.zshrc" = { mode = "track" }
```

以降の編集を自動保存するには、同じ設定にhistory watcherのサービスを足して`mise bootstrap`を実行する。

```toml
[bootstrap.services.mise-history]
builtin = "history-watch"
```

```sh
mise bootstrap
mise bootstrap dotfiles status
```

サービスの実体はmacOSならLaunchAgent、LinuxならsystemdのユーザーサービスやWindowsならタスクスケジューラで、miseが面倒を見る。Unixでは履歴リポジトリのデフォルト置き場が`~/.local/state/mise/history/repo.git`なので、ホームディレクトリに`.git`を置いたりsymlinkを張ったりする必要はない。

なお`[dotfiles]`テーブル自体は`symlink`（デフォルト）・`symlink-each`・`copy`・`template`のモードも取れる。`track`はそれらと違って配置を一切行わず、その場のファイルを観測するだけのモード。

## オートセーブとロールバック

設計思想として「ビデオゲームのセーブ」が引き合いに出されている。キーバインドを1つ変えるたびに「これはcommitに値するか」を判断したくない、自動でセーブしておいて必要なら過去のセーブを選ばせてほしい、という発想。

もちろん保存された設定が壊れている可能性はある。オートセーブはファイルの見た目を記録するだけで、その設定が動くかどうかは検証しない。だから履歴とロールバックがある。

```sh
mise bootstrap dotfiles history --path ~/.zshrc
mise bootstrap dotfiles rollback ~/.zshrc
```

`rollback`はディスク上の内容と異なる直近の保存版に戻す。`--dry-run`でプレビュー、`--to`で特定チェックポイント指定。置き換える前に現在の内容も保存されるので、`mise bootstrap dotfiles undo`で戻せる（undoの対象はその操作で触れたファイルだけ）。

ロールバック自体も新しいcommitになるため、ラップトップ側で壊れた設定を直せばその修正が同期でデスクトップにも届く。

## 複数マシンでの共有

ここまではローカル完結。共有するにはリポジトリを作ってoriginを設定する。

```sh
mise bootstrap dotfiles origin set git@github.com:jdx/dotfiles.git
```

設定時にmiseが「何がマシンの外に出るか」をプレビューして確認を求める。デフォルトは`sync`モードで、watcherが保存分をpushし、定期的にfetchして他マシンの更新を適用する。`--sync manual`にすればオートセーブはローカルに留まり、明示的に同期したときだけ出ていく。

記事では**公開リポジトリを自動同期で使わないこと**を強く勧めている。一時的な編集に資格情報が混ざることがあり、あとから消してもcommitは残る。追跡対象のファイルはすべて過去バージョンも含めてリポジトリに到達しうるし、untrackしても以後のキャプチャが止まるだけで過去のcommitは消えない。

### 新しいマシンのbootstrap

同じリポジトリでツール・パッケージ・サービスの宣言も運べる。ただしそれらの宣言はグローバルの`config.toml`に書かれているので、`config.toml`自身も明示的にtrackする必要がある（`.zshrc`だけ追跡しても宣言は付いてこない）。

```toml
[tools]
node = "lts"
python = "3.14"

[bootstrap.packages]
"brew:ffmpeg" = "latest"

[dotfiles]
"~/.zshrc" = { mode = "track" }
"~/.config/nvim" = { mode = "track" }
"~/.config/mise/config.toml" = { mode = "track" }

[bootstrap.services.mise-history]
builtin = "history-watch"
```

```sh
mise bootstrap --from-git git@github.com:jdx/dotfiles.git
```

既存ファイルとの衝突をプレビューしてから適用する。リモートのマシンについては`mise bootstrap remote`があり、SSH経由でラップトップ側のGitHubアクセスを借りてセットアップできる（トークンを相手にコピーしない）。ただし継続的な同期には結局そのマシンにGit認証が要る。

## コンフリクトの扱い

判断が必要なコンフリクトが起きると、**セットアップ全体**でpublishと受信適用が止まる。ローカルの履歴保存とfetchは続く。ライブの設定ファイルにコンフリクトマーカーが挿入されることはない。解決はファイル単位。

```sh
mise bootstrap dotfiles status
mise bootstrap dotfiles pull --take-remote ~/.zshrc
```

`--keep-local`ならこちらの版を採用。全部解決して、その判断が現在のファイルと整合することをmiseが確認できたら共有が再開する。

停止に気づく主な手段はデスクトップ通知（macOS/Linuxではデフォルト有効）。Windowsやヘッドレス環境では`mise doctor`か`dotfiles status`を自分で見る必要があり、そうでないとファイルが古いままなことで初めて気づくことになる、という課題は著者自身も認めている。

### 設計上の未解決点

同期は保存されたcommitをすべてpublishする。トークンを一時的に暗号化されていないファイルに書いて、同期前に消したとしても、中間のcommitに残って共有されうる（manual syncは公開を遅らせるだけ）。未publishの保存をsquashすることを検討中だが、ローカルと共有の履歴が揃わなくなるため決めかねている、と書かれている。

## [[omarchy|Omarchy]]での使い方

[[omarchy|Omarchy]]は「使うファイルを自分でカスタマイズする」前提の作りで、個人設定は`~/.config`、シェルのカスタマイズは`~/.bashrc`、Omarchy自身のファイルは`~/.local/share/omarchy`に置かれる。そこで個人のファイルだけを選んで追跡する例が挙げられている。

```sh
mise bootstrap dotfiles track ~/.bashrc
mise bootstrap dotfiles track ~/.config/hypr/bindings.conf
mise bootstrap dotfiles track ~/.config/hypr/input.conf
```

テーマのアセットやキャッシュ、アプリケーションの状態まで巻き込まないよう、ディレクトリごとではなく個別ファイルから始めるのが推奨されている。

Omarchyのアップデート前後でスナップショットを取ることもできる。

```sh
mise bootstrap dotfiles capture --label "omarchy update" -- omarchy-update
mise bootstrap dotfiles history --label "omarchy update"
mise bootstrap dotfiles history diff --operation --patch
```

`capture`は前後にチェックポイントを打った上でコマンドを実行する。ただしこれで拾えるのは追跡中のdotfilesだけで、パッケージやOSレベルの復旧はOmarchyのシステムスナップショットの担当。

## 共有リポジトリ内の秘密ファイル

Gitの中で内容を秘密にしたいファイルは、**最初のキャプチャより前に**暗号化を設定する。

```toml
[history.encryption]
recipients = ["<mac-public-recipient>", "<linux-public-recipient>", "<recovery-public-recipient>"]

[dotfiles]
"~/.config/app/credentials" = { mode = "track", encrypt = true }
```

- 公開recipientのリスト1つで全暗号化ファイルをカバーし、各マシンは自分のidentityで復号する。
- 暗号化はGitに入る前に行われる。ファイル名は見えるまま、復元されるライブファイルは平文。
- 秘密鍵は追跡対象のリポジトリの外に置き、デバイス紛失に備えて独立したrecovery recipientを入れておく。

平文で保存した後から`encrypt = true`を足した場合、次の保存は暗号化されるが、Gitは以前の平文バージョンも一緒に送ろうとする。これに対してmiseはpush前にブランチの履歴（マージ親を含む）を歩いて、そのcommit群で「暗号化」と宣言されたパスを集め、それらの保存済みバージョンがすべてmiseの暗号化フォーマットになっているかを検査する。平文や不正な版を見つけたらpushを止めてパスとcommitを示す。履歴の書き換え・置き換えは利用者が明示的にやる必要があり、miseは勝手にやらない。

これは**宣言の強制であって、秘密のスキャンではない**。普通の暗号化していない`.zshrc`にうっかりトークンを保存してしまったケースは検出されない。環境変数から秘密を読むアプリ向けにはmiseのenvironment secretsやfnoxのほうが向いている、とされている。

## その他の運用オプション

- **選択的に追跡する** — 特にディレクトリ単位で入れるときは注意。ログ・キャッシュ・DB・頻繁に書き換わるセッション状態は対象外にする。
- **騒がしいファイル** — watcherは書き換えの多いパスの保存間隔を空ける（他のファイルは遅延しない）。パスの除外や`autosave = false`にして明示保存する運用も可能。同期は保存済みの版をpublishする。
- **生成される設定** — テンプレートは追跡と併用できる。テンプレートのソースを追跡してそちらを編集し、`bootstrap`で各マシンの出力をレンダリングする。
- **保存の説明文** — miseが自動生成するほか、Claude等のエージェントに書かせることもできる。ただし変更内容（暗号化していない設定の中身を含みうる）を、設定したコマンドに渡すことになる点に注意。

## 考えたこと

このリポジトリでも[[lefthook]]のバージョン固定に`mise.toml`を使っているように、miseは「ツールのバージョン管理」から入って徐々にマシン全体のセットアップへ守備範囲を広げている。dotfiles同期はその延長線上にある。

面白いのは、宣言的に環境を定義する[[nixos|NixOS]]/home-manager的アプローチと逆方向を向いている点。あちらが「唯一の正はソース側の宣言、ライブファイルは生成物」なのに対し、mise trackモードは「唯一の正はその場で編集しているライブファイル、履歴とGitはあとから勝手についてくる」。再現性は落ちるが、普段の編集ワークフローを一切変えないで済む。ゲームのオートセーブという比喩はそこをよく表している。

## 出典

- [Dotfiles That Save Themselves - jdx.dev](https://jdx.dev/posts/2026-09-07-dotfiles-that-save-themselves/)
- [Dotfiles | mise-en-place](https://mise.jdx.dev/dotfiles.html)
- [Bootstrap | mise-en-place](https://mise.jdx.dev/bootstrap.html)

#mise #dotfiles #cli #git
