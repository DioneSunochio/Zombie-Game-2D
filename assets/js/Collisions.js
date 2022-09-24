export class Collision {
  constructor(game, x, y) {
    this.game = game;
    this.image = new Image();
    this.image.src = "./assets/img/effects/fire.png";
    this.width = 100;
    this.height = 90;
    this.x = x;
    this.y = y;
    this.makedForDeletion = false;
    this.sound = new Audio();
    this.sound.src = "./assets/sound/fire_impact.wav";
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.width > 0) {
      this.width -= 10;
      this.height -= 9;
      if (this.width < 0) this.makedForDeletion = true;
    }
  }
}
