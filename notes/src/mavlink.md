---
created: 2026-08-15 14:19
updated: 2026-08-15 14:19
---
# MAVLink

MAVLink（Micro Air Vehicle Link）は、ドローンやマルチコプター・固定翼機などの飛行制御ボード（フライトコントローラ）と、地上局ソフト（GCS: Mission Planner、QGroundControl、MAVProxyなど）やコンパニオンコンピュータの間でやり取りする軽量なバイナリ通信プロトコル。

## 用途

- テレメトリ（機体の姿勢・位置・バッテリー残量など）の送信
- 飛行モード変更・ミッション送信・パラメータ設定などのコマンド送信

## 特徴

- シリアル(UART)・UDP・TCPなど様々な伝送路に対応
- 複数のプログラミング言語・OSに対応（C, C++, Python, Linux, Windows, macOS, Android, iOSなど）
- 1対1・1対多（ブロードキャスト）の両方の通信に対応
- 暗号化・認証はオプション
- バイナリパケットの最大サイズはMAVLink 1.0で263バイト、MAVLink 2.0で280バイト

## ArduPilotでの実装

ArduPilot（[[arduplane-quadplane-tailsitter|ArduPlane]]・ArduCopterなどの総称）では`libraries/GCS_MAVLink`にMAVLinkの実装があり、機体とGCS間の標準的な通信手段になっている。GCSシングルトンが複数のGCS_MAVLINKオブジェクト（GCSへの通信リンクを表す）を配列で管理する構造で、SITLでは最大16チャンネル、実機のフライトコントローラでは5〜8チャンネル程度まで同時接続できる。

## 出典

- [MAVLink/GCS Communication | ArduPilot/ardupilot | DeepWiki](https://deepwiki.com/ArduPilot/ardupilot/6.1-mavlinkgcs-communication)

#mavlink #ardupilot #drone
