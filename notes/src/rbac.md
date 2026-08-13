---
created: 2026-08-12 13:38
updated: 2026-08-14 08:21
---
# RBAC (Role-Based Access Control)

#security #access-control

ロールベースアクセス制御。ユーザーに権限を直接付与するのではなく、「ロール」（職務・役割）に権限を束ね、ユーザーにはロールを割り当てるアクセス制御モデル。ユーザーの入退社・異動のたびに個別権限を付け替える代わりにロールの付け替えだけで済むため、管理コストが下がり、[[least-privilege|最小権限の原則]]や職務分掌（separation of duties）を実施しやすい。

## 歴史

役割ベースの権限管理自体は1970年代から商用アプリケーションに存在したが、汎用モデルとして定式化したのは Ferraiolo と Kuhn による1992年の論文（NIST）。従来の MAC（強制アクセス制御）・DAC（任意アクセス制御）に代わる第3のモデルとして、ロール・ロール階層・ユーザー/ロール割り当て・制約を集合と写像で形式的に定義した。1996年の Sandhu らのフレームワークと統合された「NIST RBACモデル」が2000年に発表され、2004年に ANSI/INCITS 359 として標準化された。

## 他のアクセス制御モデルとの比較

- **ACL (Access Control List)**: リソースごとに「誰が何をできるか」を列挙する最も素朴な方式。ユーザーとリソースが少なければ単純で分かりやすいが、規模に対してスケールしない。
- **RBAC**: ロールという抽象を挟むことでスケールする。弱点は **role explosion** — きめ細かい権限要件に応えようとするとロールが数百に増殖し、結局個別管理並みに複雑化する。
- **ABAC (Attribute-Based Access Control)**: ユーザー・リソース・環境の属性（部署・時刻・場所・デバイス等）をポリシー式で評価して動的に判定する。「マネージャー全員」ではなく「財務部のマネージャーだけ」のような条件が書ける。柔軟だが評価コストと複雑さが高い。
- **MAC / DAC**: OSレベルの伝統的モデル。Linux では SELinux などが [[linux-security-modules|LSM]] フレームワーク上で MAC を実装している。

## 採用例

[[kubernetes|Kubernetes]] の RBAC（Role/ClusterRole と RoleBinding）、各クラウドの IAM、Envoy の RBAC フィルタなど、インフラ系ソフトウェアの権限管理のデファクト。データレイクハウスのカタログ [[apache-polaris|Apache Polaris]] も principal に対するロールベースの権限管理を中核機能にしている。近年は「RBACで大枠を決め、細かい条件は [[common-expression-language|CEL]] のような式言語やABAC的な属性条件で補う」ハイブリッド構成も多い。

## 出典

- [Role-Based Access Controls (Ferraiolo & Kuhn, 1992)](https://csrc.nist.gov/files/pubs/conference/1992/10/13/rolebased-access-controls/final/docs/ferraiolo-kuhn-92.pdf)
- [Role Based Access Control FAQs | NIST CSRC](https://csrc.nist.gov/projects/role-based-access-control/faqs)
- [RBAC vs. ABAC vs. ACL vs. PBAC vs. DAC | StrongDM](https://www.strongdm.com/blog/rbac-vs-abac)
