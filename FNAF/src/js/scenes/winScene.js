'use strict';
var Const = require ('../const.js');

var WinScene =
{
    preload: function()
    {
        this.var = new Const();
        this.game.sound.stopAll();
    },

    create: function()
    {
        //---------------------------------------------------SOUND--------------------------------------------------------
        var bellrings = this.game.add.audio('bellrings');
        var kidsScream = this.game.add.audio('kidsScream');
        
        //--------------------------------------------------HORA-----------------------------------------------
        this.hourText = this.game.add.sprite(this.var._winTextX, this.var._winTextY, 'win');
        this.hourText.scale.setTo(0.5,0.5);
        this.hourText.animations.add('6am');

        bellrings.play();
        this.hourText.animations.play('6am', 0.9, false);

        //---------------------------------------------------IMAGES--------------------------------------------------------
        this.introNight = [this.game.add.sprite(0, 0, '2Night'),
                            this.game.add.sprite(0, 0, '3Night'),
                            this.game.add.sprite(0, 0, '4Night'),
                            this.game.add.sprite(0, 0, '5Night'),
                            this.game.add.sprite(0, 0, '6Night')]
        this.introNight[0].alpha = 0;
        this.introNight[1].alpha = 0;
        this.introNight[2].alpha = 0;
        this.introNight[3].alpha = 0;
        this.introNight[4].alpha = 0;

        //---------------------------------------------------CHANGE SCENE-----------------------------------------------------
        this.game.time.events.add(9000, function()
        {
            kidsScream.play();
            this.game.time.events.add(7000, function()
            {
                this._night = JSON.parse(localStorage.getItem('numNight'));
                if(this._night == 7)
                {
                    this.winText = this.game.add.sprite(this.var._winTalX, this.var._winTalY, 'end');

                    this.game.time.events.add(7000, function()
                    {
                          this.game.state.start('menu');
                    },this);
                }
                else
                {
                    this.game.sound.stopAll();
                    this.introNight[this._night - 2].alpha = 1;
                    this.game.time.events.add(3000, function()
                    {
                        this.game.state.start('game');
                    }, this);
                }
            }, this);
        },this);
    }
    
};

module.exports = WinScene;