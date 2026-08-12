---
created: 2026-08-12 09:43
updated: 2026-08-12 09:43
---
# betterleaks

#security #git #secret-scanning

[[gitleaks]] の作者 Zach Rice による後継のオープンソースシークレットスキャナ。2026年3月19日に公開された。Go製（CGO・Hyperscan依存なしのpure Go）、MITライセンス。Rice は Aikido Security（ベルギーのセキュリティ企業）でシークレットスキャン部門の責任者を務めており、開発は Aikido の支援を受けている。gitleaks リポジトリと名前の完全なコントロールを Rice がすでに持っていなかったことが、別プロジェクトとして立ち上げた理由とされる。

gitleaks の drop-in replacement を謳っており、既存のCLIオプションや設定はそのまま動くとされる。

## Token Efficiency: エントロピーに代わる誤検知フィルタ

gitleaks がランダム文字列らしさの判定にシャノンエントロピーを使っていたのに対し、betterleaks は **BPE（byte pair encoding）トークン化に基づく「Token Efficiency」** を使う。

- 自然言語はBPEトークナイザで長いトークンに効率よく圧縮される（高いtoken efficiency）。
- シークレットのようなランダム文字列は短いトークンに細切れになり、圧縮効率が悪い（低いtoken efficiency）。
- この差を誤検知フィルタの信号として使う。CredData データセットでの recall はエントロピーの 70.4% に対して 98.6% と報告されている。

LLMのトークナイザで使われるBPEを、シークレット検出の統計的シグナルとして転用しているのが面白いところ。

## その他の特徴

- **式ベースのルールフィルタ**: 検出候補の属性を式で評価してコンテキストに応じたフィルタリングができる（記事では CEL: Common Expression Language で検証ロジックを書けると紹介されている）。
- **シークレットの有効性検証**: ルール定義から非同期HTTPリクエストを発行し、検出したシークレットが実際に有効かを検証できる。
- **多様なスキャン対象**: git / ディレクトリ / stdin に加えて、GitHub・GitLab・Hugging Face・S3 などのリモートソースを直接スキャンできる。

```sh
betterleaks git /path/to/repo
betterleaks dir /path/to/dir
betterleaks github https://github.com/betterleaks
cat file.txt | betterleaks stdin
```

## 今後の計画（v2）

LLM支援によるシークレット分類、プロバイダAPI経由での自動失効（auto revocation）、漏れたシークレットの権限マッピング、さらなるデータソース対応などが予定されている。

## 出典

- [betterleaks/betterleaks - GitHub](https://github.com/betterleaks/betterleaks)
- [Betterleaks: Open-source secrets scanner - Help Net Security](https://www.helpnetsecurity.com/2026/03/19/betterleaks-open-source-secrets-scanner/)
- [Betterleaks, a new open-source secrets scanner to replace Gitleaks - BleepingComputer](https://www.bleepingcomputer.com/news/security/betterleaks-a-new-open-source-secrets-scanner-to-replace-gitleaks/)
- [Betterleaks — A Better Secrets Scanner](https://betterleaks.com/)
