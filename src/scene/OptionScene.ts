import { JSON_LOAD_EVENT } from "class/LocalizationManager";
import {
  DefaultHeight,
  DefaultWidth,
  JSONKey,
  SFXKey,
} from "constants/gameConst";
import { OptionMenuKey, TOptionMenuText } from "constants/localization";
import { fullscreenText, resolutionText } from "constants/options";
import BaseScene from "scene/BaseScene";
import { AddText } from "utils/text";
import { wrap } from "utils/utils";

interface OptionItem {
  key: keyof TOptionMenuText;
  text: Phaser.GameObjects.Text;
}

export default class OptionScene extends BaseScene {
  private selectedIndex: number = 0;
  private options: OptionItem[] = [];
  private optionValues: Phaser.GameObjects.Text[] = [];
  private clickSound:
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound
    | Phaser.Sound.WebAudioSound;

  private optionMenus = [
    OptionMenuKey.resolution,
    OptionMenuKey.fullscreen,
    OptionMenuKey.languageSelect,
    OptionMenuKey.mainVolume,
    OptionMenuKey.effectVolume,
    OptionMenuKey.returnToTitle,
  ];
  // private keyboard?: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("OptionScene");
  }

  preload() {
    // JSON 파일 로드
    this.localization.loadJson(this, [JSONKey.UI]);
  }

  create() {
    super.create();

    // JSON 데이터 불러오기
    this.localization.loadLocalization(this, [JSONKey.UI]);

    this.options = [];
    this.optionValues = [];
    this.selectedIndex = 0;

    const startMenuX = (DefaultWidth * 2) / 5;
    const startY = DefaultHeight / 4;

    const startValueX = (DefaultWidth * 3) / 5;

    // 옵션 메뉴 초기화
    this.options = this.optionMenus.map((key, index) => {
      return {
        key: key,
        text: AddText({
          scene: this,
          x: startMenuX,
          y: startY + index * 100,
          text: this.localization.getText(JSONKey.UI, key),
          size: 32,
        }),
      };
    });

    [
      `${resolutionText[this.currentResolutionIdx][0]} * ${
        resolutionText[this.currentResolutionIdx][1]
      }`,
      fullscreenText[this.fullscreenFlag ? 0 : 1],
      this.localization.getText(JSONKey.UI, "languageText"),
      `${this.volume.main}`,
      `${this.volume.effect}`,
    ].map((val, idx) => {
      this.optionValues.push(
        AddText({
          scene: this,
          x: startValueX,
          y: startY + idx * 100,
          text: val,
          size: 32,
        })
      );
    });

    // 첫 진입시 설정
    this.updateSelection();
    this.updateText();

    // 키 입력 등록
    this.keyboard.on("keydown-UP", () => this.navigateOptions(-1));
    this.keyboard.on("keydown-DOWN", () => this.navigateOptions(1));
    this.keyboard.on("keydown-LEFT", () => this.changeOption(-1));
    this.keyboard.on("keydown-RIGHT", () => this.changeOption(1));
    this.keyboard.on("keydown-ENTER", () => this.selectOption());

    // phaser 전체화면 처리
    this.electronAPI.on(
      "fullscreen-changed",
      (_: any, isFullScreen: boolean) => {
        if (isFullScreen && !this.scale.isFullscreen) {
          this.scale.startFullscreen();
        } else if (!isFullScreen && this.scale.isFullscreen) {
          this.scale.stopFullscreen();
        }
      }
    );

    if (!this.clickSound) {
      this.clickSound = this.sound.add(SFXKey.Click);
    }
  }

  update(): void {}

  // 위아래 키 이벤트
  private navigateOptions(direction: number): void {
    this.selectedIndex = wrap(
      this.selectedIndex + direction,
      0,
      this.options.length
    );
    this.updateSelection();
  }

  // 스타일 업데이트
  private updateSelection(): void {
    this.options.forEach(({ text }, index) => {
      text.setStyle({
        color: index === this.selectedIndex ? "#ffff00" : "#ffffff",
      });
    });
  }

  // 좌우 키 이벤트
  private changeOption(direction: number): void {
    // selectedIndex 값에 따라 분기
    this.soundManager.playSFX(SFXKey.Click);

    // 해상도 변경
    if (this.selectedIndex === 0 && !this.fullscreenFlag) {
      this.currentResolutionIdx = wrap(
        this.currentResolutionIdx + direction,
        0,
        resolutionText.length
      );

      const selectedResolution = resolutionText[this.currentResolutionIdx];

      this.electronAPI.send("resize-window", {
        width: selectedResolution[0],
        height: selectedResolution[1],
      });
    }

    // 풀스크린 변경
    if (this.selectedIndex === 1) {
      this.fullscreenFlag = !this.fullscreenFlag;
      this.electronAPI.send("toggle-fullscreen", this.fullscreenFlag); // Electron에 전체화면 요청
    }

    // 언어 순환
    if (this.selectedIndex === 2) {
      // JSON 데이터 불러오기
      this.localization.setLanguageRotation(direction);
      this.localization.replaceJson(this, JSONKey.UI);
      // 불러오기 완료 후 text update
      this.localization.on(JSON_LOAD_EVENT, this.updateText, this);
    }

    // 메인 볼륨
    if (this.selectedIndex === 3) {
      this.volume.main = Phaser.Math.Clamp(this.volume.main + direction, 0, 10);

      this.soundManager.setVolume(this.volume);
    }

    // 이펙트 볼륨
    if (this.selectedIndex === 4) {
      this.volume.effect = Phaser.Math.Clamp(
        this.volume.effect + direction,
        0,
        10
      );

      this.soundManager.setVolume(this.volume);
    }

    this.registry.set("settings", {
      currentLanguage: this.localization.getLanguage(),
      currentResolutionIdx: this.currentResolutionIdx,
      fullscreenFlag: this.fullscreenFlag,
      volume: { main: this.volume.main, effect: this.volume.effect },
    });

    this.electronAPI.send("save-settings", {
      currentResolutionIdx: this.currentResolutionIdx,
      fullscreenFlag: this.fullscreenFlag,
      currentLanguage: this.localization.getLanguage(),
      volume: {
        main: this.volume.main,
        effect: this.volume.effect,
      },
    });

    this.updateText();
  }

  // 엔터 키 이벤트
  private selectOption(): void {
    if (this.selectedIndex === 5) {
      this.scene.start("TitleScene");
    }
  }

  updateText = () => {
    // 언어 변경 텍스트 업데이트

    this.options.forEach(({ key, text }) => {
      text.setText(this.localization.getText(JSONKey.UI, key));
    });

    // 해상도
    this.optionValues[0]
      .setText(
        `${resolutionText[this.currentResolutionIdx][0]} * ${
          resolutionText[this.currentResolutionIdx][1]
        }`
      )
      .setColor(this.fullscreenFlag ? "#505050" : "#ffffff");

    // 전체화면
    this.optionValues[1].setText(fullscreenText[this.fullscreenFlag ? 0 : 1]);

    // 언어
    this.optionValues[2].setText(
      this.localization.getText(JSONKey.UI, "languageText")
    );

    // 메인 음량
    this.optionValues[3].setText(`${this.volume.main}`);
    // 이펙트 음량
    this.optionValues[4].setText(`${this.volume.effect}`);
  };
}
