---
created: 2026-08-15 23:41
updated: 2026-08-15 23:41
---
# QRコードフィッシング (Quishing)

メール本文にQRコードを画像として埋め込み、受信者にスマートフォン等で読み取らせることでフィッシングサイトへ誘導する攻撃手法。「Quishing」(QR + phishing)とも呼ばれる。URLを本文中にテキストとして書かないため、リンク文字列をスキャンする従来型のメールセキュリティフィルタをすり抜けやすい。

## 2026年の観測動向 (Microsoft脅威レポートより)

Microsoftの脅威レポート(Q2 2026)によれば、QRコードフィッシングは2026年3月に月間1,870万件でピークを迎えた後、Q2を通じて減少し、6月には830万件(2025年半ば頃の水準)まで戻った。

配信形式は月ごとに変化している。

- 2026年4月時点ではPDF添付が主流(79%)だったが、6月にはDOC/DOCX形式が40%まで増加し、PDFは58%に低下。
- メール本文に直接QR画像を埋め込む手法は2026年3月に前月比336%と急増したが、6月にはほぼ消滅した。

## CAPTCHAゲートフィッシング

同時期、偽のCAPTCHA認証画面を経由させてから偽サイトへ誘導する「CAPTCHAゲートフィッシング」も観測されている。2026年3月の1,200万件から6月には220万件まで、81%以上減少し過去1年で最低水準になった。配信形式もPDF中心(4月63%)からHTML/SVG/URL直書き(6月にはメール埋め込みURLが初めて首位、30%)へと急速に変化している。

## AIによる自動化

2026年6月には、3時間以内に67,000ユーザー・42,000組織を狙ったBEC(ビジネスメール詐欺)キャンペーンが観測された。Pythonライブラリでメール文面を自動生成し、Amazon SES APIで配信、開封追跡ピクセルで反応を監視して自動フォローアップする仕組みだったという。

## [[dmarc|DMARC]]/[[bimi|BIMI]]との関係

DMARCやBIMIのような送信ドメイン認証は「ドメインのなりすまし」を防ぐものであり、正規のドメイン・アカウントから送られる添付ファイル内のQRコードや、乗っ取られた正規アカウントからの配信には効果が及ばない。これらの攻撃はドメインレベルの認証というより、添付ファイルやリンク先コンテンツの解析・検知が対策の主眼になる。

## 出典

- [Email threat landscape: Q2 2026 trends and insights | Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/07/23/email-threat-landscape-q2-2026-trends-and-insights/)
- [Email threat landscape: Q1 2026 trends and insights | Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/04/30/email-threat-landscape-q1-2026-trends-and-insights/)

#phishing #security #email #ai
