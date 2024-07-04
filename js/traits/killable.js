import Trait from './Trait.js'
export default class Killable extends Trait{
    constructor()
    {
        super('killable');
      this.dead = false;
      this.deadTime = 0;
      this.removeAfter = 6;
      this.onDead = function(){
      }
    }

    kill()
    {
        this.queue(()=> this.dead = true);
        this.dead =  true;
        this.onDead();
    }

    
    update(entity,deltaTime,level)
    {
        if(this.dead){
            entity.vel.x = 0;
            entity.vel.y = 0;
            this.deadTime +=deltaTime;
            if(this.deadTime > this.removeAfter){
                this.queue(() => {if(this.dead) level.entities.delete(entity)});
            }
          }
    }
    

  
}