---
created: 2026-08-14 14:02
updated: 2026-08-14 14:02
---
# OpenHaystack

#apple #bluetooth #security #oss

<https://github.com/seemoo-lab/openhaystack>

ドイツ TU Darmstadt の Secure Mobile Networking Lab (SEEMOO) の研究者 (Alexander Heinrich, Milan Stute) が開発したオープンソースのフレームワーク。Apple の [[find-my-network|Find My ネットワーク]]をリバースエンジニアリングし、**自作の「AirTag」的な BLE トラッカーを作れる**ようにするもの。AirTag の正式発表（2021年4月）より前の2021年3月に公開され、WiSec 2021 で論文としても発表された。

## 仕組み

Find My ネットワークの「公開鍵を知っていれば誰でも対応する位置レポートを取得できる」という E2E 暗号化設計を利用している。

1. **鍵生成** — P-224 の鍵ペアを生成し、秘密鍵は手元（Mac のキーチェーン）に保存
2. **アドバタイズ** — 自作トラッカーが公開鍵を BLE アドバタイズとして発信
3. **レポート** — 近くを通った世界中の iPhone が位置を公開鍵で暗号化して Apple サーバーへ自動送信（AirTag と同じ仕組みに相乗り）
4. **取得** — 秘密鍵でレポートを復号して位置を得る

Apple 製ハードウェアを一切持たないデバイスでも、公開鍵をアドバタイズするだけで数億台の iPhone 網に位置を運んでもらえるのがポイント。

## 対応ハードウェア

- Nordic nRF51 (BBC micro:bit v1 など)
- ESP32 — コイン電池1個で長期間動く
- Linux HCI (Raspberry Pi など)

## 制約・注意点

- 位置レポートの取得には Apple ID での認証が必要。オリジナル版は macOS 11+ の Apple Mail プラグイン経由でレポートを取得するというハック的手法（Gatekeeper の一時無効化が必要）を使う
- 自作トラッカーは固定の公開鍵を発信し続けるため、AirTag と違って鍵ローテーションがなく、逆に第三者から追跡され得る
- Apple 非公式の実験的ソフトウェア

## 派生プロジェクト

オリジナルの macOS アプリはメンテがほぼ止まっており、派生が実質的な後継になっている。

- [Macless-Haystack](https://github.com/dchristl/macless-haystack) — Mac 不要（Apple ID + 2FA のみ必要）で Find My ネットワークを使えるようにした統合プロジェクト。ファームウェア・鍵生成・エンドポイント・Flutter 製 UI をまとめている
- [Go Haystack](https://github.com/hybridgroup/go-haystack) — Go/TinyGo による実装

## 出典

- [seemoo-lab/openhaystack (GitHub)](https://github.com/seemoo-lab/openhaystack)
- [OpenHaystack: A Framework for Tracking Personal Bluetooth Devices via Apple's Massive Find My Network (WiSec 2021)](https://dl.acm.org/doi/10.1145/3448300.3468251)
- [dchristl/macless-haystack (GitHub)](https://github.com/dchristl/macless-haystack)
- [Adafruit blog: Track personal Bluetooth devices via Apple's Find My network without Apple hardware](https://blog.adafruit.com/2025/01/22/track-personal-bluetooth-devices-via-apples-find-my-network-without-apple-hardware/)
