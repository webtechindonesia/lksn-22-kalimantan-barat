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
