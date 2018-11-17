'use strict';

function Battery(sprite)
{
    this.sprite = sprite;
    this.sprite.fixedToCamera = true;

    this.restBattery = 100;
    this.batteryUssage = 1;
    this.timeToChange = 10000;

    this.times = [];

    this.times.push(10000);
    this.times.push(5000);
    this.times.push(3000);
    this.times.push(2000);
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

Battery.prototype.changeBetteryTime = function() 
{
    this.timeToChange = this.timeToChange +this.times[this.batteryUssage - 1];
}


Battery.prototype.increaseBatteryUsage = function() 
{
    if(this.batteryUssage < 4)
    {
        this.batteryUssage++;
        this.timeToChange = this.timeToChange - this.times[this.batteryUssage - 1];

        this.sprite.frame = this.batteryUssage -1;
    }
    else 
        this.batteryUssage++;
}

Battery.prototype.decreaseBatteryUsage = function() 
{
    if(this.batteryUssage > 1)
    {
        this.batteryUssage--;
        this.timeToChange = this.timeToChange+ this.times[this.batteryUssage - 1];

        this.sprite.frame = this.batteryUssage - 1;
    }
}

// Este metodo lo controla el update de la GameScene 
Battery.prototype.decreaseBattery = function() 
{
    if(this.restBattery > 0)
        this.restBattery--;
}