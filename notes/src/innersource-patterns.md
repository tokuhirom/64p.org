---
created: 2026-09-02 20:17
updated: 2026-09-02 20:17
---
# InnerSource Patterns

[[innersource|InnerSource]]の実践ノウハウを、デザインパターン形式でカタログ化したもの。InnerSource Commons (ISC) がコミュニティで収集・レビューし、GitBookとGitHubで公開している（CC BY-SA 4.0）。

#software-engineering #devops

## パターンの書式

GoFのデザインパターンというより、Christopher Alexanderのパターン・ランゲージ寄りの書式を採る。[[ward-cunningham|Ward Cunningham]]らがPortland Pattern Repositoryでやっていた流儀に近い。

- **Problem Statement** — 何を解決するか
- **Context** — 動かせない前提・状況
- **Forces** — 対立する力学・トレードオフ
- **Solution** — 実証済みの打ち手
- **Resulting Context** — 適用後にどうなるか

**Forces を独立した節として明示する**のが特徴。「受け入れ側チームは過去に投げっぱなしのPRで痛い目を見ている」「自チームのゴールへの忠誠がある」といった、解決策の前に立ちはだかる組織の力学を先に言語化してから解を書く。そのため、コピペ適用ではなく自組織の文脈に合わせた翻案が前提になっている。

## 成熟度レベルと「donut」

パターンには成熟度が付いていて、書籍（GitBook）に載るのはLevel 2以上。

| レベル | 状態 | 数 |
| --- | --- | --- |
| Level 3: Validated | 検証済み | 0 |
| Level 2: Structured | 構造化済み。コミュニティレビュー済みで実適用例が最低1件ある | 27 |
| Level 1: Initial | 執筆中 | 51 |

Level 1には **donut**（ドーナツ）と呼ばれるものが含まれる。**問題とcontext/forcesは書けたが、真ん中の解（Solution）がまだ空いている**パターンのこと。未解決問題をカタログの中に堂々と置いておき、解を持っている人の寄稿を待つ、という設計になっている。

Level 3が0件のままである点は、カタログとしてまだ発展途上であることを示している。

## 収録パターン（書籍に掲載されているもの, 26件）

GitHubリポジトリ側のカウントではStructuredは27件だが、書籍の目次に並んでいるのは以下の26件。

30 Day Warranty / Common Requirements / Communication Tooling / Contracted Contributor / Core Team / Cross-Team Project Valuation / Dedicated Community Leader / Document your Guiding Principles / Explicit Governance Levels / Extensions for Sustainable Growth / Gig Marketplace / Group Support / InnerSource Hackathon / InnerSource License / InnerSource Portal / Issue Tracker Use Cases / Maturity Model / Praise Participants / Repository Activity Score / Review Committee / Service vs. Library / Standard Base Documentation / Standard Release Process / Start as an Experiment / Transparent Cross-Team Decision Making using RFCs / Trusted Committer

付録としてPattern Template・Glossaryのほか、README / CONTRIBUTING / COMMUNICATION / RFC の各テンプレートが付いている。

## 代表的なパターン

### Trusted Committer

**問題**: プロジェクトに継続的に貢献してくれる人がいるが、メンテナ側のレビュー能力がボトルネックになる。一方で貢献者側には社内での可視性・評価の仕組みがない。

**解**: 常連の貢献者を「Trusted Committer」として公式化する。コミュニティチャンネルやコード貢献から候補を見つけ、本人に打診し、役割の範囲をドキュメント化し、READMEなどで公に認知する。最初は週次、慣れたら隔週でチェックインする。彼らはコードレビュー・コミュニティサポート・issueのtriageを担う。

**結果**: 貢献者はキャリア上価値のある実績を得る。メンテナ側は知識が分散し、元のメンテナが抜けても回る（承継計画にもなる）。

### 30 Day Warranty

**問題**: 受け入れ側チームが外部（他チーム）からの貢献を拒む。「投げっぱなしで後の面倒を見ない」「品質が信用できない」「保守コストを押し付けられる」という不信が背景にある。

**解**: **コードが本番に入った時点から30日間、貢献側チームがバグ修正を提供することに同意する**。期間はプロジェクトの事情に合わせて調整してよい。あわせてコントリビューションガイドラインで期待値を明文化する。

**結果**: 受け入れ側が貢献を受け入れる気になり、適応作業を分担するようになる。エスカレーションが減る。

実例としてPayPalが導入、GitHubは6週間に変更して運用、Microsoftが推奨、SAPが自社のEverestプロジェクトで適用している。

### Gig Marketplace

**問題**: 貢献したい開発者はいるが、上司が工数を承認してくれない。マネージャー側からは「部下が何にどれだけ時間を使うのか」「それで何が得られるのか」が見えない。

**解**: 社内イントラに、InnerSourceプロジェクト側のニーズを **「Gig（単発の仕事）」として求人形式で掲示する**サイトを立てる。必要な時間とスキルを明示する。

**結果**: マネージャーが工数コミットメントと部下の得られる専門性を把握できるようになり、承認が下りやすくなる。

### InnerSource Portal / Repository Activity Score

社内プロジェクトを発見可能にするポータル（[[developer-portal|開発者ポータル]]の話に接続する）と、リポジトリの活性度をスコア化して貢献先を選べるようにする仕組み。ポータルの実装としては[[backstage|Backstage]]のカタログがそのまま使える。

## 所感

技術的な話はほぼなく、中身は組織デザインとインセンティブ設計。特に「30 Day Warranty」や「Gig Marketplace」は、"障壁は技術ではなく上司の承認と他チームへの不信である" という現実に正面から向き合っていて実務的だと感じた。

Level 1の51件は玉石混交なので、まず書籍に載っている26件を眺めるのがよさそう。日本語訳もある（英・日・中・西・葡・ガリシア語）。

## 出典

- [InnerSource Patterns (GitBook)](https://patterns.innersourcecommons.org/)
- [Table of Contents - InnerSource Patterns](https://patterns.innersourcecommons.org/toc)
- [Trusted Committer](https://patterns.innersourcecommons.org/p/trusted-committer)
- [30 Day Warranty](https://patterns.innersourcecommons.org/p/30-day-warranty)
- [Gig Marketplace](https://patterns.innersourcecommons.org/p/gig-marketplace)
- [InnerSourceCommons/InnerSourcePatterns - GitHub](https://github.com/InnerSourceCommons/InnerSourcePatterns)
