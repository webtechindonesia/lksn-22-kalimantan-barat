import Game from "./struct/Game.js";

let game;

// const assets = "../assets";
const main = async () => {
//   let audio = await loadAudio(assets + "/click.mp3");
  game = new Game();
  update();
};
const update = () => {
  c.clearRect(0, 0, cw, ch);
  game.update();
  game.draw();
  requestAnimationFrame(update);
};

main();
