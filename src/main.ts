import * as PIXI from "pixi.js";

let moveUp: { [key: string]: boolean } = {};

(async () => {
  const app = new PIXI.Application();
  await app.init({ antialias: true, width: 700, height: 500 });
  document.body.appendChild(app.canvas);

  const player = new PIXI.Graphics().circle(0, 0, 30).fill("green");
  player.x = 200;
  player.y = app.canvas.height / 2;
  player.pivot.set(0.5);
  app.stage.addChild(player);

  const ceil = new PIXI.Graphics().rect(0, 0, app.canvas.width, 20).fill("red");
  app.stage.addChild(ceil);

  const floor = new PIXI.Graphics()
    .rect(0, 0, app.canvas.width, 20)
    .fill("red");
  floor.y = app.canvas.height - floor.height;
  app.stage.addChild(floor);

  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);

  function keyDown(e: KeyboardEvent): void {
    moveUp[e.key] = true;
  }

  function keyUp(e: KeyboardEvent): void {
    moveUp[e.key] = false;
  }

  // function movePlayer(): void {
  //   if (moveUp[" "]) {
  //     player.y -= 5;
  //   } else {
  //     player.y += 5;
  //   }
  // }

  function collide(player: PIXI.Graphics): boolean {
    const playerTop = player.y - player.height / 2;
    const playerBottom = player.y + player.height / 2;

    const ceilBottom = ceil.y + ceil.height;
    const floorTop = floor.y;

    if (playerTop <= ceilBottom || playerBottom >= floorTop) {
      return true;
    } else return false;
  }

  app.ticker.add(() => {
    if (!collide(player)) {
      if (moveUp[" "]) {
        player.y -= 5;
      } else {
        player.y += 5;
      }
    }
  });
})();
