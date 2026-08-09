---
created: 2026-08-09
updated: 2026-08-09
---
# ReDoS (Regular Expression Denial of Service)

[[regex-engine-backtracking-vs-nfa|バックトラッキング型]]の正規表現エンジンが持つ脆弱性。細工された入力文字列を与えることで、エンジンに指数関数的な時間がかかる探索（catastrophic backtracking）をさせ、CPUリソースを占有させるサービス拒否(DoS)攻撃。

## 発生条件

ある部分式が別の部分式を含み、それぞれに`*`・`+`・`*?`・`+?`・`{...}`のような量指定子が掛かっている場合に起こりやすい。

## 典型例: `(a+)+$`

`(a+)+$`という正規表現に、`"a"`を30個並べたあと非マッチな文字（例: `!`）を続けた入力を与えると、外側の`+`と内側の`+`の間で「aの並びをどう分割するか」の組み合わせが2^30（約10億）通り試され、実質的にハングする。

## 実例と影響

Node.jsのようなシングルスレッドのイベントループを持つ環境では、ReDoSでスレッドが占有されるとイベントループ全体がブロックされ、他の処理が一切進まなくなる。httplib2ライブラリが、悪意あるHTTPヘッダー内の長い空白文字列によってcatastrophic backtrackingを起こしフリーズした実例が報告されている。

## 対策

[[regex-engine-backtracking-vs-nfa|NFA/DFA型]]のエンジン（RE2、Rustの`regex`クレートなど）は原理的にReDoSが起こらないため、信頼できない入力を正規表現にかける場合の対策として採用されることがある。

#regex #security

## 出典

- [Regular expression Denial of Service - ReDoS | OWASP Foundation](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
- [Regular Expression Denial of Service (ReDoS) and Catastrophic Backtracking | Snyk](https://snyk.io/blog/redos-and-catastrophic-backtracking/)
