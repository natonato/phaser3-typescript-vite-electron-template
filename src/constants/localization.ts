export type TMenuText = {
  languageSelect: string;
  language: string;
  resolution: string;
  returnToTitle: string;
  options: string;
  startGame: string;
  exitGame: string;
};

export const OptionMenuKey = {
  languageSelect: "languageSelect",
  resolution: "resolution",
  fullscreen: "fullscreen",
  mainVolume: "mainVolume",
  effectVolume: "effectVolume",
  returnToTitle: "returnToTitle",
} as const;

export type TOptionMenuText = { [key in keyof typeof OptionMenuKey]: string };
