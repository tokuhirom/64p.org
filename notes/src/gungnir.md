---
created: 2026-08-19 12:48
updated: 2026-08-19 12:48
---
# Gungnir

複数の[[certificate-transparency|Certificate Transparency]]ログを継続的に監視し、新規発行された証明書からドメイン・サブドメインを抽出してリアルタイムに標準出力へ流すGo製CLIツール。名前は北欧神話の「必ず的を外さない槍」に由来する。 #security #pki

## 仕組み

CTログを監視し、新しい証明書エントリを検出するたびにSubject Alternative Names(SAN)とCommon Name(CN)からドメイン情報を抽出して出力する。テキストファイルで指定したルートドメインによる絞り込みフィルタにも対応する。

```sh
# ルートドメイン一覧でフィルタして監視
./gungnir -r roots.txt

# 監視対象ファイルの変更に追従しながら監視
./gungnir -r roots.txt -f

# フィルタなしで全体を監視
./gungnir
```

出力をパイプで別のツールに渡すことを前提とした設計で、発見したドメインをすぐ次の分析ステップ(生存確認・ポートスキャン等)に流し込める。

## 用途

新規ドメイン・サブドメインの発行を継続的に検知したいセキュリティ研究者・ペネトレーションテスターの偵察フェーズで使われる。[[crtsh|crt.sh]]が過去分も含めた蓄積データへのクエリ型検索であるのに対し、Gungnirは[[certstream|CertStream]]と同様に「発行された瞬間」を捉えるリアルタイム監視ツールという位置づけ。

## [[ct-monitoring-tools|CTログ監視・検索ツール]]の中での位置づけ

新規発行を継続的に監視する「プッシュ型」ツールの一つ。同じくプッシュ型の[[certstream|CertStream]]がサーバー型のフィード配信であるのに対し、Gungnirは単体で動くCLIとして手軽に使える。

## 出典

- [GitHub - g0ldencybersec/gungnir: CT Log Scanner](https://github.com/g0ldencybersec/gungnir)
- [Gungnir : Monitoring Certificate Transparency In Real-Time](https://kalilinuxtutorials.com/gungnir/)
