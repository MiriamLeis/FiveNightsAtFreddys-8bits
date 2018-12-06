//--------------------Clase Animatronicos
var Animatronics = require('./Animatronics.js'); 
 

//----------------BonnieChica
function BonnieChica(sprite, screamer, path, hour, actTime, Var)
{
    Animatronics.apply(this,[sprite, screamer, path, hour, actTime, Var]);
    this.dinningRoom = false;
    this.isMoving = false;
    this.var = Var;
};
BonnieChica.prototype = Object.create(Animatronics.prototype);
BonnieChica.prototype.constructor = BonnieChica;

BonnieChica.prototype.dinningRoomTrue = function()
{
    this.dinningRoom = true;
}
BonnieChica.prototype.dinningRoomFalse = function()
{
    this.dinningRoom = false;
}

BonnieChica.prototype.move = function(game, otherAnimatronic/*, staticEffect*/)
{
    //Tiempo para moverse
    var timeToMove = Math.floor(((Math.random() * (this._actualActTime.max - this._actualActTime.min)) + this._actualActTime.min) * 1000);
    console.log(timeToMove);

    //Cambiar el pos del animatronico
    game.time.events.add(timeToMove, function()
    {
        //this.moveEffect(game, staticEffect);
        this._sprite.frame = 0;

        if (this._pos._number == 2)
        {
            var percentage = Math.floor(Math.random() * (101 - 0));

            if (percentage > this.var._2roomsPercentage1)
            {
                if(this._path[this._pos._room2]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                {
                    this._pos = this._path[this._pos._room2];
                    this.dinningRoomTrue()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
                else if (this._path[this._pos._room2]._name != "diningRoom")
                {
                    this._pos = this._path[this._pos._room2];
                    this.dinningRoomFalse()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
            }
            
            else if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomTrue()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
            else if (this._path[this._pos._room1]._name != "diningRoom")
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomFalse()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
        }
        else if (this._pos._number == 3)
        {
            var percentage = Math.floor(Math.random() * (101 - 0));

            if (percentage > this.var._3roomsPercentage1)
            {

                if(this._path[this._pos._room3]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                {
                    this._pos = this._path[this._pos._room3];
                    this.dinningRoomTrue()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
                else if (this._path[this._pos._room3]._name != "diningRoom")
                {
                    this._pos = this._path[this._pos._room3];
                    this.dinningRoomFalse()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
            }
            else if (percentage > this.var._3roomsPercentage2)
            {
                if(this._path[this._pos._room2]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                {
                    this._pos = this._path[this._pos._room2];
                    this.dinningRoomTrue()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
                else if (this._path[this._pos._room2]._name != "diningRoom")
                {
                    this._pos = this._path[this._pos._room2];
                    this.dinningRoomFalse()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
            }
            else if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomTrue()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
            else if (this._path[this._pos._room1]._name != "diningRoom")
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomFalse()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
        }
        else
        {
            if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomTrue()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
            else if (this._path[this._pos._room1]._name != "diningRoom")
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomFalse()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }

        }
        this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;
        this.move(game, otherAnimatronic);
    }, this);
};
BonnieChica.prototype.attack = function(){};
BonnieChica.prototype.noLongerMoving = function(game)
{
    game.time.events.add(1000, function(){ this.isMoving = false},this);
};
BonnieChica.prototype.returnIsMoving = function()
{
    return this.isMoving;
};


module.exports = BonnieChica;