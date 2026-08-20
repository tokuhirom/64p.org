---
created: 2026-08-14 15:35
updated: 2026-08-21 07:57
---
# OWASP Top 10

[[owasp|OWASP]]が公開する、Webアプリケーションにとって最も重大なセキュリティリスクを10個にランキングしたドキュメント。2003年に初版が出て以降、2004・2007・2010・2013・2017・2021・2025年と改訂が重ねられてきた。2026年8月時点の最新版は2025年版。

## 策定方法論

- 複数組織から集めた脆弱性データ（2025年版では約175,000件のCVEレコード）をCWE（Common Weakness Enumeration）にマッピングして分析する。2025年版では589種類のCWEが分析対象になった。
- 10カテゴリのうち8つはこのデータ分析から選定され、残り2つは自動テストでは検出しにくいリスクを補うための「コミュニティ調査(Top 10 community survey)」から選定される。
- 各カテゴリは平均25個程度のCWEから構成される（2025年版、最小5〜最大40）。プログラミング言語やフレームワークをまたいで適用できる粒度を意図している。
- スコアリングにはCVSSv3とCVSSv2の加重平均を使用（CVSSv4はスコアリングアルゴリズムの根本変更のため2025年版では未採用）。

## Top 10:2025

1. **A01:2025 Broken Access Control** — 認可の不備。ユーザー権限の適用漏れにより、本来許可されないリソース・操作にアクセスできる。2025年版では[[ssrf|SSRF]]（旧A10:2021の単独カテゴリ）がここに統合された。
2. **A02:2025 Security Misconfiguration** — 不適切なデフォルト設定、不要な機能の有効化、エラーメッセージの過剰開示など。
3. **A03:2025 Software Supply Chain Failures** — 旧「Vulnerable and Outdated Components」を拡張し、依存関係・ビルドシステム・配布インフラ全体を含む[[supply-chain-attack|供給網]]のリスクを対象にする。
4. **A04:2025 Cryptographic Failures** — 弱い、または未実装の暗号化により機密データが漏洩する。
5. **A05:2025 Injection** — 信頼できない入力がインタプリタに渡り、意図しないコマンド・クエリとして実行される（XSSを含む）。
6. **A06:2025 Insecure Design** — 実装以前の設計段階の欠陥。セキュアな設計パターンや脅威モデリングの欠如。
7. **A07:2025 Authentication Failures** — 認証・セッション管理の不備（旧称「Identification and Authentication Failures」）。
8. **A08:2025 Software or Data Integrity Failures** — CI/CDパイプラインや自動更新の完全性検証不足、安全でないデシリアライズ。
9. **A09:2025 Security Logging & Alerting Failures** — 侵害の検知・対応を妨げるログ・アラート体制の不備（旧称「Security Logging and Monitoring Failures」、アラート機能の重要性を強調してリネーム）。
10. **A10:2025 Mishandling of Exceptional Conditions** — 2025年版の新規カテゴリ。不適切なエラー処理、論理的エラー、フェイルオープンなど、システムが遭遇する例外的状況の扱いに起因するリスク。

## 2021年版からの主な変更点

- **SSRFの統合**: [[ssrf|SSRF]]は2021年版で新設された単独カテゴリ（A10:2021）だったが、2025年版ではBroken Access Controlに統合された。
- **Vulnerable and Outdated Componentsの拡張**: Software Supply Chain Failuresとしてスコープが供給網全体に広がった。
- **新規カテゴリ**: Mishandling of Exceptional Conditions。
- **リネーム**: Identification and Authentication Failures → Authentication Failures、Security Logging and Monitoring Failures → Security Logging & Alerting Failures。

## 関連

- [[owasp|OWASP]] — 発行元のハブノート
- [[owasp-api-security-top-10|OWASP API Security Top 10]] — API特有のリスクに特化した姉妹プロジェクト
- [[ssrf|SSRF]] — 2021年版でこのTop 10に単独カテゴリとして採用されていた脆弱性

## 出典

- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [Introduction - OWASP Top 10:2025](https://owasp.org/Top10/2025/0x00_2025-Introduction/)
- [Introduction - OWASP Top 10:2021](https://owasp.org/Top10/2021/A00_2021_Introduction/)
- [OWASP Top 10 - OWASP Developer Guide](https://devguide.owasp.org/en/07-training-education/05-top-ten/)

#security
