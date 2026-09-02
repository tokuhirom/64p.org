---
created: 2026-09-02 22:24
updated: 2026-09-02 22:24
---
# DSSE (Dead Simple Signing Envelope)

任意のペイロードに署名するための、意図的に最小限に設計されたエンベロープ形式。Secure Systems Lab が策定し、[[sigstore|Sigstore]]・[[in-toto|in-toto]]・[[slsa|SLSA]]・npm provenance などで使われている。 #security #signing #supply-chain-attack

## 解こうとしている問題

JSONに署名しようとすると、すぐに正規化(canonicalization)の問題にぶつかる。キーの順序、空白、Unicodeエスケープ、数値の表現などが変わるだけで、意味が同じでもバイト列が変わり、署名が壊れる。JSON Canonicalization を持ち出すと仕様が複雑になり、実装ごとの微妙な差異がセキュリティホールになる。

DSSEの答えは「**正規化をやめる**」。署名対象のバイト列をそのまま Base64 でエンベロープに入れ、検証側はデコードしたバイト列を検証してからパースする。

## エンベロープの構造

```json
{
  "payload": "<Base64でエンコードされたペイロード>",
  "payloadType": "application/vnd.in-toto+json",
  "signatures": [
    {"keyid": "...", "sig": "<Base64の署名>"}
  ]
}
```

`payloadType` はペイロードの解釈方法を示すURIまたはメディアタイプ。

## PAE (Pre-Authentication Encoding)

実際に署名されるのは `payload` そのものではなく、`payloadType` と長さを含めた次のバイト列。

```
PAE(type, payload) = "DSSEv1" SP LEN(type) SP type SP LEN(payload) SP payload
```

- `SP` は ASCII の空白 (0x20)
- `LEN(s)` は s のバイト長を ASCII 十進で表記したもの

長さを前置することで、type と payload の境界が一意に決まる（曖昧さのないエンコーディング）。これにより、**ある型のペイロードとして署名されたものを、別の型のペイロードとして解釈させる**タイプの混同攻撃を防げる。in-toto attestation として署名されたものが、うっかり別の意味に読み替えられることがない。

## なぜこれが広まったか

「アーティファクトについての主張」を扱う仕組み（[[in-toto|in-toto Attestation]]、[[slsa|SLSA]] provenance、[[sbom|SBOM]] attestation、[[vex|VEX]]）は、いずれもJSONペイロードに署名したい。そこで共通のエンベロープを使うことで、署名・検証のコードとツールチェーンを共有できる。[[sigstore|Sigstore]]のcosignは、DSSEエンベロープを署名してRekorへ記録するところまでを一貫して扱う。

## 出典

- [secure-systems-lab/dsse — protocol.md](https://github.com/secure-systems-lab/dsse/blob/master/protocol.md)
- [secure-systems-lab/dsse — background.md](https://github.com/secure-systems-lab/dsse/blob/master/background.md)
