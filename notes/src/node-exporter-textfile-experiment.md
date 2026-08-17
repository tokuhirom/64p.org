---
created: 2026-08-17 09:48
updated: 2026-08-17 09:48
---
# textfile collectorを動かした実験記録

[[node_exporter]]のtextfile collector機能を実際にこのマシン上で動かし、独自メトリクスの露出・atomicな更新・エラー時の挙動を確認した記録。 #observability

## 準備

GitHub releasesからLinux amd64向けのstaticリンクバイナリ`node_exporter-1.12.1.linux-amd64.tar.gz`(2026-07-14リリース)を取得し展開した。ビルド情報は`go=go1.26.5`。

```sh
curl -sL -o node_exporter.tar.gz \
  https://github.com/prometheus/node_exporter/releases/download/v1.12.1/node_exporter-1.12.1.linux-amd64.tar.gz
tar xzf node_exporter.tar.gz
mkdir textfiles
```

サンプルの`.prom`ファイルを手書きで用意する。

```
# HELP mybatch_last_run_timestamp_seconds Last time the mybatch job finished, in unixtime.
# TYPE mybatch_last_run_timestamp_seconds gauge
mybatch_last_run_timestamp_seconds 1000
# HELP mybatch_last_run_success 1 if the last run of mybatch succeeded.
# TYPE mybatch_last_run_success gauge
mybatch_last_run_success 1
```

`--collector.textfile.directory`でそのディレクトリを指定し、ポート9100で起動した。

```sh
node_exporter --collector.textfile.directory=./textfiles \
  --web.listen-address=127.0.0.1:9100
```

## 実験1: 自作メトリクスがそのまま公開される

```sh
curl -s http://127.0.0.1:9100/metrics | grep -E '^mybatch|node_textfile'
```

```
mybatch_last_run_success 1
mybatch_last_run_timestamp_seconds 1000
node_textfile_mtime_seconds{file="textfiles/mybatch.prom"} 1.786926964e+09
node_textfile_scrape_error 0
```

`.prom`ファイルに書いた内容がそのまま`/metrics`の出力にマージされ、`node_textfile_mtime_seconds`(ファイルの最終読み込み成功時のmtime)と`node_textfile_scrape_error`(エラーの有無)が自動で付与された。

## 実験2: atomicな置き換え(一時ファイル→mv)

`.prom`ファイルを直接上書きするのではなく、一時ファイルに書いてから`mv`でリネームする方式(スクレイプ中に不完全な内容を読まれるのを防ぐ、実運用で推奨されるパターン)を試した。

```sh
cat > textfiles/mybatch.prom.tmp <<'EOF'
mybatch_last_run_timestamp_seconds 2000
mybatch_last_run_success 0
EOF
mv textfiles/mybatch.prom.tmp textfiles/mybatch.prom
curl -s http://127.0.0.1:9100/metrics | grep -E '^mybatch|node_textfile_mtime'
```

再スクレイプで値が2000/0に切り替わり、mtimeも更新後の時刻に変わった。`mv`によるリネームが正しく反映されることを確認できた。

## 実験3: タイムスタンプ付きメトリクス(サポート外)を書いた場合の挙動

textfile collectorはtext exposition formatのタイムスタンプ(3カラム目)をサポートしていない。実際に書いてみると、

```sh
echo 'mybatch_broken_metric 1 1234567890000' > textfiles/broken.prom
```

ログにエラーが出て、

```
level=ERROR source=textfile.go:242 msg="failed to collect textfile data" collector=textfile file=broken.prom \
  err="textfile \"textfiles/broken.prom\" contains unsupported client-side timestamps, skipping entire file"
```

`node_textfile_scrape_error`が1になった。一方で、他の正常な`.prom`ファイル(`mybatch.prom`)のメトリクスは影響を受けず出続けた。壊れたファイルはファイル単位でスキップされるだけで、textfile collector全体やnode_exporter全体が落ちるわけではないことが分かった。

## 分かったこと

- `.prom`ファイルの内容は`/metrics`の出力へほぼそのままパススルーされる。node_exporter側での加工・フィルタリングは行われない
- `node_textfile_mtime_seconds`でファイルの鮮度(いつ最後に正しく読めたか)を監視でき、cronジョブが長時間動いていないことの検知にも使える
- 書き込みはatomicなrename方式にすべき(実測でも問題なく反映された)
- パースエラーはファイル単位に閉じており、1ファイルの書式ミスが他のメトリクスやnode_exporter全体を巻き込まない
