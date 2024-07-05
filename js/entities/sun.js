import { loadSpritesheet } from "../loaders.js";
import { Entity } from "../entity.js"
import Killable from "../traits/killable.js";
import Trait from "../traits/Trait.js";


class Behavior extends Trait {
    constructor(){
        super('behavior');
    }

    collides(us,them){
        if(us.killable){
            us.killable.kill();
        }
        else if(them.killable){
            them.killable.kill();
        }
    }

  

    update(us, deltaTime){
     
    }
   
}
export function loadSun(){
    return loadSpritesheet("sun")
    .then(x=>createSunFactory(x));
 }
 
function createSunFactory(sunsprite){

    function routeFrame(sun){
        if((sun.killable && sun.killable.dead) || sun.hit)
            return "hit";

        return 'idle';
    }

function drawSun(context){
    sunsprite.draw(routeFrame(this),context,0,0);
}

return function createSun(){

    const sun = new Entity(64,52);
    sun.addTrait(new Killable());
    sun.addTrait(new Behavior());

    
    sun.pos.set(0,20);
    sun.draw = drawSun;

    return sun;
}
}
