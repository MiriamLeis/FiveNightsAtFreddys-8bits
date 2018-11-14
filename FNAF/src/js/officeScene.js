'use strict';

//var Interaction = require('./Interactions.js');

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

        //Door and light buttons
        var lightLeft = new Light(this.game, 56, 60, 34, 94, 'leftLight');
        var lightRight = new Light(this.game, 68.5*4 + tamX+ tamX/2, 61.5, 92 +tamX + tamX/3, 94, 'rightLight');

        var doorLeft = new Door(this.game, 281.25, 27, 180, 77.25);
        var doorRight = new Door(this.game, tamX + 225 * 2, 27, tamX + 173 * 2, 77.25);
        
        

        //Monitor button
        var goToCameras = this.game.add.button(800/2 - 316.8/2, 600 - 66 - 10, 'buttonMonitor', function() {changeScene(this.game)}, this, 1, 0);
        goToCameras.scale.setTo(0.8, 1);
        goToCameras.alpha = 0.4;

        goToCameras.fixedToCamera = true;

        //Side edges
        moveLeft = this.game.add.sprite(0, 0, 'sideEdge');
        moveLeft.inputEnabled = true;
        moveRight = this.game.add.sprite(792 - 45 , 0, 'sideEdge');
        moveRight.inputEnabled = true;

        moveRight.fixedToCamera = true;
        moveLeft.fixedToCamera = true;
    },

    update: function()
    {
        if (moveLeft.input.pointerOver())
            this.game.camera.x =  this.game.camera.x - 10;
        else if (moveRight.input.pointerOver())
            this.game.camera.x = this.game.camera.x + 10;
    }
}

function changeScene(game)
{
    game.state.start('cameras');
}


module.exports = OfficeScene;