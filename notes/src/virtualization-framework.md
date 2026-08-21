---
created: 2026-08-21 21:23
updated: 2026-08-21 21:23
---
# Virtualization.framework

Appleが提供する、macOS/Linuxの仮想マシンをまるごと作成・起動・管理できる高レベルな仮想化API。macOS 11以降で利用可能。Apple Silicon Mac・Intel Mac双方に対応する。

## [[hypervisor-framework|Hypervisor.framework]]との違い

Hypervisor.frameworkがCPU・メモリの仮想化のみを扱う低レベルAPI(デバイスエミュレーションなし)であるのに対し、Virtualization.frameworkはデバイスモデル・ゲストOSのブートまで含めてVMを丸ごと構築できる高レベルAPI。`VZVirtualMachineConfiguration`でメモリ量・CPU数・デバイス構成を定義し、`VZVirtualMachine`オブジェクトでVMの起動・操作を行う、という2種類のオブジェクトで構成される。デバイスは[[virtio|virtio]](VIRTIO)仕様のネットワーク・ソケット・シリアルポート・ストレージ・entropy・memory-balloonデバイスをサポートする。

## 制約

- 圧縮されたLinuxカーネルイメージを直接ブートすることができない。EFI zboot形式などで圧縮されたカーネルを使う場合、呼び出し側が事前に展開する必要がある
- サードパーティアプリには`com.apple.private.virtualization`エンタイトルメントが付与されないため、VM状態のスナップショット保存・復元機能は利用できない(APIの検証自体は通っても、実行時に`VZErrorInternal`で失敗する)
- Objective-C/Swiftのオブジェクトが`!Send + !Sync`(スレッドセーフでない)扱いのため、VMに対する呼び出し・完了ハンドラは単一のシリアルDispatchQueue上で実行する必要がある

## 利用例

[[hypeman|Hypeman]]や[[crackling|crackling]]など、Linux上のFirecracker/Cloud Hypervisor/QEMUとmacOS上のVirtualization.frameworkを統一APIで切り替えられるようにするマルチプラットフォームなVM実行基盤のmacOS側バックエンドとして採用されている。

## 出典

- [Virtualization | Apple Developer Documentation](https://developer.apple.com/documentation/virtualization)
- [Create macOS or Linux virtual machines - WWDC22](https://developer.apple.com/videos/play/wwdc2022/10002/)
- [Firecracker on Apple Silicon - Encore Blog](https://encore.dev/blog/firecracker-apple-silicon)

#virtualization #macos
