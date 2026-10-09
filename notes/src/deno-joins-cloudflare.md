---
created: 2026-10-09 13:50
updated: 2026-10-09 13:50
---
# Denoチームの Cloudflare 参加

#deno #cloudflare #javascript

2026年10月9日、DenoチームがCloudflareに参加することがDeno側（Ryan Dahl）とCloudflare側（Ryan Dahl と Kenton Varda の共同執筆）で同日に発表された。Denoの各プロダクトの扱いが変わるのでメモ。

## Deno側の発表（Ryan Dahl）

- 「サーバーソフトウェアを作りやすくする」取り組みをCloudflareで続ける。Workers と Durable Objects のチームと成果を組み合わせ、Cloudflareのネットワーク上でも自前インフラ上でも、サーバー構築の標準的な方法にしたい。
- Deno Runtime以外の独立したランタイム・ホスティングサービスの開発は続けず、共有プラットフォームに集中する。記事自身がDenoユーザーにとって重大な変更だと認めている。

### 各プロダクトの扱い

| 対象 | 内容 |
| --- | --- |
| Deno Runtime | 今後1年は月次リリースでバグ修正とセキュリティ更新。その後は開発終了。OSSとしては存続し、引き継ぐ人を歓迎 |
| Deno Deploy | 6か月運用を続けた後に終了。有料顧客にはCloudflare Workersへの移行支援 |
| JSR | 運用継続。インフラをCloudflareに移す |
| rusty_v8 | サポート継続。`workerd`への統合を目指す |

## Cloudflare側の記事

### 動機
- RyanはNode.jsで非同期モデルを、Denoでより単純な抽象化を探ってきたが、Denoは「JavaScriptの書き心地」は変えても、ランタイムの周りで開発者が組み立てる部分（分散計算、状態の協調、データストレージ、需要に応じた自動スケーリング）は根本的には変えなかった、という問題意識。
- プログラミングモデルの設計段階から複数マシンへの分割を組み込めないか、という問い。そこで評価したのが[[durable-objects]]。
- Deno Deployの運用で、複数のパブリッククラウド・複数のデータベース・絡み合ったサービスに苦労した経験から[[celld]]を始めた。

### workerd のセルフホスト
- workerdはWorkersのOSSランタイム（本番と同じコードとされる）。ただしworkerdのDurable Objectsは単一インスタンスでしか動かず、ローカルテスト向きでスケールしない。
- Cloudflare本番のDOルーティングは数百拠点・多数の外部依存・SREチームの運用が前提で、セルフホスターには向かない。
- 今後: RyanとBert Belderが、workerdのセルフホスティングをWorkersプログラミングモデルの一級サポートにする取り組みを主導する。celldのコードとアイデアをworkerdにマージする。詳細は「今後数か月」で発表予定。待てない場合は今すぐcelldかworkerdをセルフホストできる。

### Kenton Varda の「ロックイン」論への反論
- 「Workers/DOはアーキテクチャが違うので、書くと抜け出せなくなる。celldはそれを揺るがす」という見方に対し、Kentonはこの理論は誤りだとする。
- Workersが違うのは「より良いから」で、数百拠点のアプリを簡単・安価に管理できること、Bindingsで外部リソースへのアクセスが簡単で安全になること、DOでリアルタイム共同編集のような分散システムを作りやすくなること、を挙げている。
- 2022年にWorkers for PlatformsをShopifyなどに提案した際、ランタイムがOSSでないと採用できないというフィードバックがありworkerdをOSS化した、という経緯も述べられている。

## 考えたこと

- Denoは「Node.jsの作者による再設計」というランタイム単体の話から、「ランタイム+配置+状態まで含むプログラミングモデル」の話に重心が移った、という読み方ができる。Ryanの記事自身がその流れ（Deno → Deno Deploy → celld）を書いている。
- Denoランタイムは1年で開発終了、Deno Deployは6か月で終了なので、使っている場合の移行猶予はこの期間。JSRとrusty_v8は継続。
- ここは公式記載の整理で、実際の移行手順や今後のworkerd側の仕様はまだ出ていない（「今後数か月」で発表予定とされている）。

## 出典

- [Deno blog: Deno is joining Cloudflare（Ryan Dahl）](https://deno.com/blog/cloudflare)
- [Cloudflare blog: Deno is joining Cloudflare](https://blog.cloudflare.com/deno-joins-cloudflare/)
