'use strict';

var Interact = require('./Interactions.js');

function Door(game, posXButton, posYButton, posXDoor, posYDoor)
{
    Interact.apply(this);
    
    this.doorOpen = game.add.sprite(posXDoor, posYDoor, 'doorOpen', 2);
    this.doorOpenAnim = this.doorOpen.animations.add('open');
    
    this.doorClose = game.add.sprite(posXDoor, posYDoor, 'doorClose');
    this.doorCloseAnim = this.doorClose.animations.add('close');

   this.button = game.add.button(posXButton, posYButton, 'buttonDoor', function(){this.actionOnClick(this.button, this.doorOpenAnim, this.doorCloseAnim)}, this);
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
Door.prototype.enabledInput = function(b)
{
    this.button.inputEnabled = b;
}

module.exports = Door;