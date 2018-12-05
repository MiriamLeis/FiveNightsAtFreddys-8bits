'use strict';

var Interact = require('./Interactions.js');


function Light(game, posXButton, posYButton, posXLight, posYLight,sprite)
{
    Interact.apply(this);

    this.light = game.add.sprite(posXLight, posYLight,sprite);
    this.light.visible = false;

    this.button = game.add.button(posXButton, posYButton, 'buttonLight', function(){this.turnOff()}, this);
};

Light.prototype = Object.create(Interact.prototype);
Light.prototype.constructor = Light;
Light.prototype.turnOff = function() 
{
    this.changeActive();
    if(this._active)
    {
        this.button.frame = 1;
        this.light.visible = true;
    }
    else
    {
        this.button.frame = 0;
        this.light.visible = false;
    }
}
module.exports = Light;
