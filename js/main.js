
import { loadEntities } from "./entities.js";
import { createLevelLoader } from "./loaders.js";
import { Timer } from './timer.js'
import { createDashBoardLayer } from "./layers/dashboard.js";
import { Entity } from "./entity.js";
import { PlayerController } from "./traits/PlayerController.js";
import { loadFont } from "./font.js";
import { Vec2 } from "./math.js";


async function main(canvas) {
    var context = canvas.getContext("2d");
    context.fillStyle = "#01055d";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const [factory, font] = await Promise.all([loadEntities(), loadFont()]);

    const loadLevel = createLevelLoader(factory);
    const level = await loadLevel(canvas.width, canvas.height);

    const gameEnv = await createGameEnvironment(factory);
    level.entities.add(gameEnv);

    level.compositor.layers.push(createDashBoardLayer(font, gameEnv, context));


    const timer = new Timer();
    window.timer = timer;
    timer.update = function update(deltaTime) {
        level.update(deltaTime);
        level.compositor.draw(context);
    }


    window.onfocus = function () { timer.pause = false; };
    window.onblur = function () { timer.pause = true; };
    
    document.getElementById("loader").remove();
    document.getElementById("screen").style.display ="block";
    timer.start();
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



async function createGameEnvironment(factory) {
    const gameEnv = new Entity();

    const playerController = new PlayerController(factory);
    const [gorilla1, gorilla2, bigexp] = await Promise.all([factory.gorilla(), factory.gorilla(), factory.bigExplosion()]);
    const p1XPos = randomIntFromInterval(24,254);
    const p1YPos = randomIntFromInterval(700,921);
    playerController.setPlayer("Player 1", gorilla1, new Vec2(p1XPos, 50), 1, { angleElem: document.getElementById('angle1'),
         powerElem: document.getElementById('power1') });
    playerController.setPlayer("Player 2", gorilla2, new Vec2(p1YPos, 50), -1 ,{ angleElem: document.getElementById('angle2'),
        powerElem: document.getElementById('power2') });
    playerController.setWinningExplosion(bigexp);
    gameEnv.addTrait(playerController);
    return gameEnv;
}

const canvas = document.getElementById('screen');
main(canvas);

