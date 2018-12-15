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
                    this.game.state.start('game');
            }, this);
        },this);
    }
    
};

module.exports = WinScene;