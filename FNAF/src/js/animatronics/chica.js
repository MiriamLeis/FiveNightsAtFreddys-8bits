var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Chica-------------------------//
function Chica(sprite, screamer, animation, posIni, hourIni, actTime)
{
    this.var = new Const();
    BonnieChica.apply(this,[sprite, screamer,
                        //ruta
                        [new Room ((792 * 2) + 450, 240, 'showStage', 1, null, null), 
                        new Room ((792 * 3) + 375, 340, 'diningRoom', 2, 3, 4), 
                        new Room ((792 * 5) + 400, 200, 'restroom', 1, null, null), 
                        new Room ((792 * 6) + 375, 594 + 66, 'kitchen', 1, null, null),
                        new Room ((792 * 7) + 365, 280, 'eastHall', 1, 5, null), 
                        new Room ((792 * 9) + 350, 300, 'eHallCorner', 4, null, null, this.attack())],
                        //rango de horas de activacion
                        [{min: 2, max: 3}, {min: 0, max: 3}, {min: 0, max: 1}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}], this.var]);
}
Chica.prototype = Object.create(BonnieChica.prototype);
Chica.prototype.constructor = Chica;


module.exports = Chica;