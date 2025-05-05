import TitleScene from "scene/TitleScene";
import { DefaultHeight, DefaultWidth } from "constants/gameConst";
import OptionScene from "scene/OptionScene";
import BaseScene from "scene/BaseScene";
import LoadingScene from "scene/LoadingScene";
import GameScene from "scene/GameScene";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DefaultWidth,
    height: DefaultHeight,
    fullscreenTarget: "phaser-id",
  },
  render: {
    pixelArt: true,
    antialias: false,
  },
  preserveDrawingBuffer: true,
  scene: [LoadingScene, TitleScene, OptionScene, GameScene, BaseScene],
  autoFocus: true,
};
