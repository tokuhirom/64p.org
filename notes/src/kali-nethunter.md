---
created: 2026-08-09
updated: 2026-08-09
---
# Kali NetHunter

#security #linux

Android端末向けのペネトレーションテストプラットフォーム。[[kali-linux|Kali Linux]]と同じOffensive Security(現OffSec)が開発した、オープンソースのAndroid用ペンテスト環境。

## 構成要素

- **Kaliコンテナ**: Linuxのセキュリティツール一式を含むチルート環境
- **NetHunter App Store**: ペンテスト/フォレンジック用Androidアプリのカタログ
- **Android専用クライアントアプリ**: App Storeの管理・操作用
- **KeX(Desktop Experience)**: HDMI出力やワイヤレス画面キャストでフルのLinuxデスクトップセッションを利用できる機能

## 3つのエディション

| エディション | 要件 | 対応機能 |
| --- | --- | --- |
| Rootless | root不要 | App Store、Kali CLI、KeX |
| Lite | Magiskによるroot必須 | 上記 + [[metasploit|Metasploit]] DB、NetHunter App |
| NetHunter(フル版) | root + カスタムカーネル必須 | 全機能(Wi-Fi注入、HIDキーボード攻撃、BadUSB、Evil AP MANA攻撃など) |

## 対応デバイス

GitLabリポジトリ上に250以上のカーネルが110以上のデバイス向けに存在する。公式イメージは四半期ごとにダウンロードページで公開されている。Nexus・OnePlusなど一部機種でフル機能に対応。

## 出典

- [Kali NetHunter | Kali Linux Documentation](https://www.kali.org/docs/nethunter/)
- [Kali NetHunter App Store - Android App Repository for Penetraton Testing and Forensics](https://store.nethunter.com/)
- [Kali Linux NetHunter 3.0 Android Mobile Penetration Testing Platform Out Now - Linux.com](https://www.linux.com/news/kali-linux-nethunter-30-android-mobile-penetration-testing-platform-out-now/)
