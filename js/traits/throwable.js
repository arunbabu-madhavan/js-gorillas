import Trait from './Trait.js'
import { Sides } from '../entity.js'
export default class Throwable extends Trait {
  constructor(dir) {
    super('throwable');
    this.dir = dir;
    this.velocity = 0;
    this.angle = 0;
    this.queueThrow = true;
    this.onThrowComplete = () => {}
  }


  throw(velocity, angle) {
    this.velocity = velocity;
    this.angle = angle;
    this.queueThrow = true;
  }



  update(entity, deltaTime, level) {

    if (this.queueThrow) {
      entity.vel.y = -(this.velocity * 8 * Math.sin(this.angle * (Math.PI / 180)))
      entity.vel.x = this.dir * 8 * (this.velocity * Math.cos(this.angle * (Math.PI / 180)))
      this.queueThrow = false;
    }

    if(entity.pos.y > 900){
      this.onThrowComplete();
      level.entities.delete(entity);
    }


  }



}