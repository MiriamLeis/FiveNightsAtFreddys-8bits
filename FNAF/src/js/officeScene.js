'use strict';

var Interaction = require('./Interactions.js');

var OfficeScene =
{
    preload: function()
    {

    },

    create: function () 
    {
        var tamX = this.game.world.width;
        var tamY = this.game.world.height;
        this.game.world.resize(tamX * 2, tamY * 2);

        button = this.game.add.button(0, 0, 'buttonCameras',act(), this);

        var office = this.game.add.sprite(0, 0, 'office');
        this.game.camera.x = 396;
      /*  this.doorRight = new DoorLight();
        this.doorLeft = new DoorLight();
        this.lightRight = new DoorLight();
        this.lightLeft = new DoorLight();
        this.monitor = new Monitor();*/
    },

    update: function()
    {
        if(button.onOverMouseOnly())
            this.game.camera.x--;
    }
}

function act()
{}



module.exports = OfficeScene;