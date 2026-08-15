---
created: 2026-08-11 16:46
updated: 2026-08-16 07:44
---
# LSM (Linux Security Modules) フレームワーク

Linuxカーネルのセキュリティ上重要な箇所（ファイルオープン・ネットワーク接続確立・capabilityチェックなど）にフックを配置し、そのフック関数が許可を返した場合にのみ操作を成功させる、というカーネル内フレームワーク。個々のセキュリティモジュールがこれらのフックにハンドラを登録して動作する。

[[yama-lsm|Yama]]や[[grsecurity]]（これは非マージのパッチセット）のような、カーネル本体を直接改造しないセキュリティ拡張機構の土台になっている。

## 経緯

2001年3月、NSA（米国家安全保障局）がLinux Kernel Summitで「SELinux」（柔軟できめ細かい強制アクセス制御をLinuxカーネルに実装したもの）を発表した。SELinuxは元々独自のカーネルパッチとして実装されていたが、汎用的なフレームワークが必要とされ、WireX社が中心となりLSMプロジェクトが始まった。Immunix・SELinux・SGI・Janusといった複数のセキュリティプロジェクトや、Greg Kroah-HartmanやJames Morrisらが共同で開発した。

## 代表的な実装

SELinux・AppArmor・Smack・TOMOYOなどが独立したLSM実装として存在する。多くはMAC（強制アクセス制御）ポリシーの実施エンジンを共有する。[[yama-lsm|Yama]]のように[[ptrace]]制限に特化した狭い機能のLSMや、[[landlock|Landlock]]のように非特権プロセスが自分自身に制限をかける自己サンドボックス型のLSMもある。

## スタッキング（複数LSMの同時利用）

Linuxの歴史の大半において、主要なセキュリティ判断（「exclusive」フック）を担うLSMは同時に1つしかロードできず、`CONFIG_DEFAULT_SECURITY`というビルド時設定でこれを制御していた。Linuxカーネル4.15以降、限定的な形でLSMスタッキングがサポートされるようになった。

- **スタック可能**: IMA・EVMのようなintegrity系モジュールや、capabilities・Yamaのようなcapability系モジュールは、exclusiveなセキュリティモジュールと重ねて使える
- **exclusive（排他的）**: AppArmorとSELinuxは、ほとんどのアクセス制御判断において互いに排他的。どちらか一方だけが主要なLSMになれる

#kernel #linux #security

## 出典

- [Linux Security Modules: General Security Hooks for Linux — The Linux Kernel documentation](https://docs.kernel.org/security/lsm.html)
- [Introduction to Linux Security Modules (LSMs) - KubeArmor Wiki](https://github.com/kubearmor/KubeArmor/wiki/Introduction-to-Linux-Security-Modules-(LSMs))
- [LSM stacking and the future [LWN.net]](https://lwn.net/Articles/804906/)
- [A change in direction for security-module stacking? [LWN.net]](https://lwn.net/Articles/970070/)
