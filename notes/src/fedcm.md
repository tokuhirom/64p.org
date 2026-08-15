---
created: 2026-08-15 17:14
updated: 2026-08-15 17:14
---
# FedCM (Federated Credential Management API)

サードパーティCookieやリダイレクトに頼らず、ブラウザが仲介する形でフェデレーション認証（「Googleでサインイン」のような外部IdPによるログイン）を実現するWeb標準API。Chrome/EdgeなどのPrivacy Sandbox関連APIの一つとして開発され、W3C FedID Community Groupで標準化が進んでいる。 #protocol #security #browser

## 背景

従来のフェデレーション認証（OAuth/OIDCベースの「〇〇でサインイン」ボタン）は、IdP（Identity Provider、認証情報を持つ側。例: Google）とRP（Relying Party、ログインを受け付けるサイト）間の連携にiframeやポップアップ、リダイレクト、サードパーティCookieを使っていた。ブラウザがサードパーティCookieを制限・廃止する流れの中で、これらの仕組みは動作しなくなる。FedCMはCookieに依存しない代替手段として設計された。

## 仕組み

RP側は`navigator.credentials.get()`にIdPの`configURL`と`clientId`を渡して呼び出す。IdP側は3層構造でエンドポイントを用意する。

- **`.well-known/web-identity`** — IdPのルートドメインに置くメタデータファイル
- **Config file** — `accounts_endpoint`・`client_metadata_endpoint`・`id_assertion_endpoint`・`login_url`などを列挙するJSON
- **Accounts endpoint** — ログイン中ユーザーのアカウント一覧（id・email・name等）を返す
- **ID assertion endpoint** — ユーザーがアカウントを選択した後、RP向けのトークンを発行する

ユーザーへのアカウント選択UIはブラウザが標準ダイアログとして描画し、IdP・RPどちらのページにも埋め込まれない。IdP側はログイン状態を`navigator.login.setStatus()`やHTTPの`Set-Login`ヘッダーで管理する。

## プロトコル非依存

FedCM自体は認証プロトコルそのものではなく、既存のOAuth/OpenID Connectサーバーの上に被せる「ブラウザ仲介レイヤー」という位置づけ。IdP側がFedCM用エンドポイントを実装し、発行したコードを既存のアクセストークン取得フローに渡すといった統合が可能。

## 採用状況

Googleは2024年10月にGoogle Identity ServicesのFedCM移行を完了し、2025年8月からOne Tap・サインインボタンでのFedCM利用を必須化した。LinkedIn・Reddit・Notionなど「Googleでサインイン」を使う多数のサイトが、Chrome上では実質的にFedCM経由で動作している。ブラウザ対応はChrome/Edgeが先行し、Firefox・Safariは限定的または実装予定の段階。

## [[email-verification-protocol|Email Verification Protocol]]との関係

どちらも「ブラウザが第三者（IdP／メールプロバイダ）とRPの間を仲介し、Cookieや手動のやり取りなしにユーザーの身元・所有権を証明する」という設計思想を共有する。EVPはメールアドレス所有権の検証に特化した仕組みで、FedCMはより一般的なフェデレーション認証（アカウントそのものでのログイン）を扱う点が異なる。

## 出典

- [Federated Credential Management API is shipping - Privacy Sandbox](https://privacysandbox.google.com/blog/fedcm-shipping)
- [FedCM: A privacy-preserving identity federation API - Chrome for Developers](https://developer.chrome.com/docs/identity/fedcm/overview)
- [Federated Credential Management (FedCM) API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/FedCM_API)
- [Federated Credential Management API - W3C](https://w3.org/TR/fedcm)
