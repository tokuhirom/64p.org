---
created: 2026-08-15 14:19
updated: 2026-08-15 14:19
---
# ArduPlaneのQuadPlane・Tailsitter

ArduPlaneは固定翼機用のArduPilotファームウェア。QuadPlaneはその拡張機能で、固定翼機に垂直離着陸(VTOL)用のマルチコプターモータを追加した構成。Tailsitter（テールシッター）はQuadPlaneの一種で、機体全体（機首含む）を傾けてホバリングと水平飛行を切り替えるVTOL方式。

## Tailsitterの位置づけ

ArduPilotでは、機体を回転させて前進飛行とホバリングを切り替えるVTOL機はすべてTailsitterに分類され、Tailsitterは全てQuadPlaneの一種として扱われる。

- 有効化には`Q_FRAME_CLASS=10`または`Q_TAILSIT_MOTMX`を非ゼロに設定し、QuadPlaneコードにTailsitter用VTOLバックエンドを使わせる。
- `Q_TAILSIT_ENABLE`を`1`（多くのTailsitter向け）または`2`（エレボン等の舵面を持たないCopter Motor Only Tailsitter向け）に設定して有効化する。
- Vectored Tailsitter（ローターを機体と独立して傾けられ、推力ベクトルを制御できるタイプ）と、Non-vectored Tailsitter（ローターの向きが機体に対して固定で、ホバリング時の姿勢制御を大きな舵面に頼るタイプ）に大別される。

## [[mavlink]]との関係

QuadPlane・Tailsitterという機体構成は「機体がどう物理的に飛ぶか」を決める設定であり、MAVLinkは「その機体とGCS(地上局)間で情報をやり取りする通信規格」であって、両者はレイヤーの異なる別概念。ただし実運用では密接につながっており、QuadPlaneのフライトモード（QSTABILIZE, QHOVER, QLOITER, QLANDなど）は`GCS_MAVLink_Plane.cpp`でMAVLinkメッセージ（`SET_MODE`など）経由で切り替えられる。つまりTailsitterがVTOLとしてどう飛ぶかを決めるロジックはArduPlane内部にあるが、それをGCSから遠隔で監視・制御・パラメータ変更する窓口がMAVLinkということになる。

## 出典

- [Tailsitter Planes — Plane documentation](https://ardupilot.org/plane/docs/guide-tailsitter.html)
- [QuadPlane (VTOL) | ArduPilot/ardupilot | DeepWiki](https://deepwiki.com/ArduPilot/ardupilot/3.2.1-quadplane-(vtol))
- [ardupilot/ArduPlane/tailsitter.cpp](https://github.com/ArduPilot/ardupilot/blob/master/ArduPlane/tailsitter.cpp)

#ardupilot #drone #vtol
