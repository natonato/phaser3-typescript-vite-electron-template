import Phaser from "phaser";
import { config } from "Config";

async function startGame() {
  const game = new Phaser.Game(config);

  // disable F11 / F fullscreen
  window.addEventListener("keydown", (e) => {
    if (e.key === "F11" || (e.ctrlKey && e.key === "F")) {
      e.preventDefault();
    }
  });
}

startGame();
