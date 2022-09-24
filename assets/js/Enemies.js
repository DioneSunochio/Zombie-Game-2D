class Enemy {
  constructor(game, num) {
    this.game = game;
    this.imagem = new Image();
    this.imagem.src = `./assets/img/enemies/zombie_${num}.png`;
    this.frameX = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.speed = Math.random() * 2 + 1;
    this.makedForDeletion = false;
  }

  draw(context) {
    context.drawImage(
      this.imagem,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    if (this.x < this.game.width - this.width && this.frameX > 7)
      this.x += this.speed;
    if (this.frameInterval < this.frameTimer) {
      this.frameX++;
      this.frameTimer = 0;
      if (this.frameX > this.maxFrame) {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }
}

export class ZombieOne extends Enemy {
  constructor(game) {
    super(game, 1);
    this.width = 107.5;
    this.height = 130;
    this.x = -this.width;
    this.y = this.game.height - this.height - this.game.background.marginGround;
    this.maxFrame = 17;
  }
}

export class ZombieTwo extends Enemy {
  constructor(game) {
    super(game, 2);
    this.width = 92.625;
    this.height = 130;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.background.marginGround;
    this.maxFrame = 7;
  }

  update(deltaTime) {
    super.update(deltaTime);
    if (this.x > 0) this.x -= this.speed;
    if (this.frameInterval < this.frameTimer) {
      this.frameX++;
      this.frameTimer = 0;
      if (this.frameX > this.maxFrame) {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }
}
