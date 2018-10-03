'use strict';

var Pepe = require('./interactions.js');


var Menu = {
    create: function () {

        Pepe.hola().changeMonitorStatus();

        
        this.game.add.sprite(0,0,'carta');
        //this.game.state.start('office');
    }
  };

  module.exports = Menu;