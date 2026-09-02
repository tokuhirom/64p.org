---
created: 2026-09-02 15:59
updated: 2026-09-02 15:59
---
# llms.txt

Webサイトが「LLM/AIエージェントに読ませたいドキュメントの目次」をMarkdownで置くための提案仕様。2024年9月3日にJeremy Howard(fast.ai / Answer.AI)が提案し、2026年8月10日にv2へ更新された。仕様は[llmstxt.org](https://llmstxt.org/)にある。

RFCでもW3C標準でもなく、あくまで個人発の提案である点に注意。`robots.txt`のような「クローラーが自動で取りに来る」慣習はまだ確立していない(後述)。

## 動機

HTMLページはナビゲーション・広告・JavaScriptなどのノイズが多く、コンテキストウィンドウの限られたLLMにとって効率が悪い。そこで「このサイトの重要なドキュメントはここにある」という機械可読なインデックスをMarkdownで提供する、という発想。[[ai-friendly-cli-design|AI friendlyなCLIの作り方]]がCLIをエージェントの一級ユーザーとして扱う話だとすれば、こちらはドキュメントサイト側の同じ問題意識にあたる。

## フォーマット

Markdownで、構造は以下の通り。

```markdown
# プロジェクト名

> 一行〜数行の要約(blockquote)

補足の段落やリスト(任意)

## Docs

- [ページ名](https://example.com/docs/foo.md): 短い説明
- [別のページ](https://example.com/docs/bar.md): 短い説明

## Optional

- [優先度の低い資料](https://example.com/appendix.md)
```

H1タイトルとblockquoteの要約、H2で区切ったリンク集という構成。`## Optional`セクションは「コンテキストが足りなければ省いてよい」という意味付けを持つ。

## 配置場所

v2で「サイトのルート、またはその中の任意のパスに置ける」と明記された。そのファイルは配置先のパス配下のURLをカバーし、複数該当する場合は**最も具体的なもの**を使う。

つまり`https://example.com/foo/bar/llms.txt`という置き方は仕様上正しい。ただし仕様がそう定めているだけで、それを巡回して探しに行くクローラーは実質存在しないので、置いただけでは何も起きない。

## llms-full.txt

全ドキュメントを1つのMarkdownファイルに連結したもの。**これは仕様には存在しない**。Mintlifyなどのドキュメントプラットフォームが自動生成し始めて事実上の慣行になったもので、llmstxt.orgの仕様文書には記述がない。

- `llms.txt` — 目次(タイトル・URL・短い説明)。エージェントがここを見てから個別ページを取りに行く。
- `llms-full.txt` — 全文。200Kトークン級のコンテキストを持つツールなら丸ごと突っ込める。

実務では後者を`@Docs`等に登録して使うケースの方が多い印象。

## 実際に読んでいるエージェントはほぼいない

これが一番重要な点。2026年時点で、主要なAIクローラー・エージェントで「llms.txtを自動的に探して読む」と公式にコミットしているものは無い。

Ahrefsが2026年5月に137,210ドメインを調査した結果:

- 28%のドメインがllms.txtを公開していた
- **97%のファイルは月間アクセスがゼロ**
- アクセスがあった3%についても、内訳の上位はSEO監査ツール21.7%、一般ウェブクローラー13.1%、技術プロファイリング11.6%
- AI関連ボットは合計19.5%。内訳はAIエージェント/インフラ10.5%、GPTBot 4.51%、AI補助ツール2.5%、PerplexityBot等の検索1.1%、ClaudeBot 0.8%

GoogleのJohn Muellerは2025年6月にBlueskyで「FWIW no AI system currently uses llms.txt」と述べ、2026年6月2日にも「purely speculative for now(ファイルは何年も存在しているのにどのAIシステムも使っていない — それが何を意味するか)」と繰り返している。Googleは AI Overviews でllms.txtを参照せず通常のSEOで評価するという立場で、代替としてWebMCP(ブラウザ内でWebサイトがエージェントにツールを公開する提案)を挙げている。

一方で、OpenAI・Anthropic・Googleはいずれも自社ドキュメントでllms.txtを**公開はしている**。「出すが読まない」という非対称な状況になっている。

## 機能する使い方: 明示的にURLを渡す

自動発見はされないが、人間やエージェントが明示的にURLを指定した場合は普通に機能する。現状これが唯一の実用的な使いどころ。

- Cursor / Windsurf の`@Docs`に`llms-full.txt`のURLを登録する
- Claude CodeのようなCLIエージェントに「このURLのllms.txtを読んで」と渡す(WebFetchで素直に取れる)
- Context7のようなドキュメント提供MCPサーバーが裏でこれを取得する([[agent-plugins|Agent Plugins]]の`mcp.json`経由で配布されるものを含む)

Anthropic・Stripe・Cursor・Cloudflare・Vercel・Supabase・LangGraphあたりがllms.txtを整備しているのは、SEO的な効果を期待してというより、この「ドキュメントをLLMが食べやすい形で提供するエンドポイント」としての用途と考えるのが妥当。

## 考えたこと

「受動的に置いておけばクローラーが優遇してくれるメタデータ」として捉えると空振りする。metaキーワードタグと同じ運命を辿りかねない、というMuellerの比較はその文脈では的を射ている。

一方、能動的に指定される前提の「LLM向けドキュメント配信フォーマット」として見ると、実装コストの割に効果がはっきりしている。自分のプロダクトのドキュメントサイトに置くなら、SEOのためではなく「利用者が自分のエージェントに食わせるため」と割り切るのが良さそう。

#llm #ai-agent #documentation

## 出典

- [The /llms.txt file - llmstxt.org](https://llmstxt.org/)
- [We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read - Ahrefs](https://ahrefs.com/blog/llmstxt-study/)
- [Google Says No AI System Currently Uses LLMs.txt - Search Engine Roundtable](https://www.seroundtable.com/google-ai-llms-txt-39607.html)
- [Google says normal SEO works for ranking in AI Overviews and LLMS.txt won't be used - Search Engine Land](https://searchengineland.com/google-says-normal-seo-works-for-ranking-in-ai-overviews-and-llms-txt-wont-be-used-459422)
