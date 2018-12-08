
//--------------------Clase Animatronicos
function Animatronics(sprite, path, hours, actTime, Var)
{
    this.var = Var;
    //Phaser.Sprite.apply(this,game,sprite)
    //this.add.child(....) // buscarlo que no es así (puede que no queráis eso)

    this._sprite = sprite;
    this._sprite.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);
    this._sprite.frame = 2;

    this._path = path; //Array de functions
    this._pos = this._path[0];
    this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;

    this._hours = hours;
    this._hoursIni = this._hours[night];//Array de noches con las horas de inicio

    this._actTime = actTime; //Array de noches con los parametros de actIni y actFin
    this._actualActTime = actTime[night];
};

//--------------------Clase Animatronicos
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');
var Room = require('./room.js');


//---------------------Freddy-------------------------//
function Freddy(sprite)
{
    this.var = new Const();
    Animatronics.apply(this,[sprite,  
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