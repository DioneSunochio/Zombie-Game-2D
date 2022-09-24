const states = {
  IDLING: 0,
  RUNNING: 1,
  ATTACKING: 2,
  JUMPATTACK: 3,
  CLIMBING: 4,
  DYING: 5,
  GLIDING: 6,
  THROWING: 7,
  JUMPTHROW: 8,
  JUMPING: 9,
  SLIDING: 10,
  VANISHING: 11,
};

class State {
  constructor(game, state) {
    this.game = game;
    this.state = state;
  }
}

export class Idling extends State {
  constructor(game) {
    super(game, "IDLING");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/idler.png";
    this.width = 58;
    this.height = 110;
  }

  handlerInput(input) {
    if (input.includes("ArrowRight")) this.game.player.setState(states.RUNNING);
    else if (input.includes("ArrowLeft")) {
      this.game.player.setState(states.VANISHING);
    } else if (input.includes("ArrowUp"))
      this.game.player.setState(states.JUMPING);
    else if (input.includes("z")) this.game.player.setState(states.ATTACKING);
  }
}

export class Running extends State {
  constructor(game) {
    super(game, "RUNNING");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/run.png";
    this.width = 90.8;
    this.height = 115;
  }

  handlerInput(input) {
    this.game.player.x += this.game.player.speedX;
    if (input.length < 1) this.game.player.setState(states.IDLING);
    else if (input.includes("z")) this.game.player.setState(states.ATTACKING);
    else if (input.includes("ArrowLeft")) {
      this.game.player.setState(states.VANISHING);
    } else if (input.includes("ArrowUp"))
      this.game.player.setState(states.JUMPING);
    else if (input.includes("ArrowDown"))
      this.game.player.setState(states.SLIDING);
  }
}

export class Attacking extends State {
  constructor(game) {
    super(game, "ATTACKING");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/attack.png";
    this.width = 134;
    this.height = 124;
  }

  handlerInput(input) {
    this.game.player.checkCollision();
    if (this.game.player.frameX > 8) {
      if (input.includes("z")) this.game.player.setState(states.ATTACKING);
      else this.game.player.setState(states.IDLING);
    }
  }
}

export class JumpAttack extends State {
  constructor(game) {
    super(game, "JUMPATTACK");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/jump_attack.png";
    this.width = 115.4;
    this.height = 120;
  }

  handlerInput() {
    this.game.player.checkCollision();
    this.game.player.speedY = 8;
    if (this.game.player.frameX > 8) {
      this.game.player.setState(states.IDLING);
    }
  }
}

export class Climbing extends State {
  constructor(game) {
    super(game, "CLIMBING");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/climb.png";
    this.width = 70.5;
    this.height = 116;
  }
}

export class Dying extends State {
  constructor(game) {
    super(game, "DYING");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/dead.png";
    this.width = 120.5;
    this.height = 125;
  }
}

export class Gliding extends State {
  constructor(game) {
    super(game, "GLIDING");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/glide.png";
    this.width = 110.8;
    this.height = 114;
  }

  handlerInput(input) {
    this.game.player.speedY = 5;
    if (this.game.player.onGround()) this.game.player.setState(states.IDLING);
    else if (input.includes("z")) this.game.player.setState(states.JUMPTHROW);
  }
}

export class Throwing extends State {
  constructor(game) {
    super(game, "THROWING");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/throw.png";
    this.width = 94.3;
    this.height = 113;
  }

  handlerInput() {
    this.game.player.checkCollision();
    if (this.game.player.frameX > 8) {
      this.game.player.setState(states.IDLING);
    }
  }
}

export class JumpThrow extends State {
  constructor(game) {
    super(game, "JUMPTHROW");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/jump_throw.png";
    this.width = 90;
    this.height = 108;
  }

  handlerInput() {
    this.game.player.checkCollision();
    if (this.game.player.frameX > 8) {
      this.game.player.speedY = 10;
      this.game.player.setState(states.IDLING);
    }
  }
}

export class Jumping extends State {
  constructor(game) {
    super(game, "JUMPING");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/jump.png";
    this.width = 90.5;
    this.height = 121;
  }

  handlerInput(input) {
    this.game.player.speedY = -20;
    this.game.player.x += this.game.player.speedX;
    if (this.game.player.frameX > 3) {
      this.game.player.speedY = 20;
      if (input.includes("ArrowDown"))
        this.game.player.setState(states.GLIDING);
      else if (input.includes("z"))
        this.game.player.setState(states.JUMPATTACK);
      else if (input.includes("ArrowLeft"))
        this.game.player.setState(states.VANISHING);
    }
    if (this.game.player.frameX > 8) {
      this.game.player.speedY = 0;
      if (input.includes("ArrowRight"))
        this.game.player.setState(states.SLIDING);
      else this.game.player.setState(states.IDLING);
    }
  }
}

export class Sliding extends State {
  constructor(game) {
    super(game, "SLIDING");
    this.image = new Image();
    this.image.src = "./assets/img/ninja_man/slide.png";
    this.width = 93.3;
    this.height = 88;
  }

  handlerInput() {
    this.game.player.speedY = 10;
    this.game.player.x += this.game.player.speedX;
    if (this.game.player.frameX > 8) {
      this.game.player.setState(states.IDLING);
    }
  }
}

export class Vanishing extends State {
  constructor(game) {
    super(game, "VANISHING");
    this.image = new Image();
    this.image.src = "./assets/img/effects/boom.png";
    this.width = 128.8;
    this.height = 115;
  }

  handlerInput(input) {
    this.game.sound1.play();
    if (this.game.player.frameX > 5) {
      this.game.player.x -= this.game.player.width;
      this.game.player.setState(states.IDLING);
      if (input.includes("z")) this.game.player.setState(states.THROWING);
    }
  }
}
