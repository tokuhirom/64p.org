---
created: 2026-08-14 09:59
updated: 2026-08-14 11:32
---
# ソフトウェアライセンス

#moc #license #open-source

ソフトウェアライセンス、特にコピーレフトの強度とsource-availableの潮流を見渡すハブノート。

## コピーレフトの系譜

- [[gplv3|GPLv3]] — コピーレフトの現行版。特許・Tivoization・ライセンス互換性に対応。頒布した時に義務が発動する
- [[agpl|AGPL]] — GPLv3のネットワーク拡張。改変版をSaaSとして提供した場合にもソース提供義務が発動する（ネットワークコピーレフト）
- [[sspl|SSPL]] — AGPLの第13条をさらに拡張し、無改変でもサービス提供自体をトリガーにスタック全体の公開を要求。OSI非承認でsource-available扱い

コピーレフトの対極にあるのがMIT・BSD・Apache 2.0などのパーミッシブライセンス（再配布時の義務がほぼない）。

## source-available（OSIの承認しない「ソース公開」ライセンス）

クラウドベンダーのタダ乗り対策として商用OSSベンダーが移行する先。アプローチが2系統ある。

- [[sspl|SSPL]] — 公開義務を非現実的なレベルまで重くして実質的にサービス提供を禁じる
- [[bsl|BSL]] — 本番利用を制限しつつ、最長4年の時限式で自動的にOSSへ変わる

## ライセンス変更が引き起こしたフォーク・騒動の事例

- [[redis|Redis]] → [[valkey|Valkey]]: SSPL化を機にAWS・GoogleらがフォークしてLinux Foundationへ
- [[elasticsearch|Elasticsearch]] → [[opensearch|OpenSearch]]: SSPL化を機にAWSがフォーク
- Terraform → OpenTofu: BSL化を機にLinux Foundation傘下でフォーク
- [[mold-linker|mold]]: AGPL/商用デュアルライセンスのマネタイズがうまくいかず、逆にMITへ緩めた例
