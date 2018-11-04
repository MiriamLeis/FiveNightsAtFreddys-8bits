'use strict';

function Interact (button) 
{
    this._active = false;
    this._button = button;
};

function DoorLight(button)
{
    Interact.apply(this,[button]);
};

DoorLight.prototype = Object.create(Interact.prototype);
DoorLight.prototype.constructor = DoorLight;

function Monitor (button)
{
    Interact.apply(this,[button]);
};

Monitor.prototype = Object.create(Interact.prototype);
Monitor.prototype.constructor = Monitor;
