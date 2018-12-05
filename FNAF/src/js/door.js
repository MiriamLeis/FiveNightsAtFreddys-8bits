'use strict';

var Interact = require('./Interactions.js');

function Door(game, posXButton, posYButton, posXDoor, posYDoor)
{
    Interact.apply(this);
    
    var doorOpen = game.add.sprite(posXDoor, posYDoor, 'doorOpen', 2);
    var doorOpenAnim = doorOpen.animations.add('open');
    
    var doorClose = game.add.sprite(posXDoor, posYDoor, 'doorClose');
    var doorCloseAnim = doorClose.animations.add('close');

    var button = game.add.button(posXButton, posYButton, 'buttonDoor', function(){this.actionOnClick(button, doorOpenAnim, doorCloseAnim)}, this);
};

Door.prototype = Object.create(Interact.prototype);
Door.prototype.constructor = Door;

Door.prototype.actionOnClick = function(button, doorAnimOp, doorAnimClos) 
{
    this.changeActive();
    if (this._active)
    {
        button.frame = 1;
        doorAnimOp.frame = 2;
        doorAnimClos.play(10, true);
        doorAnimClos.loop = false;
    }
    else
    {
        button.frame = 0;
        doorAnimClos.frame = 0;
        doorAnimOp.play(10, true);
        doorAnimOp.loop = false;
    }
}


module.exports = Door;