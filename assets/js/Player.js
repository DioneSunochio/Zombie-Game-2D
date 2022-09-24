import { Collision } from "./Collisions.js";

export class Player {
  constructor(game) {
    this.game = game;
    this.image = this.game.states[0].image;
    this.width = this.game.states[0].width;
    this.height = this.game.states[0].height;
    this.x = this.game.width / 2;
    this.y = this.game.height - this.height - this.game.background.marginGround;
    this.speedX = 5;
    this.speedY = 0;
    this.frameX = 0;
    this.maxFrame = 9;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.currentState = this.game.states[0];
  }

  draw(context) {
    context.drawImage(
      this.image,
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

  update(deltaTime, input) {
    this.currentState.handlerInput(input);

    //Vertical move
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    if (this.x < 0) this.x = 0;

    //Horizantal move
    this.y += this.speedY;
    if (!this.onGround()) {
      if (
        this.y >
        this.game.height - this.height - this.game.background.marginGround
      )
        this.y =
          this.game.height - this.height - this.game.background.marginGround;
      if (this.y < 0) this.y = 0;
    }

    //Frame
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
      if (this.frameX > this.maxFrame) {
        this.frameX = 0;
      }
    } else {
      this.frameTimer += deltaTime;
    }
  }

  setState(state) {
    this.image = this.game.states[state].image;
    this.width = this.game.states[state].width;
    this.height = this.game.states[state].height;
    this.currentState = this.game.states[state];
    this.frameX = 0;
  }

  onGround() {
    return (
      this.y ===
      this.game.height - this.height - this.game.background.marginGround
    );
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.collisions.push(new Collision(this.game, enemy.x, enemy.y));
        this.game.sound2.play();
      }
    });
  }
}
