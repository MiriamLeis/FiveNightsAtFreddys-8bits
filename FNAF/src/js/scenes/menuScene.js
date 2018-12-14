'use strict';
var Const = require ('../const.js');

var Menu =
{
    preload: function()
    {
        this.var = new Const();
        this.game.sound.stopAll();
    },

    create: function()
    {
        //---------------------------------------------------SOUND--------------------------------------------------------
        var song = this.game.add.audio('menuSound');
        song.loop = true;
        song.play();
        
        var endMenu = this.game.add.audio('freddyEndSong');
        var click = this.game.add.audio('doorTurnOnOff');
        
        //---------------------------------------------------TITLE--------------------------------------------------------
        var title = this.game.add.sprite(this.var._titlePosX, this.var._titlePosY, 'titleText');

        //---------------------------------------------------NEW GAME-----------------------------------------------------
        var buttonNewGame = this.game.add.button(this.var._nGPosX, this.var._nGPosY, 'newGameText', function ()
        { 
            endMenu.play();
            localStorage.removeItem('numNight');
            this.game.time.events.add(500, function()
            {
                endMenu.play();
                this.game.state.start('game');
            }, this);
        }, this, 1, 0, 1);

        //---------------------------------------------------CONTINUE-----------------------------------------------------
        var buttonContinue = this.game.add.button(this.var._contPosX, this.var._contPosY, 'continueText', function ()
        { 
            endMenu.play();
            this.game.time.events.add(500, function()
            {
                this._night = JSON.parse(localStorage.getItem('numNight'));
                if(this._night == 7)
                {
                    localStorage.setItem("numNight", JSON.stringify(6));
                }
                this.game.state.start('game');
            }, this);
        }, this, 1, 0, 1);

        //-------------------------------------------------FREDDY IMAGE---------------------------------------------------
        var freddy = this.game.add.sprite(this.var._freddyPosX, this.var._freddyPosY, 'freddyMenu');

        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;
    }
    
};

module.exports = Menu;