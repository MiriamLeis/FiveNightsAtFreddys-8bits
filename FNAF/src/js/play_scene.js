'use strict';

  require('./Animatronics.js');

var PlayScene = {
    create: function () {

      var pathBonnie = [6];
      pathBonnie[0] = new Room ('backStage',pathBonnie[1],null,null);
      
      console.log(pathBonnie[0]._number);
      //  var holi = new Monitor();
        //holi.hola();

        
        this.game.add.sprite(0,0,'carta');
        //this.game.state.start('office');
    }
  };

  module.exports = PlayScene;
