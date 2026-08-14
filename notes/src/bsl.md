---
created: 2026-08-14 11:43
updated: 2026-08-14 11:43
---
# BSL (曖昧さ回避)

「BSL」という略称は、由来の異なる複数のソフトウェアライセンスを指して使われており、文脈で判別する必要がある。

- [[business-source-license|Business Source License]]（SPDX識別子: `BUSL-1.1`）— MariaDB社が考案したsource-availableライセンス。本番利用を制限しつつ最長4年の時限式でOSSへ変わる。[[hashicorp|HashiCorp]]・CockroachDBなどが採用
- [[boost-software-license|Boost Software License]]（SPDX識別子: `BSL-1.0`）— Boost C++ Libraries向けに2003年公開されたOSI承認のパーミッシブライセンス

## 名称衝突とSPDXでの扱い

Boost Software LicenseがBSL-1.0として先に定着していたため、SPDXは後発のBusiness Source Licenseに`BUSL-1.1`という識別子を割り当てて区別している。しかし実務では今も多くのプロジェクトが単に「BSL」「BSL 1.1」とだけ表記しており、混同の原因になっている（例: dragonflydbのLICENSE.mdが`BSL-1.1`と表記していたのに対し、SPDXは`BUSL-1.1`を割り当てていた事例）。

## 出典

- [Business Source License 1.1 | SPDX](https://spdx.org/licenses/BUSL-1.1.html)
- [Boost Software License 1.0 | SPDX](https://spdx.org/licenses/BSL-1.0.html)
- [LICENSE.md lists license as BSL-1.1 while SPDX assigned it BUSL-1.1 · Issue #2758 · dragonflydb/dragonfly](https://github.com/dragonflydb/dragonfly/issues/2758)
