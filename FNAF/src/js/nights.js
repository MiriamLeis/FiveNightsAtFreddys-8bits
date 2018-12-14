'use strict';

var Const = require('./const.js');

//meter phoneGuy
function Night(game, spriteDec, spriteU, numberNight)
{
    this.var = new Const();
    this.game = game;
    
    //Control del paso de hora y noches
    if(!localStorage.getItem('numNight'))
        this._night = 1;
    else
        this._night = JSON.parse(localStorage.getItem('numNight'));

    this._hour = 0;
    this._hourArr = [12,1,2,3,4,5,6];

    this.spriteU = spriteU;
    this.spriteDec = spriteDec;
    this.spriteNight = numberNight;

    this.spriteU.fixedToCamera = true;
    this.spriteDec.fixedToCamera = true;
    this.spriteNight.fixedToCamera = true;
    
    this.spriteU.frame = 2;
    this.spriteDec.frame = 1;
    this.spriteNight.frame = this._night;

    this.spriteU.scale.setTo(this.var._spriteNightNumScale, this.var._spriteNightNumScale);
    this.spriteDec.scale.setTo(this.var._spriteNightNumScale, this.var._spriteNightNumScale);
    this.spriteNight.scale.setTo(this.var._spriteNightScale,this.var._spriteNightScale);
}
Night.prototype.reset = function(doorR, doorL, lightR, lightL, battery)
{
    doorR.reset();
    doorL.reset();
    lightR.reset();
    lightL.reset();
    battery.reset();
}
Night.prototype.getNight = function() 
{
    return this._night;
}
Night.prototype.startNight = function()
{
    //animacion hora al terminar
}
Night.prototype.finishNight = function()
{
    if(this._night <= 6)
    {
        this._night++;
        localStorage.setItem("numNight", JSON.stringify(this._night));
    }       
        this.game.state.start('win');
}
Night.prototype.changeHour = function(battery)
{
    this.spriteDec.alpha = 0;
    this._hour++;
    this.spriteU.frame = this._hourArr[this._hour];

    if(this._hour == 6)
    {
        this.finishNight();
    }
}
module.exports = Night;