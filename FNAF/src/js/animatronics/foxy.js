//--------------------Clases
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');


//---------------------Foxy-------------------------//
function Foxy (game, room1, room2, room3, sprite, runSprite)
{
    this.var = new Const();
    this.game = game;
    
    this.runSprite = runSprite;
    this.runSprite.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);
    this.runSprite.alpha = 0;

    this.lookAway = false;
    this.startedMoving = false;

    Animatronics.apply(this,[sprite,  
                            //ruta
                            [new RoomStates(0, 0, room1, this.var, 1, false),
                            new RoomStates(this.var._foxyRoom2X, this.var._foxyRoom2Y, room2, this.var, 2, false),
                            new RoomStates(this.var._foxyRoom3X, this.var._foxyRoom3Y, room3, this.var, 3, false),
                            new RoomStates(this.var._foxyRoom4X, this.var._foxyRoom4Y, room3, this.var, 0, true)],
                            //rango de horas de activacion
                            [{min: 0, max: 0}, {min: 6, max: 6}, {min: 3, max: 5}, {min: 3, max: 3}, {min: 0, max: 0.5}, {min: 0, max: 0}],
                            //rango de segundos de movimiento
                            [{min: 8, max: 20}, {min: 50, max: 100}, {min: 15, max: 40}, {min: 15, max: 30}, {min: 10, max: 20}, {min: 8, max: 15}], this.var]);
}
Foxy.prototype = Object.create(Animatronics.prototype);
Foxy.prototype.constructor = Foxy;

Foxy.prototype.move = function(staticEffect)
{
    this.startedMoving = true;

    var timeToMove = Math.floor((Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min) * 1000);

    this.movement = this.game.time.events.add (timeToMove, function()
    {
        var antPos = this._pos;
        if(!this._pos._attack)
        {
            this._pos = this._path[this._pos._connect];
            antPos._image.alpha = 0;
            this._pos._image.alpha = 1;
        }

        this._sprite.x = this._pos._x;       this._sprite.y = this._pos._y;

        if (this.game.camera.x == this._pos._pos.x && game.camera.y == this._pos._pos.y && antPos != this._pos)
            this.moveEffect(this.game, staticEffect);

        if(!this._pos._attack)
            this.move(this.game, staticEffect);
    }, this);
};
Foxy.prototype.spotted = function(game, bonnie, chica, staticEffect)
{
    if(game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y && !this._pos._attack)
    {
        game.time.events.remove(this.movement);
        this.move(game, bonnie, chica, staticEffect);
    }
};
Foxy.prototype.attack = function()
{

};


function RoomStates (posFoxyX, posFoxyY, imageState, Var, connection, attack)
{
    this._pos = { _x: posFoxyX, _y: posFoxyY };

    this._image = imageState;
    this._image.scale.setTo(Var._camTam, Var._camTam);
    this._image.x = Var._pirateCovePosX + (Var._tamX - imageState.width) / 2;
    this._image.y = Var._pirateCovePosY + (Var._tamY - imageState.height) / 2;
    this._image.alpha = 0;

    this._connect = connection;
    this._attack = attack;
}

module.exports = Foxy;