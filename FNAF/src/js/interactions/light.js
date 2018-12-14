'use strict';

var Interact = require('./Interactions.js');
var Const = require('../const.js');

function Light(game, posXButton, posYButton, sprite, animSprite, anim, sound, errorSound, windowscare)
{
    this.var = new Const();
    Interact.apply(this, [sound, errorSound]);

    this.light = sprite;
    this.light.visible = false;

    this.button = game.add.button(posXButton, posYButton, 'buttonLight', function(){ this.turnOff() }, this);

    this.animSprite = animSprite;
    this.animSprite.alpha = 0;

    this.anim = anim;

    this.windowscareAlreadySound = false;

    //Sounds
    this._sound.loop = true;
    this._windowscare = windowscare;
};

Light.prototype = Object.create(Interact.prototype);
Light.prototype.constructor = Light;

Light.prototype.reset = function()
{
    this.resetInteract();
    this.button.frame = 0;
    this.light.visible = false;
    this.animSprite.alpha = 0;
}
Light.prototype.turnOff = function() 
{
    if (!this._block)
    {
        this.changeActive();
        if(this._active)
        {
            this._sound.play();
            this.button.frame = 1;
            this.light.visible = true;
            
            if(this.anim.isAttacking())
            {
                this.animSprite.alpha = 1;
                if (!this.windowscareAlreadySound)
                {
                    this._windowscare.play();
                    this.windowscareAlreadySound = true;
                }
            }
            else
            {
                if (this.windowscareAlreadySound)
                    this.windowscareAlreadySound = false;
            }
        }
        else
        {
            this._sound.stop();
            this.button.frame = 0;
            this.light.visible = false;
            this.animSprite.alpha = 0;
        }
    }
    else
        this._errorSound.play();
}
Light.prototype.enabledInput = function(b)
{
    this._block = !b;
}
module.exports = Light;
