---
created: 2026-08-13 21:20
updated: 2026-08-13 21:20
---
# Playwright

Microsoftが開発しているオープンソースのブラウザ自動化・E2Eテストフレームワーク。2020年リリース。Chromium・Firefox・WebKitの3エンジンを単一のAPIで操作できる。Node.js/Python/Java/.NETなど複数言語向けのライブラリが提供されている。

## 特徴

- **自動待機(auto-waiting)** — 要素が操作可能になるまで自動的に待つため、flaky(不安定)なテストを減らせる
- **アサーションの自動リトライ** — 条件が満たされるまで再試行する
- **ネットワークインターセプト** — リクエスト/レスポンスを傍受・モックできる
- **ブラウザコンテキストの分離**と**並列実行**により高速・大規模なテストスイートを実現できる
- ヘッドレス実行に対応

## 用途

実際のブラウザを操作してナビゲーション・クリック・フォーム送信・UI検証などのユーザー操作をプログラムから再現する。クロスブラウザでのE2Eテストのほか、Chrome DevTools Protocol (CDP) 経由の汎用ブラウザ自動化ツールとしても使われる。[[herdr-browser]]がCDPツールの例として言及している。

#testing #browser-automation

## 出典

- [GitHub - microsoft/playwright](https://github.com/microsoft/playwright)
- [Beginner's Guide to Playwright Automation - Checkly Docs](https://www.checklyhq.com/docs/learn/playwright/what-is-playwright/)
- [Playwright Automation Framework: Tutorial [2026] | BrowserStack](https://www.browserstack.com/guide/playwright-tutorial)
