'use strict';
var Const = require ('../const.js');

var DeathScene =
{
    preload: function()
    {
        this.var = new Const();
    },

    create: function()
    {
        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;

        //----------------------------------------------------GAME OVER TEXT-----------------------------------------------
        this.game.time.events.add(2000, function (){ this.game.add.sprite(this.var._gOTextPosX, this.var._gOTextPosY, 'gameOverText'); }, this);

        //---------------------------------------------------RETURN MENU-----------------------------------------------------
        this.game.time.events.add(7000, function (){ this.game.state.start('menu'); }, this);
    }
    
};

module.exports = DeathScene;