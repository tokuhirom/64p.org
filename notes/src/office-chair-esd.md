---
created: 2026-08-09
updated: 2026-08-09
---
# オフィスチェアの静電気によるPCモニター暗転問題

#hardware #trivia

ガスシリンダー式のオフィスチェアに座る/立つ動作がきっかけで静電気放電(ESD)が発生し、それが電磁干渉(EMI)スパイクとしてビデオケーブルに乗り、モニター側の同期が一瞬失われて画面が真っ暗になる現象。

## メカニズム

椅子のクッション内部の素材と、近くにあるボルトやガスシリンダーなどの金属部品との組み合わせで静電気が発生する。「クッション→金属部品の隙間→静電気放電→ビデオケーブルへのEMI→同期喪失→画面暗転」という連鎖。

## 出典: Doug Smithの1993年の論文

元AT&T LabsのDoug Smithが1993年に発表した論文が元ネタ。ESD対策済みを謳う椅子でも約3分の1でこの現象が発生することを突き止めた。従来のESD対策手法ではこの現象を防げないことも確認している。

## 空港での目撃談

Smithは深夜2時頃、この現象で空港の航空管制機器がダウンするのを目撃したと述べている。もっと混雑する時間帯だったら深刻な事態になっていた可能性がある、とのこと。

## 簡易診断法

AMラジオを雑音(ノイズ)の周波数に合わせて椅子の下に置き、座る/立つ際にパチパチという音が入るかどうかで、その椅子がESDを発生させているか判定できる。

## 経緯

2020年頃、SNSで「立ち上がるとモニターが一瞬暗転する」動画がバイラルになった際、The Registerがこの1993年の論文を引いて解説した。

## 出典

- [Blame of thrones: Those viral vids of PC monitors going blank when people stand up? Static electricity from chairs - The Register](https://www.theregister.com/2020/01/09/office_chair_emissions/)
- [オフィスチェアの静電気によりPCモニターが真っ暗になる問題](https://ogitaka.com/2023/05/12/static-electricity-problem-in-office-chairs/)
