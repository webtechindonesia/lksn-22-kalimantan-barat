const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const cw = (canvas.width = 600);
const ch = (canvas.height = 600);

const rad = 30;
const width = 60;
const height = 70;

const hor = 10;
const ver = 8;

const offsetX = cw / 2 - (width * hor) / 2 + width;
const offsetY = ch / 2 - (height * ver) / 2 + rad + 10;

const loadAudio = (src) =>
  new Promise((resolve) => {
    const audio = new Audio(src);
    audio.addEventListener("load", () => resolve(audio));
  });

const instruction = document.querySelector(".container");
const inputName = document.querySelector(".input-container");

const p2 = document.getElementById("p2");
const p1 = document.getElementById("p1");

let form = {
  gameMode: null,
  gameLevel: null,
  p1: null,
  p2: null,
};

const playerInput = document.getElementById("player");
const botInput = document.getElementById("bot");
const start = document.getElementById("startBtn");
const process = document.getElementById("processBtn");
const gameField = document.querySelector(".game");
const level = document.querySelector("#level");

const leaderboardDOM = document.querySelector("#leaderboard");
const filterVal = document.getElementById("filter");

const table = document.getElementById("over-table");
const endSection = document.querySelector(".end");

const user1 = document.getElementById("user1");
const user2 = document.getElementById("user2");
const getTableData = (data) => {
  user1.children[0].innerHTML = data.user1;
  user1.children[1].innerHTML = data.score1;

  user2.children[0].innerHTML = data.user2;
  user2.children[1].innerHTML = data.score2;
  if (data.score1 > data.score2) {
    alert(data.user1 + " IS THE WINNER");
  } else {
    alert(data.user2 + " IS THE WINNER");
  }
};
