//--------------------Clase Animatronicos
function Animatronics(sprite, screamer, path, hours, actTime)
{
    //Phaser.Sprite.apply(this,game,sprite)
    //this.add.child(....) // buscarlo que no es así (puede que no queráis eso)

    this._sprite = sprite;
    this._sprite.scale.setTo(1.5, 1.5);
    this._sprite.frame = 2;

    this._screamer = screamer;
    this._screamer.scale.setTo(2.5, 2.5);
    this._screamer.alpha = 0;
    this._screamer.fixedToCamera = true;

    this._path = path; //Array de functions
    this._pos = this._path[0];
    this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;

    this._hours = hours;
    this._hoursIni = this._hours[0];//Array de noches con las horas de inicio

    this._actTime = actTime; //Array de noches con los parametros de actIni y actFin
    this._actualActTime = actTime[0];
};

Animatronics.prototype = Object.create(Phaser.Sprite.prototype);
Animatronics.prototype.constructor = Animatronics;

Animatronics.prototype.getPos = function() {return this._pos;};
Animatronics.prototype.activateAnim = function()
{//MIRAR
    this._sprite.animations.add('animation');
    this._sprite.animations.play('animation', 10, true);
};
Animatronics.prototype.showScreamer = function()
{
    this._screamer.alpha = 1;
};
Animatronics.prototype.changeInfo = function(night)
{
    this._pos = this._path[0];
    this._hoursIni = this._hours[night];
    this._actualActTime = this._actTime[night];
};
Animatronics.prototype.moveEffect = function(game, staticEffect)
{  
    staticEffect.alpha = 1;
    game.time.events.add(3000, function(){staticEffect.alpha = 0.1}, this)
};

//-----------------FreddyFoxy
function FreddyFoxy(sprite, screamer, posIni, hour, actTime)
{
    Animatronics.apply(this,[sprite, screamer, path, hourIni, actTime]);
};
FreddyFoxy.prototype = Object.create(Animatronics.prototype);
FreddyFoxy.prototype.constructor = FreddyFoxy;


//----------------BonnieChica
function BonnieChica(sprite, screamer, path, hour, actTime)
{
    Animatronics.apply(this,[sprite, screamer, path, hour, actTime]);
};
BonnieChica.prototype = Object.create(Animatronics.prototype);
BonnieChica.prototype.constructor = BonnieChica;

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

            if (percentage > 40 && otherAnimatronic.getPos() != this._path[this._pos._room2])
                this._pos = this._path[this._pos._room2];
            else if (otherAnimatronic.getPos() != this._path[this._pos._room1])
                this._pos = this._path[this._pos._room1];
        }
        else if (this._pos._number == 3)
        {
            var percentage = Math.floor(Math.random() * (101 - 0));

            if (percentage > 50 && otherAnimatronic.getPos() != this._path[this._pos._room3])
                this._pos = this._path[this._pos._room3];
            else if (percentage > 25 && otherAnimatronic.getPos() != this._path[this._pos._room2])
                this._pos = this._path[this._pos._room2];
            else if (otherAnimatronic.getPos() != this._path[this._pos._room1])
                this._pos = this._path[this._pos._room1];
        }
        else
            if (otherAnimatronic.getPos() != this._path[this._pos._room1])
                this._pos = this._path[this._pos._room1];

        this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;
        this.move(game, otherAnimatronic);
    }, this);
};
BonnieChica.prototype.attack = function(){};





//---------------------Foxy-------------------------//
function Foxy(sprite, screamer, animation, posIni, hourIni, actTime)
{
    FreddyFoxy.apply(this,[sprite, screamer, animation, path, posIni, hourIni, actTime]);
};
Foxy.prototype = Object.create(FreddyFoxy.prototype);
Foxy.prototype.constructor = Foxy;

Foxy.prototype.move = function(){};
Foxy.prototype.attack = function(){};



//---------------------Freddy-------------------------//
function Freddy(sprite, screamer, animation, posIni, hourIni, actTime)
{
    FreddyFoxy.apply(this,[sprite, screamer, animation, path, posIni, hourIni, actTime]);
};
Freddy.prototype = Object.create(FreddyFoxy.prototype);
Freddy.prototype.constructor = Freddy;

Freddy.prototype.move = function(){};
Freddy.prototype.attack = function(){};



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



//---------------------Chica-------------------------//
function Chica(sprite, screamer, animation, posIni, hourIni, actTime)
{
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
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}]]);
}
Chica.prototype = Object.create(BonnieChica.prototype);
Chica.prototype.constructor = Chica;







//CREACION RUTAS
function Room(x, y, name, room1, room2, room3, attack = null)
{
    this._x = x;
    this._y = y;
    this._name = name;

    if (room1 != null)
    {
        this._room1 = room1;
        this._number = 1;

        if(room2 != null)
        {
            this._room2 = room2;
            this._number++;
            
            if (room3 != null)
            {
                this._room3 = room3
                this._number++;
            }
        }
    }

    if (attack != null)
    {
        this._number++;
        this._attack = attack;
    }
}