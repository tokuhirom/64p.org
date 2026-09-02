---
created: 2026-08-17 09:48
updated: 2026-09-02 19:13
---
# Prometheus

pullモデルのオープンソース監視・アラーティングシステム。監視対象がHTTPエンドポイント(`/metrics`)上でメトリクスを公開し、Prometheusサーバーが定期的にそのエンドポイントをスクレイプ(取得)しに行く方式を取る。push型の監視ツールに対し、監視対象のライフサイクルに依存せず、疎通確認がしやすいという特徴がある。

2012年にSoundCloudで開発が始まり、開発者らがGoogleの内部監視システムBorgmonについて知ったことがきっかけでOSS版として作られた。2016年に[[cncf|CNCF]]の2番目のプロジェクトとしてホストされ、2018年に[[kubernetes|Kubernetes]]に次ぐ2番目のCNCF Graduatedプロジェクトとなった。

#observability #cncf

## データモデル

メトリクスはメトリクス名とキーバリューのラベルの組み合わせで識別される多次元の時系列データとして保存される。専用のクエリ言語PromQLで、集約・変換・複雑な演算をリアルタイムに行える。スクレイプ対象が`/metrics`エンドポイントで公開する具体的なワイヤーフォーマットについては[[prometheus-exposition-format|text-based exposition format]]を参照。

## エコシステム

- **Prometheusサーバー本体**: スクレイプ・保存・クエリ・アラート評価を担う
- **[[node_exporter|node_exporter]]**: Linux/UNIXマシン自体のハードウェア・OSレベルのメトリクスをエクスポートする公式exporter
- 他にも各種ミドルウェア・言語ランタイム向けのexporterが多数存在し、対象システムのネイティブなメトリクスをPrometheus形式のHTTPエンドポイントへ変換して公開する役割を担う

## 出典

- [Prometheus: Monitoring at SoundCloud | SoundCloud Backstage Blog](https://developers.soundcloud.com/blog/prometheus-monitoring-at-soundcloud/)
- [What is Prometheus? | Google Cloud](https://cloud.google.com/discover/what-is-prometheus)
- [Prometheus Monitoring: The Complete Guide | Tigera](https://www.tigera.io/learn/guides/prometheus-monitoring/)
