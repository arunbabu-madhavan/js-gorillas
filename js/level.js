import Matrix from "./math.js";
import Compositor from "./compositior.js";
import TileCollider from "./tilecollider.js";
import EntityCollider from "./entityCollider.js";
export class Level {
    constructor() {

        this.gravity = 980;
        this.totalTime = 0;
        this.entities = new Set;
        this.compositor = new Compositor();
        this.tiles = new Matrix();
        this.totalTime =  0;
        this.entities = new Set;
        this.entityCollider = new EntityCollider(this.entities);

        this.tileCollider = null;
    }

    setCollisionGrid(matrix){
        this.tileCollider = new TileCollider(matrix);
    }


    update(deltaTime){
        this.entities.forEach(entity =>{
            entity.update(deltaTime,this);
            this.entityCollider.check(entity);
            entity.finalize();

        });

        this.totalTime +=deltaTime;
    }


}
