'use strict';

function Battery(spriteBar, spriteCent, spriteDec, spriteU)
{
    //Sprite de las barritas
    this.spriteBar = spriteBar;
    this.spriteBar.scale.setTo(0.70, 0.60);
    this.spriteBar.fixedToCamera = true;

    //Sprite de los porcentajes
    this.spriteCent = spriteCent;
    this.spriteCent.scale.setTo(0.6, 0.6);
    this.spriteCent.fixedToCamera = true;

    this.spriteDec = spriteDec;
    this.spriteDec.scale.setTo(0.6, 0.6);
    this.spriteDec.fixedToCamera = true;

    this.spriteU = spriteU;
    this.spriteU.scale.setTo(0.6, 0.6);
    this.spriteU.fixedToCamera = true;

    //Cosillas para el control del tiempo
    this.restBattery = 100;
    this.batteryUssage = 1; //De primeras
    this.timeToChange = 10000; //De primeras
    this.realTimeToChange = 0;

    this.times = [];
    this.times.push(10000);
    this.times.push(5000);
    this.times.push(3000);
    this.times.push(2000);

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
    //his.batteryUssage = 1;
    this.spriteCent.frame = 1;
    this.spriteDec.frame = 0;
    this.spriteU.frame = 0;
}

module.exports = Battery;