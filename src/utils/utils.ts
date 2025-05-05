export const wrap = (num: number, min: number, max: number) => {
  return (num + max) % max;
};

// phaser -> electron -> terminal Log
export const consoleLog = (data: any) => {
  const { electronAPI } = window;

  electronAPI.send("console-log", data);
};
