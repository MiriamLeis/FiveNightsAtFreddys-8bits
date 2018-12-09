//--------------------Clases
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');
var Room = require('./room.js');


//---------------------Freddy-------------------------//
function Freddy(sprite, attack)
{
    this.var = new Const();

    this.attackSprite = attack;
    this.attackSprite.alpha = 0;

    Animatronics.apply(this,[sprite,  
                            //ruta
                            [new Room (this.var._freddyRoom1X, this.var._freddyRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                            new Room (this.var._freddyRoom2X, this.var._freddyRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, null,null), 
                            new Room (this.var._freddyRoom3X, this.var._freddyRoom3Y, this.var._restroomsPosX, this.var._restroomsPosY, 'restroom', 3, null, null), 
                            new Room (this.var._freddyRoom4X, this.var._freddyRoom4Y, this.var._kitchenPosX, this.var._kitchenPosY, 'kitchen', 4, null, null),
                            new Room (this.var._freddyRoom5X, this.var._freddyRoom5Y, this.var._eastHallPosX, this.var._eastHallPosY, 'eastHall', 5, null, null), 
                            new Room (this.var._freddyRoom6X, this.var._freddyRoom6Y, this.var._eHallCornerPosX, this.var._eHallCornerPosY, 'eHallCorner', null, null, null, true)],
                            //rango de horas de activacion
                            [{min: 2, max: 3}, {min: 0, max: 3}, {min: 0, max: 1}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                            //rango de segundos de movimiento
                            [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}], this.var]);
};
Freddy.prototype = Object.create(Animatronics.prototype);
Freddy.prototype.constructor = Freddy;

Freddy.prototype.move = function(game, bonnie, chica)
{
    var timeToMove = Math.floor(Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min);
    var move = game.time.events.add (timeToMove, function()
    {

    }, this);
};
Freddy.prototype.attack = function()
{

};
Freddy.prototype.attackBattery = function(game)
{
    game.time.events.add(5000, function()
    {
       this.attackSprite.alpha = 1;
       this.attackSprite.animations.add('start');
       this.attackSprite.animations.play('start', 1, true);
    }
    , this);
};


module.exports = Freddy;