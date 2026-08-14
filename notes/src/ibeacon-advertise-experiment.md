---
created: 2026-08-14 14:12
updated: 2026-08-14 14:12
---
# iBeacon発信実験: BlueZから自作ビーコンを飛ばす

#bluetooth #ibeacon #experiment #linux

[[ibeacon|iBeacon]]は「BLEアドバタイズにApple定義のManufacturer Dataを載せただけ」であることを、手元のLinuxマシン (Pop!_OS + BlueZ) から実際にiBeaconフレームを発信して確かめた記録。[[ble-scan-experiment]]の続き。

## やったこと

`bluetoothctl` の advertise メニュー（BlueZのD-Bus Advertising API経由なのでroot不要。`hcitool cmd`で直接HCIコマンドを叩く古い方法だとrootが要る）でManufacturer Dataを組み立てて発信した。

UUIDは `/proc/sys/kernel/random/uuid` で生成 (`fe87138c-c69b-4f2f-8f45-e6c09ac9e93b`)、Major=1, Minor=2, Measured Power=0xC5 (-59dBm) とした。

```
$ bluetoothctl
[bluetooth]# menu advertise
[bluetooth]# manufacturer 0x004c 0x02 0x15 0xfe 0x87 0x13 0x8c 0xc6 0x9b 0x4f 0x2f 0x8f 0x45 0xe6 0xc0 0x9a 0xc9 0xe9 0x3b 0x00 0x01 0x00 0x02 0xc5
[bluetooth]# back
[bluetooth]# advertise broadcast   # broadcast = 非接続型。iBeaconに合っている
[bluetooth]# show
```

Manufacturer Dataの中身は[[ibeacon|iBeacon]]のフォーマット通り: Company ID `0x004c` (Apple) + `0x02 0x15` + UUID 16B + Major 2B + Minor 2B + Measured Power 1B。

## 結果

`show` の Advertising Features で発信が登録されたことを確認できた。

```
Advertising Features:
	ActiveInstances: 0x01 (1)
	SupportedInstances: 0x0b (11)
```

このアダプタは広告インスタンスを11個までサポートしていて、1個が稼働中になった。

## 躓いた点

- `bluetoothctl` はstdinが閉じるとプロセスが終了し、D-Bus接続が切れて**アドバタイズも自動で解除される**。非対話実行では発信状態を保つ工夫が要る（今回はコマンド列を流した後 `timeout 8 cat` でstdinを8秒開いたままにして、その間の `show` で確認した）
- 単一アダプタでは自分のアドバタイズを自分でスキャンできないため、実際に電波に乗ったことのon-air検証はこのマシン単体では不可。手元のスマホにnRF Connectのようなスキャナアプリを入れて受信確認するのが次の一手

## 読み取れること

- iBeaconに専用ハードウェアは不要で、本当に「アドバタイズのペイロード形式」でしかない。逆に言えば誰でも任意のUUID/Major/Minorを名乗れるので、スプーフィング耐性が無いという[[ibeacon|iBeacon]]の性質をそのまま体感できる
- BlueZのD-Bus APIはアプリのライフタイムとアドバタイズを紐付けて管理している（プロセスが死ぬと広告も消える）。リークしない設計として合理的
