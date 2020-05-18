export default class Snake {
    constructor(x, y, difficulty) {
        this._direction = {
            LEFT: 0,
            RIGHT: 1,
            UP: 2,
            DOWN: 3,
            NONE: 4
          };
      this._movement = this._direction.NONE;
      this._next = this._direction.NONE;
      this._length = 3;
      this._trail = [];
      this._position = {};
      this._position.x = x;
      this._position.y = y;
      this._score = 0;
      this._scoreBox = document.getElementById("scoreValue");
        switch(difficulty){
          case 120:
            this._velocity = 1;
            break;
          case 80:
            this._velocity = 2;
            break;
          case 50:
            this._velocity = 5;
            break;
        }
    }
  
    setDirection(newDir) {
      this._next = newDir;
    }
  
    update(apple, sound) {
      if (
        (this._next === this._direction.DOWN && this._movement !== this._direction.UP) ||
        (this._next === this._direction.UP && this._movement !== this._direction.DOWN) ||
        (this._next === this._direction.LEFT && this._movement !== this._direction.RIGHT) ||
        (this._next === this._direction.RIGHT && this._movement !== this._direction.LEFT)
      ) {
        this._movement = this._next;
      }
      
      if (this._movement === this._direction.NONE) return;
  
      this._trail.push({
        x: this._position.x,
        y: this._position.y
      });
      while (this._trail.length > this._length) this._trail.shift();
  
      switch (this._movement) {
        case this._direction.UP:
          this._position.y--;
          break;
        case this._direction.DOWN:
          this._position.y++;
          break;
        case this._direction.RIGHT:
          this._position.x++;
          break;
        case this._direction.LEFT:
          this._position.x--;
          break;
      }
  
      if (this._position.x === apple.getCoords().x && this._position.y === apple.getCoords().y) {
        this._generateApple(apple);
        this._length+= this._velocity;
        console.log(this._score);
        console.log(this._velocity);
        this._score = this._velocity + this._score;
        this._scoreBox.innerHTML = this._score;
        sound.play();
      }
  
      if (this._position.x < 0) {
        this._position.x = 19;
      } else if (this._position.x > 19) {
        this._position.x = 0;
      }
  
      if (this._position.y < 0) {
        this._position.y = 19;
      } else if (this._position.y > 19) {
        this._position.y = 0;
      }
  
      for (let i = 0; i < this._trail.length; i++) {
        if (this._position.x === this._trail[i].x && this._position.y === this._trail[i].y) {
          this._length -= (i + 1);
          break;
        }
      } 
    }
  
    draw(ctx) {
      ctx.fillStyle = '#aebdf5';
      for (const block of this._trail) {
        ctx.fillRect(block.x * 25 + 1, block.y * 25 + 1, 23, 23);
      }
    
      ctx.fillStyle = '#7289DA';
      ctx.fillRect(this._position.x * 25 + 1, this._position.y * 25 + 1, 23, 23);

      this.gameOver(ctx);
    }
  
    _generateApple(apple) {
      const applePos = {};
  
      generator:
      while (true) {
        applePos.x = Math.floor(Math.random() * 20);
        applePos.y = Math.floor(Math.random() * 20);
  
        if (applePos.x === this._position.x && applePos.y === this._position.y) continue;
        for (const tile of this._trail) {
          if (applePos.x === tile.x && applePos.y === tile.y) continue generator;
        }
  
        break;
      }
  
      apple.setCoords(applePos.x, applePos.y);
    }

    gameOver(ctx){
      let trail = this._trail.slice(1);
        if (trail.some(s => s.x === this._position.x && s.y === this._position.y)) {
          return true;
        }
    }

  }