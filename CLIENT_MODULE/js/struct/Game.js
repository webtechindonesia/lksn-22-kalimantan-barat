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
  constructor(audio, { gameMode, gameLevel, p1, p2 }) {
    this.audio = {
      click: audio,
    };
    this.uP1 = p1;
    this.uP2 = p2;
    this.gameLevel = gameLevel;

    this.bot = !gameMode;
    this.p1 = "#dc143c";
    this.p2 = "#6495ed";
    this.turn = this.p1;

    this.p1Score = 0;
    this.p2Score = 0;

    this.currentValue = ~~(Math.random() * 19 + 1);
    this.hoveredBlock = null;
    this.selectedBlock = null;

    this.gameOver = false;

    this.hexagonMaps = [];
    this.init();
  }
  init() {
    this.generate();
    this.listener();
  }
  draw() {
    if (this.gameOver) return;

    this.background();
    this.hexagonMaps.map((h) => h.draw());
    this.interface()
  }
  update() {
    if (this.gameOver) return;
    this.hexagonMaps.map((h) => h.update());
    this.hover();
    this.score();
    this.end();
  }
  score() {
    let p1Score = 0;
    let p2Score = 0;
    this.hexagonMaps.map((h) => {
      if (h.color == this.p1) {
        p1Score += h.value;
      } else if (h.color == this.p2) {
        p2Score += h.value;
      }
    });
    this.p1Score = p1Score;
    this.p2Score = p2Score;
  }
  sideBlockPreview() {
    dir.map(([dx, dy]) => {
      let dist = {
        x: dx + this.hoveredBlock.p.x,
        y: dy + this.hoveredBlock.p.y,
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
            h.previewChangeColor();
          } else if (h.color == this.turn && h.value != 0) {
            h.previewChangeValue();
          }
        }
      });
    });
  }
  hover() {
    if (!this.hoveredBlock) return;
    if (this.turn == this.p2 && this.bot) return;
    this.hexagonMaps.map((h) => {
      h.previewHex = {
        val: 0,
        color: 0,
      };
    });
    this.hoveredBlock.preview(this.currentValue, this.turn);
    this.sideBlockPreview();
  }
  generate() {
    for (let y = 0; y < ver; y++) {
      for (let x = 0; x < hor; x++) {
        let newX = (y % 2 == 1 ? (x + 0.5) * width : x * width) * 0.87;
        let newY = y * height * 0.75;

        this.hexagonMaps.push(new Hexagon(newX, newY));
      }
    }
    for (let i = 0; i < 2 + this.gameLevel * 2; i++) {
      this.hexagonMaps[~~(Math.random() * hor * ver)].disabled = true;
    }
  }
  background() {
    c.fillStyle = "#1d1d1d";
    c.fillRect(0, 0, cw, ch);
  }
  place() {
    this.audio.click.play();
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
          } else if (h.color == this.turn && h.value != 0) {
            h.value++;
          }
        }
      });
    });
    this.turn = this.turn == this.p1 ? this.p2 : this.p1;
    this.botMove();
  }
  end() {
    let allFilled = true;
    this.hexagonMaps.map((h) => {
      if (h.color == "" && h.disabled == false) {
        allFilled = false;
      }
    });

    if (allFilled) {
      alert("Game Over");
      this.gameOver = true;
      let arr = JSON.parse(localStorage.getItem("win")) ?? [];
      let uP1 = this.uP1,
        uP2 = this.uP2;

      arr.push({
        user1: uP1,
        user2: uP2,
        score1: this.p1Score,
        score2: this.p2Score,
        date: Date.now(),
      });

      localStorage.setItem("win", JSON.stringify(arr));
    }
  }
  botMove() {
    if (this.turn == this.p2 && this.bot) {
      let arr = [];
      let filtered = this.hexagonMaps.filter(
        (a) => a.color == "" && !a.disabled
      );
      for (let i = 0; i < 3; i++) {
        arr.push(filtered[~~(Math.random() * filtered.length - 1)]);
      }
      let k = 0;
      let interval = setInterval(() => {
        if (k == 3) {
          this.selectedBlock = arr[~~(Math.random() * 3)];
          this.selectedBlock.preview = {
            val: 0,
            color: 0,
          };
          this.place();
          this.dominate();

          clearInterval(interval);
        } else {
          console.log(arr);
          arr[k].preview(this.currentValue, this.turn);
        }
        k++;
      }, 300);
    }
  }
  interface() {
    c.fillStyle = this.p1
    c.textAlign = "center";
    c.font = "20px Arial";
    c.fillText(this.uP1, cw / 2 - 30, ch * 0.8);

    c.fillStyle = this.p2
    c.textAlign = "center";
    c.font = "20px Arial";
    c.fillText(this.uP1, (cw / 2) + 30, ch * 0.8);

    c.font = "16px Arial";
    c.textAlign = "center";
    c.fillStyle = "white";
    c.fillText(this.p1Score, cw / 2 - 20, ch * 0.8 + 20);

    c.font = "16px Arial";
    c.textAlign = "center";
    c.fillStyle = "white";
    c.fillText(this.p2Score, (cw / 2) + 20, ch * 0.8 + 20);

    c.fillStyle = this.turn;
    c.fillRect(0, 0, cw, 20);
  }
  listener() {
    canvas.addEventListener("mousedown", (e) => {
      if (this.turn != this.p1 && this.bot) return;
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
      if (this.turn != this.p1 && this.bot) return;
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
