import { InputHandler } from "./InputHandler.js";
import {
  Attacking,
  Climbing,
  Dying,
  Gliding,
  Idling,
  JumpAttack,
  Jumping,
  JumpThrow,
  Running,
  Sliding,
  Throwing,
  Vanishing,
} from "./States.js";
import { Player } from "./Player.js";
import { Background } from "./Background.js";
import { ZombieOne, ZombieTwo } from "./Enemies.js";

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.input = new InputHandler();
    this.background = new Background(this);
    this.states = [
      new Idling(this),
      new Running(this),
      new Attacking(this),
      new JumpAttack(this),
      new Climbing(this),
      new Dying(this),
      new Gliding(this),
      new Throwing(this),
      new JumpThrow(this),
      new Jumping(this),
      new Sliding(this),
      new Vanishing(this),
    ];
    this.player = new Player(this);
    this.enemyInterval = 5000;
    this.enemyTimer = 0;
    this.enemies = [];
    this.collisions = [];
    this.sound1 = new Audio();
    this.sound1.src = "./assets/sound/misc.wav";
    this.sound2 = new Audio();
    this.sound2.src = "./assets/sound/wind_effect.wav";
  }

  draw(context) {
    this.background.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.player.draw(context);
    this.collisions.forEach((collison) => {
      collison.draw(context);
    });
  }

  update(deltaTime) {
    this.addEnemy(deltaTime);
    this.background.update();
    this.player.update(deltaTime, this.input.keys);
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
    });
    this.collisions.forEach((collison) => {
      collison.update();
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.collisions = this.collisions.filter(
      (collison) => !collison.markedForDeletion
    );
  }

  addEnemy(deltaTime) {
    if (this.enemyInterval < this.enemyTimer) {
      if (Math.round(Math.random()) > 0) {
        this.enemies.push(new ZombieOne(this));
      } else {
        this.enemies.push(new ZombieTwo(this));
      }
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }
}
