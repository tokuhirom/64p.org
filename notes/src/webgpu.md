---
created: 2026-08-14 19:51
updated: 2026-08-14 19:51
---
# WebGPU

GPUへの低レベルアクセスをブラウザに提供するW3C標準策定中のAPI。WebGLの後継と位置づけられている。 #browser-engine

## WebGLとの違い

WebGLが既存のネイティブAPI(OpenGL ES)の移植だったのに対し、WebGPUはVulkan・Metal・Direct3D 12といった近年のネイティブグラフィックスAPIに共通する概念を土台に新規設計されている。GPUリソースに対するより明示的な制御が可能になり、性能の予測可能性が向上するほか、汎用GPU計算(GPGPU)もサポートする。

## 実装

- Rust実装として`wgpu`(gfx-rsプロジェクト)があり、クロスプラットフォームでVulkan/Metal/Direct3D 12/OpenGL上に実装されている。[[servo|Servo]]はこの`wgpu`を用いてWebGPUを実装している。
- Servoでの実装は2020年のGoogle Summer of Codプロジェクトとして始まり、Conformance Test Suite(CTS)のテスト通過数を段階的に伸ばしてきた。2024年時点でOpenGL ES上での動作にも対応するなど、継続的に開発が進んでいる。

## 出典

- [WebGPU - Wikipedia](https://en.wikipedia.org/wiki/WebGPU)
- [WebGPU API - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API)
- [gfx-rs/wgpu - GitHub](https://github.com/gfx-rs/wgpu)
- [GSoC wrap-up - Implementing WebGPU in Servo](https://servo.org/blog/2020/08/30/gsoc-webgpu/)
- [Servo Web Engine Gets WebGPU Running On OpenGL ES & Other New Features - Phoronix](https://www.phoronix.com/news/Servo-June-2024-Update)
