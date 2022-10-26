class Chart {
  constructor({ title, data }) {
    this.title = title;
    this.data = data;

    this.max = 0;
    this.small = 0;
    this.space = {
      horizontal: 0,
      vertical: 5,
    };

    this.offset = {
      x: 30,
      y: 30,
    };
    this.init();
  }
  init() {
    Object.keys(this.data).map((o, i) => {
      if (i == 0) this.small = this.data[o].jumlah;
      else if (this.data[o].jumlah < this.small)
        this.small = this.data[o].jumlah;

      if (this.max < this.data[o].jumlah) this.max = this.data[o].jumlah;
    });
    console.log(this.max);
  }
  draw() {
    this.showLine();
  }
  showLine() {
    c.beginPath();
    c.moveTo(this.offset.x, this.offset.y);
    c.lineTo(this.offset.x, ch - this.offset.y);
    c.stroke();

    c.beginPath();
    c.moveTo(cw - this.offset.x, ch - this.offset.y);
    c.lineTo(this.offset.x, ch - this.offset.y);
    c.stroke();

    for (let i = 0; i < this.space.vertical; i++) {
      let space = this.max - (this.max / 5) * i;
      c.beginPath();
      c.moveTo(this.offset.x, this.offset.y - space + i * this.offset.y);
      c.lineTo(this.offset.x - 5, this.offset.y - space + i * this.offset.y);
      c.stroke();

      c.font = "Arial 18px";
      c.fillText(space, this.offset.x - 10 - 9, this.offset.y - space + i * this.offset.y);
    }
  }

  update() {}
}

let chart = new Chart({
  title: "Data Covid Jakarta Oktober",
  data: [
    {
      tanggal: 1,
      jumlah: 13,
    },
    {
      tanggal: 2,
      jumlah: 20,
    },
    {
      tanggal: 3,
      jumlah: 70,
    },
    {
      tanggal: 4,
      jumlah: 40,
    },
    {
      tanggal: 5,
      jumlah: 60,
    },
    {
      tanggal: 6,
      jumlah: 20,
    },
    {
      tanggal: 7,
      jumlah: 50,
    },
    {
      tanggal: 8,
      jumlah: 30,
    },
  ],
});

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const cw = (canvas.width = 600);
const ch = (canvas.height = 400);

const main = () => {
  c.clearRect(0, 0, cw, ch);
  chart.update();
  chart.draw();
  requestAnimationFrame(main);
};

main();
