import { GameDepth } from "constants/gameConst";

type TTextType = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text: string;
  size?: number;
  color?: string;
  family?: string;
  options?: Phaser.Types.GameObjects.Text.TextStyle;
};

export const AddText = ({
  scene,
  x,
  y,
  text,
  depth = 0,
  size = 20,
  color = "#fff",
  family = "DGM",
  options,
}: TTextType & {
  depth?: number;
}) => {
  return scene.add
    .text(x, y, text, {
      fontFamily: family,
      fontSize: `${size}px`,
      color: color,
      ...options,
    })
    .setDepth(depth)
    .setOrigin(0.5, 0.5);
};

export const AddUIText = (props: TTextType) => {
  return AddText({ ...props, depth: GameDepth.UI });
};
