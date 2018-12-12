'use strict';

var Interact = require('./Interactions.js');

function Door(game, posXButton, posYButton, posXDoor, posYDoor, sound)
{
    Interact.apply(this, [sound]);
    
    this.doorOpen = game.add.sprite(posXDoor, posYDoor, 'doorOpen', 2);
    this.doorOpenAnim = this.doorOpen.animations.add('open');
    
    this.doorClose = game.add.sprite(posXDoor, posYDoor, 'doorClose');
    this.doorCloseAnim = this.doorClose.animations.add('close');

   this.button = game.add.button(posXButton, posYButton, 'buttonDoor', function(){this.actionOnClick()}, this);
};

Door.prototype = Object.create(Interact.prototype);
Door.prototype.constructor = Door;

Door.prototype.reset = function()
{
    if (this._active)
    {
        this.resetInteract();
        this.button.frame = 0;
        this.doorCloseAnim.frame = 0;
        this.doorOpenAnim.play(10, true);
        this.doorOpenAnim.loop = false;
    }
}
Door.prototype.actionOnClick = function() 
{
    this._sound.play();
    this.changeActive();
    if (this._active)
    {
        this.button.frame = 1;
        this.doorOpenAnim.frame = 2;
        this.doorCloseAnim.play(10, true);
        this.doorCloseAnim.loop = false;
    }
    else
    {
        this.button.frame = 0;
        this.doorCloseAnim.frame = 0;
        this.doorOpenAnim.play(10, true);
        this.doorOpenAnim.loop = false;
    }
}
Door.prototype.enabledInput = function(b)
{
    this.button.inputEnabled = b;
}

module.exports = Door;