'use strict';

var Interact = require('./Interactions.js');
var Const = require('../const.js');

function Light(game, posXButton, posYButton, sprite, animSprite, anim)
{
    this.var = new Const();
    Interact.apply(this);

    this.light = sprite;
    this.light.visible = false;

    this.button = game.add.button(posXButton, posYButton, 'buttonLight', function(){ this.turnOff() }, this);

    this.animSprite = animSprite;
    this.animSprite.alpha = 0;

    this.anim = anim;
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
    this.changeActive();
    if(this._active)
    {
        this.button.frame = 1;
        this.light.visible = true;
        
        if(this.anim.isAttacking())
            this.animSprite.alpha = 1;
    }
    else
    {
        this.button.frame = 0;
        this.light.visible = false;
        this.animSprite.alpha = 0;
    }
}
Light.prototype.enabledInput = function(b)
{
    this.button.inputEnabled = b;
}
module.exports = Light;
