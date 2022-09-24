class Layers {
  constructor(game, num, speed) {
    this.game = game;
    this.layer = new Image();
    this.layer.src = `./assets/img/background/3_game_background/layers/${num}.png`;
    this.width = 1920;
    this.height = this.game.height;
    this.x = 0;
    this.y = 0;
    this.speed = speed;
  }

  draw(context) {
    context.drawImage(this.layer, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.layer,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }

  update() {
    this.x -= -0.5 + this.speed;
    if (
      this.game.player.currentState.state !== "IDLING" &&
      this.game.player.currentState.state !== "ATTACKING"
    )
      this.x -= 1 * this.speed;
    if (this.x < -this.width) this.x = 0;
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.layers = [
      new Layers(this.game, 1, 1),
      new Layers(this.game, 2, 1),
      new Layers(this.game, 3, 1),
      new Layers(this.game, 4, 1.2),
      new Layers(this.game, 5, 0.5),
      new Layers(this.game, 6, 0.5),
      new Layers(this.game, 7, 0.5),
      new Layers(this.game, 8, 0.5),
      new Layers(this.game, 9, 0.5),
    ];
    this.marginGround = 60;
  }

  draw(context) {
    this.layers.forEach((layers) => {
      layers.draw(context);
    });
  }

  update() {
    this.layers.forEach((layers) => {
      layers.update();
    });
  }
}
