const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const cw = (canvas.width = 700);
const ch = (canvas.height = 700);

const rad = 30;
const width = 60;
const height = 70;

const hor = 10;
const ver = 8;

const offsetX = cw / 2 - width * hor / 2 + width / 2;
const offsetY = ch / 2 - height * ver / 3;
