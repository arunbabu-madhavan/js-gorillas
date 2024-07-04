
export function createDashBoardLayer(font, gameEnv, context) {
    const LINE1 = font.size;
    const LINE2 = font.size * 2.5;
    const LINE3 = font.size * 3.5;



    return function drawDashBoard(context) {
        context.fillStyle = "#01055d";
        context.fillRect(0, 0, 100, 24);
        const players = gameEnv.controller.players;

        context.fillStyle = "white";
        context.font = "16px Lucida Console";
        const currentPlayer = gameEnv.controller.currentPlayer;

        if (!gameEnv.controller.winningPlayer) {
            context.fillText(players[0].name, 0, LINE1);
            context.fillText(`Angle: ${players[0].angle}`, 0, LINE2);
            context.fillText(`Velocity: ${players[0].velocity}`, 0, LINE3);

            context.fillText(players[1].name, 1024 - ((players[1].name.length) * 16), LINE1);
            context.fillText(`Angle: ${players[1].angle}`, 1024 - ((players[1].name.length + 6) * 16), LINE2);
            context.fillText(`Velocity:  ${players[1].velocity}`, 1024 - ((players[1].name.length + 6) * 16), LINE3);


            if (!currentPlayer.entity.thrower.throwAngle) {
                context.fillText(`${currentPlayer.name}'s turn, Input Angle`, 0, 764)
                currentPlayer.elems.angleElem.focus();
            }
            else if (!currentPlayer.entity.thrower.throwSpeed) {
                context.fillText(`${currentPlayer.name}'s turn, Input Velocity`, 0, 764)
                currentPlayer.elems.powerElem.focus();
            }
        }
        else{
            context.fillText(`${gameEnv.controller.winningPlayer.name} won!!!!!`, 0, 764)
        }



    }

}