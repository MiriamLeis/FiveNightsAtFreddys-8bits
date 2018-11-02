'use strict';

  require('./animatronics.js');

var PlayScene = 
{
  create: function () 
  {

    var pathBonnie = [6];
    pathBonnie[0] = new Room ('backStage',pathBonnie[1],null,null);
      
    console.log(pathBonnie[0]._number);

        
    var bonnie = this.game.add.sprite(0,0,"bonnie");
    bonnie.frame = 1;
    var chica = this.game.add.sprite(66,0,"chica");
    chica.frame = 1;
  }
};

  module.exports = PlayScene;
