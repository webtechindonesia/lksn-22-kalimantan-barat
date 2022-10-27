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
start.addEventListener("click", (e) => {
  form.gameMode = playerInput.checked;

  p2.value = !form.gameMode ? "BOT" : '' 
  instruction.hidden = true;
  instruction.classList.toggle("active");
  inputName.classList.toggle("active");
  main();
});

process.addEventListener('click', (e)=>{
  if(!p1.value || !p2.value){
    alert('Please Enter The Username Field')
  }
  instruction.classList.remove('active')
  inputName.classList.remove('active')
  gameField.classList.add('active')
  main();
})

main();