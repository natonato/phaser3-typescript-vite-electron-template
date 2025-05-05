import Phaser from "phaser";
import { config } from "Config";

async function preloadSettings() {
  return await window.electronAPI.invoke("get-settings");
}

async function startGame() {
  const settings = await preloadSettings();

  const game = new Phaser.Game(config);

  game.scene.start("LoadingScene", { settings });

  // prevent F11, F fullscreen
  window.addEventListener("keydown", (e) => {
    if (e.key === "F11" || (e.ctrlKey && e.key === "F")) {
      e.preventDefault();
    }
  });
}

startGame();
