---
created: 2026-08-10 20:37
updated: 2026-08-10 20:37
---
# LuaJIT

[[lua|Lua]]のJIT(Just-In-Time)コンパイラ実装。プログラム実行時にマシン語へコンパイルすることで、本家のバイトコードインタプリタより大幅に高速に動作する。 #programming-language

## 特徴

- Trace JIT方式を採用しており、最も高速なTrace JIT実装の一つとされる
- 動的型付け言語でありながら、静的単一代入(SSA)などを使った高度な最適化により、Javaに近い実行速度を出せる
- FFI(Foreign Function Interface)機能を持ち、Cライブラリを直接呼び出せる
- 低メモリ使用量

## Luaとの速度差

1から10億までの総和を求める計算をLua 5.2とLuaJITで比較した例では、Lua 5.2が21秒、LuaJITが2秒(約10倍高速)という結果が報告されている。

## 出典

- [LuaJITとは何か？APISIXがLuaJITを選ぶ理由 - API7.ai](https://api7.ai/ja/blog/apisix-chooses-luajit)
- [よくある「luajit」の質問 | Code Hero](https://codehero.jp/luajit)
