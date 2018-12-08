
//--------------------Clase Animatronicos
function Animatronics(sprite, night, path, hours, actTime, Var)
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

Animatronics.prototype = Object.create(Phaser.Sprite.prototype);
Animatronics.prototype.constructor = Animatronics;

Animatronics.prototype.delete = function()
{
    this._sprite.destroy();
    this._screamer.destroy();
}
Animatronics.prototype.createScreamer = function(screamer)
{
    this._screamer = screamer;
    this._screamer.scale.setTo(this.var._screamerScale, this.var._screamerScale);
    this._screamer.alpha = 0;
    this._screamer.fixedToCamera = true;
};
Animatronics.prototype.getPos = function() 
{
    return this._pos;
};
Animatronics.prototype.activateAnim = function()
{//MIRAR
    this._sprite.animations.add('animation');
    this._sprite.animations.play('animation', 10, true);
};
Animatronics.prototype.alphaScreamer = function(n)
{
    this._screamer.alpha = n;
};
Animatronics.prototype.alphaSprite = function(n)
{
    this._sprite.alpha = n;
}
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