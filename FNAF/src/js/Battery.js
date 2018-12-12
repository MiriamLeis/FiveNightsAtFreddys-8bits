'use strict';

var Const = require('./const.js');

function Battery(game, spriteBar, spriteCent, spriteDec, spriteU)
{
    this.var = new Const();

    //Sprite de las barritas
    this.spriteBar = spriteBar;
    this.spriteBar.scale.setTo(this.var._spriteBarScaleX, this.var._spriteBarScaleY);
    this.spriteBar.fixedToCamera = true;

    //Sprite de los porcentajes
    this.spriteCent = spriteCent;
    this.spriteCent.scale.setTo(this.var._spriteNumScale, this.var._spriteNumScale);
    this.spriteCent.fixedToCamera = true;

    this.spriteDec = spriteDec;
    this.spriteDec.scale.setTo(this.var._spriteNumScale, this.var._spriteNumScale);
    this.spriteDec.fixedToCamera = true;

    this.spriteU = spriteU;
    this.spriteU.scale.setTo(this.var._spriteNumScale, this.var._spriteNumScale);
    this.spriteU.fixedToCamera = true;

    //Cosillas para el control del tiempo
    this.restBattery = 1;
    this.batteryUssage = 1; //De primeras
    this.timeToChange = this.var._timeToChange1 + game.time.now; //De primeras
    this.realTimeToChange = 0;

    this.times = [];
    this.times.push(this.var._timeToChange1);
    this.times.push(this.var._timeToChange2);
    this.times.push(this.var._timeToChange3);
    this.times.push(this.var._timeToChange4);

    this.spriteCent.frame = 1;
}


Battery.prototype.emptyBattery = function() 
{
    return (this.restBattery == 0);
}

Battery.prototype.tellBattery = function() 
{
    return this.restBattery;
}

Battery.prototype.tellBatteryTime = function() 
{
    return this.timeToChange;
}

Battery.prototype.increaseBatteryUsage = function(time) 
{
    this.batteryUssage++;

    if(this.batteryUssage <= 4)
    {
        this.realTimeToChange = this.timeToChange - time;

        if(this.realTimeToChange > this.times[this.batteryUssage - 1])
            this.timeToChange = time + this.times[this.batteryUssage - 1];

        this.spriteBar.frame = this.batteryUssage -1;
    }
        
}

Battery.prototype.decreaseBatteryUsage = function(time) 
{
    this.batteryUssage--;

    if(this.batteryUssage >= 1 && this.batteryUssage < 4)
    {
        this.realTimeToChange = this.timeToChange - time;
        
        this.timeToChange = time + this.realTimeToChange;

        this.spriteBar.frame = this.batteryUssage - 1;
    }
    else 
    {
        this.realTimeToChange = this.timeToChange - time;

        this.timeToChange = this.timeToChange - this.realTimeToChange +  this.times[3] - (this.times[3] - this.realTimeToChange);
    }
}

// Este metodo lo controla el update de la GameScene 
Battery.prototype.decreaseBattery = function() 
{
    if(this.restBattery > 0)
    {
        this.restBattery--;

        this.spriteCent.frame = 0
        this.spriteDec.frame = Math.trunc(this.restBattery/10);
        this.spriteU.frame = this.restBattery%10;

        if(this.batteryUssage <= 4)
            this.timeToChange = this.timeToChange + this.times[this.batteryUssage - 1];
        else
            this.timeToChange = this.timeToChange + this.times[3];
    }
    else if (this.restBattery == 0)
        this.spriteU.frame = 0;
}

Battery.prototype.reset = function()
{
    this.restBattery = 100;
    this.batteryUssage = 1;
    this.spriteCent.frame = 1;
    this.spriteDec.frame = 0;
    this.spriteU.frame = 0;
}

module.exports = Battery;