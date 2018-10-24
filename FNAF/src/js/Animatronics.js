//Clase Animatronicos
function Animatronics(sprite,screamer,animation,path,posIni,hourIni,actTime)
{
    this._sprite = sprite;
    this._screamer = screamer;
    this._animation = animation;
    this._path = path; //Array de functions
    this._pos = posIni;
    this._hourIni = hourIni;//Array de noches con las horas de inicio
    this._punHourIni = null;//Puntero a la hora en actTime
    this._actTime = actTime; //Array de noches con los parametros de actIni y actFin
    this._punActTime = null;//Puntero a la noche en actTime
};
Animatronics.prototype.showScreamer = function()
{
    
};
Animatronics.prototype.changeInfo = function(night)
{
    this._punActTime = this._actTime[night];
    this._punHourIni = this._hourIni[night];
};

//FreddyFoxy
function FreddyFoxy(sprite,screamer,animation,path,posIni,hourIni,actTime)
{
    Animatronics.apply(this,[sprite,screamer,animation,path,posIni,hourIni,actTime]);
};
FreddyFoxy.prototype = Object.create(Animatronics.prototype);
FreddyFoxy.prototype.constructor = FreddyFoxy;


//BonnieChica
function BonnieChica(sprite,screamer,animation,path,posIni,hourIni,actTime)
{
    Animatronics.apply(this,[sprite,screamer,animation,path,posIni,hourIni,actTime]);
};
BonnieChica.prototype = Object.create(Animatronics.prototype);
BonnieChica.prototype.constructor = BonnieChica;

BonnieChica.prototype.move = function(){};
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


function Room(name,room1,room2,room3, attack = null)
{
    this._name = name;
    if (room1 != null)
    {
        this._room1 = room1;
        this._number =1;

        if(room2 != null)
        {
            this.room2 = room2;
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

//Ejemplo
var pathBonnie = [6];
pathBonnie[0] = new Room ('showStage',pathBonnie[1],null,null);
pathBonnie[1] = new Room ('diningArea',pathBonnie[2],pathBonnie[3],null);
pathBonnie[2] = new Room ('backStage',pathBonnie[1],null,null);
pathBonnie[3] = new Room ('westHallUp',pathBonnie[1],pathBonnie[4],pathBonnie[5]);
pathBonnie[4] = new Room ('supplyCloset',pathBonnie[3],pathBonnie[5],null);
pathBonnie[5] = new Room ('westHallDown',pathBonnie[3],pathBonnie[4],null, /*Bonnie.attack()*/);