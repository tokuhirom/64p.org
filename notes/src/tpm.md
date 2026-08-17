---
created: 2026-08-17 18:19
updated: 2026-08-17 18:19
---
# TPM(Trusted Platform Module)

暗号処理専用のセキュアなマイクロコントローラ(ハードウェアの「信頼の起点」)。Trusted Computing Group(TCG)が策定する仕様で、国際標準ISO/IEC 11889にもなっている。

## 主な機能

- **鍵の生成・保管・利用制限** — TPM内で生成した鍵をTPM外に持ち出せない形で保持できる。フィッシングでの鍵窃取対策になる。
- **プラットフォーム完全性の測定** — ブート時にファームウェア・OSコンポーネントを測定し、PCR(Platform Configuration Register)に記録する。[[uefi|Secure Boot]]などの検証に使われる。
- **デバイス認証** — チップに焼き込まれた固有のRSA鍵によりデバイスを認証。
- **辞書攻撃対策** — 認証値の試行回数が多いとロックがかかる仕組みを内蔵。

## TPM 2.0とTPM 1.2の違い

- **アルゴリズムアジリティ** — TPM 1.2はSHA-1決め打ちだったが、TPM 2.0はSHA-1に加えSHA-256が必須になり、RSAだけでなくECC(NIST P-256、Barreto-Naehrig 256bit曲線)にも対応。将来的なアルゴリズム追加にも対応できる設計。
- **複数の鍵・アルゴリズムをサポート** — TPM 1.2はSRK(Storage Root Key)がRSA-2048固定だったのに対し、TPM 2.0は階層(hierarchy)ごとに複数の鍵・アルゴリズムを持てる。
- **PCRバンク** — PCRがハッシュアルゴリズムごとに「バンク」として分離され、`TPM2_PCR_Allocate`コマンドで柔軟に構成できるようになった(仕様上はSHA1/SHA256が必須アルゴリズム)。
- **ライブラリ仕様化** — TPM 2.0の仕様自体は「ライブラリ仕様」で、将来のプラットフォーム別仕様のベースとなる共通のコマンド・機能セットを定義している。

WindowsではTPM 2.0はUEFIファームウェアが前提(レガシーBIOS+TPM 2.0の組み合わせは正しく動作しない)で、Windows 11の必須要件の一つにもなっている。

## 仮想化環境での実装

[[crosvm]]などのVMMは、virtio-TPMデバイスとしてゲストにTPM機能を提供できる。

## 出典

- [Trusted Platform Module (TPM) 2.0 Brief Introduction - AMI](https://www.ami.com/resources/trusted-platform-module-2-0-a-brief-introduction-by-trusted-computing-group/)
- [TPM 2.0 Library | Trusted Computing Group](https://trustedcomputinggroup.org/resource/tpm-library-specification/)
- [Trusted Platform Module Technology Overview | Microsoft Learn](https://learn.microsoft.com/en-us/windows/security/hardware-security/tpm/trusted-platform-module-overview)
- [TPM 1.2 vs 2.0: Differences & How to Upgrade](https://windowsreport.com/tpm-1-2-vs-2-0/)
- [TPM 2.0: Understanding Platform Configuration Registers - SysTutorials](https://www.systutorials.com/understanding-tpm-2-0-and-platform-configuration-registers-pcrs/)

#security
