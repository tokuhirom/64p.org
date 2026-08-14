---
created: 2026-08-14 19:51
updated: 2026-08-14 19:51
---
# Quantumプロジェクト (Project Quantum)

Mozillaが2016年に開始した、FirefoxのコンポーネントをRust製の実装へ段階的に置き換えていく取り組み。目玉はCSSスタイル計算エンジンの置き換えで、2017年11月リリースのFirefox Quantum(Firefox 57)で主要な成果が投入された。 #rust #browser-engine

## Stylo (Quantum CSS)

Quantumプロジェクトの中心的な成果が「Stylo」(Quantum CSSとも呼ばれる)で、[[servo|Servo]]のCSSスタイルシステムをFirefoxのレンダリングエンジンGeckoに統合したもの。Servoの一部コンポーネントがFirefox本体に統合された最初の大きな事例となった。

- 従来Geckoが持っていた約16万行のC++実装を、約8.5万行のRust実装で置き換えた。
- CSSのスタイル計算処理を全CPUコアに並列化した。並列化には、あるスレッドの作業キューが空いたときに他スレッドの未処理タスクを奪って処理する「work stealing」という手法を用いている。
- CSS解析には[[cssparser]]クレートを利用している。

## 成果

Quantum CSSやQuantum DOMの投入、および369件のパフォーマンスバグ修正の効果を合わせて、Firefoxの性能が倍増したとされている。

## 出典

- [Inside a super fast CSS engine: Quantum CSS (aka Stylo) – Mozilla Hacks](https://hacks.mozilla.org/2017/08/inside-a-super-fast-css-engine-quantum-css-aka-stylo/)
- [Entering the Quantum Era—How Firefox got fast again - Mozilla Hacks](https://hacks.mozilla.org/2017/11/entering-the-quantum-era-how-firefox-got-fast-again-and-where-its-going-to-get-faster/)
- [Quantum/Stylo - MozillaWiki](https://wiki.mozilla.org/Quantum/Stylo)
- [Boiling the Ocean, Incrementally - How Stylo Brought Rust and Servo to Firefox](https://bholley.net/blog/2017/stylo.html)
