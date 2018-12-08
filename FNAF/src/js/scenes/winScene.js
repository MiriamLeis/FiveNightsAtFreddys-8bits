'use strict';
var Const = require ('../const.js');

var WinScene =
{
    preload: function()
    {
        this.var = new Const();
    },

    create: function()
    {
        

        //---------------------------------------------------TITLE--------------------------------------------------------
        //Cambiar imagenes
        //this.title = this.game.add.sprite(this.var._titlePosX, this.var._titlePosY, 'titleText');

        //---------------------------------------------------NEW GAME-----------------------------------------------------
        //Cambiar imagenes
        
        //---------------------------------------------------CONTINUE-----------------------------------------------------
        this.game.time.events.add(10000, function()
                    {
                    this.game.state.start('game');
                    },this);
        //-------------------------------------------------FREDDY IMAGE---------------------------------------------------

        

        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.hourText = this.game.add.sprite(this.var._winTextX, this.var._winTextY, 'manyTexts', 3);

        this.nmumber = this.game.add.sprite(this.var._winNumberX , this.var._winNumberY, 'numbers', 6)
        this.nmumber.scale.setTo(this.var._winNumberScale,this.var._winNumberScale);

        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;
    }
    
};

module.exports = WinScene;