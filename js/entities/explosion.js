import { loadSpritesheet } from "../loaders.js";
import { Entity } from "../entity.js"

export function loadexplosion(){
   
    return loadSpritesheet("explosion")
    .then(x=>createExplosionFactory(x));
     
 }
 
function createExplosionFactory(sprite){

    const moveAnim = sprite.animations.get('explode');
    function routeFrame(entity){
        if(entity.exploded)
            return 'step-7';
        var step = moveAnim(entity.lifeTime)
        if(step === 'step-7')
            entity.exploded = true;
        return step;
    }

function drawExplosion(context){
    sprite.draw(routeFrame(this),context,0,0);
}

return function createExplosion(){

    const exp = new Entity(24,24);

    exp.pos.set(32, 40);
    exp.draw = drawExplosion;

    return exp;
}
}
