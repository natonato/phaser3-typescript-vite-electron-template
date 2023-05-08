import SceneOne from "scene/SceneOne";
import SceneTwo from "scene/SceneTwo";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: screen.width,
    // height: screen.height,
    width: 1920,
    height: 1080,
    fullscreenTarget: "phaser-id",
  },

  scene: [SceneOne, SceneTwo],
};
