---
created: 2026-08-13 22:17
updated: 2026-08-13 22:17
---
# DevOps

#devops

Development（開発）とOperations（運用）を組み合わせた造語。両チームの壁を取り払い、ソフトウェアの計画・開発・テスト・デプロイ・運用を継続的かつ協調的に行う文化・実践の総称。

## 起源

- 2008年、ベルギー人コンサルタントのPatrick Deboisがトロントの Agile Conference で Andrew Clay Shafer と出会い、「agile systems administration」という概念を探求し始めた。両者とも、Agileの理想（開発の高速化）が運用側の壁で頭打ちになっている現状に問題意識を持っていた。
- 転機は2009年、Velocity ConferenceでFlickrのJohn AllspawとPaul Hammondが行った講演「10+ Deploys per Day: Dev and Ops Cooperation at Flickr」。両者は開発と運用の対立を描き、「アプリケーション開発と運用は、シームレスで透明かつ完全に統合されているべきだ」と主張した。
- この講演の映像を見たDeboisが感銘を受け、自らベルギー・ゲントで「Devopsdays」という独自カンファレンスを開催（2009年）。これが"DevOps"という名前が定着するきっかけとなった。
- 背景には、開発と運用が別チームで縦割りになっているウォーターフォール的な体制への不満があった。開発者が作ったものを運用に「投げる」ことで、コミュニケーション不足・遅延・障害が頻発していた。

## CALMSフレームワーク

「The DevOps Handbook」共著者のJez Humbleが提唱した、DevOps成熟度を測る5つの柱。

- **Culture（文化）** — ツールや自動化より前に、開発とOpsが協働する文化そのものが土台。
- **Automation（自動化）** — CI/CDやテストなど手作業の自動化。
- **Lean（リーン）** — 仕掛かり作業(WIP)の最小化・作業の可視化など、ムダを省き価値の流れを最適化。
- **Measurement（計測）** — デプロイやプロセスに関するデータを収集し、改善点を把握する。
- **Sharing（共有）** — 知識がサイロ化せず、チーム間で自由に流通する状態を作る。

## 関連する拡張・派生

- [[devsecops|DevSecOps]] — DevOpsに「セキュリティ」を明示的な第3の柱として組み込む拡張。
- [[platform-engineering|Platform Engineering]] — DevOpsの理想「You build it, you run it」を全開発者に求めるのは難しく、多くの組織で開発者がインフラ管理に忙殺される「Shadow Ops」状態が発生する。運用の専門性をプラットフォームチームに集約し、開発者からは抽象化して隠すことでこのギャップを埋める実践。

## 出典

- [The Origins of DevOps: What's in a Name? - DevOps.com](https://devops.com/the-origins-of-devops-whats-in-a-name/)
- [A Brief History of DevOps - BMC Software](https://www.bmc.com/blogs/devops-history/)
- [CALMS Framework - Atlassian](https://www.atlassian.com/devops/frameworks/calms-framework)
- [What is CALMS for DevOps? - TechTarget](https://www.techtarget.com/whatis/definition/CALMS)
