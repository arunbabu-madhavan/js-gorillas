import {loadImage} from './loaders.js'
import SpriteSheet from './spritesheet.js'


const CHARS = "ABCDEFIJKLMNOPQRSTUVWXYZ1234567890GH :";


class Font {
    constructor(sprites, size) {
        this.sprites = sprites;
        this.size = size;
    }

    print(text, context, x, y) {
    
        [...text].forEach((char, pos) => {
            try{
            this.sprites.draw(char, context, x + (pos * this.size), y);
            }
            catch
            {
                console.log(char)
            }
        });
    }
}



export function loadFont()
{
    return loadImage('atlas/fs.png')
        .then(image => {
            const fontSprite = new SpriteSheet(image,16,16);

            const size = 16;
            for (let [index, char] of [...CHARS].entries()) {
                const x = index * size;
                const y = 0
                fontSprite.define(char, x, y, size, size);
            }
    
            return new Font(fontSprite, size);
        });
}
