---
created: 2026-08-13 00:11
updated: 2026-08-13 00:14
---
# FFT（高速フーリエ変換）

#math #signal-processing #algorithm

DFT（離散フーリエ変換）を高速に計算するアルゴリズム。[[fourier-transform|フーリエ変換]]のサンプリングされた離散データ版であるDFT

$$
X_k = \sum_{n=0}^{N-1} x_n\, e^{-i 2\pi k n / N}
$$

を素朴に計算すると \(O(N^2)\) かかるが、FFTは \(O(N \log N)\) で計算する。N=4096 で実測400倍ほどの高速化になり、この差が「DFTを実用にした」と言ってよい。Gilbert Strang は「我々の生涯で最も重要な数値アルゴリズム」と評し、IEEEの「20世紀のトップ10アルゴリズム」にも選ばれている。

## Cooley-Tukeyアルゴリズムの核心

分割統治。サイズ \(N = N_1 \times N_2\) のDFTを、サイズ \(N_2\) の小さいDFT \(N_1\) 個に再帰的に分解し、「回転因子（twiddle factor）」と呼ばれる1のべき根 \(e^{-i 2\pi k / N}\) の掛け算 \(O(N)\) 回で結合する。

最も普及しているのは radix-2（時間間引き）版: 入力を偶数番目と奇数番目に分けると、サイズNのDFTがサイズN/2のDFT2つと回転因子の掛け算に分解できる。これを再帰すると \(T(N) = 2T(N/2) + O(N) = O(N \log N)\)。2つの半分の結果を足し引きで結合する演算パターンが蝶の形に見えることから「バタフライ演算」と呼ばれる。radix-2はNが2のべき乗に限られるが、混合基数版は任意の合成数を扱える。

## 歴史

- 起源は Carl Friedrich Gauss（1805年頃）。小惑星軌道の補間のために同等の手法を使っていたが、計算量の解析はしていなかった
- その後も Yates (1932)、Danielson & Lanczos (1942, X線結晶構造解析) などで部分的に再発明されている
- 現代のFFTは Cooley & Tukey が1965年に（Gaussを知らずに）再発見・発表したもの。Tukey がケネディ政権の会議でソ連の核実験を地震計センサー網で検出する議論中に着想し、同僚の Richard Garwin が汎用性に気づいてIBMの Cooley に持ち込んだ。Tukey がIBM社員でなかったためアルゴリズムはパブリックドメインになり、それがデジタル信号処理での普及を後押しした

## バリエーション

- **prime-factor FFT** — 互いに素な因数分解に中国剰余定理を使い、回転因子なしで分解
- **Raderのアルゴリズム / Bluesteinのchirp-z** — 素数サイズのDFTを巡回畳み込みに変換して処理
- **split-radix** — Cooley-Tukeyより算術演算数を減らす
- **実数入力の最適化** — 入力が実数なら出力が共役対称になるので、計算量・メモリをほぼ半減できる

## 応用

スペクトル解析・フィルタリング（overlap-add/save法）、多倍長整数や多項式の乗算、JPEG/MP3などのエンコード（高速DCT経由）、4G LTE/5GのOFDM変調など。実装では FFTW（"Fastest Fourier Transform in the West"）が有名で、NumPy/SciPy・MATLAB・Julia などの標準機能の背後にもFFTライブラリがいる。

## [[frequency-domain-transforms]]の中での位置づけ

[[fourier-transform|フーリエ変換]]・[[laplace-transform|ラプラス変換]]が連続の数学理論なのに対し、こちらは離散版（DFT）を計算機で高速に計算するためのアルゴリズム。理論を実用に変えたのがこのノートの主役。

## 出典

- [Fast Fourier transform - Wikipedia](https://en.wikipedia.org/wiki/Fast_Fourier_transform)
