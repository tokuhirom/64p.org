---
created: 2026-08-11 09:18
updated: 2026-08-11 09:18
---
# MISRA-C

C言語を安全性が求められる組み込みシステムで使う際のコーディングガイドライン（サブセット規格）。MISRA（Motor Industry Software Reliability Association）が策定。

## 起源

- MISRAコンソーシアム自体は1990年代初頭、英国政府の"SafeIT"プログラム（安全関連の電子システムを扱う幅広い産業を対象にした助成プログラム）内のプロジェクトとして発足。自動車の電子制御システム向け組み込みソフトウェアのガイドライン策定を目的としていた。
- FordとRoverが主導する形で、C言語のサブセット（コーディング標準）を作る共同開発が進められ、これが「MISRA C: Guidelines for the use of the C language in vehicle-based systems」として結実。1998年に初版が発行された。
- 当初「MISRA」は「Motor Industry Software Reliability Association（自動車産業ソフトウェア信頼性協会）」の略だったが、現在は自動車業界に限らず幅広い分野で使われるため、この頭字語展開は使われなくなっている。2021年以降は独立非営利団体「The MISRA Consortium Limited」が運営。

## バージョン履歴

- **MISRA C:1998**（初版） — 127ルール（必須93・推奨34）
- **MISRA C:2004**（第2版） — 142ルール（必須122・推奨20）、21分野に分類
- **MISRA C:2012**（第3版） — 143ルール＋16ディレクティブ。C99対応を拡張
- **MISRA C:2023** — C11/C17の言語機能に対応
- **MISRA C:2025** — 最新版

## ルールの分類（2012年版以降）

- **Mandatory（強制）** — 常に遵守が必要
- **Required（必須）** — 正当な逸脱理由がない限り遵守が必要
- **Advisory（推奨）** — 良い実装慣行だが、形式的な要求は緩やか

## 適用業界の拡大

当初は自動車業界向けだったが、現在は航空宇宙・医療機器・防衛・鉄道など幅広い分野の組み込みシステム開発におけるベストプラクティスとして認識されている。NASA、機能安全規格ISO 26262、AUTOSAR仕様などでも参照される。

## 出典

- [MISRA C - Wikipedia (English)](https://en.wikipedia.org/wiki/MISRA_C)
- [The History of MISRA - misra.org.uk](https://misra.org.uk/a-brief-history-of-misra/)
- [Motor Industry Software Reliability Association - Wikipedia (English)](https://en.wikipedia.org/wiki/MISRA)

#software-engineering #c-language
