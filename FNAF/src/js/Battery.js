'use strict';

function Battery(sprite)
{
    this.sprite = sprite;
    this.sprite.scale.setTo(0.70, 0.60);
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


Battery.prototype.increaseBatteryUsage = function(time) 
{
    if(this.batteryUssage < 4)
    {
        this.batteryUssage++;

        this.realTimeToChange = this.timeToChange - time;

        if(this.realTimeToChange > this.times[this.batteryUssage - 1])
            this.timeToChange = this.timeToChange - this.realTimeToChange + this.times[this.batteryUssage - 1];

        this.sprite.frame = this.batteryUssage -1;
    }
    else 
        this.batteryUssage++;
}

Battery.prototype.decreaseBatteryUsage = function(time) 
{
    if(this.batteryUssage > 1)
    {
        this.batteryUssage--;

        this.realTimeToChange = this.timeToChange - time;

        this.timeToChange = this.timeToChange - this.realTimeToChange + this.times[this.batteryUssage - 1] - ( this.times[this.batteryUssage] - this.realTimeToChange);

        this.sprite.frame = this.batteryUssage - 1;
    }
}

// Este metodo lo controla el update de la GameScene 
Battery.prototype.decreaseBattery = function() 
{
    if(this.restBattery > 0)
    {
        this.restBattery--;
        this.timeToChange = this.timeToChange +this.times[this.batteryUssage - 1];
    }
}