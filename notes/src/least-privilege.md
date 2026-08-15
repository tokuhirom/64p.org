---
created: 2026-08-12 13:40
updated: 2026-08-16 07:44
---
# 最小権限の原則

#security #access-control

Principle of Least Privilege (PoLP)。システム内のあらゆる主体（ユーザー・プロセス・プログラム）は、その正当な目的を果たすのに必要な最小限の権限だけで動作すべき、というセキュリティ設計原則。Jerome Saltzer が1974年に「Every program and every privileged user of the system should operate using the least amount of privilege necessary to complete the job.」と定式化し、1975年の Saltzer & Schroeder の論文 "The Protection of Information in Computer Systems" でセキュリティ設計原則の一つとして広まった。Peter Denning は障害耐性（fault tolerance）の側からも根本原則として位置づけている。

## なぜ効くのか

- **被害範囲（blast radius）の限定**: あるコンポーネントが侵害されても、そこが持つ権限以上のことはできない。脆弱性が他プロセスや全システムの侵害に波及するのを防ぐ。
- **検証しやすさ**: 権限が絞られたコードは影響範囲が限定されるため、動作や相互作用の検証がしやすい。
- **障害の封じ込め**: セキュリティに限らず、バグによる誤動作の影響も権限の範囲に閉じる。

## 実装パターン

- **権限の降格**: 特権で起動して初期化後に落とす古典パターン。Version 6 Unix の login.c がスーパーユーザーで起動し、不要になった時点で[[setuid-setgid|setuid()]]で降格していたのが古い実例。
- **privilege bracketing**: 権限が必要な瞬間だけ取得し、使い終わったら即座に手放す。
- **privilege separation**: 特権が必要な部分を別プロセスに分離し、大部分を無特権で動かす（OpenSSHの設計が代表例）。
- **アクセス制御モデルでの運用**: [[rbac|RBAC]] のロール設計やクラウドIAMのポリシーで「業務に必要な権限だけ」を割り当てる。[[apache-polaris|Apache Polaris]] の credential vending（テーブルのストレージパスだけにスコープした短命の認証情報を払い出す）もこの原則の実践。
- サンドボックス、コンテナ、[[seccomp]] のようなシステムコール制限も、プロセスの持つ能力を必要最小限に絞る手段と言える。

## [[linux-privilege-mechanisms]]の中での位置づけ

このノートは原則そのものを扱う。それを実際にLinux上で実装する各論(setuidの粗さ・[[linux-capabilities|capabilities]]による細粒度化・[[seccomp]]や[[landlock|Landlock]]によるシステムコール/リソース制限など)は[[linux-privilege-mechanisms]]配下の各ノートを参照。

## 限界

「最小」の厳密な定義が一つに定まらないこと、複雑なプログラムでは必要な権限集合を事前に予測するのが非現実的なことが知られている。実務上は「明らかに不要な権限を洗い出して削る」漸進的アプローチになりがちで、これが最小権限が「忘れられた原則」と呼ばれることもある所以。

## 出典

- [Saltzer and Schroeder's design principles — Security Reference Architecture](https://nocomplexity.com/documents/securityarchitecture/architecture/saltzer_designprinciples.html)
- [Principle of least privilege - Wikipedia](https://en.wikipedia.org/wiki/Principle_of_least_privilege)
- [Least Privilege and More (Fred B. Schneider)](https://www.cs.cornell.edu/fbs/publications/leastPrivSP.pdf)
