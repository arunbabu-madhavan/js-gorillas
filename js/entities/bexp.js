import { loadSpritesheet } from "../loaders.js";
import { Entity } from "../entity.js"

export function loadBigExplosion(){
   
    return loadSpritesheet("bexp")
    .then(x=>createExplosionFactory(x));
     
 }
 
function createExplosionFactory(sprite){

    const moveAnim = sprite.animations.get('explode');
    function routeFrame(entity){
        if(entity.exploded)
            return 'step-9';
        var step = moveAnim(entity.lifeTime)
        if(step === 'step-9')
            entity.exploded = true;
        return step;
    }

function drawExplosion(context){
    sprite.draw(routeFrame(this),context,0,0);
}

return function createExplosion(){

    const exp = new Entity(128,96);

    exp.pos.set(32, 40);
    exp.draw = drawExplosion;

    return exp;
}
}
