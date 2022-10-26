class Chart {
  constructor({ title, data }) {
    this.title = title;
    this.data = data;

    this.max = 0;
    this.small = 0;
    this.space = {
      vertical: 5,
    };

    this.spaceLine = { x: 0 };
    this.startTanggal = 1;
    this.endTanggal = 8;

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
  }
  draw() {
    this.showLine();
    this.showChart();
  }
  showLine() {
    c.lineWidth = 1
    c.strokeStyle = 'black'
    c.beginPath();
    c.moveTo(this.offset.x, this.offset.y);
    c.lineTo(this.offset.x, ch - this.offset.y);
    c.stroke();

    c.beginPath();
    c.moveTo(cw - this.offset.x, ch - this.offset.y);
    c.lineTo(this.offset.x, ch - this.offset.y);
    c.stroke();

    for (let i = 0; i < this.space.vertical; i++) {
      let space = this.max - (this.max / 5) * (this.space.vertical - i - 1);
      let spaceLine = (ch - this.offset.y * 2) / this.space.vertical;
      c.beginPath();
      c.moveTo(this.offset.x, ch - this.offset.y * 2 - spaceLine * i);
      c.lineTo(this.offset.x - 5, ch - this.offset.y * 2 - spaceLine * i);
      c.stroke();

      c.font = "Arial 18px";
      c.fillText(
        space,
        this.offset.x - 10 - 9,
        ch - this.offset.y * 2 - spaceLine * i
      );
    }

    for (let i = 1; i <= this.endTanggal; i++) {
      this.spaceLine.x =
        ((cw - this.offset.x * 2) / this.endTanggal - this.startTanggal) * i;

      c.beginPath();
      c.moveTo(this.offset.x + this.spaceLine.x, ch - this.offset.y);
      c.lineTo(this.offset.x + this.spaceLine.x, ch - this.offset.y + 5);
      c.stroke();

      c.font = "Arial 18px";
      c.fillText(
        i,
        this.offset.x + this.spaceLine.x - 3,
        ch - this.offset.y + 19
      );
    }
  }
  showChart() {
    c.lineWidth = 5
    c.strokeStyle = "red"
    c.beginPath();
    for (let i = 0; i < this.data.length; i++) {
      let x = this.offset.x + ((cw - this.offset.x * 2) / this.endTanggal - this.startTanggal) * this.data[i].tanggal;
      let y = ch - this.offset.y -
        (this.data[i].jumlah / this.max) *
        (ch - (this.offset.y * 2) / this.max) + this.offset.y * 2;
      if (i == 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.stroke();
  }
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
  chart.draw();
  requestAnimationFrame(main);
};

main();
