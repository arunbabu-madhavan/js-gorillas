
import SpriteSheet from './spritesheet.js';
import Matrix from './math.js'
import { createAnimation } from './animation.js';
import { Level } from './level.js'
import { createBackgroundLayer } from './layers/background.js';
import { createSpriteLayer } from './layers/sprite.js';

export function loadImage(url){
    return new Promise(resolve =>{
        const image = new Image();
        image.onload = () =>{
            resolve(image);
        };
        image.src = url;
    });
}

export function LoadJSON(url){
   return fetch(url)
    .then(r=>r.json());
}

export function loadSpritesheet(name){
   return LoadJSON(`sprites/${name}.json`)
                .then(sheetSpec =>  Promise.all([sheetSpec,loadImage(sheetSpec.imageUrl)])
                    .then(([sheetSpec,image])=>{
                        const sprites = new SpriteSheet(image,sheetSpec.tileW,sheetSpec.tileH);
                    if(sheetSpec.tiles) {
                        sheetSpec.tiles.forEach(tileSpec =>{
                            try{sprites.defineTile(tileSpec.name
                                ,tileSpec.index[0],tileSpec.index[1]);

                            }catch{
                                console.log(tileSpec.name)
                            }
                        });
                    }
                    if(sheetSpec.frames) {
                        sheetSpec.frames.forEach(frameSpec => {
                            sprites.define(frameSpec.name,...frameSpec.rect);
                        });
                    }
                    if(sheetSpec.animations) {
                        sheetSpec.animations.forEach(animSpec => {
                            const animation = createAnimation(animSpec.frames,animSpec.frameLen);
                            sprites.defineAnimation(animSpec.name,animation);
                        });
                    }
            
                return sprites;
   }));
}



function setupBackground(levelSpec, level, bgsprites) {
    levelSpec.layers.forEach(layer => {
        const backgroundGrid = createBackgroundGrid(layer.tiles);
        const backgroundLayer = createBackgroundLayer(level, backgroundGrid, bgsprites);
        level.compositor.layers.push(backgroundLayer);
    });
}

function createBackgroundGrid(tiles) {
    const grid = new Matrix();
    for (const { tile, x, y } of expandTiles(tiles)) {
        grid.set(x, y, {
            name: tile.name
        });
    }
    return grid;
}



function* expandTiles(tiles) {

    for (const tile of tiles) {
        for (const { x, y } of expandRanges(tile.ranges)) {
            yield {
                tile,
                x,
                y
            };
        }

    }
}

function* expandRanges(ranges) {
    for (const range of ranges) {
        yield* expandRange(range);
    }
}

function expandRange(range) {
    if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        return expandSpan(xStart, xLen, yStart, yLen);

    } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        return expandSpan(xStart, xLen, yStart, yLen);

    } else if (range.length === 2) {
        const [xStart, yStart] = range;
        return expandSpan(xStart, 1, yStart, 1);
    }
}

function* expandSpan(xStart, xLen, yStart, yLen) {
    const coords = [];
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
        for (let y = yStart; y < yEnd; ++y) {
           yield({x,y});
        }
    }
}


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function setupCollisionGrid(levelSpec,level){
    
    const mergedTiles = levelSpec.layers.reduce((mergedTiles,layerSpec)=>{
        return mergedTiles.concat(layerSpec.tiles);
    },[]);
    const collisionGrid = createCollisionGrid(mergedTiles);

    level.setCollisionGrid(collisionGrid);
}

function createCollisionGrid(tiles){
    const grid = new Matrix();
    for(const {tile,x,y} of expandTiles(tiles)){
        grid.set(x,y,{
            type:tile.type
        });
    }

    return grid;

}


export function createLevelLoader(entityFactory) {


    return function loadLevel(canvas_width, canvas_height) {
        return LoadJSON(`levels/default.json`).then
            (levelSpec => Promise.all([levelSpec, loadSpritesheet(levelSpec.spritesheet)]))
            .then(([levelSpec, sprites]) => {
                var maxwt = Math.floor(canvas_width / 16) + 10;
                let width = 0;
                for (let i = 0; i + width < maxwt; i += width) {
                    var minht = Math.floor(canvas_height / 16) - 2;
                    width = randomIntFromInterval(4, 6);
                    var height = randomIntFromInterval(10, minht - 3);

                    var buildingColor = ['red-block', 'grey-block', 'cyan-block'][randomIntFromInterval(0, 2)];
                    for (let x = i; x < i + width; x++)
                        for (let y = minht; y > height; y--) {
                            const on = randomIntFromInterval(0, 10) > 7 ? 'off' : 'on';
                            var layer = levelSpec.layers[0].tiles.find(x => x.name === `${buildingColor}-${on}`);
                            layer.ranges.push([x, y])
                        }
                }

                const level = new Level();
                setupCollisionGrid(levelSpec,level);
                setupBackground(levelSpec, level, sprites);
                setupEntities(levelSpec,level,entityFactory);

                return level;
            });
    }
}



function setupEntities(levelSpec,level,entityFactory){

    levelSpec.entities.forEach(({name,pos,offsetY,offsetX}) => {
        const createEntity = entityFactory[name];
        pos.forEach(([x,y])=> {
            const entity = createEntity();
               entity.pos.set(x,y);
               level.entities.add(entity);
               if(offsetY)
                 entity.offset.y = offsetY;
               if(offsetX)
                 entity.offset.x = offsetX;
            
        });
       
    });

    const spriteLayer = createSpriteLayer(level.entities);
    level.compositor.layers.push(spriteLayer);
}
