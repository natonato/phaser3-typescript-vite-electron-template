import {
  DefaultWidth,
  ImageKey,
  JSONKey,
  MusicKey,
  SFXKey,
} from "constants/gameConst";
import BaseScene from "scene/BaseScene";
import { wrap } from "utils/utils";
import { AddText } from "utils/text";
import { title } from "utils/images";

export default class TitleScene extends BaseScene {
  private menuItems: {
    text: Phaser.GameObjects.Text;
  }[];
  private selectedOption: number = 0; // 0: Start, 1: Exit
  private enterKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    //scene key
    super("TitleScene");
  }

  init() {}

  preload() {
    // load JSON file
    this.localization.loadJson(this, [JSONKey.UI]);

    this.load.image(ImageKey.Title, title);
  }

  create() {
    super.create();

    // load JSON data
    this.localization.loadLocalization(this, [JSONKey.UI]);

    this.menuItems = [];
    this.selectedOption = 0;

    this.add.image(0, 0, ImageKey.Title).setOrigin(0);

    // 언어별로 텍스트 설정
    [
      this.localization.getText(JSONKey.UI, "startGame"),
      this.localization.getText(JSONKey.UI, "options"),
      this.localization.getText(JSONKey.UI, "exitGame"),
    ].forEach((menuText, index) => {
      this.menuItems.push({
        text: AddText({
          scene: this,
          x: DefaultWidth / 2,
          y: 450 + index * 200,
          text: menuText,
          size: 40,
          color: index === 0 ? "#efdf00" : "#ffffff",
        }).setInteractive(),
      });
    });

    // 키보드 입력 설정
    // 방향 키 이벤트
    const keyboardEvent = this.keyboard.createCursorKeys();
    keyboardEvent.up.on("down", () => this.changeSelection(-1));
    keyboardEvent.down.on("down", () => this.changeSelection(1));

    // 엔터 키 이벤트
    this.enterKey = this.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enterKey.on("down", () => this.selectOption());

    this.menuItems.forEach((menu, idx) => {
      menu.text.on("pointerover", () => {
        this.menuItems[this.selectedOption].text.setColor("#ffffff");
        this.selectedOption = idx;
        this.menuItems[this.selectedOption].text.setColor("#efdf00");
      });
      menu.text.on("pointerup", () => {
        this.selectOption();
      });
    });

    this.soundManager.playMusic(MusicKey.Bgm);
  }

  update(): void {}

  // 선택 변경
  private changeSelection(direction: number): void {
    // 현재 선택된 항목 색상 초기화
    this.menuItems[this.selectedOption].text.setColor("#ffffff");

    // 새 선택 항목 계산
    this.selectedOption = wrap(
      this.selectedOption + direction,
      0,
      this.menuItems.length
    );

    // 새 선택된 항목 강조
    this.menuItems[this.selectedOption].text.setColor("#efdf00");
  }

  // 옵션 선택 처리
  private selectOption(): void {
    this.soundManager.playSFX(SFXKey.Click, {}, () => {
      switch (this.selectedOption) {
        case 0:
          this.scene.start("GameScene");
          break;
        case 1:
          this.scene.start("OptionScene");
          break;
        case 2:
          this.game.destroy(true);
          window.close(); // Exit Electron
          break;
      }
    });
  }
}
