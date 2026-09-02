---
created: 2026-09-02 20:50
updated: 2026-09-02 20:50
---
# distroless

コンテナイメージから「Linuxディストリビューションらしさ」を取り除き、アプリケーションとその実行に必要なランタイム依存だけを残す設計。パッケージマネージャもシェルもコアユーティリティも入れない。 #container #security

## 何が入っていないのか

典型的な distroless イメージには以下が**ない**。

- シェル(`/bin/sh`)
- パッケージマネージャ(`apt`, `apk`, `yum`)
- `ls`, `cat`, `curl` などのコアユーティリティ
- ドキュメント、manページ、ロケールデータ

残るのは、アプリのバイナリと、それが動くのに必要な共有ライブラリ・CA証明書・タイムゾーンデータ・`/etc/passwd` 程度。

## 狙い

**攻撃面の縮小**: シェルがないコンテナでは、RCEを取られてもそこから対話的に侵入を広げるのが難しい。パッケージマネージャがなければ追加ツールを引き込まれることもない。

**CVEノイズの削減**: スキャナが報告するCVEの大半は、アプリと無関係なOSコンポーネント由来のものになりがち。そもそも入れないことで、スキャン結果のS/N比が上がる。

**サイズ**: `gcr.io/distroless/static-debian13` は約2MiB。Alpine(約5MiB)の半分以下、Debian(124MiB)の2%未満。

## 起源

Googleの [GoogleContainerTools/distroless](https://github.com/GoogleContainerTools/distroless) が概念を広めた。Bazelでビルドされ、`static`/`base`/`cc`/`java`/`nodejs`/`python3` のように言語ランタイム単位でイメージが用意されている。

その後、[[chainguard|Chainguard]]のコンテナイメージや、多くのベンダーの「最小イメージ」路線がこの発想を引き継いでいる。

## 使い方はマルチステージビルドが前提

パッケージマネージャがないので、distrolessイメージの中でビルドはできない。ビルド用ステージで成果物を作り、それをdistrolessなランタイムステージへ`COPY`する形になる。

```dockerfile
FROM golang:1.24 AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o /app ./cmd/server

FROM gcr.io/distroless/static-debian13
COPY --from=build /app /app
ENTRYPOINT ["/app"]
```

## 運用上の痛み

シェルがないので `docker exec -it ... sh` でのデバッグができない。対処としては以下がある。

- デバッグ用のバリアントを使う。Googleのdistrolessは `:debug` タグにBusyBoxが入っており、[[chainguard|Chainguard]]のイメージは `-dev` サフィックス付きタグにシェルと`apk`が入っている
- `kubectl debug` の ephemeral container で、デバッグ用イメージを同じプロセス名前空間にアタッチする
- 静的リンクしたバイナリを一時的に`COPY`する

## 出典

- [GoogleContainerTools/distroless (GitHub)](https://github.com/GoogleContainerTools/distroless)
- [What's Inside Distroless Container Images (iximiuz Labs)](https://labs.iximiuz.com/tutorials/gcr-distroless-container-images)
