import { loadBanana } from "./entities/banana.js";
import { loadBigExplosion } from "./entities/bexp.js";
import { loadexplosion } from "./entities/explosion.js";
import { loadGorilla } from "./entities/gorilla.js";
import { loadSun } from "./entities/sun.js";



export function loadEntities() {

    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory
    }



    return Promise.all(
        [
            loadSun().then(addAs('sun')),
            loadexplosion().then(addAs('explosion')),
            loadBigExplosion().then(addAs('bigExplosion'))
        ])
        .then(()=> loadBanana(entityFactories['explosion']).then(addAs('banana')))
        .then(() => loadGorilla(entityFactories['banana']).then(addAs('gorilla')))
        .then(() => entityFactories);
}