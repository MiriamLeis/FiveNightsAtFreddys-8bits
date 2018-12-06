var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Chica-------------------------//
function Chica(sprite, screamer, animation, posIni, hourIni, actTime)
{
    this.var = new Const();
    BonnieChica.apply(this,[sprite, screamer,
                        //ruta
                        [new Room (this.var._chicaRoom1X, this.var._chicaRoom1Y, 'showStage', 1, null, null), 
                        new Room (this.var._chicaRoom2X, this.var._chicaRoom2Y,'diningRoom', 2, 3, 4), 
                        new Room (this.var._chicaRoom3X, this.var._chicaRoom3Y,'restroom', 1, null, null), 
                        new Room (this.var._chicaRoom4X, this.var._chicaRoom4Y,'kitchen', 1, null, null),
                        new Room (this.var._chicaRoom5X, this.var._chicaRoom5Y,'eastHall', 1, 5, null), 
                        new Room (this.var._chicaRoom6X, this.var._chicaRoom6Y,'eHallCorner', 4, null, null, this.attack())],
                        //rango de horas de activacion
                        [{min: 2, max: 3}, {min: 0, max: 3}, {min: 0, max: 1}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}], this.var]);
}
Chica.prototype = Object.create(BonnieChica.prototype);
Chica.prototype.constructor = Chica;

module.exports = Chica;