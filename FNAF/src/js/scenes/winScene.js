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
        //--------------------------------------------------HORA-----------------------------------------------
        this.hourText = this.game.add.sprite(this.var._winTextX, this.var._winTextY, 'win');
        this.hourText.scale.setTo(0.5,0.5);
        this.hourText.animations.add('hola');
        this.hourText.animations.play('hola', 1, false);

        

        //---------------------------------------------------CHANGE SCENE-----------------------------------------------------
        this.game.time.events.add(3000, function()
        {
            /*this._night = JSON.parse(localStorage.getItem('numNight'));
            if(this._night == 6)
            {
                this.winText = this.game.add.sprite(this.var._winTextX, this.var._winTextY, 'end');

                this.game.time.events.add(3000, function()
                {
                    this.game.state.start('menu');
                },this);
            }
            else*/
                this.game.state.start('game');
        },this);
    }
    
};

module.exports = WinScene;