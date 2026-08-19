---
created: 2026-08-19 12:54
updated: 2026-08-19 12:54
---
# NHI(Non-Human Identity)

#security #identity

マシン・アプリケーション・自動化プロセス・AIエージェントなどを認証するためのデジタル認証情報の総称。サービスアカウント、APIキー、OAuthトークン、証明書、SSHキーなどが含まれる。人間の従業員に紐付く「人間のアイデンティティ」と対比される概念で、開発者やシステムが作成・運用する。

## 5つの主要タイプ

- **OAuthトークンとAPIキー** — ベアラートークンとして機能し、保有するだけで即座にアクセスが許可される。アクセストークン(短命)とリフレッシュトークン(数ヶ月〜数年有効)に分かれる。
- **サービスアカウント** — 24時間動作し続け、人間向けの[[multi-factor-authentication|MFA]]のような保護がかからないことが多い。しばしば管理者権限で作成される。
- **シークレット・認証情報** — ハードコードされたパスワード、SSHキー、DB接続文字列。GitHubへのコミットやログファイルへの露出がリスク([[gitleaks|gitleaks]]のようなシークレットスキャナで検出する対象)。
- **証明書とキー** — TLS暗号化・コード署名・機械間認証に使用。失効漏れによるサービス停止のリスクもある。
- **AIエージェントと自動化** — 最も急成長しているカテゴリ。人間の介入なしに自律的に判断・実行し、しばしば過剰な権限を与えられて配置される。

## なぜ課題なのか

現代の企業ではNHIが人間のアイデンティティを25〜50倍上回るとされ、生成AI・エージェント型AIの普及でこの比率はさらに加速している。従来のIAM/[[privileged-access-management|PAM]]は「人間の入退社イベント」「管理職による四半期レビュー」「MFAを含む対話的認証」を前提に設計されており、NHIはそのどの前提にも当てはまらない。

- **可視性の欠如**: AWS IAMロール、Azureサービスプリンシパル、Salesforce接続アプリ、Kubernetesサービスアカウントなどが各プラットフォームで個別に管理され、統合的な追跡がない。
- **ガバナンスギャップ**: 四半期レビューは形骸化しがちで、「このサービスアカウントはまだ必要か」という問いに答えが出にくい。作成は数分ででき、廃止(デコミッション)は後回しにされる傾向が強い(API キーのオフボーディングプロセスを持つ組織は業界統計で約2割との指摘)。
- **トキシックコンビネーション**: 個々のNHIは無害でも、組み合わさると意図しないアクセス経路が生まれる。例: 顧客データ読み取り権限を持つOAuthアプリと、データウェアハウス書き込み権限を持つサービスアカウントが連鎖すると、データ流出経路が出現する。

## OWASP非ヒト型アイデンティティ Top リスク

1. 不適切なオフボーディング — 離職・ベンダー契約終了後もトークンが有効なまま残る
2. シークレット流出 — ログ・リポジトリ・エラーメッセージへの認証情報の露出
3. サードパーティNHIの脆弱性 — ベンダー側の侵害が下流の顧客に波及する
4. 過度な特権付与 — 最小権限より管理者権限が優先されがち([[least-privilege|最小権限の原則]]違反)
5. 環境間でのNHI再利用 — 開発環境の認証情報が本番環境でも使い回される

## 対策の方向性(2026年時点)

- **包括的可視性**: クラウド・SaaS・オンプレミス全域でのNHI発見の自動化。
- **ライフサイクルガバナンス**: 所有者の割り当て、承認ワークフロー、自動デコミッション、認証情報の自動ローテーション。
- **行動検知**: 静的なインベントリ管理は作成直後に陳腐化するため、普段と異なるASN/リージョンからの認証、権限スコープの急変といった異常を継続監視する方向にシフトしている。
- **最小特権の強制**: 過剰権限アカウントの監査、OAuthスコープの見直し。

## [[privileged-access-management|PAM]]との関係

PAMはもともと人間の対話的セッションを前提に設計された仕組みで、そのままではワークロード同士の認証(service-to-service)にきれいに当てはまらない。「シークレットを[[vault|Vault]]に入れてローテーションする」だけでは、パイプライン実行中の数十秒だけ必要な認証情報や、大量のエフェメラルなサービスが同時にスコープ付きアクセスを要求するケースに対応しづらい。vaultingは秘密の露出を減らせても、「今アクセスすべきか」「そのワークロードは名乗る通りの存在か」という認可判断そのものは解決しないため、NHI領域ではJust-in-Time(JIT)アクセスやワークロードID検証を組み合わせる「Workload IAM」という別分野が発展しつつある。

## [[identity-and-access-management|IAM/アクセス管理]]の中での位置づけ

このノートは「機械・AIエージェント側のアイデンティティ」を扱う。人間側の認証は[[multi-factor-authentication|MFA]]、権限昇格の管理は[[privileged-access-management|PAM]]を参照。

## 出典

- [What Are Non-Human Identities? The Complete Guide to NHI Security - Obsidian Security](https://www.obsidiansecurity.com/blog/what-are-non-human-identities-nhi-security-guide)
- [Top 10 Non-Human Identity Security Tools and Platforms for 2026 - GitGuardian](https://blog.gitguardian.com/nhi-security-tools/)
- [Beyond Human Users: Why Non-Human Identity Is the New Security Perimeter in 2026 - NHIMG](https://nhimg.org/nhi-101/non-human-identity-security-perimeter-2026)
- [Non-Human Identity Security: Key Takeaways From Gartner's PAM Report - Aembit](https://aembit.io/blog/key-takeaways-on-non-human-identity-security-from-gartners-pam-report/)
- [How Non-Human Identity Supports Privileged Access Management - Oasis Security](https://www.oasis.security/blog/non-human-identity-complement-privileged-access-management)
