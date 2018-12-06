
//--------------------Clase Animatronicos
function Animatronics(sprite, screamer, attack, path, hours, actTime, Var)
{
    this.var = Var;
    
    this._sprite = sprite;
    this._sprite.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);
    this._sprite.frame = 2;

    this._screamer = screamer;
    this._screamer.scale.setTo(this.var._screamerScale, this.var._screamerScale);
    this._screamer.alpha = 0;
    this._screamer.fixedToCamera = true;

    this._spriteAttack = attack;


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
    game.time.events.add(3000, function()
    {
        if (game.camera.x < this.var._showStagePosX)
            staticEffect.alpha = 0;
        else
            staticEffect.alpha = 0.1;
    }, this)
};





//-----------------FreddyFoxy
function FreddyFoxy(sprite, screamer, posIni, hour, actTime)
{
    Animatronics.apply(this,[sprite, screamer, path, hourIni, actTime]);
};
FreddyFoxy.prototype = Object.create(Animatronics.prototype);
FreddyFoxy.prototype.constructor = FreddyFoxy;




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


module.exports = Animatronics;