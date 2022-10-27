import Hexagon from "./Hexagon.js";

let check = {
  width: width * 0.87,
  height: height * 0.75,
};
const dir = [
  [check.width / 2, -check.height],
  [check.width, 0],
  [check.width / 2, check.height],
  [-check.width / 2, check.height],
  [-check.width, 0],
  [-check.width / 2, -check.height],
];
export default class Game {
  constructor() {
    // this.audio = {
    //   click: audio,
    // };

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
  place() {
    // this.audio.click.play();
    this.selectedBlock.color = this.turn;
    this.selectedBlock.value = this.currentValue;

    this.currentValue = ~~(Math.random() * 19 + 1);
  }
  dominate() {
    dir.map(([dx, dy]) => {
      let dist = {
        x: dx + this.selectedBlock.p.x,
        y: dy + this.selectedBlock.p.y,
      };
      this.hexagonMaps.map((h) => {
        let dx = h.p.x - dist.x,
          dy = h.p.y - dist.y,
          dis = Math.sqrt(dx * dx + dy * dy);
        
        let inside = dis < rad;
        if (inside) {
          if (
            h.color != "" &&
            h.color != this.turn &&
            h.value != 0 &&
            h.value < this.selectedBlock.value
          ) {
            h.color = this.turn;
          }
          else if (h.color == this.turn && h.value != 0) {
            h.value++;
          }
        }
      });
    });
    this.turn = this.turn == this.p1 ? this.p2 : this.p1;
  }
  listener() {
    canvas.addEventListener("mousedown", (e) => {
      this.hexagonMaps.map((h) => {
        if (h.check(e) && h.checkAvailable()) {
          this.selectedBlock = h;
          this.selectedBlock.previewHex = {
            val: 0,
            color: 0,
          };
          this.place();
          this.dominate();
        }
      });
    });
    canvas.addEventListener("mousemove", (e) => {
      let temp = this.hoveredBlock;
      this.hoveredBlock = null;
      this.hexagonMaps.map((h) => {
        if (h.check(e) && h.checkAvailable()) {
          this.hoveredBlock = h;
        } else if (h.check(e) && !h.checkAvailable()) {
          this.hoveredBlock = temp;
        }
      });
    });
  }
}
