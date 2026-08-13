---
created: 2026-08-13 09:09
updated: 2026-08-13 09:14
---
# Rollup

JavaScriptのモジュールバンドラー。ES6モジュール構文で書いたコードを解析し、CommonJS/AMD/IIFE/UMDなど様々な形式にコンパイルできる。「ES modulesで書けば将来対応のコードを今すぐ書ける」というのが基本コンセプト。

Rich Harris氏とLukas Taegert-Atkinson氏が開発・保守している。

## Tree-shaking

未使用のコードを解析して自動的に除外する仕組み。ES modulesの静的な`import`/`export`構文を利用することで、実際に使われている関数だけをバンドルに残せる。この用語自体をRollupが広めたとされる。

## 用途

主にライブラリのビルド用途で使われることが多い。アプリケーション向けの複雑な機能(コード分割、HMRなど)よりも、シンプルで最適化されたバンドル生成に強みがある。

- [[vite|Vite]]は本番ビルド時にRollupを使用している(開発時はesbuildを使用)
- Svelteなども内部でRollupを採用

Rustで書かれた後継バンドラーとして[[rolldown|Rolldown]]が開発されている。

## 出典

- [Rollup Introduction](https://rollupjs.org/introduction/)
