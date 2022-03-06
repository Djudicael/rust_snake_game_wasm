import init, { World } from "snake_game";

init().then(_ => {

    const CELL_SIZE = 10;
    const world = World.new();
    const worldWith = world.width();
    const canvas = document.getElementById('snake-canvas');
    const context = canvas.getContext("2d");
    canvas.height = worldWith * CELL_SIZE;
    canvas.width = worldWith * CELL_SIZE;

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

    drawWorld();
    drawSnake();

    setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawWorld();
        drawSnake();
        world.update();
    }, 100);

})

