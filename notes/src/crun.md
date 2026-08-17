---
created: 2026-08-17 20:26
updated: 2026-08-17 20:26
---
# crun

Red HatのGiuseppe ScrivanoによるC言語実装のOCI(Open Container Initiative)ランタイム仕様準拠のコンテナランタイム。標準的な参照実装であるGo製の`runc`と機能的に相互置換可能でありながら、バイナリサイズ・起動速度・メモリ消費で優位性を持つ。 #container

## runcとの違い

- 実装言語: C(crun) vs Go(runc)。fork/execモデル中心の設計にはCの方が適しているとされる
- バイナリサイズ: crunは`-Os`コンパイルで約300KB、runcの約15MBに対して約1/50
- 速度・メモリ: 100コンテナを順次起動するテストでruncの約2倍の速度、メモリ使用量も大幅に少ない
- 両者ともOCIランタイム仕様準拠のため、コンテナエンジン側からは相互置換可能

## krunハンドラ

アノテーション`run.oci.handler=krun`を指定すると、crunは`libkrun.so`をロードし、[[libkrun|libkrun]]経由でコンテナをmicroVM内で起動する(wasmハンドラと並ぶ、crunがサポートする代表的な特殊ハンドラの一つ)。これによりconfidential containers(機密コンピューティング)用途で、コンテナ単位の強い隔離を得られる。

## 位置づけ

Podman・CRI-O等のコンテナエンジンから呼び出される、低レベルなOCIランタイム実装の一つ。[[kata-containers|Kata Containers]]がVM全体でコンテナ環境を包む「コンテナ環境ごとVM化」アプローチなのに対し、crun+krunはOCIランタイムそのものを差し替えることでコンテナ単位のVM分離を実現する点で設計が異なる。

## 出典

- [An introduction to crun, a fast and low-memory footprint container runtime (Red Hat)](https://www.redhat.com/en/blog/introduction-crun)
- [crun/crun.1.md at main · containers/crun](https://github.com/containers/crun/blob/main/crun.1.md)
- [crun/src/libcrun/handlers/krun.c at main · containers/crun](https://github.com/containers/crun/blob/main/src/libcrun/handlers/krun.c)
- [7.2. crun コンテナーランタイム (Red Hat Documentation)](https://docs.redhat.com/ja/documentation/red_hat_enterprise_linux/9/html/building_running_and_managing_containers/con_the-crun-container-runtime_selecting-a-container-runtime)
