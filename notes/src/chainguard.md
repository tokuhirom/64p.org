---
created: 2026-09-02 20:50
updated: 2026-09-02 20:50
---
# Chainguard

ソフトウェアサプライチェーンセキュリティを事業とする米国企業。「[[distroless|distroless]]的な最小構成の硬化コンテナイメージを、毎晩ソースからビルドし直して配る」ことを主軸に、OSSアーティファクトを再ビルドして提供する。 #security #supply-chain-attack #container

## 創業の経緯

2021年10月、Google出身の Dan Lorenc(CEO)、Matt Moore(CTO)、Kim Lewandowski(CPO)、Ville Aikas、Scott Nichols の5人が創業。創業チームはGoogle在籍時に [[sigstore|Sigstore]]、[[slsa|SLSA]]、Knative、Tekton といったプロジェクトを作っていた面々で、SolarWinds事件によって[[supply-chain-attack|サプライチェーン攻撃]]が経営課題として認識された直後というタイミングだった。

資金調達は2025年4月のSeries Dで3.56億ドル(バリュエーション35億ドル)、その後General Catalystからの2.8億ドルを含め累計8.92億ドル。従業員600人超。

## 中核となる発想

「入っていないものは脆弱性になりようがない」。`python:3.12` のような一般的な公式イメージにはアプリと無関係なOSコンポーネントが大量に入っており、スキャナが延々とCVEを報告し続ける。Chainguardの答えは、必要最小限のものだけを含むイメージを毎晩最新ソースからビルドし直すことで、この「パッチ当ての踏み車(patching treadmill)」から降りるというもの。

## 製品ラインナップ

| 製品 | 内容 |
|---|---|
| **Chainguard Containers** | 主力。3,000超のリポジトリ。`cgr.dev` から配布、一部はDocker Hubにもミラーされている |
| **Chainguard Libraries** | Maven Central / PyPI / npm の代替。Java・Python・JavaScriptのライブラリをソースからビルドし直して配る |
| **Chainguard VMs** | コンテナホスト用のVMイメージ。Early Access |
| **Chainguard OS Packages** | Containersを構成しているapkパッケージ群への直接アクセス(30,000超) |
| **Chainguard Actions** | 硬化されたCI/CDワークフロー(GitHub Actions)のカタログ。ベータ |
| **Chainguard Agent Skills** | AIエージェント向けskillを取り込んで検証・硬化する。クローズドベータ |

イメージの土台になっているのが [[wolfi|Wolfi]]、その上でパッケージをビルドするのが melange、イメージを組み立てるのが apko という構成。この3つはOSSとして公開されている。

## Chainguard Factory

内部のビルド基盤。CVEフィードやアップストリームのリポジトリを継続監視し、「あるべき状態」と「実際の状態」の差分をボットが自動で埋める reconciler モデルを取る。ボットが詰まった場合はAIエージェントへ段階的にエスカレーションされる。成果物には [[slsa|SLSA]] Build Level 3、[[sigstore|Sigstore]]署名、ビルド時生成の [[sbom|SBOM]] が付く。

## 価格体系

- **無料(Starter)**: 1組織あたり最大5イメージ。`latest` 系タグのみで、過去バージョンやEOL版は使えず、CVE修正のSLAもない。
- **Per Image**: バージョン別タグ(Python 3.10〜3.14のような)、Critical CVEは7日以内という契約SLA、EOL後6ヶ月の猶予期間、FIPS対応版など。
- **Catalog**: 10人チームで年19,000ドルから。2,000超の全イメージ、カスタムイメージ組み立て、プライベートパッケージなど。

## 無料で使える範囲

無料枠が5イメージなので、本番環境の全面採用にはまず有料契約が必要になる。一方で [[wolfi|Wolfi]]・apko・melange はApache-2.0のOSSであり、`chainguard/wolfi-base` を起点に自分でイメージをビルドする道は無料で開かれている。

## 出典

- [What is Chainguard? Products, platform & how it works](https://www.chainguard.dev/supply-chain-security-101/what-is-chainguard)
- [Overview of Chainguard Containers — Chainguard Academy](https://edu.chainguard.dev/chainguard/chainguard-images/overview/)
- [Chainguard Pricing](https://www.chainguard.dev/pricing)
- [Everything we announced at Chainguard Assemble 2026](https://www.chainguard.dev/unchained/everything-we-announced-at-chainguard-assemble-2026)
- [Chainguard Raises Hefty $356M Series D at $3.5 Billion Valuation (SecurityWeek)](https://www.securityweek.com/chainguard-raises-hefty-356m-series-d-at-3-5-billion-valuation/)
- [Chainguard Business Breakdown & Founding Story (Contrary Research)](https://research.contrary.com/company/chainguard)
