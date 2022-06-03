import init, { World, Direction } from "snake_game";

init().then(_ => {

    const CELL_SIZE = 20;
    const WORLD_WIDTH = 8;
    const snakeSpawnIdx = Date.now() % (WORLD_WIDTH * WORLD_WIDTH);
    const world = World.new(WORLD_WIDTH, snakeSpawnIdx);
    const worldWith = world.width();
    const canvas = document.getElementById('snake-canvas');
    const context = canvas.getContext("2d");
    canvas.height = worldWith * CELL_SIZE;
    canvas.width = worldWith * CELL_SIZE;

    document.addEventListener("keydown", (event) => {
        // console.log(event.code);

        switch (event.code) {
            case "ArrowUp":
                world.change_snake_direction(Direction.Up);
                break;
            case "ArrowRight":

                world.change_snake_direction(Direction.Right);
                break;
            case "ArrowDown":
                world.change_snake_direction(Direction.Down);

                break;
            case "ArrowLeft":
                world.change_snake_direction(Direction.Left);

                break;
        }
    })

    function drawWorld() {
        context.beginPath();
        for (let x = 0; x < worldWith + 1; x++) {
            context.moveTo(CELL_SIZE * x, 0);
            context.lineTo(CELL_SIZE * x, worldWith * CELL_SIZE)
        }

        for (let y = 0; y < worldWith + 1; y++) {
            context.moveTo(0, CELL_SIZE * y);
            context.lineTo(worldWith * CELL_SIZE, CELL_SIZE * y);

        }
        context.stroke();
    }

    function drawSnake() {
        const snakeIdx = world.snake_head_idx();
        const col = snakeIdx % worldWith;
        const row = Math.floor(snakeIdx / worldWith);
        context.beginPath();
        context.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE);
        context.stroke();
    }

    function paint() {
        drawWorld();
        drawSnake();
    }

    function update() {
        const fps = 5;
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            world.update();
            paint();

            // the requestAnimationFrame take a call back to be invoke before the next repaint
            requestAnimationFrame(update);
        }, 1000 / fps);
    }

    paint();
    update();


})

