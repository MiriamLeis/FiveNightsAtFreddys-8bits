//--------------------Clases
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');
var Room = require('./room.js');


//---------------------Freddy-------------------------//
function Freddy(sprite, darkFreddy, attack, attackSound, moveSound, laughSounds, intoTheOfficeSound, song, endSong)
{
    this.var = new Const();
    
    this.darkFreddy = darkFreddy
    this.darkFreddy.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);
    this.darkFreddy.alpha = 0;

    this.attackSprite = attack;
    this.attackSprite.alpha = 0;
    this.attackDarkAnim = this.attackSprite.animations.add('start');

    this.lookAway = false;
    this.startedMoving = false;

    Animatronics.apply(this,[sprite, attackSound, moveSound,
                            //ruta
                            [new Room (this.var._freddyRoom1X, this.var._freddyRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                            new Room (this.var._freddyRoom2X, this.var._freddyRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, null,null), 
                            new Room (this.var._freddyRoom3X, this.var._freddyRoom3Y, this.var._restroomsPosX, this.var._restroomsPosY, 'restroom', 3, null, null), 
                            new Room (this.var._freddyRoom4X, this.var._freddyRoom4Y, this.var._kitchenPosX, this.var._kitchenPosY, 'kitchen', 4, null, null),
                            new Room (this.var._freddyRoom5X, this.var._freddyRoom5Y, this.var._eastHallPosX, this.var._eastHallPosY, 'eastHall', 5, null, null), 
                            new Room (this.var._freddyRoom6X, this.var._freddyRoom6Y, this.var._eHallCornerPosX, this.var._eHallCornerPosY, 'eHallCorner', null, null, null, true)],
                            //rango de horas de activacion 
                            [{min: 6, max: 6}, {min: 6, max: 6}, {min: 3, max: 5}, {min: 3, max: 3}, {min: 0, max: 0.5}, {min: 0, max: 0}],
                            //rango de segundos de movimiento
                            [{min: 2, max: 5}, {min: 50, max: 100}, {min: 15, max: 40}, {min: 15, max: 30}, {min: 10, max: 20}, {min: 8, max: 15}], this.var]);
                            
    this._sprite.frame = 2;

    //Sonidos
        //musiquita
        this._song = song;
        this._endSong = endSong;
        //risas
        this._laughSounds = laughSounds;
        this._laughSounds[0].volume = 0.2;
        this._laughSounds[1].volume = 0.2;
        this._laughSounds[2].volume = 0.2;
        //in office
        this._intoTheOfficeSound = intoTheOfficeSound;
        this._intoTheOfficeSound.volume = 0.3;
};
Freddy.prototype = Object.create(Animatronics.prototype);
Freddy.prototype.constructor = Freddy;

Freddy.prototype.randomAnim = function(game)
{
    if (this._sprite.visible || this._sprite.alpha == 1)
    {
        this._sprite.frame = 1
        game.time.events.add(1000, function()
        {
            this._sprite.frame = 0;
        }, this);
    }
}
Freddy.prototype.move = function(game, bonnie, chica, staticEffect)
{
    this.startedMoving = true;

    var timeToMove = Math.floor((Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min) * 1000);
    
    this.movement = game.time.events.add (timeToMove, function()
    {
        var rnd = Math.random() * (1 - 0);
        if (rnd > 0.5)
        {
            var audio = Math.floor(Math.random() * (4 - 0));
            if(audio == 3)
                this._moveSound.play();
            else
                this._laughSounds[audio].play();
        }

        this._sprite.frame = 0;
        var antPos = this._pos;
        if(!this._pos._attack)
            this._pos = this._path[this._pos._room1];

        this._sprite.x = this._pos._x;       this._sprite.y = this._pos._y;
        this.darkFreddy.x = this._pos._x;    this.darkFreddy.y = this._pos._y;

        if(this._pos._name == bonnie._pos._name || (this._pos._name == chica._pos._name && !chica.isInOffice()))
            this.showDarkSprite();
        else
            this.hideDarkSprite();
        
        if (game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y && antPos != this._pos)
            this.moveEffect(game, staticEffect);

        if(!this._pos._attack)
            this.move(game, bonnie, chica, staticEffect);
    }, this);
};
Freddy.prototype.spotted = function(game, bonnie, chica, staticEffect)
{
    if(game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y && !this._pos._attack)
    {
        game.time.events.remove(this.movement);
        this.move(game, bonnie, chica, staticEffect);
    }
};
Freddy.prototype.showDarkSprite = function()
{
    this.darkFreddy.animations.add('loop');
    this.darkFreddy.alpha = 1;
    this.darkFreddy.animations.play('loop', 1, true);
    this._sprite.alpha = 0;
};
Freddy.prototype.hideDarkSprite = function()
{
    this.darkFreddy.alpha = 0;
    this.darkFreddy.animations.stop('loop');
    this._sprite.alpha = 1;
};
Freddy.prototype.attack = function()
{
    return this._pos._attack;
};
Freddy.prototype.lookingAway = function()
{
    this.lookAway = true;
    this._intoTheOfficeSound.play();
};
Freddy.prototype.returnLookingAway = function()
{
    return this.lookAway;
};
Freddy.prototype.startToMove = function()
{
    return this.startedMoving;
};
Freddy.prototype.attackBattery = function(game, darkness, moveLeft, moveRight)
{
    game.time.events.add(18000, function()
    {
        this.attackSprite.alpha = 1;
        this.attackDarkAnim.play(1, true);
        this._song.play();
        posCamera = game.camera.x;

        game.time.events.add(6000, function()
        {
            var cont = 6000;
            this.dontMoveAttack(game, posCamera, cont, darkness, moveLeft, moveRight);
        }, this);
    }, this);
};
Freddy.prototype.dontMoveAttack = function(game, posCamera, cont, darkness, moveLeft, moveRight)
{
    if (game.camera.x != posCamera || cont >= 21000)
    {
        this._song.stop();
        this._endSong.play();

        this.attackSprite.alpha = 0;
        this.attackDarkAnim.stop('start');

        moveLeft.inputEnabled = false;
        moveRight.inputEnabled = false;
        darkness.alpha = 0.9; //cambiar

        if (game.camera.x != posCamera)
            var time = 2500;
        else
            var time = 9000;
        game.time.events.add(time, function()
        {
            this.alphaScreamer(1);
            game.time.events.add(this.var._timeForReset, function(){ game.state.start('death'); }, this);
        }, this);
    }
    else
        game.time.events.add(3000, function()
        {
            cont += 3000;
            this.dontMoveAttack(game, posCamera, cont, darkness, moveLeft, moveRight);
        }, this);
}

module.exports = Freddy;