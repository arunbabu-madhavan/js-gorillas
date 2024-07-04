
import BoundingBox from './boundingbox.js';
import {Vec2} from './math.js'
export const Sides ={
    TOP: 1,
    BOTTOM: 2,
    LEFT: 3,
    RIGHT: 4
}

export class Entity{
    constructor(width,height)
    {
        this.pos = new Vec2(0,0);
        this.width = width, 
        this.height =height;
        this.size = new Vec2(width, height);
        this.vel = new Vec2(0,0);
        this.traits = [];
        this.lifeTime = 0;
        this.bounds = new BoundingBox(this.pos,this.size);
    }   

    draw()
    {
    
    }
    
    finalize()
    {
        this.traits.forEach(trait => trait.finalize());
    }

    
    addTrait(trait)
    {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime,level)
    {
        this.traits.forEach(trait => {
            trait.update(this,deltaTime,level);
        });
        this.lifeTime += deltaTime;

        if(this.killable && this.pos.y > 900  )
        {
            this.killable.kill();
        }

    }

    draw()
    {
    
    }

    obstruct(side,type,match)
    {
        this.traits.forEach(trait => {
            trait.obstruct(this,side,type,match);
        });
    }

    collides(candidate)
    {
        this.traits.forEach(trait => {
            trait.collides(this,candidate);
        });
    }

    addTrait(trait)
    {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    
}
