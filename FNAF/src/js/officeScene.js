'use strict';

var Interaction = require('./Interactions.js');

var moveLeft;

var OfficeScene =
{
    preload: function ()
    {

    },
    
    create: function () 
    {
        var tamX = this.game.world.width;
        var tamY = this.game.world.height;
        this.game.world.resize(tamX * 2, tamY * 2);

       

        var office = this.game.add.sprite(0, 0, 'office');


        

        moveLeft = this.game.add.sprite(430, 100, 'bonnie');

        
        

        moveLeft.inputEnabled = true;






        this.game.camera.x = 396;
      /*  this.doorRight = new DoorLight();
        this.doorLeft = new DoorLight();
        this.lightRight = new DoorLight();
        this.lightLeft = new DoorLight();
        this.monitor = new Monitor();*/
    },

    update: function()
    {
        if (moveLeft.input.pointerOver())
        {
            this.game.camera.x--;
        }
    }
}






module.exports = OfficeScene;