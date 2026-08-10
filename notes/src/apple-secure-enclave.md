---
created: 2026-08-10 09:24
updated: 2026-08-10 09:24
---
# Secure Enclave

Apple製SoC（システムオンチップ）に組み込まれた専用のセキュリティサブシステム。メインのアプリケーションプロセッサとは物理的に隔離された独立コプロセッサとして動作し、メインOS（iOS/macOS）のカーネルが侵害されても機密データを守れるよう設計されている。

## アーキテクチャ

- 独自のBoot ROM、AES暗号化エンジン、保護されたメモリ領域を持つ。
- Appleがカスタマイズした L4マイクロカーネル をベースに動作。
- メインチップとは割り込み駆動の「メールボックス」方式で通信し、独立して自己完結的に動作するため、OS側が侵害されても完全性を保つ。
- 低いクロック速度で動くよう設計され、クロック攻撃や電力解析攻撃（サイドチャネル攻撃）への耐性を持たせている。
- 2020年発表のM1以降、Apple SiliconチップにはSecure Enclaveが直接内蔵されている。それ以前のIntel Macでは、独立したT2セキュリティチップ内にSecure Enclaveが搭載されていた。

## UID（一意識別子）キー

デバイスごとに固有の「UID」というルート暗号鍵を持つ。A9以降のSoCでは、製造時にSecure Enclave内蔵の真性乱数生成器（TRNG）によって生成・記録され、Apple自身やサプライヤーを含め外部からは一切読み出せない。このUIDが各種暗号鍵の導出のベースになる。

## Secure Storage Component

A12/S4以降のデバイスに搭載された専用のセキュアストレージデバイス。I2Cバス経由でSecure Enclaveのみがアクセス可能。2020年秋以降のモデルでは「第2世代Secure Storage Component」となり、ブルートフォース対策のカウンターロックボックス機能が追加された。

## 生体認証（Touch ID / Face ID）との連携

- **Touch ID**: 指紋センサーとSecure Enclaveが共有鍵からセッション鍵を生成し、通信を暗号化・認証する。センサーが取得したデータは処理用に直接Secure Enclaveへ送られる。
- **Face ID**: Secure Neural Engineが2D画像と深度マップを数学的な表現（テンプレート）に変換。A11〜A13ではSecure Enclave内に統合、A14以降はアプリケーションプロセッサ側のNeural Engineの専用セキュアモードとして実装されている。
- どちらの場合も、登録時にテンプレートデータをSecure Enclave内で処理・暗号化・保存し、認証時は新しい入力とテンプレートを比較。アプリ側には「認証成功/失敗」という結果のみが渡され、生体情報そのものは一切外部に出ない。

## 暗号処理の仕組み

Memory Protection Engineが、AESのMAC-XEXモードでメモリブロックを暗号化し、CMAC認証タグで改ざんを検知する。A11以降は再生（リプレイ）攻撃対策としてanti-replay valueも実装されている。

#security #apple

## 出典

- [Secure Enclave - Apple サポート](https://support.apple.com/guide/security/the-secure-enclave-sec59b0b31ff/web)
- [Secure Enclaveってなんだ？〜Macの中にある「金庫室」の正体〜 - Qiita](https://qiita.com/GeneLab_999/items/92f1b8457b838f52a0f5)
- [A brief history of the Secure Enclave – The Eclectic Light Company](https://eclecticlight.co/2025/08/30/a-brief-history-of-the-secure-enclave/)
- [Hardware security overview - Apple Support](https://support.apple.com/guide/security/hardware-security-overview-secf020d1074/web)
