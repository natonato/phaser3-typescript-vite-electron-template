import { TMusicKey, TSFXKey } from "constants/gameConst";
import Phaser from "phaser";

type SFXCache = Map<string, Phaser.Sound.BaseSound[]>;

export class SoundManager {
  private static instance: SoundManager;
  private scene!: Phaser.Scene;

  private currentBGM?:
    | Phaser.Sound.WebAudioSound
    | Phaser.Sound.NoAudioSound
    | Phaser.Sound.HTML5AudioSound;
  private bgmKey?: string;
  private sfxCache: SFXCache = new Map();

  public volume: { main: number; effect: number }; // 1 ~ 10

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public init(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /** 음악 재생 (같은 음악일 경우 재생 유지) */
  public playMusic(key: TMusicKey, config?: Phaser.Types.Sound.SoundConfig) {
    if (this.bgmKey === key) {
      return;
    }

    this.stopMusic();

    this.currentBGM = this.scene.sound.add(key, {
      loop: true,
      volume: this.volume.main / 10,
      ...config,
    });
    this.currentBGM.play();
    this.bgmKey = key;
  }

  /** 배경음악 정지 */
  public stopMusic() {
    if (this.currentBGM) {
      this.currentBGM.stop();
      this.currentBGM.destroy();
      this.currentBGM = undefined;
      this.bgmKey = undefined;
    }
  }

  /** 효과음 재생 */
  public playSFX(
    key: TSFXKey,
    config?: Phaser.Types.Sound.SoundConfig,
    callback?: () => void
  ) {
    const sound = this.getOrCreateSFX(key);
    sound.once("complete", () => {
      callback?.();
      this.releaseSFX(key, sound);
    });
    sound.play({ volume: this.volume.effect / 10, ...config });
  }

  // 캐싱
  private getOrCreateSFX(
    key: string,
    isAudioSprite: boolean = false
  ): Phaser.Sound.BaseSound {
    if (!this.sfxCache.has(key)) {
      this.sfxCache.set(key, []);
    }

    const pool = this.sfxCache.get(key)!;
    const available = pool.find((s) => !s.isPlaying);

    if (available) {
      return available;
    }

    // 새로 생성
    const sound = isAudioSprite
      ? this.scene.sound.addAudioSprite(key)
      : this.scene.sound.add(key);
    pool.push(sound);
    return sound;
  }

  private releaseSFX(key: string, sound: Phaser.Sound.BaseSound) {
    // 사용 끝났으니 stop (캐시 유지)
    if (sound.isPlaying) {
      sound.stop();
    }
  }

  public setVolume(volume: { main: number; effect: number }) {
    this.volume = volume;
    this.currentBGM?.setVolume(this.volume.main / 10);
  }

  public destroyAll() {
    this.stopMusic();

    this.sfxCache.forEach((pool) => {
      pool.forEach((s) => {
        s.stop();
        s.destroy();
      });
    });
    this.sfxCache.clear();
  }
}
