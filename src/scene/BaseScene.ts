import { LocalizationManager } from "class/LocalizationManager";
import { SoundManager } from "class/SoundManager";
import Phaser from "phaser";

export default class BaseScene extends Phaser.Scene {
  public currentResolutionIdx: number; // see resolutionText(options.ts)
  public fullscreenFlag: boolean;
  public volume: { main: number; effect: number }; // 1 ~ 10

  public KeyCodes = Phaser.Input.Keyboard.KeyCodes;

  public electronAPI = (window as any).electronAPI;

  public keyboard: Phaser.Input.Keyboard.KeyboardPlugin;

  public webGLRenderer: Phaser.Renderer.WebGL.WebGLRenderer;

  public localization: LocalizationManager;
  public soundManager: SoundManager;

  constructor(key: string) {
    super({ key });
    this.localization = LocalizationManager.getInstance();
  }

  init() {
    if (this.renderer.type === Phaser.WEBGL) {
      this.webGLRenderer = this.renderer as Phaser.Renderer.WebGL.WebGLRenderer;
    }
  }

  preload() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(data?: any) {
    // Basic movements for all scenes

    if (this.input.keyboard) {
      this.keyboard = this.input.keyboard;
    }

    const settings = this.registry.get("settings");

    this.currentResolutionIdx = settings?.currentResolutionIdx ?? 1;
    this.fullscreenFlag = settings?.fullscreenFlag ?? false;
    this.volume = {
      main: settings?.volume?.main ?? 10,
      effect: settings?.volume?.effect ?? 10,
    };

    this.localization.setLanguage(settings?.currentLanguage || "en");

    this.soundManager = SoundManager.getInstance();
    this.soundManager.init(this);
    this.soundManager.setVolume(this.volume);
  }
}
