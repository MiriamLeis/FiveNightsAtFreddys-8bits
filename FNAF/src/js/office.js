require('./Interactions.js');

function Office()
{
    this._doorRight = new DoorLight();
    this._doorLeft = new DoorLight();
    this._lightRight = new DoorLight();
    this._lightLeft = new DoorLight();
    this._monitor = new Monitor();
}
Office.prototype.RotateCamera()
{

};