---
created: 2026-08-13 22:36
updated: 2026-08-13 22:36
---
# EDR (Endpoint Detection and Response)

#security

エンドポイント（サーバー・PC・モバイル端末など）に軽量なエージェントを常駐させて活動を継続的に記録・監視し、疑わしい挙動を検知して、調査・対応までを支援するセキュリティソリューション。従来のアンチウイルスが既知のマルウェアのシグネチャ照合を中心とするのに対し、EDRは挙動データをリアルタイムに記録・分析するため、ファイルレス攻撃や高度な標的型攻撃（APT）のような、シグネチャでは捕まえにくい攻撃の検出に強い。

## 主な機能

- **テレメトリ収集** — プロセスの起動、ファイル操作、ネットワーク接続、レジストリ変更などのエンドポイント活動を記録し続ける
- **振る舞い検知** — 挙動分析（behavioral analytics）や脅威インテリジェンスとの突合で疑わしい活動を検出しアラートを上げる
- **調査支援** — 攻撃の時系列や影響範囲をたどるためのデータとツールをアナリストに提供する。[[threat-hunting|脅威ハンティング]]の調査フェーズでも中心的なツールとなる
- **対応** — 侵害された端末のネットワーク隔離、プロセスの停止などをリモートで実行し、攻撃の横展開を止める

## 位置づけ

[[soc|SOC]]の運用では、EDRがエンドポイント層の検知・対応を担い、各種ログを横断的に相関分析する[[siem|SIEM]]と補完し合う。EDRの適用範囲をネットワーク・クラウド・メール等まで広げた発展形はXDR (Extended Detection and Response) と呼ばれる。

## 出典

- [What is EDR? | CrowdStrike](https://www.crowdstrike.com/en-us/cybersecurity-101/endpoint-security/endpoint-detection-and-response-edr/)
- [What Is EDR? | Microsoft Security](https://www.microsoft.com/en-us/security/business/security-101/what-is-edr-endpoint-detection-response)
- [Endpoint detection and response - Wikipedia](https://en.wikipedia.org/wiki/Endpoint_detection_and_response)
