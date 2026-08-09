---
created: 2026-08-09
updated: 2026-08-09
---
# Agent Plugins

#llm #mcp

2026年8月6〜8日にVercel・OpenAI・Amazon・Cursor・Microsoftが共同で発表した、AIエージェント向けの、パッケージのオープンでベンダー中立な仕様(v1.0.0)。その後Googleもコアメンテナーとして参画し、Linux Foundation傘下のAgentic AI Foundationが承認した。

## 解決する課題

各AIエージェントクライアント(Claude、ChatGPT、Cursorなど)ごとに、Skill・MCPサーバーのディレクトリ構造やマニフェスト形式がバラバラだったため、同じツールを複数プラットフォーム向けに個別メンテナンスする「fork and drift」状態が発生していた。Agent Pluginsはこれを1つの標準パッケージ形式に統一する。

## パッケージの中身

Next.jsに着想を得た「ファイルシステム＝設定」のアプローチを採用している。

- **`plugin.json`**: schemaとnameだけを含む最小限のコアマニフェスト
- **`skills/`ディレクトリ**: 再利用可能なタスク指示・リソース(Agent Skills)
- **`mcp.json`**: MCPサーバーの接続設定(transport typeを明示)
- **`com.example.client/`のような拡張ネームスペース**: 特定クライアント固有の非ポータブルな追加設定用

## 対応クライアント

VS Code, Cursor, GitHub Copilot, ChatGPT, Codex, Kiroの6クライアントが対応表明。Claude/AnthropicはこのコンソーシアムのメンテナーにもGoogle同様の対応クライアントにも名前が挙がっていない(Claude Codeは既に独自のplugin/skill機構を持っている)。

## あえて定義していないこと

v1はパッケージ「形式」だけに範囲を絞っており、以下は各クライアントの裁量に委ねられている。

- インストール方法・配布プロトコル
- パーミッションモデル・サンドボックス化
- 信頼検証・セキュリティ

## 業界内の議論

「skillsにMCPを付随させるべきか、MCPサーバー側にskillsを内包させるべきか(Skills Over MCP)」という代替アプローチも存在し、業界としてまだ一つのやり方に収束していない、という指摘もある。

## 補足

発表からまだ数日しか経っていない速報的な内容のため、今後仕様や対応クライアントの状況が変わる可能性がある。

## 出典

- [Agent Plugins package your skills, tools, and more - Google Developers Blog](https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/)
- ["Agent Plugins" standard might make devs' lives easier - Cybernews](https://cybernews.com/ai-news/agent-plugin-standard-openai-google-amazon/)
- [AI titans to tidy agent frontier with plugin prescription - DevClass](https://www.devclass.com/devops/2026/08/08/ai-titans-to-tidy-agent-frontier-with-plugin-prescription/5285044)
- [Amazon, Microsoft, OpenAI Ship Agent Plugins 1.0 - BigGo Finance](https://finance.biggo.com/news/287756f7-b7bb-4921-8ed7-85c509161fa6)
