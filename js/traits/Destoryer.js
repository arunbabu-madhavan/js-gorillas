import Trait from './Trait.js'
import { Sides } from '../entity.js';
import { Vec2 } from '../math.js';
export default class Destoryer extends Trait {
    constructor(explosionCreator) {
        super('destoryer');
        this.obstructs = true;
        this.destorying = false;
        this.destroyTile = () => { };
        this.explosionTime = 2;
        this.createExplosion = explosionCreator
        this.contactTime = 0;
    }



    obstruct(entity, side, type, match) {
        if (!this.obstructs)
            return;

        entity.vel.x = 0;
        entity.vel.y = 0;
        entity.killable.kill();
        this.queue(() => {
            this.explosion = this.createExplosion();
            if (entity.throwable.dir < 0 && (side === Sides.LEFT || side === Sides.TOP)) {
                this.explosion.pos.set(entity.pos.x - 16 , entity.pos.y);
            }
            else {
                this.explosion.pos.set(entity.pos.x, entity.pos.y);
            }
            this.destorying = true;

        });

        this.destroyTile = () => {
            match.tile.type = 'sky';
            this.destorying = false;
            entity.throwable.onThrowComplete();
        };

    }

    update(entity, deltaTime, level) {

        if (this.destorying) {
            if (!level.entities.has(this.explosion)) {
                level.entities.add(this.explosion);
            }
            this.contactTime += deltaTime;
            if (this.contactTime > this.explosionTime) {
                this.queue(() => {
                    this.destroyTile();
                });
            }
        }

    }

}