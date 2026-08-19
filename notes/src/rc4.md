---
created: 2026-08-19 23:33
updated: 2026-08-19 23:38
---
# RC4

1987年にRon Rivest（RSAのR）が設計したストリーム暗号。データを1バイトずつ、鍵から生成したキーストリームとXORして暗号化する。設計はRSA Security社の企業秘密だったが、1994年にソースコードが匿名でメーリングリストに投稿されて事実上公開された。「RC4」が商標のため、互換実装は「ARC4」「ARCFOUR」と呼ばれることがある。

現在は既知の攻撃により**使用禁止**とされている暗号であり、新規利用してはいけない。歴史的・教育的な文脈でのみ登場する。

## アルゴリズム

0〜255の値の順列を保持する256バイトの内部状態 `S` だけで動く。数行で実装できるシンプルさと、ソフトウェア実装でブロック暗号より高速だったことが普及の理由。

**KSA (Key Scheduling Algorithm)** — 鍵で `S` をシャッフルして初期化する。

```c
for (i = 0; i < 256; i++) S[i] = i;
j = 0;
for (i = 0; i < 256; i++) {
    j = (j + S[i] + key[i % keylen]) % 256;
    swap(S[i], S[j]);
}
```

**PRGA (Pseudo-Random Generation Algorithm)** — 1バイトずつキーストリームを出力し、平文とXORする。

```c
i = j = 0;
while (has_input) {
    i = (i + 1) % 256;
    j = (j + S[i]) % 256;
    swap(S[i], S[j]);
    output = S[(S[i] + S[j]) % 256];  /* 平文とXOR */
}
```

## 使われていた場所

- **[[wep|WEP]]** (1997) / **WPA(TKIP)** (2003) — 無線LANの暗号化
- **SSL/TLS** — 2011年のBEAST攻撃（CBCモードへの攻撃）の回避策として、一時期むしろRC4が推奨された時期もあった

## なぜ破られたか

キーストリームに統計的な偏り（bias）があることが根本的な問題。

- **FMS攻撃 (2001)** — KSAの弱鍵問題。鍵の先頭部分が既知（[[wep|WEP]]ではIVが鍵の先頭に連結される）だと、キーストリームから残りの鍵を推測できる。WEPが数分で破られる直接の原因になった。
- **初期出力バイトの偏り** — 例えば2バイト目が0になる確率が理想値1/256の2倍あるなど、先頭の出力が特に弱い。
- **RC4 NOMORE攻撃 (2015)** — 実際のHTTPS接続に対し、トラフィック傍受だけで75時間以内にHTTPクッキーを復元できることが実証された。

これを受けてIETFは2015年2月に**RFC 7465**を発行し、すべてのバージョンのTLSでRC4暗号スイートのネゴシエーションを禁止した。主要ブラウザも2015〜2016年にRC4を完全に無効化している。

## 出典

- [RFC 7465: Prohibiting RC4 Cipher Suites](https://www.rfc-editor.org/rfc/rfc7465.html)
- [What is RC4? Is RC4 secure? | Encryption Consulting](https://www.encryptionconsulting.com/education-center/what-is-rc4/)
- [The RC4 algorithm in TLS/SSL | Beagle Security](https://beaglesecurity.com/blog/vulnerability/the-rc4-algorithm-in-transport-layer-security-and-secure-sockets-layer.html)

#cryptography #security #tls
