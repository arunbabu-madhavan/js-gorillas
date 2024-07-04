import { loadSpritesheet } from "../loaders.js";
import { Entity } from "../entity.js"
import Killable from "../traits/killable.js";
import Destoryer from "../traits/Destoryer.js";
import Solid from "../traits/Solid.js";
import Gravity from "../traits/gravity.js";
import Physics from "../traits/Physics.js";
import Throwable from "../traits/throwable.js";

export function loadBanana(explosionCreator){
   
    return loadSpritesheet("banana")
    .then(x=>createBananaFactory(x,explosionCreator));
     
 }
 
function createBananaFactory(sprite,explosionCreator){

    const moveAnim = sprite.animations.get('move');

    function routeFrame(entity){
        if((entity.killable && entity.killable.dead))
            entity.pos.y = 9999;

        return moveAnim(entity.lifeTime)
    }

function drawBanana(context){
    sprite.draw(routeFrame(this),context,0,0);
}

return function createBanana(dir){

    const banana = new Entity(10,11);
    banana.addTrait(new Solid());
    banana.addTrait(new Physics());
    banana.addTrait(new Gravity());
    banana.addTrait(new Destoryer(explosionCreator));
    banana.addTrait(new Killable());
    banana.addTrait(new Throwable(dir));

    banana.pos.set(32, 40);
    banana.draw = drawBanana;

    return banana;
}
}
