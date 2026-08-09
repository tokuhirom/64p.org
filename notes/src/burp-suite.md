---
created: 2026-08-09
updated: 2026-08-09
---
# Burp Suite

#security

Webアプリケーションの脆弱性診断・セキュリティテストのための統合プラットフォーム。[[kali-linux|Kali Linux]]にもプリインストールされている定番ツールの一つ。

## 基本情報

- 開発元: PortSwigger社
- 仕組み: プロキシとしてブラウザとWebサーバー間の通信を傍受・改ざんし、脆弱性を発見・検証する

## 主要な構成ツール

- **Proxy**: 通信の傍受・記録
- **Repeater**: リクエストを手動で編集・再送信
- **Intruder**: 自動でペイロードを差し込むファジング・ブルートフォーステスト
- **Scanner**: 自動脆弱性検出
- **Decoder / Comparer**: エンコード変換・差分比較
- **Sequencer**: トークンのランダム性解析

拡張機能として**BApp Store**から追加プラグインを導入することも可能。

## エディション(2026年時点)

| エディション | 対象 | 主な機能 |
| --- | --- | --- |
| Community | 無償ユーザー | Proxy、Repeater、Decoder、Sequencer、Comparer + Intruder(デモ版) |
| Professional | 個人テスター | フル機能のScanner、完全版Intruder、プロジェクト保存、OAST |
| Burp Suite DAST | 組織向け | 継続的な自動スキャン、CI/CD連携 |
| Burp AT | Professionalユーザー向け | AIによる脆弱性追跡機能(2026年7月追加) |

## 出典

- [Burp Suiteとは何か？Webアプリの脆弱性診断に欠かせないプロキシツールの概要を徹底解説 | 株式会社一創](https://www.issoh.co.jp/tech/details/9699/)
- [Burp Suite｜サイバーセキュリティ.com](https://cybersecurity-jp.com/security-words/99860)
- [Burp Suiteとは【用語集詳細】](https://www.sompocybersecurity.com/column/glossary/burp-suite)
