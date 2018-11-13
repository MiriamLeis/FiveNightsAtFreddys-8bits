'use strict';

var Interaction = require('./Interactions.js');

var moveLeft;
var moveRight;
var goToCameras;

var OfficeScene =
{
    preload: function ()
    {

    },
    
    create: function () 
    {
        var tamX = 792;
        var tamY = 594;
        this.game.world.resize(tamX * 2, tamY * 2);

        var office = this.game.add.sprite(0, 0, 'office');

        moveLeft = this.game.add.sprite(0, 0, 'barra');
        moveLeft.inputEnabled = true;


        moveRight = this.game.add.sprite(792-45 , 0, 'barra');
        moveRight.inputEnabled = true;

        goToCameras = this.game.add.sprite(530, 300, 'bonnie');
        goToCameras.inputEnabled = true;


        moveRight.fixedToCamera = true;
        moveLeft.fixedToCamera = true;
        goToCameras.fixedToCamera = true;


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
            this.game.camera.x =  this.game.camera.x - 5;
        }
        if (moveRight.input.pointerOver())
        {
            this.game.camera.x = this.game.camera.x + 5;
        }
        if (goToCameras.input.pointerOver())
        {
            this.game.state.start('cameras');
        }
        
    }
}






module.exports = OfficeScene;