---
created: 2026-09-02 22:24
updated: 2026-09-02 22:24
---
# Merkle木 (ハッシュ木)

葉にデータのハッシュを置き、内部ノードには子ノードのハッシュを連結して取ったハッシュを置く木構造。木全体の内容が**ルートハッシュ1個**に要約され、部分の検証が\(O(\log n)\)でできる。 #cryptography #data-structure

## 定義

```
        root = H(H01 || H23)
       /                    \
   H01 = H(H0||H1)      H23 = H(H2||H3)
    /        \            /        \
 H0=H(d0)  H1=H(d1)   H2=H(d2)  H3=H(d3)
```

1979年にRalph C. Merkleが博士論文の中で導入した（特許は1979年取得、2002年失効）。

## 何が嬉しいのか

**ルートハッシュだけ持てば全体を検証できる。** データ1バイトでも変われば、その葉から根までのハッシュがすべて変わり、ルートハッシュが変わる。

**部分の検証が対数時間でできる（inclusion proof）。** 「d2がこのルートハッシュを持つ木に含まれている」ことを示すには、d2そのものと、`H3` と `H01` の2個のハッシュだけあれば足りる。この兄弟ノードのハッシュ列を**認証パス(authentication path)**と呼ぶ。要素数nに対して\(\log_2 n\)個で済むので、木が巨大でも証明は小さい。

**差分の特定が効率的にできる。** 2つの木のルートハッシュが違えば、根から降りていって「ハッシュが一致する部分木」を枝刈りすることで、実際に違う葉だけをたどり着ける。

## 使われている場所

用途は大きく3系統に分かれる。

**改竄検知・整合性検証**

- ZFS / Btrfs — ブロックのチェックサムを木構造で管理し、`scrub` 時に全ハッシュを検証する。壊れたブロックを検出したら別のコピーから修復する。
- Git — commit → tree → blob がすべて内容のハッシュで参照される。厳密にはMerkle DAG（木ではなく有向非巡回グラフ）。IPFSも同じ構造を取る。

**分散システムのレプリカ同期（anti-entropy）**

- Cassandra / Riak / Dynamo — レプリカ間でMerkle木を交換し、ハッシュが違う部分木だけを降りていくことで、転送量を抑えつつ差分を特定して修復する。

**[[transparency-log|透明性ログ]]**

- [[certificate-transparency|Certificate Transparency]]、[[sigstore|Sigstore]]のRekor、Goのchecksum database。追記専用性を保証するために、inclusion proofに加えて**consistency proof**（新しい木が古い木への追記のみであることの証明）を使う点が、他の用途と違う。

**ブロックチェーン**

- Bitcoin — ブロック内のトランザクションをMerkle木にまとめ、ルートをブロックヘッダに入れる。SPVクライアントは全トランザクションを持たずに、あるトランザクションがブロックに含まれることを検証できる。

## 出典

- [Merkle tree - Wikipedia](https://en.wikipedia.org/wiki/Merkle_tree)
- [Diving into Merkle Trees (ordep.dev)](https://ordep.dev/posts/diving-into-merkle-trees)
