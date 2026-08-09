---
created: 2026-08-09 21:23
updated: 2026-08-09 21:23
---
# Project Babylon

Javaの適用範囲をSQL、微分可能プログラミング、機械学習モデル、GPUといった外部プログラミングモデルへ拡張することを目指すOpenJDKプロジェクト。「コードリフレクション(code reflection)」というリフレクティブプログラミングの拡張によって実現する。

## コードリフレクション

通常のJavaリフレクションは、実行時にクラスのフィールド・メソッド・アノテーションを調べられるが、メソッド内部で実際に何をしているかまでは分からない。`@CodeReflection` アノテーションを付けたメソッドは、バイトコードより上位の、プログラマが書いたコードに近いモデル(構造・型情報を保持し変換しやすい形)を生成する。

## GPUプログラミングでの用途

コードリフレクションを使うと、JavaプログラムをシンボリックなJava中間表現に落とし込んだ上でCUDAやOpenCLのような外部モデルへ変換できる。これにより、Javaで書いたコードを異なるプラットフォーム上で実行可能にする。

## HAT (Heterogeneous Accelerator Toolkit)

Javaコードをオフロードし、GPUなど現代的なハードウェアアクセラレータ上へディスパッチできるようにする並列プログラミングフレームワーク。コードリフレクションを活用したGPUプログラミングモデルとしてJavaライブラリの形で実装されている。

## 出典

- [Project Babylon — OpenJDK公式](https://openjdk.org/projects/babylon/)
- [Project Babylon: Code Reflection and What It Means for ML on the JVM | Java Code Geeks](https://www.javacodegeeks.com/2026/04/project-babylon-code-reflection-and-what-it-means-for-ml-on-the-jvm.html)
- [Optimizing GPU Programs from Java using Babylon and HAT](https://openjdk.org/projects/babylon/articles/hat-matmul/hat-matmul)
