import { Game } from "./Game.js";

window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  loading.style.display = "none";

  const canvas = document.getElementById("game-container");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 800;

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;

  function animate(stampTime) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = stampTime - lastTime;
    lastTime = stampTime;
    game.draw(ctx);
    game.update(deltaTime);
    requestAnimationFrame(animate);
  }

  animate(0);
});
