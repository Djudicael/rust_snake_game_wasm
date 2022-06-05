import init, { World, Direction } from "snake_game";
import { rnd } from "./utils/random";

init().then(wasm => {

    const CELL_SIZE = 20;
    const WORLD_WIDTH = 8;
    const snakeSpawnIdx = rnd(WORLD_WIDTH * WORLD_WIDTH);
    const world = World.new(WORLD_WIDTH, snakeSpawnIdx);
    const worldWith = world.width();
    const gameControlBtn = document.getElementById('game-control-btn');
    const gameStatus = document.getElementById('game-status');
    const canvas = document.getElementById('snake-canvas');
    const context = canvas.getContext("2d");
    canvas.height = worldWith * CELL_SIZE;
    canvas.width = worldWith * CELL_SIZE;

    gameControlBtn.addEventListener("click", _ => {
        const status = world.game_status();
        if (status === undefined) {
            world.start_game();
            play();
            gameControlBtn.textContent = " Playing ...";
        } else {
            // will reload the browser
            location.reload();
        }
    })



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

    function drawReward() {
        const idx = world.reward_cell();
        const col = idx % worldWith;
        const row = Math.floor(idx / worldWith);
        context.beginPath();
        context.fillStyle = "#FF0000";
        context.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE);
        context.stroke();
        if (idx == 1000) {
            alert("You won");
        }
    }

    function drawSnake() {
        const snakeCells = new Uint32Array(wasm.memory.buffer, world.snake_cells(), world.snake_length());

        // console.log(snakeCells)
        // debugger
        snakeCells.forEach((cellIdx, i) => {
            const col = cellIdx % worldWith;
            const row = Math.floor(cellIdx / worldWith);
            context.fillStyle = i === 0 ? "#7878db" : "#000000";
            context.beginPath();
            context.fillRect(
                col * CELL_SIZE,
                row * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE);
        });

        context.stroke();
    }

    function drawGameStatus() {
        gameStatus.textContent = world.game_status_text();
    }


    function paint() {
        drawWorld();
        drawSnake();
        drawReward();
        drawGameStatus();
    }

    function play() {
        const fps = 10;
        setTimeout(() => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            world.step();
            paint();

            // the requestAnimationFrame take a call back to be invoke before the next repaint
            requestAnimationFrame(play);
        }, 1000 / fps);
    }

    paint();
    play();


})

