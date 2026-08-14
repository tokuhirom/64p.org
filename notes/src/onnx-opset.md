---
created: 2026-08-14 23:00
updated: 2026-08-14 23:00
---
# ONNXのopset(operator set)

#machine-learning

[[onnx|ONNX]]における演算子(operator)のバージョン管理の仕組み。演算子セット(operator set)は`(domain, opset_version)`という組で一意に識別される。

- 空文字列(`""`)のdomainはONNX仕様本体で定義された演算子群を指す。それ以外のdomainは他ベンダーによる拡張演算子セット(vendor-specific extension)を表す。
- 演算子セットの中身(演算子の追加・削除・セマンティクスの変更)が変わると、opset_versionは必ず増加する。互換性を保ったまま変更履歴を追跡するための単調増加の整数として設計されている。
- モデルは`ModelProto.opset_import`というフィールドで、自身が要求する`(domain, opset_version)`の組のリストを宣言する。
- 一般に新しいバージョンの[[onnx-runtime|ONNX Runtime]]は古いopsetをサポートすることが多いが、古いランタイムが新しいopsetを使ったモデルを実行できるとは限らない。
- 異なるopsetバージョン間のモデル変換には、ONNX公式のVersion Converterというツールが使える。

## 出典

- [ONNX Versioning](https://onnx.ai/onnx/repo-docs/Versioning.html)
- [onnx/docs/Versioning.md at main · onnx/onnx](https://github.com/onnx/onnx/blob/main/docs/Versioning.md)
- [ONNX Runtime compatibility](https://onnxruntime.ai/docs/reference/compatibility.html)
- [ONNX Version Converter](https://onnx.ai/onnx/repo-docs/VersionConverter.html)
