---
created: 2026-08-14 09:59
updated: 2026-08-14 12:02
---
# GPLv3

#license #open-source #copyleft

2007年6月にFSFが公開したGNU General Public Licenseの第3版。1991年のGPLv2から16年ぶりの改訂で、2006年からの公開ドラフトプロセス（4回のドラフト）を経て策定された。GPLv2の時代に顕在化した「特許」「ハードウェアによるロックダウン」「ライセンス互換性」の問題への対処が柱。

## GPLv2からの主な変更点

- **明示的な特許ライセンス**: コントリビュータは自分のコードに必要な特許を利用者へ自動的にライセンスする。GPLv2には特許の明示的な規定がなかった
- **Tivoization対策**: 家電など「User Products」にGPLv3ソフトを載せて出荷する場合、ユーザーが改変版をそのデバイスで実行するために必要な「Installation Information」（署名鍵など）の提供を義務づける。TiVoがGPLv2のLinuxを使いつつ、署名検証で改変版カーネルの起動をブロックした事例が発端
- **Apache License 2.0との互換性**: GPLv2はApache 2.0と非互換だったが、GPLv3では組み合わせ可能になった
- **DRM対抗条項**: GPLv3のソフトウェアを「効果的な技術的保護手段」とみなして回避行為を訴えることを禁止
- **国際化**: 「distribute」の代わりに「convey」「propagate」を定義して用いるなど、米国著作権法に依存しない用語へ整理
- **違反時の是正**: GPLv2では違反した瞬間にライセンスが恒久的に終了する建て付けだったが、GPLv3では是正すれば権利が回復する猶予規定が入った

## 受け止め・普及の壁

- **Linuxカーネルは「GPLv2 only」を維持**: LinusはTivoization対策条項に反対で、GPLv3への移行を明確に拒否している。カーネルは「GPLv2 or later」ではなく「GPLv2のみ」なので、そもそも全コントリビュータの同意なしに移行できない
- **AppleはGPLv3を回避**: macOSに同梱するbashをGPLv2最後のバージョンである3.2に据え置き続け、最終的にデフォルトシェルをzshへ切り替えた
- GPLv2とGPLv3は互いに非互換（「GPLv2 or later」でライセンスされたコードのみv3と組み合わせ可能）で、これがエコシステム分断の一因になっている

## AGPLv3との関係

[[agpl|AGPLv3]]はGPLv3をベースにネットワーク経由の利用へ[[copyleft|コピーレフト]]を拡張したもの。双方の第13条に相互リンクを許可する条項があり、GPLv3プログラムとAGPLv3プログラムを組み合わせられる。

## [[software-licenses|ソフトウェアライセンス]]の中での位置づけ

コピーレフトライセンスの現行版。ここから派生したのが[[agpl|AGPL]]（ネットワークコピーレフト）で、その先の商用的な変種として[[sspl|SSPL]]がある。

## 出典

- [What is the difference between GPLv2 and GPLv3? | ifrOSS](https://ifross.org/en/what-difference-between-gplv2-and-gplv3)
- [Open Source Software Licenses 101: GPL v3 | FOSSA Blog](https://fossa.com/blog/open-source-software-licenses-101-gpl-v3/)
- [GPLv2 vs. GPLv3 | UNICEF DPG Inventory](https://unicef.github.io/inventory/dpg-indicators/2/gpl-comparison/)
- [GNU General Public License, version 3 - GNU Project](https://www.gnu.org/licenses/gpl-3.0.html)
