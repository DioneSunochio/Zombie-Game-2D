export class InputHandler {
  constructor() {
    this.keys = [];
    document.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "z") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });
    document.addEventListener("keyup", (e) => {
      if (
        (e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowDown" ||
          e.key === "z") &&
        this.keys.indexOf(e.key) !== -1
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
