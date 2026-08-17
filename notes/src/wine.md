---
created: 2026-08-17 18:25
updated: 2026-08-17 18:25
---
# Wine

Windowsアプリケーションを、Linux・macOS・BSDなどPOSIX互換OS上で動かすための互換レイヤー。名前は"Wine Is Not an Emulator"の再帰的頭字語。

## エミュレータとの違い

仮想マシンやエミュレータのようにWindows内部のロジックをシミュレートするのではなく、Windows APIコールをその場でPOSIX互換の呼び出しに変換して実行する。このアプローチにより、仮想化・エミュレーションに伴う性能・メモリのオーバーヘッドを避けつつ、Windowsアプリケーションをホストのデスクトップ環境にクリーンに統合できる。

## 歴史

1993年、Bob Amstadtの主導でWindows 3.1向けプログラムをLinuxで動かす手段として開発が始まった。まもなくAlexandre Julliardがプロジェクトの指揮を引き継ぎ、現在まで開発を統括している。プロジェクト名"Wine Is Not an Emulator"は1993年8月の命名議論の結果で、David Niemiによるものとされる。開発開始から15年を経た2008年に、最初の安定版v1.0がリリースされた。現在も活発に開発が続いている。

## 開発体制

ソースコードのおよそ半分はボランティアによって書かれており、残りはCodeWeavers社を中心とする商業的なスポンサーシップによって支えられている。CodeWeaversはWineのサポート付き版である「CrossOver」を販売している。

## 関連技術

Valveの[[proton|Proton]]は、このWineをベースにDXVK・VKD3D-Proton・FAudioなどを組み合わせて構成されている。

## 出典

- [WineHQ - About Wine](https://www.winehq.org/about)
- [Wine has been translating Windows games to Linux since 1993, but Proton is what made it effortless - XDA Developers](https://www.xda-developers.com/wine-translating-windows-games-linux-proton-effortless/)

#linux
