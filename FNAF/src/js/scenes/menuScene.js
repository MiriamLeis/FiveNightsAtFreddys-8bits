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
        
        var click = this.game.add.audio('freddyEndSong');
        
        //---------------------------------------------------TITLE--------------------------------------------------------
        var title = this.game.add.sprite(this.var._titlePosX, this.var._titlePosY, 'titleText');

        //-------------------------------------------------FREDDY IMAGE---------------------------------------------------
        var freddy = this.game.add.sprite(this.var._freddyPosX, this.var._freddyPosY, 'freddyMenu');

        //---------------------------------------------------IMAGES--------------------------------------------------------
        this.getJob = this.game.add.sprite(0, 0, 'Newspaper');
        this.getJob.alpha = 0;
        this.introNight = [this.game.add.sprite(0, 0, '1Night'),
                            this.game.add.sprite(0, 0, '2Night'),
                            this.game.add.sprite(0, 0, '3Night'),
                            this.game.add.sprite(0, 0, '4Night'),
                            this.game.add.sprite(0, 0, '5Night'),
                            this.game.add.sprite(0, 0, '6Night')]
        this.introNight[0].alpha = 0;
        this.introNight[1].alpha = 0;
        this.introNight[2].alpha = 0;
        this.introNight[3].alpha = 0;
        this.introNight[4].alpha = 0;
        this.introNight[5].alpha = 0;

        //---------------------------------------------------NEW GAME-----------------------------------------------------
        var buttonNewGame = this.game.add.button(this.var._nGPosX, this.var._nGPosY, 'newGameText', function ()
        { 
            click.play();
            localStorage.removeItem('numNight');
            this.game.time.events.add(500, function()
            {
                buttonNewGame.alpha = 0;
                buttonNewGame.inputEnabled = false;
                buttonContinue.alpha = 0;
                buttonContinue.inputEnabled = false;

                this.staticEffect.alpha = 0;
                this.game.sound.stopAll();
                this.getJob.alpha = 1;

                this.game.time.events.add(5000, function()
                {
                    this.introNight[0].alpha = 1;
                    this.game.time.events.add(3000, function()
                    {
                        this.game.state.start('game');
                    }, this);
                }, this);
            }, this);
        }, this, 1, 0, 1);

        //---------------------------------------------------CONTINUE-----------------------------------------------------
        var buttonContinue = this.game.add.button(this.var._contPosX, this.var._contPosY, 'continueText', function ()
        { 
            click.play();
            this.game.time.events.add(500, function()
            {
                buttonNewGame.alpha = 0;
                buttonNewGame.inputEnabled = false;
                buttonContinue.alpha = 0;
                buttonContinue.inputEnabled = false;

                this.staticEffect.alpha = 0;
                this.game.sound.stopAll();

                this._night = JSON.parse(localStorage.getItem('numNight'));
                if(this._night == 7)
                {
                    localStorage.setItem("numNight", JSON.stringify(6));
                    this.introNight[5].alpha = 1;
                }
                else if (this._night == null)
                    this.introNight[0].alpha = 1;
                else
                    this.introNight[this._night - 1].alpha = 1;

                this.game.time.events.add(3000, function()
                {
                    this.game.state.start('game');
                }, this);
            }, this);
        }, this, 1, 0, 1);

        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;
    }
    
};

module.exports = Menu;