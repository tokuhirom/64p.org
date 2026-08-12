---
created: 2026-08-12 09:43
updated: 2026-08-12 09:43
---
# gitleaks

#security #git #secret-scanning

gitリポジトリ・ディレクトリ・標準入力から、ハードコードされたシークレット（パスワード・APIキー・トークンなど）を検出するオープンソースのSASTツール。Go製、MITライセンス。作者は Zach Rice（GitHub: zricethezav）で、2018年頃から開発されている。オープンソースのシークレットスキャナとしては最も広く使われている部類で、Docker downloads 1600万超・GitHub stars 17k超などの実績がある。

コミットしてしまう前に検出する pre-commit フックや、CI/CDでの検出（GitHub Action の gitleaks-action）として組み込むのが典型的な使い方。[[devsecops]] でいう「セキュリティの左シフト」をシークレット管理の面で実践するツールと言える。

## 検出の仕組み

- **正規表現 + シャノンエントロピー**の組み合わせ。AWSキー・GitHubトークン・Slack webhook など既知のシークレット形式は組み込みの正規表現ルールで、ランダム文字列らしさはエントロピー値でスコアリングする。
- ルールは TOML形式の `.gitleaks.toml` でカスタマイズ可能。allowlist（誤検知の除外）、エンコードされたテキストの自動デコード深度、アーカイブ内スキャンの深度なども設定できる。
- 出力形式は JSON / CSV / JUnit / SARIF。SARIF出力は GitHub Advanced Security と統合でき、GitHubのSecurityタブに findings を表示したり、シークレットを含むPRをブロックしたりできる。

## コマンド

スキャンモードは3つ。

```sh
gitleaks git /path/to/repo    # git履歴をスキャン
gitleaks dir /path/to/dir     # ディレクトリ/ファイルをスキャン
cat file | gitleaks stdin     # 標準入力をスキャン
```

かつての `detect` / `protect` コマンドは v8.19.0 で非推奨になった（互換性のため残ってはいる）。

## 現在のステータス

プロジェクトは「フィーチャー完成（feature complete）」を宣言しており、今後はセキュリティパッチのみのリリースに注力するとしている。メンテナーの Zach Rice は後継の [[betterleaks]] に注力しており、gitleaks への新機能のマージは停止予定。

## 出典

- [gitleaks/gitleaks - GitHub](https://github.com/gitleaks/gitleaks)
- [Gitleaks – Find Secrets, Stop Leaks, Secure Your Code](https://gitleaks.org/)
- [gitleaks/gitleaks-action - GitHub](https://github.com/gitleaks/gitleaks-action)
