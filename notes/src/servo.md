---
created: 2026-08-14 19:49
updated: 2026-08-14 19:49
---
# Servo

Rustで書かれたウェブブラウザレンダリングエンジン。デスクトップ・モバイル・組み込みアプリケーションへの埋め込みを狙う軽量・高性能な実装として開発されている。 #rust #browser-engine

## 開発の経緯

2012年にMozilla Corporationで開発が始まった。2013年からSamsungが参加し、Android/ARMプロセッサへの移植に貢献した。

2016年にはMozillaが「Quantum project」を開始し、Servoで培われた並列処理などの成果の一部がFirefoxのGeckoエンジンに統合された。

2020年8月、Mozillaの大規模レイオフによりServoチームも解散し、プロジェクトのガバナンスはLinux Foundation Europeに移管された。現在はLinux Foundation Europe傘下でTechnical Steering Committeeによるオープンガバナンスのもと、Igaliaとコミュニティメンバーによって開発が続けられている。

## 技術的特徴

- Rustのメモリ安全性・並行性機能を活用し、レンダリング・レイアウト・HTML解析・画像デコードなどのコンポーネントを細粒度のタスクに分割して並列実行する設計。
- WebGL・WebGPUをサポート。
- Windows・macOS・Linux・Android・OpenHarmonyなどマルチプラットフォーム対応。
- 他アプリケーションへの組み込み用にWebView APIを提供している。

## 由来コンポーネントの再利用

Servoプロジェクトで開発されたパーサー群(html5ever、cssparser、selectorsクレートなど)は単体のRustクレートとして切り出されており、Servo本体以外のプロジェクトでも採用されている。例: [[sghtmltopdf]]はHTML/CSS解析にこれらのクレートを利用している。

## リリース状況

- 2026年4月13日: 安定版0.1.0リリース
- 2026年7月31日: 0.4.0リリース

## 出典

- [Servo公式サイト](https://servo.org/)
- [Servo (software) - Wikipedia](https://en.wikipedia.org/wiki/Servo_(software))
- [Servo Browser Engine Starts 2026 With Many Notable Improvements - Phoronix](https://www.phoronix.com/news/Servo-January-2026)
