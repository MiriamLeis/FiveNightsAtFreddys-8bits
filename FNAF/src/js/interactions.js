'use strict';

function Interact (button) 
{
    this._active = false;
    this._button = button;
};
Interact.prototype.changeStatus = function()
{
    this._activo = !this.activo; // y os odiaré

    if(!this._activo)
    {
        this._button.frame = 1;
    }
    else
    {
        this._button.frame = 0;
    }
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
    cameras.push(new Camera("showStage", null));
    cameras.push(new Camera("dinningRoom", null));
    cameras.push(new Camera("backstage", null));
    cameras.push(new Camera("restrooms", null));
    cameras.push(new Camera(null, null));
    cameras.push(new Camera("eastHall", null));
    cameras.push(new Camera("supplyCloset", null));
    cameras.push(new Camera("eHallCorner", null));
    cameras.push(new Camera("westHall", null));
    cameras.push(new Camera("wHallCorner", null));
    cameras.push(new Camera("", null)); //Foxy

    var pos = cameras[0];
};

Monitor.prototype = Object.create(Interact.prototype);
Monitor.prototype.constructor = Monitor;

Monitor.prototype.changeCamera = function()
{
    //SE CAMBIA LA CAMARA SEGUN EL BOTON PULSADO.
}

// function Camera (sprite, button)
// {
//     this._sprite = sprite;
//     this._occupied = false;
//     this._button = button;
// }
// Camera.prototype.amIOccupied = function()
// {
//     return this._occupied;
// }

// Camera.prototype.changeOccuppied = function()
// {
//     this._occupied = !this._occupied;
// }