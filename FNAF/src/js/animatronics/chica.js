var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Chica-------------------------//
function Chica(sprite, attackSound, moveSound)
{
    this.var = new Const();
    BonnieChica.apply(this,[sprite, attackSound, moveSound,
                        //ruta
                        [new Room (this.var._chicaRoom1X, this.var._chicaRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                        new Room (this.var._chicaRoom2X, this.var._chicaRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, 3, 4), 
                        new Room (this.var._chicaRoom3X, this.var._chicaRoom3Y, this.var._restroomsPosX, this.var._restroomsPosY, 'restroom', 1, null, null), 
                        new Room (this.var._chicaRoom4X, this.var._chicaRoom4Y, this.var._kitchenPosX, this.var._kitchenPosY, 'kitchen', 1, null, null),
                        new Room (this.var._chicaRoom5X, this.var._chicaRoom5Y, this.var._eastHallPosX, this.var._eastHallPosY, 'eastHall', 1, 5, null), 
                        new Room (this.var._chicaRoom6X, this.var._chicaRoom6Y, this.var._eHallCornerPosX, this.var._eHallCornerPosY, 'eHallCorner', 4, null, null, true)],
                        //rango de horas de activacion 
                        [{min: 2, max: 3}, {min: 0, max: 3}, {min: 0, max: 1}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 20, max: 30}, {min: 15, max: 25}, {min: 5, max: 10}, {min: 15, max: 20}, {min: 7, max: 10}, {min: 5, max: 8}],
                        //rango de segundos de ataque
                        [{min: 10, max: 15}, {min: 8, max: 12}, {min: 7, max: 11}, {min: 6, max: 9}, {min: 3, max: 5}, {min: 3.5, max: 4.5}], this.var]);

}
Chica.prototype = Object.create(BonnieChica.prototype);
Chica.prototype.constructor = Chica;

module.exports = Chica;