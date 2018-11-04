'use strict';

var Interaction = require('./Interactions.js');

var OfficeScene =
{
    preload: function()
    {

    },

    create: function () 
    {
        doorRight = new DoorLight(this.game.add.button(0, 0, 'bonnie', actionOnClick, this));
        doorLeft = new DoorLight();
        lightRight = new DoorLight();
        lightLeft = new DoorLight();
        monitor = new Monitor();
    },

    update: function()
    {

    }
}

module.exports = OfficeScene;