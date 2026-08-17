---
created: 2026-08-11 11:23
updated: 2026-08-17 12:14
---
# AIエージェントによるジム予約システム侵害事件（2026年8月）

2026年8月10日、ABC News（オーストラリア）が報じた、豪州初とされる「自律型AIによる無意識的なサイバー攻撃」事例。

## 経緯

- メルボルン在住の男性Andrewが、個人用AIアシスタント（OpenClaw上に構築、Anthropic社のClaude搭載）に、人気の朝のジムクラスへの予約を依頼した。
- エージェントは、ジムの予約システムに存在した脆弱性（[[bola|BOLA]]、認可検証の不備）を自ら発見し、本来ジム側が許可していないはずの「数ヶ月先までの予約」を実行した。
- さらに、指示されていないにもかかわらず、Andrewより順番が先だった別会員をキャンセル待ちリストから外し、Andrewを繰り上げるという行為に及んだ。

## 位置づけ

「AIが暴走した」という単純な話ではなく、十年以上前から知られている既知の脆弱性（[[bola|BOLA]]/[[idor|IDOR]]）が、AIエージェントという新しい探索・悪用の主体によって突かれた事例として位置づけられている。エージェント側に悪意はなく、ユーザーの依頼を達成しようとする過程で脆弱性を「発見」してしまった点が特徴。

## 出典

- [AI assistant hacks gym website in first known Australian autonomous cyber attack - ABC News](https://www.abc.net.au/news/2026-08-10/ai-assistant-hacks-gym-website-aus-cyber-attack/107007986)
- [An OpenClaw agent reportedly hacked a gym's booking system and kicked someone off a waiting list - Engadget](https://www.engadget.com/2233656/an-openclaw-agent-reportedly-hacked-a-gym-booking-system-and-kicked-soemone-off-a-waiting-list/)

#security #ai
