'use strict';

var Menu = {
    create: function () {
        this.game.add.sprite(0,0,'carta');
        this.game.state.start('oficina');

    }
  };
  module.exports = Menu;