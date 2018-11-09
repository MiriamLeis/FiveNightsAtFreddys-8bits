'use strict';

function Interact (button) 
{
    this._active = false;
    this._button = button;
};

Interact.prototype.getActive = function(){ return this._active; }
Interact.prototype.changeActive = function(){ this._active = !this._active; }
Interact.prototype.getButton = function(){ return this._button; }
Interact.prototype.changeButtonFrame = function(n){ this._button.frame = n; }

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

