---
created: 2026-08-14 13:12
updated: 2026-08-14 13:12
---
# Terraformプロバイダースキーマの Required/Optional/Computed

#iac #hashicorp

[[terraform|Terraform]]のproviderが各リソース・データソースの属性(attribute)を定義する際に指定するスキーマフラグ。`terraform providers schema -json`で任意のproviderの実際のスキーマを確認できる。

## 基本の3フラグ

- **Required**: 設定ファイル(`.tf`)側で必ず値を指定しなければならない。省略するとplan時にエラーになる。
- **Optional**: 設定ファイル側で指定してもしなくてもよい。
- **Computed**: ユーザーが設定できない値。provider(≒API側)が決める値で、作成日時・自動採番されるID・UUIDなど。

## 組み合わせルール

- `Required`と`Optional`は同時指定不可
- `Required`と`Computed`は同時指定不可
- `Required`と`Default`は同時指定不可
- `Computed`と`Default`は同時指定不可
- `Optional`と`Default`は組み合わせ可(値未指定時にそのデフォルト値が使われる)

## Optional + Computed

この2つを同時に立てると、「ユーザーが値を指定してもよいし、指定しなければproviderが決めた値を採用する」という属性になる。

- ユーザーが値を書いた場合 → その値がそのまま使われる
- ユーザーが値を書かなかった場合 → plan時点では値は不明(`(known after apply)`)、apply後にAPIが返した値がstateに記録される

典型例は「値を明示指定できるが、指定しなければAPI側のデフォルト値が自動設定される」属性。常にAPI決め打ちの単なる`Computed`と違い、ユーザーによる上書きの余地がある点が異なる。

## SDKv2とPlugin Frameworkでの挙動差

Terraformのprovider実装基盤には旧来のSDKv2と、新しいPlugin Frameworkがある。Plugin Frameworkの方がTerraformの「データ一貫性ルール」をより厳格に適用する。

- **SDKv2**: `Computed: true`な属性は、設定から値を削除してもstateの値をそのまま維持する挙動が暗黙的に組み込まれている。
- **Plugin Framework**: 未設定のComputed属性は、更新計画がある限り原則`<unknown>`としてマークされる。SDKv2的な「stateの値を引き継ぐ」挙動が欲しい場合は`UseStateForUnknown`というplan modifierを明示的に付ける必要がある。

Plugin Frameworkの方が「本当は値が変わるかもしれない」ことを正直にplanへ反映する一方、値が変わらないと分かっている場合(サーバー生成値でリソース再作成時以外変化しない等)は`UseStateForUnknown`で意図的に安定させる、という設計になっている。

## 出典

- [Schema Behaviors | Terraform | HashiCorp Developer](https://developer.hashicorp.com/terraform/plugin/sdkv2/schemas/schema-behaviors)
- [terraform providers schema command | Terraform | HashiCorp Developer](https://developer.hashicorp.com/terraform/cli/commands/providers/schema)
- [Consider introducing helper methods for marking unconfigured Computed attributes as `<unknown>` · Issue #1118 · hashicorp/terraform-plugin-framework](https://github.com/hashicorp/terraform-plugin-framework/issues/1118)
- [`computed` field producing spurious plan changes with framework but not SDK v2 · Issue #628 · hashicorp/terraform-plugin-framework](https://github.com/hashicorp/terraform-plugin-framework/issues/628)
