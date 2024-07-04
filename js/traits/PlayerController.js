import Trait from './Trait.js'
import { Vec2 } from '../math.js';


export class PlayerController extends Trait {
    constructor() {
        super('controller');
        this.players = [];
        this.currentPlayer = null;
        this.winningPlayer = null;
    }

    nextTurn() {
        this.currentPlayer = this.players.find(x => x.entity != this.currentPlayer.entity);
    }

    setWinningExplosion(explosion) {
        this.explosion = explosion;
    }

    setPlayer(name, entity, pos, direction, elems) {
        const player = { name, entity, angle: '', velocity: '', elems };
        this.players.push(player)
        entity.pos.x = pos.x;
        entity.pos.y = pos.y;

        if (!this.currentPlayer) {
            this.currentPlayer = player;
        }

        player.entity.thrower.setDirection(direction);

        player.entity.thrower.onThrowComplete = () => {
            this.nextTurn();
            this.currentPlayer.entity.thrower.resetInput();
            this.currentPlayer.angle = ''
            this.currentPlayer.velocity = ''
            this.currentPlayer.elems.powerElem.value = ''
            this.currentPlayer.elems.angleElem.value = ''
        }

        player.entity.killable.onDead = () => {
            this.winningPlayer = this.players.find(x => x.entity != entity);
            this.winningPlayer.entity.mc.wins();
        }


        elems.powerElem.addEventListener('keyup', (evt) => this.setPlayerVelocity(evt))
        elems.angleElem.addEventListener('keyup', (evt) => this.setPlayerAngle(evt))

    }

    setPlayerAngle(evt) {
        let angle = evt.target.value;
        if (!this.currentPlayer.entity.thrower.throwAngle) {
            this.currentPlayer.angle = angle;
        }
        const { code } = evt;
        if (code == 'Enter') {
            this.currentPlayer.entity.thrower.setThrowAngle(evt.target.value);
        }
    }

    setPlayerVelocity(evt) {
        let speed = evt.target.value;
        if (!this.currentPlayer.entity.thrower.throwSpeed) {
            this.currentPlayer.velocity = speed;
        }
        const { code } = evt;

        if (code == 'Enter') {
            this.currentPlayer.entity.thrower.setThrowSpeed(evt.target.value);
        }
    }

    update(entity, deltaTime, level) {
        this.players.forEach(player => {
            if (!level.entities.has(player.entity)) {
                level.entities.add(player.entity);
            }
        });

        if (this.winningPlayer) {
            const losingPlayer = this.players.find(x => x != this.winningPlayer);
            this.explosion.pos.set(losingPlayer.entity.pos.x, losingPlayer.entity.pos.y + 24);
            if (!level.entities.has(this.explosion)) {
                level.entities.add(this.explosion);
            }
        }
    }
    setCheckPoint() {

    }

}



