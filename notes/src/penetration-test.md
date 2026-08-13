---
created: 2026-08-13 17:10
updated: 2026-08-14 01:23
---
# ペネトレーションテスト

#security

実際の攻撃者が使うのと同じツール・手法を用いて対象システムに疑似的な攻撃を仕掛け、セキュリティ上の脆弱性を発見・実証するテスト手法。「ペンテスト」とも呼ばれる。[[metasploit|Metasploit]]や[[burp-suite|Burp Suite]]のようなツール、[[kali-linux|Kali Linux]]のようなディストリビューションが実務で使われる。

## 定義

- **NIST (SP 800-115)**: システム・デバイス・プロセスが、積極的な侵害の試みにどの程度耐えられるかを検証するテスト、と定義している。単発の脆弱性を見つけるだけでなく、複数の脆弱性を組み合わせて、より深い侵入・権限昇格が可能かどうかまで検証することが多い。
- **OWASP**: Webアプリケーションを対象としたペンテスト手法を体系化した「Web Security Testing Guide (WSTG)」を公開している。入力値検証・認証機構・セッション管理・設定の不備など、Webアプリ特有の観点からテスト項目を網羅している。

## 脆弱性診断(Vulnerability Assessment)との違い

脆弱性診断が既知の脆弱性を網羅的に洗い出すスキャン中心の手法であるのに対し、ペネトレーションテストはそれらの脆弱性を実際に悪用(exploit)して、どこまで侵入できるか・実害に繋がるかを人手で検証する点が特徴とされる。

## 実施の前提

対象システムの所有者からの正式な許可(スコープ・期間・手法を定めた契約)が前提となる。許可なく行うと不正アクセス行為となる。[[hack-the-box|Hack The Box]]のような学習プラットフォームでは、許可された仮想環境上で技術を練習できる。

## [[security-operations|セキュリティ運用]]の中での位置づけ

防御側の運用（SOC・脅威ハンティング）が「既に起きた侵害」を探すのに対し、攻撃者の視点から疑似攻撃を仕掛けて防御の弱点を先に見つける検証手法。

## 出典

- [Top Penetration Testing Methodologies | IBM](https://www.ibm.com/think/insights/pen-testing-methodology)
- [penetration testing - Glossary | CSRC (NIST)](https://csrc.nist.gov/glossary/term/penetration_testing)
- [Penetration Testing Methodologies (OWASP)](https://owasp.org/www-project-web-security-testing-guide/latest/3-The_OWASP_Testing_Framework/1-Penetration_Testing_Methodologies)
