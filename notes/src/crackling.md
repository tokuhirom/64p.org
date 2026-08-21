---
created: 2026-08-21 21:23
updated: 2026-08-21 21:23
---
# crackling

Encore社が開発した、Linux上の[[firecracker|Firecracker]]とmacOS上の[[virtualization-framework|Virtualization.framework]]を単一のRust API(`MachineBackend`トレイト)で統一的に扱うための抽象化レイヤー。

## 開発の動機

Encoreはユーザーのビルド・実行をFirecracker microVM上でサンドボックス化しているが、FirecrackerはLinuxの[[kvm|KVM]]に依存するためApple Silicon Macでは動かせない。そのため、Macを使う開発者は本番と同じ環境で動作確認するのにリモートのLinuxサーバーへ接続する必要があった。cracklingは、macOS側のバックエンドとしてAppleのVirtualization.frameworkを使うことで、Linux/macOS双方でハイパーバイザーだけを差し替え、それ以外のビルド・実行フローを共通化することを目指している。

## 設計

`MachineSpec`/`MachineState`というバックエンドに依存しない型でマシンを記述し、FirecrackerとVirtualization.framework(VZ)がどちらも同じ`MachineBackend`トレイトを実装する。両バックエンドの機能差はenumとして明示され、VM作成前にホスト上でどの機能をサポートしているかを各バックエンドが自己申告する形になっている。

## OCIイメージ処理

FirecrackerもVirtualization.frameworkもOCIイメージという概念を直接扱えないため、cracklingはOCIレイヤーをユーザー空間で自前展開してrootfsを構築する。whiteoutエントリ(上位レイヤーでの削除マーカー)を正しく解釈しながら、Linuxを経由せずに処理する。展開結果はatomic renameでキャッシュとして保護され、各VMはAPFSの`clonefile`またはreflinkでコピーオンライトに複製する。

## EFI zbootカーネルの手動展開

Virtualization.frameworkは圧縮されたカーネルイメージを直接ブートできない制約があるため、cracklingはEFI zboot形式のカーネルを自前で展開する。"MZ"/"zimg"という署名でzbootヘッダを識別し、そこからpayloadのオフセット・サイズ・圧縮方式を読み取る。gzip展開後、オフセット0x38にある"ARMd"署名で生カーネルの妥当性を検証する。

## vsock通信

Linux側はUnixドメインソケット、macOS側は`VZVirtioSocketDevice`を使い、8バイトヘッダ+制御フレームまたは生バイト列という小さな共通フレームプロトコルでゲスト-ホスト間のエージェント通信を統一している。`VZVirtioSocketDevice`側は受け取った直後に`dup(2)`しないとメモリリークするという実装上の注意点がある。

## DispatchQueueとの統合

[[virtualization-framework|Virtualization.framework]]のオブジェクトは`!Send + !Sync`という制約があり、VMに対するすべての呼び出し・完了ハンドラを単一のシリアルDispatchQueue上で実行する必要がある。cracklingはこの制約を、`Send + Sync + Clone`な通常のハンドルがクロージャをDispatchQueueへディスパッチするという形でRustのtokioランタイムと統合し、型システムのレベルで`!Send`なVMオブジェクトの誤用を防いでいる。

## スナップショットの制限

Appleが`com.apple.private.virtualization`エンタイトルメントをサードパーティアプリへ付与しない方針のため、Virtualization.framework側ではVMスナップショットの保存・復元が使えない。FirecrackerのネイティブなスナップショットはmacOS上では利用不可能で、この機能差はバックエンドの機能自己申告の仕組みで吸収される。

## [[microvm-ecosystem|コンテナ向け軽量VM技術]]の中での位置づけ

FirecrackerなどのVMMをコンテナエコシステム(OCIイメージ)と繋ぐ統合レイヤーの一つ。[[hypeman|Hypeman]]と同様、Linux/macOS双方のハイパーバイザーを統一APIで扱う点が特徴。

## 類似の取り組み

[[hypeman|Hypeman]]も同様に、Linux上のFirecracker/Cloud Hypervisor/QEMUとmacOS上のVirtualization.frameworkを統一APIで扱うマルチハイパーバイザーランタイムで、コンセプトが近い。cracklingはEncoreの社内ビルド・実行基盤向けに特化している点が異なる。

## 出典

- [Firecracker on Apple Silicon - Encore Blog](https://encore.dev/blog/firecracker-apple-silicon)

#virtualization #macos #rust
