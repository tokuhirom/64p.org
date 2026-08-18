---
created: 2026-08-19 08:15
updated: 2026-08-19 08:15
---
# VRAMオーバーコミット

GPUアプリケーション(主にゲーム)が要求するメモリ量が、物理的なVRAM容量を超えた際に発生する挙動。従来はVRAM不足分をシステムRAM側へ退避(スワップ)することで動作は継続できるものの、パフォーマンスが急激に悪化しやすい問題があった。

## Linuxカーネルでの改善の取り組み

Linuxカーネル開発者のNatalie Vockが、VRAMオーバーコミット時のパフォーマンスを改善するパッチセットに取り組んでいる。アプローチは以下の組み合わせ:

- ドライバレベルでのメモリ管理の改善
- アプリケーションとドライバスタックの協調動作
- キャッシュミスを減らすためのストリーミングパターンの変更

## ベンチマーク結果

『Indiana Jones and the Great Circle』での計測例:

- VRAM容量を**1GB程度超過**した状態では、約60fpsで安定動作
- VRAM容量を**2倍(100%超過)**まで使うと、フレーム遅延が30ms以上に跳ね上がり、体感できるレベルで不快になる

超過量が増えるほど劣化するというグラデーションのある結果であり、Vock自身も「物理的な障壁は依然として存在し、すべてのゲームに効く『VRAM倍増』の万能解ではない」とコメントしている。

## 配布状況

SteamOS(Steam DeckのOS)には既に統合済み。アップストリームのLinuxカーネル・Mesaへのマージは進行中で、現状は実験的なカーネル・Mesaブランチで試せる段階。SteamOSと[[proton|Proton]]の関係については[[proton|Protonのノート]]の「Steam Deck/SteamOSでの位置づけ」を参照。

## 関連する概念

異なる文脈だが、「高速だが容量の乏しいメモリ(VRAM)からの溢れ分を、より低速だが大容量なメモリへオフロードする」という発想自体は、LLMの[[ple|PLE(Per-Layer Embeddings)]]がGPU VRAMの外にパラメータを退避させる仕組みとも構造的に似ている。

## 出典

- [Beyond the limits of physical VRAM - OSnews](https://www.osnews.com/story/145846/beyond-the-limits-of-physical-vram/)

#linux #gpu #gaming
