
export function createSpriteLayer(entities, width = 64,height = 64)
{ 
    const spriteBuffer = document.createElement('canvas');
    spriteBuffer.width = width;
    spriteBuffer.height = height;

    const spriteBufferContext = spriteBuffer.getContext('2d');

    return function drawSpriteLayer(context){
        entities.forEach(entity => {
            spriteBufferContext.clearRect(0,0,width,height);
             entity.draw(spriteBufferContext);
             context.drawImage(
                 spriteBuffer,entity.pos.x,
                 entity.pos.y
             )
        });
    }
}
