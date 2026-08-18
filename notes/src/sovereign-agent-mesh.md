---
created: 2026-08-19 08:34
updated: 2026-08-19 08:34
---
# Sovereign Agent Mesh (SAM)

#llm #mcp #ネットワーク

Googleが公開している、自律型AIエージェント向けのゼロコンフィグ・ゼロトラストなP2Pネットワーク基盤(Apache-2.0)。リポジトリは[google/sam](https://github.com/google/sam)。README上で「公式にサポートされたGoogleプロダクトではない」と明記されている。

## 解決しようとしている課題

AIエージェントは、クラウドサーバー・オンプレのデータセンター・ノートPC・Raspberry Pi・Androidデバイスなど、バラバラの場所で動くようになっている。これらの間でツール([[agent-plugins|MCPサーバー]]など)を共有しようとすると、従来はローカルスクリプトやLLM推論エンドポイント、社内APIをインターネットに公開せざるを得なかった。

SAMはこの課題に対して、「エージェント間のMCPツール共有に特化した、私設VPNに近いゼロトラストP2Pオーバーレイ」というアプローチを取る。

## Zero Config / Zero Trust

- **Zero Config**: 軽量ノード(`sam-node`)が自動的にお互いを発見し、NATを越えて自己修復するP2Pネットワークを構築する。手動設定は不要。
- **Zero Trust**: すべての接続・ノード・パケットが暗号的に認証される。暗号化IDにより、クラウド・ローカル・エッジ環境間でノードがシームレスに移動できる。

## アーキテクチャ構成要素

- **`sam-control-plane`**: ノードのID登録、認可ポリシー、ルーター調整を行うレジストリ制御プレーン。
- **`sam-router`**: libp2pのブートストラップノードとリレー。データプレーンの接続と転送を担当。
- **`sam-node`**: ローカルで動くノードクライアント。メッシュのtransport統合とMCPサイドカールーティングを提供する。

Google Gemini・ClaudeなどのAIエージェントと連携でき、メッシュ全体で動的にツールを発見・呼び出しできる。公開テストネット(`bananas.sam-mesh.dev`)でクイックスタートでき、本番運用はKubernetes上でプレーンmanifestか`sam-mesh` Helm chartを使う。

## 相互接続の具体的なユースケース

- クラウドをまたいだMCPツール共有
- オンプレ⇔クラウドのハイブリッドなエージェント呼び出し
- 推論エンドポイントのブローカリング(複数拠点にあるLLM推論の仲介)
- 資格情報を注入したサンドボックス化エージェント
- Warm Agent Pool(待機中のエージェントをプールしておき、必要な時に即座に呼び出す)

## 出典

- [google/sam - GitHub](https://github.com/google/sam)
- [Meet SAM (Sovereign Agent Mesh): A Zero-Config, Zero-Trust P2P Network for AI Agents - MarkTechPost](https://www.marktechpost.com/2026/08/18/meet-sam-sovereign-agent-mesh-a-zero-config-zero-trust-p2p-network-for-ai-agents/)
- [sam-mesh.dev](https://sam-mesh.dev/)
