---
created: 2026-08-10 16:41
updated: 2026-08-13 22:06
---
# JetKVM

1つのキーボード・モニター・マウスで複数のPCをネットワーク経由(IP)で遠隔操作できる、オープンソースのIP-KVM(KVM over IP)デバイス。

## 特徴

- H.264ビデオ圧縮を使用し、1080p・60fpsの高解像度映像を30〜60ミリ秒という低遅延で伝送。マウス・キーボード操作もスムーズに行える
- [[bios|BIOS]]レベルへのアクセス、OSインストール、OSが起動していない状態でのトラブルシューティングまで可能なKVM over IP技術を実装
- Go言語で書かれたオープンソースソフトウェアで、Linux上で動作。ソースコードはGitHubで公開されている
- WebRTC技術によるリモートアクセスを可能にする「JetKVM Cloud」を提供しており、制限の厳しいネットワーク環境でも安全かつ高速な接続ができる

## 物理仕様

高さ31mm×幅43mm×奥行60mm、重さ30gという小型のデバイス。

## 用途

サーバーやPCをリモート管理する必要があるITエンジニア・システム管理者向け。特に緊急時の修理・保守などOSレベルのアクセスが必要な場面で有用。

#hardware #self-hosting

## 出典

- [JetKVM と ATX Extension Board で自宅 PC をリモートコントロール - note](https://note.com/fjktkm/n/na9c99b50e22e)
- [JetKVM の WebRTC 部分 - Ghost](https://voluntas.ghost.io/jetkvm-webftc/)
- [あらゆるPCをリモートコントロールできる次世代オープンソースKVM「JetKVM」](https://plus-msg.auone.jp/detail/1/3/7/48_7_r_20251028_1761649266950540)
- [進化するリモート コンピュータ管理における JetKVM の役割 - TechAcute](https://techacute.com/ja/jetkvm-remote-computer-management/)
