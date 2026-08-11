---
created: 2026-08-11 13:48
updated: 2026-08-11 13:48
---
# Erlang

Ericsson社内で1986年、Joe Armstrong・Robert Virding・Mike Williamsによって開発された関数型プログラミング言語。電話交換機のソフトウェア（無停止・高信頼性が絶対条件）を作るために非公開で開発され、1998年12月にオープンソース化された。

## 並行性: アクターモデル + BEAM

Erlangは並行処理を言語・ランタイムの根幹に組み込んでいる。

- 各プロセスが「アクター」であり、プロセス間の通信はメッセージパッシングのみ。共有メモリを持たないため競合状態が起きにくい
- プロセスは非常に軽量で、1台のマシン上に数百万個生成できる
- 実行系はBEAMという専用VM。ガベージコレクションはプロセス単位で個別に走り、他のプロセスの実行を止める「stop the world」が起きない

## 耐障害性: "Let it crash" 哲学

エラーが起きたプロセス自身でエラー処理をするのではなく、あえてそのプロセスをクラッシュさせ、別のプロセス（supervisor）が検知して再起動する、という設計思想。

- OTP（Open Telecom Platform。Erlangの標準ライブラリ・フレームワーク群）の中核概念が「supervision tree」。worker（実際の処理を行うプロセス）とsupervisor（workerを監視し、クラッシュしたら既定の戦略で再起動するプロセス）を階層的に構成する
- 個々のプロセスの異常がシステム全体に波及しないよう局所化する

## 実例

WhatsAppは2012年、従業員30人程度の体制でありながら1台のサーバーでErlangにより約220万TCPコネクションをCPU使用率38%未満で捌いたことで話題になった。

#erlang #functional-programming #programming-language

## 出典

- [Erlang: A Veteran's Take on Concurrency, Fault Tolerance, and Scalability | Medium](https://medium.com/@rng/erlang-a-veterans-take-on-concurrency-fault-tolerance-and-scalability-adff3f96565b)
- [Erlang (programming language) - Wikipedia](https://en.wikipedia.org/wiki/Erlang_(programming_language))
- [Overview — Erlang System Documentation v29.0.4](https://www.erlang.org/doc/system/design_principles.html)
- [BEAM and JVM virtual machines | Concurrency](https://www.erlang-solutions.com/blog/beam-jvm-virtual-machines-comparing-and-contrasting/)
