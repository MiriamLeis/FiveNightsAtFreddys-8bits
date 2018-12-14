'use strict';

var Interact = require('./Interactions.js');

function Door(game, posXButton, posYButton, posXDoor, posYDoor, sound, errorSound)
{
    Interact.apply(this, [sound, errorSound]);
    
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
        this._sound.play();
        this.resetInteract();
        this.button.frame = 0;
        this.doorCloseAnim.frame = 0;
        this.doorOpenAnim.play(10, true);
        this.doorOpenAnim.loop = false;
    }
}
Door.prototype.actionOnClick = function() 
{
    if (!this._block)
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
    else
        this._errorSound.play();
}
Door.prototype.enabledInput = function(b)
{
    this._block = !b;
}

module.exports = Door;