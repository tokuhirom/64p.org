---
created: 2026-08-15 17:12
updated: 2026-08-15 17:12
---
# Email Verification Protocol (EVP)

ブラウザが仲介してメールアドレスの所有権を暗号学的に検証する、確認メールを送らずに完了するメール確認のプロトコル。著者はDick Hardt（Hellō）とSam Goto（Google）。IETF Internet-Draft（`draft-hardt-email-verification`、2026年7月4日提出、個人提案でIETF標準としての正式な地位はまだない）として仕様化され、W3C WICGでもExplainerが公開されている。ChromeとMicrosoft EdgeでOrigin Trialが実施中で、参加メールプロバイダとしてGmailが明記されている。 #protocol #security #browser

## 解決しようとしている課題

従来の確認メール送信・OTP入力方式は「ユーザーが受信トレイを開いてコードやリンクを取得する」というアウトオブバンドな手順が必要で、次の2つの問題があった。

- ユーザーがサイトを離脱することによるコンバージョン率低下
- 悪意あるサイトによるOTP詐取（フィッシング）への脆弱性

## 仕組み

1. ユーザーがフォームでメールアドレスを選択する（オートフィル的な体験）
2. ブラウザがメールプロバイダ（issuer）と直接通信し、**Email Verification Token (EVT)** というJWTを取得する。EVTには検証済みメールアドレスとブラウザの公開鍵が入るが、どのサイト（RP: Relying Party）向けかは含まれない
3. ブラウザ側で**Key Binding JWT (KB-JWT)**を作り、EVTと結合してRPに提示する（RPのオリジン・nonce等を含む）
4. RPはサーバー側でトークンの署名やDNS由来の発行者情報を検証する

メールプロバイダは`.well-known/email-verification`エンドポイントを用意し、トークン発行エンドポイントや署名アルゴリズム（デフォルトEd25519）などのメタデータを公開する。

## プライバシー設計

三者モデルの肝は「発行者（メールプロバイダ）がRPの正体を知らない」点。Well-known/Accountsの取得時やトークン発行リクエスト時にRefererやOriginヘッダを意図的に省略する設計になっており、メールプロバイダ側は「ユーザーが今どこかで認証中」だとは分かっても「どのサイトか」は分からないようになっている。RPごとに異なるプライベートなメールアドレスを使い、サイト間相関を防ぐ仕組みも想定されている。

## 想定用途

アカウント新規作成時のメール確認、パスワードレスサインイン、アカウント復旧フローなど。

## 出典

- [Email Verification Protocol - IETF Internet-Draft](https://www.ietf.org/archive/id/draft-hardt-email-verification-00.html)
- [draft-hardt-email-verification-01 - Datatracker](https://datatracker.ietf.org/doc/draft-hardt-email-verification/)
- [Email Verification API - WICG Explainer](https://wicg.github.io/email-verification/)
- [Test the Email Verification Protocol with an origin trial - Chrome for Developers](https://developer.chrome.com/blog/email-verification-protocol-origin-trial)
