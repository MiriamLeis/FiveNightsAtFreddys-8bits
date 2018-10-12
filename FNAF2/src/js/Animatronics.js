
//Clase Animatronicos
function Animatronics(sprite,screamer,animation,path,posIni,hourIni,actTime)
{
    this._sprite = sprite;
    this._screamer = screamer;
    this._animation = animation;
    this._path = path; //Array de functions
    this._pos = posIni;
    this._hourIni = hourIni;   
    this._actTime = actTime; //Array 2 parametros
};
Animatronics.prototype.changeHourIni = function(hour)
{
    this._hourIni = hour;
};
Animatronics.prototype.showScreamer()
{
    this.game.add.sprite(0,0,this._screamer);
};

//FreddyFoxy
function FreddyFoxy(sprite,screamer,animation,path,posIni,hourIni,actTime)
{
    Animatronics.apply(this,[sprite,screamer,animation,path,posIni,hourIni,actTime]);
};
FreddyFoxy.prototype = Object.create(Animatronics.prototype);
FreddyFoxy.prototype.constructor = FreddyFoxy;

FreddyFoxy.prototype.actionTimeModify = function(){};


//BonnieChica
function BonnieChica(sprite,screamer,animation,path,posIni,hourIni,actTime)
{
    Animatronics.apply(this,[sprite,screamer,animation,path,posIni,hourIni,actTime]);
};
BonnieChica.prototype = Object.create(Animatronics.prototype);
BonnieChica.prototype.constructor = BonnieChica;

BonnieChica.prototype.move = function(){};
BonnieChica.prototype.actionTimeModify = function(){};
BonnieChica.prototype.attack = function(){};

//Foxy
function Foxy(sprite,screamer,animation,path,posIni,hourIni,actTime)
{
    FreddyFoxy.apply(this,[sprite,screamer,animation,path,posIni,hourIni,actTime]);
};
Foxy.prototype = Object.create(FreddyFoxy.prototype);
Foxy.prototype.constructor = Foxy;

Foxy.prototype.move = function(){};
Foxy.prototype.attack = function(){};

//Freddy
function Freddy(sprite,screamer,animation,path,posIni,hourIni,actTime)
{
    FreddyFoxy.apply(this,[sprite,screamer,animation,path,posIni,hourIni,actTime]);
};
Freddy.prototype = Object.create(FreddyFoxy.prototype);
Freddy.prototype.constructor = Freddy;

Freddy.prototype.move = function(){};
Freddy.prototype.attack = function(){};


