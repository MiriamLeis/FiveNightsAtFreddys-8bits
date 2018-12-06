var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Bonnie-------------------------//
function Bonnie(sprite, screamer)
{
    this.var = new Const();
    BonnieChica.apply(this,[sprite, screamer,
                        //ruta
                        [new Room (this.var._bonnieRoom1X, this.var._bonnieRoom1Y, 'showStage', 1, null, null), 
                        new Room (this.var._bonnieRoom2X, this.var._bonnieRoom2Y, 'diningRoom', 2, 3, null), 
                        new Room (this.var._bonnieRoom3X, this.var._bonnieRoom3Y, 'backStage', 1, null, null), 
                        new Room (this.var._bonnieRoom4X, this.var._bonnieRoom4Y, 'westHall', 1, 4, 5),
                        new Room (this.var._bonnieRoom5X, this.var._bonnieRoom5Y, 'supplyCloset', 3, 5, null), 
                        new Room (this.var._bonnieRoom6X, this.var._bonnieRoom6Y, 'wHallCorner', 3, 4, null, this.attack())],
                        //rango de horas de activacion
                        [{min: 2, max: 2}, {min: 0, max: 1}, {min: 1, max: 2}, {min: 0, max: 1}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}], this.var]);
}
Bonnie.prototype = Object.create(BonnieChica.prototype);
Bonnie.prototype.constructor = Bonnie;

module.exports = Bonnie;