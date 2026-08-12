---
created: 2026-08-13 07:42
updated: 2026-08-13 07:42
---
# WIT (WebAssembly Interface Types)

[[wasm|WebAssembly]]のComponent Model(複数のWasmモジュールを組み合わせる仕組み)で使われるIDL(インターフェース定義言語)。コンポーネント同士の「契約」——何をインポートし何をエクスポートするか——を、実装ではなく仕様のみとして記述する。

#wasm #webassembly #wit

## 3つの構成要素: package / interface / world

**package**: 複数の`.wit`ファイルにまたがるinterfaceとworldのグループ。同じディレクトリ内の`.wit`ファイルはすべて同じpackageに属する。

```wit
package documentation:example@1.0.1;
```

名前空間:名前の形式で、任意でsemver準拠のバージョンを付けられる。

**interface**: 型と関数の名前付き集合。

```wit
interface wall-clock {
    record datetime {
        seconds: u64,
        nanoseconds: u32,
    }
    now: func() -> datetime;
}
```

**world**: コンポーネント全体の契約。importとexportを列挙する、最上位の記述単位。

```wit
world command {
  import stdin;
  import stdout;
  export run;
}
```

`use`でinterface間の型を共有し、`include`でworld同士を合成できる。

## 型システム

プリミティブ型は`bool`/`s8〜s64`/`u8〜u64`/`f32`/`f64`/`char`/`string`。

複合型:

- **record**: 構造体的な集合(`{ id: u64, name: string }`)
- **variant**: 判別共用体(タグ付きunion)
- **enum**: タグのみのvariant
- **flags**: ビットフィールド
- **resource**: コンストラクタ・メソッドを持つオブジェクト的な型(ハンドルとして渡される)

ジェネリック型: `list<T>`、`option<T>`、`result<T, E>`、`tuple<T, U>`、そして非同期I/O向けの`stream<T>`/`future<T>`(WASI 0.3で導入)。

識別子はASCIIのケバブケースのみ許容される(`my-function`のような形式)。

## 具体例: HTTPハンドラの定義

```wit
// types.wit
interface types {
    record request { method: string, path: string }
    record response { status: u32, body: list<u8> }
}

// handler.wit
interface incoming-handler {
    use types.{request, response};
    handle: func(req: request) -> response;
}

package wasi:http@0.2.0;

world proxy {
    export incoming-handler;
    import outgoing-handler;
}
```

[[wasi|WASI]] 0.2以降のインターフェースはこの形でWITとして定義されている。

## ツールチェーン

- **wit-bindgen**: `.wit`ファイルから各言語(Rust/C/Go(TinyGo)/Java(TeaVM)/C#など)向けのバインディングコードを生成するツール群。Rustでは`wit-bindgen`クレートの`generate!`マクロとして使うことが多い。
- **wasm-tools**: 生成されたバインディング経由でビルドしたcore wasmモジュールを、`wasm-tools component new`でコンポーネント(WITの契約を満たすWasmバイナリ)に変換する。

## 出典

- [WIT Reference | The WebAssembly Component Model](https://component-model.bytecodealliance.org/design/wit.html)
- [WIT By Example | The WebAssembly Component Model](https://component-model.bytecodealliance.org/design/wit-example.html)
- [WIT package | The WebAssembly Component Model](https://component-model.bytecodealliance.org/design/packages.html)
