'use strict';

var PlayScene = 
{
  create: function () 
  {   
  
    /*var bonnie = this.game.add.sprite(0,0,'bonnie');
    bonnie.frame = 1;
    var chica = this.game.add.sprite(66,0,'chica');
    chica.frame = 1;*/

    var button = this.game.add.button(0, 0, 'buttonsCameras', actionOnClick, this, 2, 2);

    /*var map = this.game.add.image(0, 0, 'camerasMap');

    console.log (this.game.world.width);
    this.game.world.resize(1000, 1000);
    console.log (this.game.camera.x);*/
  }
};

function actionOnClick()
{
  this.button.frame = 11;
}

  module.exports = PlayScene;
