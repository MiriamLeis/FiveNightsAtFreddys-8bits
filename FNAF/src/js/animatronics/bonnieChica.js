//--------------------Clase Animatronicos
var Animatronics = require('./Animatronics.js'); 
 

//----------------BonnieChica
function BonnieChica(sprite, path, hour, actTime, attackTime, Var)
{
    Animatronics.apply(this,[sprite, path, hour, actTime, Var]);
    this.dinningRoom = false;
    this.inOffice = false;
    this.attacking = false;
    this.var = Var;
    this.attackTime = attackTime;
};
BonnieChica.prototype = Object.create(Animatronics.prototype);
BonnieChica.prototype.constructor = BonnieChica;

BonnieChica.prototype.preChangeNight = function(night)
{
    this.attackTimeIni = this.attackTime[night];
    this.changeNight(night);
}
BonnieChica.prototype.dinningRoomTrue = function()
{
    this.dinningRoom = true;
}
BonnieChica.prototype.dinningRoomFalse = function()
{
    this.dinningRoom = false;
}
BonnieChica.prototype.move = function(game, otherAnimatronic, staticEffect, door, light)
{
    if(!this.inOffice)
    {
        //Tiempo para moverse
        var timeToMove = Math.floor(((Math.random() * (this._actualActTime.max - this._actualActTime.min)) + this._actualActTime.min) * 1000);

        //Cambiar el pos del animatronico
        game.time.events.add(timeToMove, function()
        {
            //Controlar que, si esta atacando, no se mueva
            if(!this.inOffice)
            {
                this._antPos = this._pos;

                if (this._pos._number == 2)
                {
                    var percentage = Math.floor(Math.random() * (101 - 0));

                    if (!this._pos._attack)
                    {
                        if (percentage > this.var._2roomsPercentage1)
                        {
                            if(this._path[this._pos._room2]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                            {
                                this._pos = this._path[this._pos._room2];
                                this.dinningRoomTrue();
                            }
                            else if (this._path[this._pos._room2]._name != "diningRoom")
                            {
                                this._pos = this._path[this._pos._room2];
                                this.dinningRoomFalse();
                            }
                        }
                        else if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                        {
                            this._pos = this._path[this._pos._room1];
                            this.dinningRoomTrue();
                        }
                        else if (this._path[this._pos._room1]._name != "diningRoom")
                        {
                            this._pos = this._path[this._pos._room1];
                            this.dinningRoomFalse();
                        }
                    }
                    else
                    {
                        
                        if (!light.getActive() && percentage > this.var._2roomsPercentage1)
                            this.attack(game, door, light);    
                        else
                            this._pos = this._path[this._pos._room1];
                    }
                }
                else if (this._pos._number == 3)
                {
                    var percentage = Math.floor(Math.random() * (101 - 0));

                    if (!this._pos._attack)
                    {
                        if (percentage > this.var._3roomsPercentage1)
                        {

                            if(this._path[this._pos._room3]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                            {
                                this._pos = this._path[this._pos._room3];
                                this.dinningRoomTrue();
                            }
                            else if (this._path[this._pos._room3]._name != "diningRoom")
                            {
                                this._pos = this._path[this._pos._room3];
                                this.dinningRoomFalse();
                            }
                        }
                        else if (percentage > this.var._3roomsPercentage2)
                        {
                            if(this._path[this._pos._room2]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                            {
                                this._pos = this._path[this._pos._room2];
                                this.dinningRoomTrue();
                            }
                            else if (this._path[this._pos._room2]._name != "diningRoom")
                            {
                                this._pos = this._path[this._pos._room2];
                                this.dinningRoomFalse();
                            }
                        }
                        else if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                        {
                            this._pos = this._path[this._pos._room1];
                            this.dinningRoomTrue();
                        }
                        else if (this._path[this._pos._room1]._name != "diningRoom")
                        {
                            this._pos = this._path[this._pos._room1];
                            this.dinningRoomFalse();
                        }
                    }
                    else
                    {
                        if (!light.getActive() && percentage > this.var._3roomsPercentage1)
                            this.attack(game ,door, light);
                        else if (percentage > this.var._3roomsPercentage2)
                            this._pos = this._path[this._pos._room2];
                        else
                            this._pos = this._path[this._pos._room1];
                    }
                }
                else
                {
                    if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                    {
                        this._sprite.frame = 0;
                        this._pos = this._path[this._pos._room1];
                        this.dinningRoomTrue();
                    }
                    else if (this._path[this._pos._room1]._name != "diningRoom")
                    {
                        this._pos = this._path[this._pos._room1];
                        this.dinningRoomFalse();
                    }

                }
                //Controlar que el efecto de static effect aparezca cuando miras donde estan o donde se van a mover
                if (this._antPos != this._pos)
                    if ((game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y) || (game.camera.x == this._antPos._posCam.x && game.camera.y == this._antPos._posCam.y)) //HACER SI ESTA EN MONITOR
                        this.moveEffect(game, staticEffect);

                this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;

                if(!this.inOffice)
                this.move(game, otherAnimatronic, staticEffect, door, light);
            }
        }, this);
    }

}
BonnieChica.prototype.isInOffice = function()
{
    return this.inOffice;
}
BonnieChica.prototype.isAttacking = function()
{
    return this.attacking;
}
BonnieChica.prototype.attack = function(game, door, light)
{
    if(!this.inOffice)
    {
        this.alphaSprite(0);
        this.attacking = true;
        var timeToMove = Math.floor(((Math.random() * (this.attackTimeIni.max - this.attackTimeIni.min)) + this.attackTimeIni.min) * 1000);//Cambiar por tiempos de ataque

        game.time.events.add(timeToMove, function()
        {
            if(!this.inOffice)
            {
                if(!door.getActive())
                {
                    if(light.getActive()) 
                        light.turnOff();

                    this.inOffice = true;
                    light.enabledInput(false);
                    door.enabledInput(false);
                }
                else if(this._pos._number == 3)
                {
                    this._pos = this._path[this._pos._room2];
                    this.alphaSprite(1);
                }
                else
                {
                    this._pos = this._path[this._pos._room1];
                    this.alphaSprite(1);
                }
                this.attacking = false;
            }
        }, this);
    }

}

module.exports = BonnieChica;