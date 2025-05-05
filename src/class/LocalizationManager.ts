import { TJSONKey } from "constants/gameConst";
import { wrap } from "utils/utils";

export const JSON_LOAD_EVENT = "JSON_LOAD_EVENT";

export class LocalizationManager extends Phaser.Events.EventEmitter {
  private static instance: LocalizationManager;
  private language: string = "en"; // 기본 언어
  private localizationData: Record<string, any> = {};

  constructor() {
    super();
  }

  private languageArray = ["kr", "jp", "en"];

  static getInstance(): LocalizationManager {
    if (!LocalizationManager.instance) {
      LocalizationManager.instance = new LocalizationManager();
    }
    return LocalizationManager.instance;
  }

  // JSON 데이터를 불러와 저장 (json 로드는 씬마다 preload에서 처리)
  loadLocalization(scene: Phaser.Scene, jsonKeys: TJSONKey[]): void {
    jsonKeys.forEach((key) => {
      const data = scene.cache.json.get(key);
      if (data) {
        this.localizationData[key] = data;
      }
    });
  }

  // JSON 데이터를 교체
  replaceJson(scene: Phaser.Scene, jsonKey: TJSONKey): void {
    scene.cache.json.remove(jsonKey);

    this.loadJson(scene, [jsonKey]);

    scene.load.once("complete", () => {
      this.loadLocalization(scene, [jsonKey]);
      this.emit(JSON_LOAD_EVENT);
    });
    scene.load.start();
  }

  loadJson(scene: Phaser.Scene, jsonKeys: TJSONKey[]): void {
    jsonKeys.forEach((key) => {
      scene.load.json(key, `assets/data/${this.language}/${key}.json`);
    });
  }

  // 언어 변경
  setLanguage(lang?: string): void {
    if (lang && this.languageArray.includes(lang)) {
      this.language = lang;
    } else {
      console.warn(`Unsupported language: ${lang}`);
    }
  }

  setLanguageRotation(dir: number): void {
    const newLanIdx = wrap(
      this.languageArray.findIndex((lan) => lan === this.language) + dir,
      0,
      this.languageArray.length
    );
    this.language = this.languageArray[newLanIdx];
  }

  getLanguage = () => {
    return this.language;
  };

  // 텍스트 가져오기
  getText(jsonKey: TJSONKey, field: string): string {
    return this.localizationData[jsonKey]?.[field] || "MISSING TEXT";
  }
}
