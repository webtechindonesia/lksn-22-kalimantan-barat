import Game from "./struct/Game.js";

let game;

const main = async () => {
  console.log("dsad");
  let audio = new Audio("./js/click.mp3");
  game = new Game(audio, form);

  leaderboard();
  update();
};
const leaderboard = () => {
  const data = JSON.parse(localStorage.win);
  console.log(data.sort((a, b) => a.score1 + b.score1 - (a.score2 - b.score)));
  data.map((d) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    const score = document.createElement("p");
    p.innerHTML = d.user1 + "vs" + d.user2;
    score.innerHTML = d.user1 + "-" + d.user2;
    li.appendChild(p);
    li.appendChild(score);
    leaderboardDOM.appendChild(li);
  });
};

filterVal.addEventListener("change", () => {
  filter();
});
const filter = () => {
  const data = JSON.parse(localStorage.win);
  if (filterVal.value == "date") {
    while (leaderboardDOM.firstChild)
      leaderboardDOM.removeChild(leaderboardDOM.lastChild);
    data
      .sort((a, b) => a.date - b.date)
      .map((d) => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const score = document.createElement("p");
        p.innerHTML = d.user1 + "vs" + d.user2;
        score.innerHTML = d.user1 + "-" + d.user2;
        li.appendChild(p);
        li.appendChild(score);
        leaderboardDOM.appendChild(li);
      });
  } else if (filterVal.value == "score") {
    while (leaderboardDOM.firstChild)
      leaderboardDOM.removeChild(leaderboardDOM.lastChild);
    data
      .sort((a, b) => a.score1 + b.score1 - (a.score2 - b.score))
      .map((d) => {
        const li = document.createElement("li");
        const p = document.createElement("p");
        const score = document.createElement("p");
        p.innerHTML = d.user1 + "vs" + d.user2;
        score.innerHTML = d.user1 + "-" + d.user2;
        li.appendChild(p);
        li.appendChild(score);
        leaderboardDOM.appendChild(li);
      });
  }
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
    return;
  }
  form.p1 = p1.value;
  form.p2 = p2.value;
  form.gameLevel = level.value;
  instruction.classList.remove("active");
  inputName.classList.remove("active");
  gameField.classList.add("active");
  canvas.hidden = false;

  main();
});

const unDisableBtn = () => {
  if (p1.value) process.disabled = false;
  else process.disabled = false;
  if (form.gameMode) {
    if (p1.value && p2.value) process.disabled = false;
    else process.disabled = true;
  }
};

p1.addEventListener("keyup", (e) => {
  unDisableBtn();
});
p2.addEventListener("keyup", (e) => {
  unDisableBtn();
});
