
//--------------------Clase Animatronicos
function Animatronics(sprite, attackSound, moveSound, path, hours, actTime, Var)
{
    this.var = Var;
    //Phaser.Sprite.apply(this,game,sprite)
    //this.add.child(....) // buscarlo que no es así (puede que no queráis eso)

    this._sprite = sprite;
    this._sprite.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);

    this._attackSound = attackSound;

    this._moveSound = moveSound;
    this._moveSound.volume = 0.5;

    this._path = path; //Array de functions
    this._pos = this._path[0];
    this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;

    this._hours = hours;

    this._actTime = actTime; //Array de noches con los parametros de actIni y actFin
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
    this._screamer.fixedToCamera = true;
    this._screamer.alpha = 0;
    this._screamerAnim = this._screamer.animations.add('screamer');
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
    this._attackSound.play();
    this._screamer.alpha = n;
    this._screamerAnim.play(8, false);
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
    var rnd = Math.floor(Math.random() * (4 - 0));
    staticEffect._audio[rnd].play();
    staticEffect.alpha = 1;

    staticEffect._audio[rnd].onStop.add(function()
    {
        if (game.camera.x < this.var._showStagePosX)
            staticEffect.alpha = 0;
        else
            staticEffect.alpha = 0.1;
    }, this);
};
Animatronics.prototype.changeNight = function(night)
{
    this._actualActTime = this._actTime[night - 1];
    this._hoursIni = this._hours[night - 1];//Array de noches con las horas de inicio
}
Animatronics.prototype.getHour = function()
{
    return (Math.random() * (this._hoursIni.max - this._hoursIni.min)) + this._hoursIni.min;
}

//---------------------Foxy-------------------------//
/*function Foxy(sprite, screamer, animation, posIni, hourIni, actTime)
{
    FreddyFoxy.apply(this,[sprite, screamer, animation, path, posIni, hourIni, actTime]);
};
Foxy.prototype = Object.create(FreddyFoxy.prototype);
Foxy.prototype.constructor = Foxy;

Foxy.prototype.move = function(){};
Foxy.prototype.attack = function(){};*/

module.exports = Animatronics;