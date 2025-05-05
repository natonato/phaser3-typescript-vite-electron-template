export const spacingElementByIdx = (
  center: number,
  idx: number,
  length: number,
  space: number
) => {
  return center + (idx - (length - 1) / 2) * space;
};
