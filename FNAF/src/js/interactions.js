'use strict';

function Interact (button) 
{
    this._active = false;
    this._button = button;
};
Interact.prototype.changeStatus = function()
{
    _active = !_active;
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
    cameras[0] = new Camera("showStage", null);
    cameras[1] = new Camera("dinningRoom", null);
    cameras[2] = new Camera("backstage", null);
    cameras[3] = new Camera("restrooms", null);
    cameras[4] = new Camera(null, null);
    cameras[5] = new Camera("eastHall", null);
    cameras[6] = new Camera("supplyCloset", null);
    cameras[7] = new Camera("eHallCorner", null);
    cameras[8] = new Camera("westHall", null);
    cameras[9] = new Camera("wHallCorner", null);
    cameras[10] = new Camera("", null); //Foxy

    var pos = cameras[0];
};

Monitor.prototype = Object.create(Interact.prototype);
Monitor.prototype.constructor = Monitor;

Monitor.prototype.changeCamera = function()
{
    //SE CAMBIA LA CAMARA SEGUN EL BOTON PULSADO.
}

function Camera (sprite, button)
{
    this._sprite = sprite;
    this._occupied = false;
    this._button = button;
}
Camera.prototype.amIOccupied = function()
{
    return this._occupied;
}

Camera.prototype.changeOccuppied = function()
{
    this._occupied = !this._occupied;
}