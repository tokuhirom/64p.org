---
created: 2026-09-01 18:10
updated: 2026-09-01 18:10
---
# systemd-creds

systemdがサービスへ機密情報(パスワード・APIキー・秘密鍵・証明書など)を渡すための「クレデンシャル」機構と、それを操作するCLIツール。環境変数や設定ファイルに秘密を直書きする代わりに使う。 #linux #systemd #security

秘密の値をディスク上では[[tpm|TPM 2.0]]やホスト鍵で暗号化したまま置いておき、サービス起動の瞬間だけsystemdが復号してramfs上のファイルとして渡す、というのが中心的なアイデア。

## 環境変数との違い

秘密を渡す手段として環境変数がよく使われるが、クレデンシャルは以下の点で性質が異なる。

| | 環境変数 | クレデンシャル |
|---|---|---|
| 子プロセスへの伝播 | プロセスツリー全体に継承される | 継承されない。読みたいプロセスが明示的にファイルを読む |
| 他プロセスからの参照 | `/proc/PID/environ` 経由で覗ける場合がある | アクセスのたびにカーネルが権限チェック |
| スワップ | 通常のメモリなのでスワップされうる | ramfs上に置かれ、スワップされない |
| ライフサイクル | 曖昧 | サービス起動時に取得、停止時に破棄、実行中は不変 |
| 保存時の暗号化 | なし | TPM2/ホスト鍵で暗号化可能 |

## unitでの受け取り方

unitファイル側で受け取り口を宣言する。

```ini
[Service]
LoadCredential=dbpass:/etc/myapp/dbpass            # 平文ファイル/ソケットから読む
LoadCredentialEncrypted=dbpass:/etc/myapp/db.cred  # 暗号化ファイルを起動時に復号
SetCredential=greeting:hello                        # リテラル(機密でない値向け)
SetCredentialEncrypted=dbpass:base64テキスト...     # 暗号化した値をunitに直接埋め込む
```

サービス側は`$CREDENTIALS_DIRECTORY`配下のファイルを読むだけでよい。復号はsystemdが済ませているので、アプリケーションが暗号を意識する必要はない。

```sh
cat "$CREDENTIALS_DIRECTORY/dbpass"
```

## CLIとしてのsystemd-creds

| サブコマンド | 用途 |
|---|---|
| `list` | 現在の実行コンテキストに渡されたクレデンシャルの一覧 |
| `cat NAME` | 中身を標準出力へ |
| `setup` | ホスト鍵`/var/lib/systemd/credential.secret`を初期化(root専用) |
| `encrypt IN OUT` | 平文を暗号化 |
| `decrypt IN [OUT]` | 復号 |
| `has-tpm2` | TPM2デバイスの有無を報告 |

```sh
# 暗号化して、unitに貼れる SetCredentialEncrypted= 形式(-p)で出力する
systemd-ask-password -n | systemd-creds encrypt --name=mysql-password -p - -

# ファイル同士で
echo -n 'hunter2' | systemd-creds encrypt --name=dbpass - db.cred
systemd-creds decrypt db.cred
```

`list`の出力にはクレデンシャルごとにsecure/weak/insecureの状態が付く。secureはramfs上、weakはそれ以外のメモリ、insecureはパーミッションが0400以外で所有者以外にも読めてしまう状態を指す。

## 暗号化の仕組み

AES256-GCMによる対称暗号化で、機密性と完全性の両方を得る。暗号文はBase64。鍵は`--with-key=`で選ぶ。

- `host` — `/var/lib/systemd/credential.secret`(root only)のみを使う。ディスクを丸ごと持ち出されると復号されうる。
- `tpm2` — [[tpm|TPM 2.0]]から導出した鍵のみ。**そのハードウェアでしか復号できない**。
- `host+tpm2` — 両方のSHA256を組み合わせる。ハードウェアとOSインストールの両方が一致しないと復号できない。
- `auto` — 既定値。TPM2が使えて`/var`が永続メディアなら`host+tpm2`相当を選ぶ。
- `auto-initrd` — initrd向け。TPM2があれば使い、なければ空鍵にフォールバックする。
- `tpm2-absent` — 固定のゼロ鍵。機密性も認証性もない(形式だけ揃えたいとき用)。

TPM2デバイスは`--tpm2-device=`で`/dev/tpmrm0`のように明示できるほか、`auto`(自動検出)、`list`(列挙)が使える。

なお[[uefi|Secure Boot]]が無効な環境では`has-tpm2`が`partial`を返す。TPM2に封印しても計測ブートの前提が崩れているため、本番でTPM2鍵に頼るならSecure Bootとセットで考える必要がある。

## クレデンシャルの注入経路

unit以外にも、外側からシステム全体にクレデンシャルを注入する経路が用意されている。VMやコンテナに「起動時に一度だけ秘密を渡す」用途を想定した設計になっている。

- コンテナマネージャ — `systemd-nspawn --set-credential=`
- ハイパーバイザ — SMBIOS type 11のOEM文字列、または[[qemu|QEMU]]の`fw_cfg`
- UEFI — `systemd-stub`経由で[[uefi|ESP]]から
- カーネルコマンドライン — `systemd.set_credential=`
- initrd — `/run/credentials/@initrd/`から本体システムへ引き継ぐ
- クラウドのIMDS — `systemd-imdsd@.service`が取得して`/run/credstore/`へ置き、`ImportCredential=`で参照できる

```sh
# コンテナにrootのハッシュ済みパスワードを渡す例
systemd-nspawn -i test.raw --set-credential=passwd.hashed-password.root:$(mkpasswd mysecret) -b

# 中から確認する
systemd-creds --system cat mycred
```

`passwd.hashed-password.<user>`や`firstboot.locale`など、systemd自身が消費する既知のクレデンシャル名がいくつか定義されており、イメージを書き換えずに初回起動時の設定を外から与えられる。

## [[vault|Vault]]のような秘密管理基盤との関係

Vault/OpenBaoが「秘密をどこに集約し、誰に、どういう条件で配るか」というネットワーク越しの管理レイヤを担うのに対して、systemd-credsは「配られてきた秘密を、そのマシンの中でプロセスに渡すまでの最後の1ホップ」を扱う。両者は競合ではなく、Vaultから取り出した値をsystemd-credsで暗号化してunitに埋める、という組み合わせが成り立つ。ローテーションや監査ログといった機能はsystemd-creds側にはない。

## 出典

- [System and Service Credentials - systemd.io](https://systemd.io/CREDENTIALS/)
- [systemd-creds(1) - Ubuntu Manpage](https://manpages.ubuntu.com/manpages/noble/man1/systemd-creds.1.html)
- [systemd-creds - systemd-rhel9 docs](https://redhat-plumbers.github.io/systemd-rhel9/systemd-creds.html)
- [The magic of systemd-creds - smallstep](https://smallstep.com/blog/systemd-creds-hardware-protected-secrets/)
