var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 

//---------------------Bonnie-------------------------//
function Bonnie(sprite, screamer)
{
    BonnieChica.apply(this,[sprite, screamer,
                        //ruta
                        [new Room ((792 * 2) + 300, 240, 'showStage', 1, null, null), 
                        new Room ((792 * 3) + 375, 340, 'diningRoom', 2, 3, null), 
                        new Room ((792 * 4) + 450, 310, 'backStage', 1, null, null), 
                        new Room ((792 * 10) + 375, 330, 'westHall', 1, 4, 5),
                        new Room ((792 * 8) + 365, 280, 'supplyCloset', 3, 5, null), 
                        new Room ((792 * 11) + 375, 280, 'wHallCorner', 3, 4, null, this.attack())],
                        //rango de horas de activacion
                        [{min: 2, max: 2}, {min: 0, max: 1}, {min: 1, max: 2}, {min: 0, max: 1}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}]]);
}
Bonnie.prototype = Object.create(BonnieChica.prototype);
Bonnie.prototype.constructor = Bonnie;

module.exports = Bonnie;