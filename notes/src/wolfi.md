---
created: 2026-09-02 20:50
updated: 2026-09-02 20:50
---
# Wolfi

[[chainguard|Chainguard]]がスポンサーする、コンテナ向けのLinuxディストリビューション。自らを「undistro」と称する。ざっくり言うと「**カーネルを持たない、glibcベースのローリングリリース版Alpine**」。 #linux #container #security

## カーネルを持たない

コンテナはホストのカーネルを使うので、イメージの中にカーネル・カーネルモジュール・initramfsを持つ必要がない。従来のディストリビューションではそこが死荷重になっている、という割り切りから出発している。ブートローダやinitシステムも持たない。

## glibcベースであること

パッケージマネージャは Alpine と同じ **apk** 形式を使うが、Alpine とパッケージ互換性はない。最大の違いは libc で、Alpine が musl なのに対し Wolfi は **glibc** を採用している。

musl 由来で実務上ハマりやすいのは以下あたりで、Wolfi ではこれらが起きない。

- DNSリゾルバの挙動差(TCPフォールバック、`search` ドメインの扱いなど)
- locale の扱い
- Python の pre-built wheel が使えない(manylinux は glibc 前提なので、musl 環境では `pip install` がソースビルドに落ちて重い・失敗する)
- ネイティブ拡張を含むライブラリの微妙な非互換

「Alpine で軽くしたいが musl の非互換が怖い」という場面での代替として素直に効く。

## ビルドの仕組み

- **melange** — apkパッケージをビルドするツール。YAMLでビルド定義を書き、すべてソースからビルドする。パッケージ単位で [[sbom|SBOM]] を生成する。
- **apko** — melange が作ったパッケージ群から、Dockerfileを書かずにYAMLで宣言的にOCIイメージを組み立てるツール。レイヤ構成が決定的になり、再現性のあるビルドがしやすい。

パッケージリポジトリは `https://packages.wolfi.dev/os` で公開されている。

## 収録方針

デスクトップOSではなく、コンテナ化・組み込みシステム向け。セキュリティパッチの最新性を優先するローリングリリースで、活発に保守されているプロジェクトのみを収録対象とする。ライセンスはFSFまたはOSI認可のものが求められる。

## 触ってみる

Docker Hubに `chainguard/wolfi-base` が公開されており、これを`FROM`にして`apk add`で普通にDockerfileを書ける。[[chainguard|Chainguard]]の商用イメージと違って無料枠の制限を受けない。

```dockerfile
FROM cgr.dev/chainguard/wolfi-base
RUN apk add --no-cache python-3.13
```

## 出典

- [wolfi-dev/os (GitHub)](https://github.com/wolfi-dev/os)
- [glibc vs. musl — Chainguard Academy](https://edu.chainguard.dev/chainguard/chainguard-images/about/images-compiled-programs/glibc-vs-musl/)
- [How to use Dockerfiles with wolfi-base images](https://www.chainguard.dev/unchained/how-to-use-dockerfiles-with-wolfi-base-images)
- [Wolfi: A Small glibc-Based Python Container Base](https://medium.com/@bdalpe/wolfi-a-small-glibc-based-python-container-base-303e6c4dda42)
