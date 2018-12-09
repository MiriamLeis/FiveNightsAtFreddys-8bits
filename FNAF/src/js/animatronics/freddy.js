//--------------------Clases
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');
var Room = require('./room.js');


//---------------------Freddy-------------------------//
function Freddy(sprite)
{
    this.var = new Const();
    Animatronics.apply(this,[sprite,  
                            //ruta
                            [new Room (this.var._chicaRoom1X, this.var._chicaRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                            new Room (this.var._chicaRoom2X, this.var._chicaRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, null,null), 
                            new Room (this.var._chicaRoom3X, this.var._chicaRoom3Y, this.var._restroomsPosX, this.var._restroomsPosY, 'restroom', 3, null, null), 
                            new Room (this.var._chicaRoom4X, this.var._chicaRoom4Y, this.var._kitchenPosX, this.var._kitchenPosY, 'kitchen', 4, null, null),
                            new Room (this.var._chicaRoom5X, this.var._chicaRoom5Y, this.var._eastHallPosX, this.var._eastHallPosY, 'eastHall', 5, null, null), 
                            new Room (this.var._chicaRoom6X, this.var._chicaRoom6Y, this.var._eHallCornerPosX, this.var._eHallCornerPosY, 'eHallCorner', null, null, null, true)],
                            //rango de horas de activacion
                            [{min: 2, max: 3}, {min: 0, max: 3}, {min: 0, max: 1}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                            //rango de segundos de movimiento
                            [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}], this.var]);
};
Freddy.prototype = Object.create(Animatronics.prototype);
Freddy.prototype.constructor = Freddy;

Freddy.prototype.move = function(){};
Freddy.prototype.attack = function(){};


module.exports = Freddy;