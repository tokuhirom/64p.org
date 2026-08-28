---
created: 2026-08-28 15:01
updated: 2026-08-28 15:01
---
# SEI（Solid Electrolyte Interphase）

#hardware #battery #electrochemistry

リチウムイオン電池の負極表面に自然形成される、ナノメートル〜数十ナノメートル厚の被膜。電池が動くために不可欠な存在でありながら、劣化・[[lithium-ion-battery-swelling|膨張]]・容量低下の主犯でもある、という二面性を持つ。

## なぜできるのか

リチウムイオン電池の負極は、充電時に0.1V vs Li/Li⁺ 付近まで電位が下がる。この電位は有機電解液（カーボネート系溶媒＋LiPF₆などのリチウム塩）の還元分解が起きる領域で、熱力学的には電解液が分解し続けてしまう。

ところが分解生成物が負極表面に堆積して膜を作り、この膜が

- **リチウムイオンは通す**（イオン伝導性がある）
- **電子は通さない**（電子絶縁性）

という性質を持つため、それ以上の電解液分解を止める。これがSEI。電解質のように振る舞う固体の界面相、という意味の名前。

理想的なSEIの条件は、高いリチウムイオン伝導性・低い電子伝導性・高い熱的／機械的安定性。

## 組成と構造

不均質な混合物で、典型的には二層構造をとる。

- **内側（電極側）**: 緻密な無機層。Li₂O、LiF、Li₂CO₃、Li₃N、LiOH など。
- **外側（電解液側）**: 多孔質の有機層。アルキル炭酸リチウムのポリマー、セミカーボネート、ポリオレフィンなど。

負極電位が0.1Vを下回るような条件でこの二層構造がはっきり現れる。LiFはリチウム塩（LiPF₆）由来、Li₂CO₃は溶媒（EC等）由来といったように、生成経路がそれぞれ異なる。

## 初回充電と「化成（formation）」工程

SEIの形成には電解液とリチウムが消費される。このリチウムは正極から供給された分なので、**初回充電で使われたリチウムは戻ってこない**。これが初回サイクルの不可逆容量（first cycle irreversible capacity）で、電池のスペック上の容量を目減りさせる。

そのため製造工程では、出荷前に低レートで数サイクル充放電して意図的に良質なSEIを作り込む「化成（formation）」というステップを踏む。時間がかかり設備も要るため、リチウムイオン電池製造の中でもコストの大きい工程として知られる。

## 電解液添加剤でSEIを設計する

溶媒より先に還元される添加剤を少量混ぜ、SEIの組成を意図的にコントロールする手法が実用化されている。

- **VC（ビニレンカーボネート）** — 最も一般的。ECやPCより還元電位が高く（1.05〜1.4V vs Li/Li⁺）活性化エネルギーが低いため、溶媒が分解するより先に、そしてリチウムのインターカレーションが始まる前に、より安定なSEIを作り始める。3wt%程度の添加でサイクル寿命とクーロン効率が改善する。
- **FEC（フルオロエチレンカーボネート）** — LiFに富むSEIを作る。とくに[[silicon-anode-battery|シリコン負極]]で重視される。

2wt%程度のVCやFECを入れると、EC自体の還元が抑えられ、添加剤の方がSEI形成の主役になる。

## SEIが劣化を引き起こす側面

保護膜として働く一方、SEIは静的ではない。

- 充放電のたびに微小に成長し、厚くなり続ける。厚いSEIは内部抵抗を上げ、リチウムを消費し続ける。
- 形成・再形成の過程でCO₂・CO・炭化水素などのガスを副生する。パウチセルではこれが[[lithium-ion-battery-swelling|セルの膨張]]として現れる。
- 高電圧下ではリチウム塩の分解による酸性生成物がSEIを壊し、SEIの再形成→さらに電解液消費、という悪循環になる。
- [[silicon-anode-battery|シリコン負極]]では、粒子の300%の体積変化でSEIが割れて新しい表面が露出し、そこにまたSEIが作られる。SEIの制御がシリコン負極実用化の中心課題になっているのはこのため。

要するに、SEIをいかに「薄く・安定に・壊れないように」作るかがリチウムイオン電池の寿命設計そのものになっている。

## 出典

- [Formation mechanisms of solid electrolyte interphase and its influence on lithium battery performance (ScienceDirect)](https://www.sciencedirect.com/science/article/abs/pii/S2468606925003326)
- [Knowledge-driven design of solid-electrolyte interphases on lithium metal via multiscale modelling (Nature Communications)](https://www.nature.com/articles/s41467-023-42212-7)
- [Review on modeling of the anode solid electrolyte interphase (SEI) for lithium-ion batteries (npj Computational Materials)](https://www.nature.com/articles/s41524-018-0064-0)
- [The state of understanding of the lithium-ion-battery graphite SEI and its relationship to formation cycling (ScienceDirect)](https://www.sciencedirect.com/science/article/pii/S0008622316302676)
- [Ionic conductivity and mechanical properties of the SEI in lithium metal batteries (Energy Materials)](https://www.oaepublish.com/articles/energymater.2022.65)
