'use strict';

  require('./interactions.js');

var Menu = {
    create: function () {

        var holi = new Monitor(); 
        holi.hola();
      //  var holi = new Monitor();
        //holi.hola();

        
        this.game.add.sprite(0,0,'carta');
        //this.game.state.start('office');
    }
  };

  module.exports = Menu;