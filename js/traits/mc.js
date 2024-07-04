import Trait from './Trait.js'
export default class MC extends Trait{
    constructor()
    {
      super('mc');
      this.win = false;
      this.onWin = function(){
      
      } 
    }

    wins()
    {
        this.win =  true;
    }
    
    update(entity,deltaTime,level)
    {
    }
    

  
}