import Game from "./struct/Game.js";

let game;

const main = () => {
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
