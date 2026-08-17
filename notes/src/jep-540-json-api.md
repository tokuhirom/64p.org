---
created: 2026-08-18 08:44
updated: 2026-08-18 08:44
---
# JEP 540: Simple JSON API

外部ライブラリなしでJSON(RFC 8259準拠)を解析・生成できる、JDK標準の簡易JSON APIを追加する提案。JDK 28向けに"Proposed to Target"のステータスまで進んでいる(2026年8月時点)。2014年に提案され未実装のまま終了した[[jep-198|JEP 198]](Light-Weight JSON API)を置き換える形で出された。 #java #json #openjdk

## 設計方針: 意図的に狭いスコープ

JacksonやGsonのような包括的なJSONライブラリとは異なり、データバインディングやストリーミング機能は対象外。コメント・末尾カンマなどの緩いパース(permissive parsing)や構文拡張にも対応しない。設定ファイルの読み込み・REST応答の検査・小さなJSONペイロード生成といった「よくあるタスク」への対応に特化している。

## API構成

- 中心は`Json`クラスと`JsonValue`インターフェース(封印型)。オブジェクト・配列・文字列・数値・真偽値・nullの6サブインターフェースを持つ
- すべてのインスタンスがイミュータブル・スレッドセーフ
- `asInt()` / `asLong()` / `asDouble()` / `asBoolean()` / `asMap()` / `asList()`などの型変換メソッドを提供
- switch式でのパターンマッチングに対応

```java
int temperature = Json.parse(body)
    .get("properties").get("periods").get(0)
    .get("temperature").asInt();

long id = switch (json.get("id")) {
    case JsonNumber number -> number.asLong();
    case JsonString string -> Long.parseLong(string.asString());
    default -> throw new JsonValueException("Unexpected id type");
};
```

- オブジェクトメンバー名の重複はRFC 8259が許容していても、このAPIではエラー扱い
- 不正な構文は`JsonParseException`(0始まりの行・位置情報付き)を投げる

## 配布形態

承認された場合、明示的なインポートが必要なインキュベーターモジュール`jdk.incubator.json`として提供される予定。プレビュー中の他のJava機能([[project-valhalla|Project Valhalla]]の値型など)と同様、JDK 28で開発者フィードバックを受けながら仕様が変わりうる。

## 出典

- [JEP 540: Simple JSON API (Incubator) - OpenJDK](https://openjdk.org/jeps/540)
- [JEP 540: Proposed to Target JDK 28 with a Simple JSON API - InfoQ](https://www.infoq.com/news/2026/08/java-native-json-api/)
- [JEP 198: Light-Weight JSON API - OpenJDK](https://openjdk.org/jeps/198)
