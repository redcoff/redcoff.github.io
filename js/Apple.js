export default class Apple {
    constructor(x, y) {
      this._x = x;
      this._y = y;
    }
  
    getCoords() {
      return {
        x: this._x,
        y: this._y
      };
    }
  
    setCoords(x, y) {
      this._x = x;
      this._y = y;
    }
  
    draw(ctx) {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this._x * 25 + 12, this._y * 25 + 12, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  