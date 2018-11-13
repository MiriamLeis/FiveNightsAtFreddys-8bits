'use strict';

var Interaction = require('./Interactions.js');

var moveLeft;
var moveRight;

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
        this.game.camera.x = 396;

        moveLeft = this.game.add.sprite(0, 0, 'sideEdge');
        moveLeft.inputEnabled = true;
        moveRight = this.game.add.sprite(792-45 , 0, 'sideEdge');
        moveRight.inputEnabled = true;

        var goToCameras = this.game.add.button(800/2 - 316.8/2, 600 - 66 - 10, 'buttonMonitor', function() {changeScene(this.game)}, this, 1, 0);
        goToCameras.scale.setTo(0.8, 1);
        goToCameras.alpha = 0.4;


        moveRight.fixedToCamera = true;
        moveLeft.fixedToCamera = true;
        goToCameras.fixedToCamera = true;

      /*  this.doorRight = new DoorLight();
        this.doorLeft = new DoorLight();
        this.lightRight = new DoorLight();
        this.lightLeft = new DoorLight();
        this.monitor = new Monitor();*/
    },

    update: function()
    {
        if (moveLeft.input.pointerOver())
            this.game.camera.x =  this.game.camera.x - 5;
        else if (moveRight.input.pointerOver())
            this.game.camera.x = this.game.camera.x + 5;
    }
}

function changeScene(game)
{
    game.state.start('cameras');
}


module.exports = OfficeScene;