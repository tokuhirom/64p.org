---
created: 2026-08-21 07:57
updated: 2026-08-21 07:57
---
# arrayref Rustクレート ビルド時マルウェア混入事件（2026年）

https://x.com/DerkiesAd001/status/2090571819275452861

## 何が起きたか

2026年8月20日、Rustの配列参照マクロを提供する人気クレート`arrayref`のバージョン0.3.10が、悪意あるコードを含んだ状態でcrates.ioに公開された(後にcrates.ioチームが削除)。`arrayref`自体は正規のライブラリだが、0.3.10のマニフェストに以下の依存が追加されていた。

```toml
[dependencies.proc-macro1]
version = "1.0.107"
```

`proc-macro1`は正規の`proc-macro2`に似せたtyposquatting crateで、他にも`proc-macro-en`・`aovine`・`arone`・`aronenao`・`tinymember`といった補助的な悪意あるクレートが関与していた。

### 攻撃手口: build.rsの強制実行

Cargoは宣言された依存関係を、実際にコード中で使われているかどうかに関わらずすべてビルドする。そのため`arrayref`に依存を追加するだけで、`proc-macro1`の`build.rs`(ビルドスクリプト)が強制的に実行される。

`proc-macro1` 1.0.107の`build.rs`は以下を行う。

1. base64フラグメントとして埋め込まれたペイロード配布サーバー`23.254.165.112:9089`とC2アドレス`23.254.165.112:443`を実行時に再構築(難読化)
2. `rustls`と`ureq`でTLS通信しバイナリを取得。証明書検証を無視する`AcceptAll`検証器を実装しており、中間者的な検査を素通りする
3. プラットフォーム別に実行:
   - Linux/macOS: `/tmp/rust-setup`にバイナリを書き込み実行権を付与して実行
   - Windows: PowerShellスクリプトを`%TEMP%`に書き込み、VBScriptランチャー経由で起動してプロセスを分離。`ShellExecute` via `WScript`はCargoのジョブオブジェクトから逃れるため、ビルド完了後もペイロードが生き残る

### 拡散のための工作

攻撃者は0.3.5〜0.3.9をyank(取り下げ)し、非yank版が0.3.10のみになるよう仕向けた。Cargoはyank版使用時に警告を出すため、この警告に従って更新したユーザーが結果的に悪意あるバージョンへ誘導される構造になっていた。RustSecアドバイザリの報告者もこの警告に従って0.3.10へ更新した際に悪意を検知している。

### 影響範囲

`arrayref`は全期間で約2億4,500万ダウンロード(正規の0.3.9だけで約1億5,200万)。`tiny-skia`・`sctk-adwaita`・`winit`を経由して依存グラフの深い位置に存在するため、egui・eframe・icedなど[[rust-gui-libraries|RustのGUIライブラリ]]を使うプロジェクトに広く波及した。

### 検出指標(IOC)

- ネットワーク: `23.254.165.112`のポート9089/443
- ファイル: `/tmp/rust-setup`(Unix)、`%TEMP%\rust-setup.ps1`(Windows)

## 考えたこと

`build.rs`はコンパイル前・feature flagやコードレビューの手前で任意コードを実行できる、Cargoのエコシステム設計上の穴だと感じる。npmの`postinstall`スクリプト問題と本質的に同じ構図で、パッケージマネージャが「依存を宣言したら任意コード実行が付いてくる」設計を採用している限り、ソースコード上のdiffレビューだけでは防げない。[[vlt]]が謳う「installと打つだけで何も勝手に実行されない設計」は、まさにこの種の攻撃への直接的な対抗策になっている。

また、yankを使ってユーザーを悪意あるバージョンへ誘導する手口は、Cargo自体の「安全側に倒すための警告UI」を逆手に取っている点が興味深い。ツールの安全機能そのものを攻撃経路に組み込む発想は、[[openssf|OpenSSF]]のScorecardのような自動スコアリングだけでは検知しづらく、[[owasp-top-10|OWASP Top 10:2025]]がA03「Software Supply Chain Failures」を独立カテゴリとして格上げした背景がよく分かる事例だと思う。

[[supply-chain-attack|サプライチェーン攻撃]]の中での位置づけ: 取引先経由で物理的な生産ラインが止まる[[kojima-press-ransomware-2022|小島プレス工業の事案]]とは異なり、OSSの依存関係グラフというソフトウェア内部の供給網が攻撃対象になった事例。

#security #rust #supply-chain-attack

## 出典

- [Arrayref proc-macro1 Rust Build Time Malware - SafeDep](https://safedep.io/arrayref-proc-macro1-rust-build-time-malware/)
