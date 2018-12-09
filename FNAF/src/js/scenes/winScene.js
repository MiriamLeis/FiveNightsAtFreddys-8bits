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
        this.hourText = this.game.add.sprite(this.var._winTextX, this.var._winTextY, 'manyTexts', 3);

        this.nmumber = this.game.add.sprite(this.var._winNumberX , this.var._winNumberY, 'numbers', 6)
        this.nmumber.scale.setTo(this.var._winNumberScale,this.var._winNumberScale);
        //---------------------------------------------------CHANGE SCENE-----------------------------------------------------
        this.game.time.events.add(3000, function()
                    {
                        this.game.state.start('game');
                    },this);
    }
    
};

module.exports = WinScene;