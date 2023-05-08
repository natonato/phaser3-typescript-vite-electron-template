import scene2Img1 from "assets/sceneTwo/Scene2-1.png";
import scene2Img2 from "assets/sceneTwo/Scene2-2.png";

export default class SceneTwo extends Phaser.Scene {
  constructor() {
    //scene key
    super("scene2");
  }

  preload() {
    this.load.image("scene2Img1", scene2Img1);
    this.load.image("scene2Img2", scene2Img2);
  }

  create() {
    this.cameras.main.setBackgroundColor("#421278");

    const scene2Img1 = this.add.image(400, 300, "scene2Img1");
    const scene2Img2 = this.add.image(1400, 600, "scene2Img2");

    this.tweens.add({
      targets: scene2Img1,
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    });
    this.tweens.add({
      targets: scene2Img2,
      y: 750,
      duration: 500,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    });

    this.input.keyboard?.addKey("F").on("down", () => {
      this.scale.toggleFullscreen();
    });
  }

  update(time: number, delta: number): void {
    this.input.keyboard?.once("keydown-ENTER", () => {
      this.scene.start("scene1");
    });
  }
}
