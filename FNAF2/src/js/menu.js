'use strict';

var Menu = {

    preload: function()
    {
        
    },

    create: function () {
        var myimage = this.game.add.sprite(0,0,'carta');

        //this.game.state.start('office');
        myimage.scale.setTo(0.3,0.3);

        button = this.game.add.button(this.game.world.centerX, 200, 'carta', this.clickME, this,0,1,0);
    }

  };


  module.exports = Menu;