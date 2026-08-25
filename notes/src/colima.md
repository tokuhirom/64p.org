---
created: 2026-08-25 17:40
updated: 2026-08-25 17:41
---
# Colima

macOS(およびLinux)上でDocker互換のコンテナランタイムを最小限のセットアップで動かすOSSツール。[abiosoft/colima](https://github.com/abiosoft/colima)。Docker Desktopの有償ライセンス化を受けて広まった代替の一つ。

## 仕組み

内部的には[[lima|Lima]]（macOS上にLinux VMを立てるツール）を利用し、その上でDocker・containerd・Kubernetes・Incusといった複数のランタイムを選択して動かせる。デフォルトのランタイムはDocker。GUIは持たずCLIオンリー。

## 使い方

```sh
brew install colima
colima start
```

CPU・メモリ・ディスクの割り当てを指定でき、複数インスタンスを異なる設定で並行運用できる。Apple SiliconではGPUアクセラレーションにも対応し、Docker AI Registry・HuggingFace・OllamaのモデルをGPU付きで実行可能。

## [[orbstack|OrbStack]]との違い

どちらもDocker Desktop代替という位置づけは同じだが、Colimaは無料・OSSでCLI中心、細かいランタイム/リソース制御に向く。OrbStackは商用（無料枠あり）でGUIを持ち、セットアップの手軽さや体感速度を優先する設計。

## 出典

- [Colima - Container runtimes on macOS and Linux](https://colima.run/)
- [GitHub - abiosoft/colima](https://github.com/abiosoft/colima)
- [Getting Started | Colima](https://colima.run/docs/getting-started/)

#virtualization #macos #docker
