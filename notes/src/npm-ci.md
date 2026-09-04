---
created: 2026-09-04 15:12
updated: 2026-09-04 15:12
---
# npm ci

`package-lock.json`(または`npm-shrinkwrap.json`)に書かれた内容そのままを、クリーンな状態でインストールするnpmのサブコマンド。名前の通りCI環境向けに設計されており、`npm install`と違って「インストールの結果として依存関係が変わる」ことがない。

## npm install との違い

| | `npm install` | `npm ci` |
|---|---|---|
| lockfileの扱い | 出発点として使い、必要なら書き換える | 絶対に書き換えない(frozen) |
| `package.json` | 更新されうる(`npm i foo`など) | 書き換えない |
| lockfile必須か | 不要(無ければ生成する) | 必須。無ければエラー |
| `package.json`とlockfileの不一致 | 解決してlockfileを更新 | エラーで終了 |
| 既存の`node_modules` | 差分だけ更新 | 開始前に自動で丸ごと削除 |
| 個別パッケージ追加 | `npm i foo`でできる | できない |

要するに`npm ci`は「lockfileを唯一の入力とし、`package.json`のバージョン範囲(`^1.2.3`など)の解決を一切行わない」。依存解決フェーズをまるごとスキップするので、クリーンな環境でのインストールは`npm install`より速い。

## エラーで終了するのが効いてくる場面

`package.json`とlockfileが食い違っているとエラーになる、という挙動は地味に重要。誰かが`package.json`だけ手で編集してlockfileの更新を忘れた場合、`npm install`は黙って辻褄を合わせてしまうが、`npm ci`はCIで落ちて気づかせてくれる。

同じ発想は他のパッケージマネージャにもある。

- pnpm: `pnpm install --frozen-lockfile`
- Yarn v2+(Berry): `yarn install --immutable` (v1では`--frozen-lockfile`だったが非推奨になった)
- Cargo: `cargo build --locked` — 「ロックファイルが存在しない」「Cargoがロックファイルを変更しようとした」のどちらでもエラー終了する(`--frozen`は`--locked --offline`と等価)

## 使い分け

- **開発中** — `npm install`。パッケージを足したり、バージョン範囲を解決してlockfileを更新するのはこちら。
- **CI・本番ビルド・Dockerイメージ** — `npm ci`。lockfileの厳密なバージョンだけが入るので再現性がある。「ローカルでは動くがCIで壊れる」「CIでは通るが本番で壊れる」を防げる。

Dockerfileで使う場合、`node_modules`を毎回消す挙動と、`package*.json`だけ先にCOPYしてレイヤキャッシュを効かせる定番パターンは相性がよい。

```dockerfile
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
```

`--omit=dev`を付けると、全ライフサイクルスクリプトで`NODE_ENV`が`production`に設定される。

## 関連

- [[supply-chain-attack|サプライチェーン攻撃]]の観点でも、lockfileで厳密にバージョンを固定して`npm ci`で入れることは、意図しないバージョンの取り込みを減らす基本的な防御になる(ただしlockfile自体が汚染される攻撃は防げない)。
- [[vlt]]のようなnpm互換パッケージマネージャも、npmと同じコマンド体系を持つ以上この使い分けの発想を引き継いでいる。

#npm #javascript #package-manager #ci

## 出典

- [npm-ci | npm Docs](https://docs.npmjs.com/cli/v11/commands/npm-ci)
- [npm install vs. npm ci | Baeldung on Ops](https://www.baeldung.com/ops/npm-install-vs-npm-ci)
- [npm ci vs npm install: Which to Use in Your Build Pipeline](https://www.deployhq.com/blog/npm-ci-vs-npm-install)
- [cargo build - The Cargo Book](https://doc.rust-lang.org/cargo/commands/cargo-build.html)
- [pnpm install | pnpm](https://pnpm.io/cli/install)
