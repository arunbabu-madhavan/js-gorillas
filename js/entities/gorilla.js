import { loadSpritesheet } from "../loaders.js";
import { Entity } from "../entity.js"
import Gravity from "../traits/gravity.js";
import Thrower from "../traits/thrower.js";
import Physics from "../traits/Physics.js";
import Solid from "../traits/Solid.js";
import Killable from "../traits/killable.js";
import MC from "../traits/mc.js";
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

export function loadGorilla(bananaCreator) {

    return loadSpritesheet("gorilla")
        .then(x => createGorillaFactory(x, bananaCreator));

}

function createGorillaFactory(gorillasprite, bananaCreator) {

    const danceAnim = gorillasprite.animations.get('dance');
    const blowAnim = gorillasprite.animations.get('blown');

    function routeFrame(gorilla) {
        if (gorilla.killable && gorilla.killable.dead)
            return 'empty'

        if (gorilla.thrower.throwing) {
            if (gorilla.thrower.direction > 0) {
                return gorilla.thrower.throwAngle > 90 ? 'right' : 'left'
            }
            else{
                return gorilla.thrower.throwAngle > 90 ? 'left' : 'right'
            }
        }

        if (gorilla.mc.win)
            return danceAnim(gorilla.lifeTime);

        return 'idle';
    }

    function drawGorilla(context) {
        gorillasprite.draw(routeFrame(this), context, 0, 0);
    }

    return function createGorilla() {

        const gorilla = new Entity(30, 32)
        gorilla.addTrait(new Solid());
        gorilla.addTrait(new Physics());
        gorilla.addTrait(new Gravity());
        gorilla.addTrait(new Thrower(bananaCreator));
        gorilla.addTrait(new Killable());
        gorilla.addTrait(new MC());
        gorilla.addTrait(new Behavior());

        gorilla.pos.set(128, 400);
        gorilla.draw = drawGorilla;

        return gorilla;
    }
}
