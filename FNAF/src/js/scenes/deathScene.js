'use strict';
var Const = require ('../const.js');

var DeathScene =
{
    preload: function()
    {
        this.var = new Const();
        this.game.sound.stopAll();
    },

    create: function()
    {
        //---------------------------------------------------SOUND--------------------------------------------------------
        var sound = this.game.add.audio('deathSound');
        sound.play();
        
        //-------------------------------------------------FREDDY IMAGE---------------------------------------------------
        var freddy = this.game.add.sprite(this.var._freddyPosX, this.var._freddyPosY, 'freddyMenu');
        
        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;

        //----------------------------------------------------GAME OVER TEXT-----------------------------------------------
        this.game.time.events.add(2000, function ()
        { 
            this.game.add.sprite(this.var._gOTextPosX, this.var._gOTextPosY, 'gameOverText'); 
        }, this);

        //---------------------------------------------------RETURN MENU-----------------------------------------------------
        this.game.time.events.add(10000, function()
        { 
            this.game.state.start('menu'); 
        }, this);
    }
    
};

module.exports = DeathScene;