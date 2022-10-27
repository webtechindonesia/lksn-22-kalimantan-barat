export default class Hexagon {
  constructor(x, y) {
    this.color = "aqua";
    this.p = { x, y };

    this.value = 0;
    this.previewHex = {
      val: 0,
      color: 0,
    };
  }
  preview(val, color) {
    this.previewHex = {
      val,
      color,
    };
  }
  update() {}
  draw() {
    c.save();
    c.translate(this.p.x + offsetX, this.p.y + offsetY);
    c.strokeStyle = "white";
    c.beginPath();
    for (let i = 0; i < 7; i++) {
      let angle = (i % 6) * 60 + 90;
      let dest = {
        x: Math.cos((angle * Math.PI) / 180) * width/2,
        y: Math.sin((angle * Math.PI) / 180) * height/2,
      };
      if (i == 0) c.moveTo(dest.x, dest.y);
      else c.lineTo(dest.x, dest.y);
    }
    c.fill();
    if (this.previewHex.val != 0 && this.previewHex.color != 0) {
      c.save();
      c.globalAlpha = .6
      c.fillStyle = this.previewHex.color;
      c.fill();
      c.font = "15px Arial";
      c.textAlign = "center";
      c.fillStyle = "white";
      c.fillText(this.previewHex.val, 0, 0);
      c.restore();
    }
    c.stroke();
    c.closePath();
    c.restore();
  }
  check({ offsetX: x, offsetY: y }) {
    let dx = this.p.x + offsetX - x,
      dy = this.p.y + offsetY - y,
      dis = Math.sqrt(dx * dx + dy * dy);

    return dis < rad;
  }
}
