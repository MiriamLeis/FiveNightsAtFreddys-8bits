var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Bonnie-------------------------//
function Bonnie(sprite, screamer)
{
    this.var = new Const();
    BonnieChica.apply(this,[sprite, screamer,
                        //ruta
                        [new Room (this.var._bonnieRoom1X, this.var._bonnieRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                        new Room (this.var._bonnieRoom2X, this.var._bonnieRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, 3, null), 
                        new Room (this.var._bonnieRoom3X, this.var._bonnieRoom3Y, this.var._backstagePosX, this.var._backstagePosY, 'backStage', 1, null, null), 
                        new Room (this.var._bonnieRoom4X, this.var._bonnieRoom4Y, this.var._westHallPosX, this.var._westHallPosY, 'westHall', 1, 4, 5),
                        new Room (this.var._bonnieRoom5X, this.var._bonnieRoom5Y, this.var._supplyClosetPosX, this.var._supplyClosetPosY, 'supplyCloset', 3, 5, null), 
                        new Room (this.var._bonnieRoom6X, this.var._bonnieRoom6Y, this.var._wHallCornerPosX, this.var._wHallCornerPosY, 'wHallCorner', 3, 4, null, true)],
                        //rango de horas de activacion
                        [{min: 2, max: 2}, {min: 0, max: 1}, {min: 1, max: 2}, {min: 0, max: 1}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}], this.var]);
}
Bonnie.prototype = Object.create(BonnieChica.prototype);
Bonnie.prototype.constructor = Bonnie;

module.exports = Bonnie;