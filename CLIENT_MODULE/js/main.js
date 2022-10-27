import Game from "./struct/Game.js";

let game;

const main = async () => {
  console.log('dsad')
  let audio = new Audio('./js/click.mp3');
  game = new Game(audio, form);
  update();
};
const update = () => {
  c.clearRect(0, 0, cw, ch);
  game.update();
  game.draw();
  requestAnimationFrame(update);
};
start.addEventListener("click", (e) => {
  form.gameMode = playerInput.checked;

  p2.value = !form.gameMode ? "BOT" : "";
  instruction.hidden = true;
  instruction.classList.toggle("active");
  inputName.classList.toggle("active");
});

process.addEventListener("click", (e) => {
  if (!p1.value || !p2.value) {
    alert("Please Enter The Username Field");
    return
  }
  form.p1 = p1.value;
  form.p2 = p2.value;
  instruction.classList.remove("active");
  inputName.classList.remove("active");
  gameField.classList.add("active");
  canvas.hidden = false

  main();
});
