---
created: 2026-09-02 19:46
updated: 2026-09-02 19:50
---
# Golden Path

「意見を持っていて、かつサポートされている道」（the opinionated and supported path）。Spotifyが自社の開発者体験を整理するために定義した言葉で、[[platform-engineering|Platform Engineering]]の中核概念のひとつ。Netflix系の文脈では **Paved Road（舗装路）** と呼ばれる同じ概念がある。

#platform-engineering #devops

## rumour-driven developmentという出発点

Spotifyは自律チーム文化を徹底していたが、その副作用として開発者ツールチェーンが断片化し、「何かをやる方法を知るには同僚に聞くしかない」状態になった。彼らはこれを **rumour-driven development（噂駆動開発）** と呼んでいる。人数が増えるとこれが破綻する。

そこで「バックエンドを作るならこの道を通れ」という推奨経路を1本用意する、というのがGolden Pathの発想。最初のGolden Pathは2014年頃、バックエンドエンジニアリング向けのHack Weekプロジェクトとして作られた。現在はバックエンド・クライアント開発・データエンジニアリング・データサイエンス・ML・Web・オーディオ処理など、分野ごとに存在する。

名前はFrank Herbertの『Dune』シリーズ第3部『Children of Dune』に登場する "Golden Path"（複雑きわまる未来を通り抜ける唯一の導かれた道）から取られている。導入したチームの誰かが読んでいたらしい、という程度の由来。

## 核心は「強制ではない」こと

Golden Pathは強制されない。別の道を選んでもよい。ただしその場合、**サポートは限定される**。

Netflixの Paved Road はこの契約性をより明示的に定義している。「推奨されるプロダクト・プラクティス・標準・コミットメントのセットであり、提供側と消費側の双方を導くもの」であり、デフォルトでは従うことを推奨し、逸脱するならトレードオフを慎重に検討せよ、という立て付け。消費側は「サポートされ、よく統合された技術一式」を受け取り、提供側は「消費者が発見して適切に使えるようにする」コミットメントを負う。

つまり「舗装路の上にいる限り自動的にサポートが受けられる。オフロードに出るなら結果は自分で持て」という取引になっている。**自由を奪わずに標準化する**ための設計であり、トップダウンの禁止令ではなく「一番楽な道を正しい道にする」という構造をとる点が重要。

## Golden Path tutorial

Spotifyでは単なる仕様書ではなく**チュートリアル**の形をとっているのが特徴。step-by-stepのガイドで、[[backstage|Backstage]]のTechDocs上で[[docs-as-code|Docs as Code]]の形で管理され、新入エンジニアのオンボーディング最初の2週間とEngineering Bootcampで使われる。Spotify社内で最も使われ、最も重要なドキュメント群だとされている。

運用面では変遷があり、以前は「チュートリアル1本につきテクニカルライター1名」という体制だったがスケールせず廃止された。現在は複数チームにオーナーシップを分散しているが、チュートリアル間の整合性の確保が課題として残っていると自ら書いている。

## [[backstage|Backstage]]との関係

BackstageのSoftware Templates（Scaffolder）は、Golden Pathを**実行可能な形にコード化したもの**と言える。「ドキュメントで啓蒙する」から「数クリックでその道に乗る」への変換であり、リポジトリ作成・CI設定・カタログ登録・初期コードまでを一括で生成する。

ただしテンプレートがカバーするのは新規プロジェクトの立ち上がりだけで、既存の重要なアプリケーションをGolden Pathに載せ替える部分は手つかずになる（「走っている患者への手術」と形容される）。ここがGolden Path施策が形骸化しやすいポイントで、「新しく作るものだけ整っていて、既存は野良のまま」という状態に落ち着きやすい。

## 出典

- [How We Use Golden Paths to Solve Fragmentation in Our Software Ecosystem - Spotify Engineering](https://engineering.atspotify.com/2020/08/how-we-use-golden-paths-to-solve-fragmentation-in-our-software-ecosystem)
- [What is the Paved Road? - developer-enablement.com](https://developer-enablement.com/what-is-the-paved-road/)
- [What is a golden path for software development? - Red Hat](https://www.redhat.com/en/topics/platform-engineering/golden-paths)
- [How Spotify Leverages Paved Paths and Common Tooling to Improve Productivity - InfoQ](https://www.infoq.com/news/2021/03/spotify-paved-paths/)
- [Backstage Is at the Peak of Its Hype - Earthly Blog](https://earthly.dev/blog/backstage-is-at-peak-hype/)
