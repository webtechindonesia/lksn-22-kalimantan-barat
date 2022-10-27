import Hexagon from "./Hexagon.js";

let check = {
  width: width * 0.87,
  height: height * 0.75,
};
const dir = [
  [0, -check.height],
  [check.width, -check.height / 2],
  [check.width, check.height / 2],
  [0, check.height],
  [-check.width, check.height / 2],
  [-check.width, -check.height / 2],
];
export default class Game {
  constructor() {
    this.p1 = "red";
    this.p2 = "blue";
    this.turn = this.p1;

    this.currentValue = ~~(Math.random() * 19 + 1);
    this.hoveredBlock = null;
    this.selectedBlock = null;

    this.hexagonMaps = [];
    this.init();
  }
  init() {
    this.generate();
    this.listener();
  }
  draw() {
    this.background();
    this.hexagonMaps.map((h) => h.draw());
  }
  update() {
    this.hexagonMaps.map((h) => h.update());
    this.hover();
  }
  hover() {
    if (!this.hoveredBlock) return;
    this.hexagonMaps.map((h) => {
      h.previewHex = {
        val: 0,
        color: 0,
      };
    });
    this.hoveredBlock.preview(this.currentValue, this.turn);
  }
  generate() {
    for (let y = 0; y < ver; y++) {
      for (let x = 0; x < hor; x++) {
        let newX = (y % 2 == 1 ? (x + 0.5) * width : x * width) * 0.87;
        let newY = y * height * 0.75;

        this.hexagonMaps.push(new Hexagon(newX, newY));
      }
    }
  }
  background() {
    c.fillStyle = "#1d1d1d";
    c.fillRect(0, 0, cw, ch);
  }
  listener() {
    canvas.addEventListener("mousemove", (e) => {
      this.hoveredBlock = null;
      this.hexagonMaps.map((h) => {
        if (h.check(e)) this.hoveredBlock = h;
      });
    });
  }
}
