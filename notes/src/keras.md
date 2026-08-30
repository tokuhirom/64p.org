---
created: 2026-08-20 15:07
updated: 2026-08-30 20:07
---
# Keras

Googleのソフトウェアエンジニアだった François Chollet が2015年に開発した、Python製の高水準ディープラーニングAPI。OSSとしてkeras-team組織のもとGitHubで開発が続く。 #ai #machine-learning #python

当初はTheano上で動くAPIとして公開され、その後TensorFlowの公式高水準APIとしても採用された。Chollet氏は2024年11月にGoogleを離籍したが、Kerasのロードマップ監督とOSSコミュニティでの開発継続を表明しており、Google側もKeras 3への投資継続を明言している。

## Keras 3: マルチバックエンド化

2023年11月にフルリライトされた「Keras 3」が現行世代。TensorFlow専用ではなく、TensorFlow / [[jax|JAX]] / [[pytorch|PyTorch]] / OpenVINO(推論専用)の4バックエンドを切り替えて同一のモデルコード(`model.py`)を動かせるマルチバックエンド設計になった。バックエンドの切り替えは環境変数`KERAS_BACKEND`を設定するだけでよい。ベンチマークでは[[jax|JAX]]バックエンドが最速になることが多く、他フレームワーク比で20〜350%の高速化が謳われている。

設計思想は「progressive disclosure of complexity(複雑さの段階的開示)」。高水準の`fit()`から、必要に応じて各バックエンドネイティブな低水準の学習ループまで、複雑さを必要な分だけ開示できるようにしている。

## バージョン・直近の更新(2026年)

- v3.13.2(2026-01-30): モデルロード時のセキュリティ強化
- v3.14.0(2026-04-03): Orbaxチェックポイント対応、量子化機能の強化
- v3.14.1(2026-05-07): セキュリティ・バグ修正
- v3.15.0(2026-06-24): Keras→[[pytorch|PyTorch]]エクスポート機能、sliding window attention、NaN対応NumPy互換演算子(`nanmin`/`nanmax`等)の追加
- v3.15.1(2026-07-29、最新版): [[path-traversal|パストラバーサル]]脆弱性(CVE-2026-11816)の修正、Python 3.14対応

姉妹プロジェクトのkeras-cvは2026年3月10日にアーカイブされ、機能はKeras本体側に統合が進んでいる。

## [[deep-learning-frameworks|深層学習フレームワーク]]の中での位置づけ

特定の学習エンジンそのものではなく、[[jax|JAX]]・[[pytorch|PyTorch]]などをバックエンドとして切り替えて使う高水準APIという位置づけ。

## 出典

- [Keras 3 - keras.io](https://keras.io/keras_3/)
- [keras.io](https://keras.io/)
- [keras-team/keras Releases - GitHub](https://github.com/keras-team/keras/releases)
- [keras - PyPI](https://pypi.org/project/keras/)
- [CVE-2026-11816: Path Traversal in keras-team/keras](https://thewindowsupdate.com/2026/06/25/cve-2026-11816-path-traversal-in-keras-team-keras/)
- [Farewell and thank you for the continued partnership, François Chollet - Google Developers Blog](https://developers.googleblog.com/en/farewell-and-thank-you-for-the-continued-partnership-francois-chollet/)
- [Keras - Wikipedia](https://en.wikipedia.org/wiki/Keras)
