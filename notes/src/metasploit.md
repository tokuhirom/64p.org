---
created: 2026-08-09 17:48
updated: 2026-08-13 17:10
---
# Metasploit

#security

オープンソースの[[penetration-test|侵入テスト(ペネトレーションテスト)]]フレームワーク。[[kali-linux|Kali Linux]]にもプリインストールされている定番セキュリティツールの一つ。

## 基本情報

- 開発者: H. D. Moore(2003年に創設)
- 開発元: Rapid7(2009年に買収、現在も所有・管理)
- 実装言語: Ruby(当初はPerl、2007年までにRubyで書き直された)

## 何をするツールか

セキュリティ専門家・研究者・攻撃者が、脆弱性の発見・検証・攻撃シミュレーションを行うためのツール。「攻撃コードを書いて実行する」までの一連の作業を効率化するフレームワークで、`msfconsole` というCUIツールから操作するのが一般的。

## 主な構成要素

- **Exploit**: バグを突いて対象システムに侵入するコード(2,000以上を実装)
- **Payload**: 侵入成功後に対象システム上で実行されるコード(592以上)
- **Auxiliary modules**: スキャン・[[fuzzing|ファジング]]・スニッフィングなど補助機能を提供するモジュール群

## エディション

- **無料版(Open Source Edition)**: Ruby実装のモジュラー構成、1,500以上の組み込みexploitを含む
- **Pro版(商用)**: Quick Start Wizard、ソーシャルエンジニアリング、Webアプリテスト、VPNピボッティングなど高度な機能を追加(旧Community版・Express版は廃止済み)

## 最新動向

安定版は6.4.131(2026年5月リリース)。4,000超のエクスプロイトモジュールを収録している。

## 出典

- [Metasploit - Wikipedia](https://en.wikipedia.org/wiki/Metasploit)
- [Metasploit: ペネトレーションテスト・ソフトウェア | Rapid7](https://www.rapid7.com/products/metasploit/)
- [What is Metasploit Framework? A Step-by-Step Guide (2026)](https://www.eccouncil.org/cybersecurity-exchange/ethical-hacking/metasploit-framework-guide/)
