export function createBackgroundLayer(level, tiles, sprites) {
    return function drawBackgroundLayer(context) {
        for (let x = 0; x <= tiles.length(); ++x) {
            const col = tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnimation(tile.name, context, x, y, level.totalTime);
                    } else
                    {
                        sprites.drawTile(tile.name, context, x, y);
                    }

                });
            }
        }
    }
}
