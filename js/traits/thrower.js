import Trait from './Trait.js'

export default class Thrower extends Trait {
  constructor(bananaCreator) {
    super('thrower');
    this.throwing = false;
    this.resetInput();
    this.createBanana = bananaCreator
    this.banana = null;
    this.onThrowComplete = () => {}
    this.onThrow = () => {

    }
  }

  setDirection(direction){
    this.direction = direction;
  }

  setThrowSpeed(throwSpeed) {
    this.throwSpeed = throwSpeed;
    this.queue(() => {
      this.throwing = true;
      this.onThrow();
    }
    );

  }

  setThrowAngle(throwAngle) {
    this.throwAngle = throwAngle || 0;
    this.banana = this.createBanana(this.direction);
    this.banana.throwable.onThrowComplete = () => {
      this.throwing = false;
      this.onThrowComplete();
    }
  }


  resetInput() {
    this.throwSpeed = 0
    this.throwAngle = 0
  }

  obstruct(entity, side, type) {

  }

  update(entity, deltaTime, level) {
    if(!window.level)
      window.level = level;
    if (this.throwing) {
      if(!level.entities.has(this.banana)){
        this.banana.pos.set(entity.pos.x + 2, entity.pos.y - 18);
        level.entities.add(this.banana);
        this.banana.throwable.throw(this.throwSpeed, this.throwAngle);
      }
    }
  }



}