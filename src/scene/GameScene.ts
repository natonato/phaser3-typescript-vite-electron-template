import { TextureKey } from "constants/gameConst";
import BaseScene from "scene/BaseScene";
import { GrayscalePipeline } from "shader/GrayscaleShader";
import { smileSprite } from "utils/images";
import { AddText } from "utils/text";

export default class GameScene extends BaseScene {
  constructor() {
    super("GameScene");
  }

  init() {}

  preload() {
    this.load.image(TextureKey.Smile, smileSprite);
  }

  create() {
    super.create();

    if (this.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer) {
      this.renderer.pipelines.add(
        GrayscalePipeline.KEY,
        new GrayscalePipeline(this.game)
      );
    }

    AddText({
      scene: this,
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY,
      text: 'Game Scene.\n"Enter" key To TItle',
      size: 48,
      options: { align: "center" },
    });

    this.add
      .image(
        this.cameras.main.centerX - 400,
        this.cameras.main.centerY,
        TextureKey.Smile
      )
      .setFlipX(true);

    this.add
      .image(
        this.cameras.main.centerX + 400,
        this.cameras.main.centerY,
        TextureKey.Smile
      )
      .setPipeline(GrayscalePipeline.KEY);

    this.input.keyboard?.addKey("ENTER").on("down", () => {
      this.scene.start("TitleScene");
    });
  }

  update() {}
}
