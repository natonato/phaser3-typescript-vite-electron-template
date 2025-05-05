import { ValueOf } from "type/type";

export const DefaultWidth = 1920;
export const DefaultHeight = 1080;

export const JSONKey = {
  UI: "ui",
} as const;

export type TJSONKey = ValueOf<typeof JSONKey>;

export const ImageKey = {
  Title: "Title",
};

export const TextureKey = {
  Smile: "Smile",
} as const;
export type TTextureKey = ValueOf<typeof TextureKey>;

export const MusicKey = {
  Bgm: "Bgm",
} as const;
export type TMusicKey = ValueOf<typeof MusicKey>;

export const SFXKey = {
  Click: "Click",
} as const;
export type TSFXKey = ValueOf<typeof SFXKey>;

export const GameDepth = {
  BackGround: 0,
  Object: 1,
  UpperObject: 10,
  UI: 99,
};
