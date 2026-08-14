---
created: 2026-08-14 11:39
updated: 2026-08-14 11:39
---
# OpenTofu

#hashicorp #iac #fork

[[terraform|Terraform]]がMPL 2.0からBUSL 1.1へライセンス変更したことを受け、2023年8月の変更発表から数週間で作られたMPL 2.0ライセンスのフォーク。当初はOpenTF Foundationとして立ち上がり、Linux Foundation傘下で運営されている。2025年4月にはCNCF(Cloud Native Computing Foundation)にも受け入れられた。

## Terraformとの互換性

Terraform 1.6の時点でフォークしたため、プロバイダーやstateファイルとワイヤー互換性を持つ。多くのTerraform構成は無変更のままOpenTofuで動作し、移行は`terraform`バイナリを`tofu`に置き換えるだけで済むことが多い(stateファイル内の`terraform_version`マーカーが初回applyで変わる程度)。

## 独自機能

互換性を保ちつつも独自機能で差別化が進んでいる。

- state暗号化(v1.7)
- 早期の変数評価(early variable evaluation、v1.8)
- providerの`for_each`によるイテレーション(v1.9)
- `-exclude`フラグ(v1.9)
- OCIレジストリ対応(v1.10)

2026年6月時点でエコシステムは3,900以上のプロバイダー・23,600以上のモジュールを抱え、最新安定版はv1.12.2。

## 出典

- [What Is OpenTofu? 2026 Guide to the Open-Source Terraform Fork | Scalr](https://scalr.com/learning-center/what-is-opentofu)
- [OpenTofu vs Terraform in 2026: the fork finally diverged | Jorijn Schrijvershof](https://jorijn.com/en/blog/opentofu-vs-terraform-2026-the-fork-finally-diverged/)
