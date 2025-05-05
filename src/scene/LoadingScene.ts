import { resolutionText } from "constants/options";
import BaseScene from "scene/BaseScene";
import {
  DefaultHeight,
  DefaultWidth,
  MusicKey,
  SFXKey,
} from "constants/gameConst";
import { AddText } from "utils/text";

export default class LoadingScene extends BaseScene {
  constructor() {
    //scene key
    super("LoadingScene");
  }

  preload() {
    AddText({
      scene: this,
      x: DefaultWidth / 2,
      y: DefaultHeight / 2,
      text: "Loading...",
      depth: 0,
      size: 64,
    });

    this.load.audio(SFXKey.Click, "assets/sfx/click.mp3");
    this.load.audio(MusicKey.Bgm, "assets/music/bgm.mp3");
  }

  create(data: { settings: any }) {
    super.create(data);
    this.registry.set("settings", data.settings);

    setTimeout(() => this.scene.start("TitleScene"), 2000);

    const selectedResolution = resolutionText[this.currentResolutionIdx];

    this.electronAPI.send("resize-window", {
      width: selectedResolution[0],
      height: selectedResolution[1],
    });

    if (this.fullscreenFlag) {
      this.electronAPI.send("toggle-fullscreen", this.fullscreenFlag);
    }
  }

  update(): void {}
}
