
export default class SpriteSheet
{
    constructor(image, width, height){
        this.image = image;
        this.tiles = new Map;
        this.dimensions = new Map;
        this.animations = new Map;
        this.height = height;
        this.width = width;
    }


    defineAnimation(name,animation){
        this.animations.set(name,animation);
    }

    define(name,x,y,width,height){
            const buffer = document.createElement('canvas');
            buffer.width= width;
            buffer.height = height;
            const context =  buffer.getContext('2d');
           
            context.drawImage(this.image,
                       x,y, width, height,
                       0,0, width, height);
        
           this.tiles.set(name,buffer);
         this.dimensions.set(name,{x:width,y:height});
            
             return buffer;
                    

    }

    defineTile(name,x,y){
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name,context,x,y){
        const buffer = this.tiles.get(name);
        context.drawImage(buffer,x,y); 
    }
    clear(context,x,buffer){
        context.clearRect(x=0 , 0, buffer.width, buffer.height);
    }
    clearByName(context,x,name){
        const buffer = this.tiles.get(name);
        context.clearRect(x=0 , 0, buffer.width, buffer.height);
    }
    drawAnimation(name,context,x,y,distance){
        const animation = this.animations.get(name);
        this.drawTile(animation(distance),context,x,y);
    }

    drawTile(name,context,x,y){
       
       this.draw
          (name,context,  (x*  this.width),
                    (y *  this.height));
    }
}