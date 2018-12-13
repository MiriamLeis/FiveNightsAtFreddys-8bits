//--------------------Clases
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');


//---------------------Foxy-------------------------//
function Foxy (game, room1, room2, room3, sprite, attackSound, moveSound, runSprite)
{
    this.var = new Const();
    this.game = game;
    
    this.runSprite = runSprite;
    this.runSprite.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);
    this.runSprite.alpha = 0;
    this.runSprite.x = this.var._foxyRoom4X;
    this.runSprite.y = this.var._foxyRoom4Y;

    this.startedMoving = false;
    this.isAttacking = false;
    this.isOfficiallyAttacking = false;

    Animatronics.apply(this,[sprite, attackSound, moveSound,
                            //ruta
                            [new RoomStates(this.var._foxyRoom1X, this.var._foxyRoom1Y, room1, this.var, 1, false),
                            new RoomStates(this.var._foxyRoom2X, this.var._foxyRoom2Y, room2, this.var, 2, false),
                            new RoomStates(this.var._foxyRoom3X, this.var._foxyRoom3Y, room3, this.var, 3, false),
                            new RoomStates(this.var._foxyRoom4X, this.var._foxyRoom4Y, room3, this.var, 0, true)],
                            //rango de horas de activacion
                            [{min: 0, max: 0}, {min: 6, max: 6}, {min: 3, max: 5}, {min: 3, max: 3}, {min: 0, max: 0.5}, {min: 0, max: 0}],
                            //rango de segundos de movimiento
                            [{min: 10, max: 12}, {min: 8, max: 10}, {min: 6, max: 8}, {min: 5, max: 7}, {min: 5, max: 6}, {min: 4, max: 6}], this.var]);
    this._sprite.visible = false;
}
Foxy.prototype = Object.create(Animatronics.prototype);
Foxy.prototype.constructor = Foxy;

Foxy.prototype.move = function(door, battery)
{
    this.startedMoving = true;

    var timeToMove = Math.floor((Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min) * 1000);

    this.movement = this.game.time.events.add (timeToMove, function()
    {
        var antPos = this._pos;
        if(!this._pos._attack)
        {
            if(this._pos._connect == 3 && this.game.camera.x == this.var._westHallPosX){}        
            else
            {
                this._pos = this._path[this._pos._connect];
                antPos._image.alpha = 0;
                this._pos._image.alpha = 1;

                if(this._pos == this._path[0] || this._pos == this._path[3])
                    this._sprite.visible = false;
                else
                    this._sprite.visible = true;
            }
        }

        this._sprite.x = this._pos._x;       this._sprite.y = this._pos._y;

        if(!this._pos._attack)
            this.move(door, battery);
        else 
            this.attack(door, battery);
    }, this);
};
Foxy.prototype.spotted = function(Var, door)
{

    if(this.game.camera.x == Var._pirateCovePosX  && !this._pos._attack)
    {
        this.game.time.events.remove(this.movement);
        this.move(door);
    }
    else if(this.game.camera.x == this.var._westHallPosX && this._pos._attack && !this.isOfficiallyAttacking)
    {
        this.isOfficiallyAttacking = true;
        this.game.time.events.remove(this.attacking);
        this.attackSpotted(door);
    }
};
Foxy.prototype.attack = function(door, battery)
{
    var timeToMove = Math.floor((Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min) * 1000);//Cambiar tiempos
    this.runSprite.alpha = 1;

    this.attacking = this.game.time.events.add (timeToMove, function()
    {  
        this.realAttack(door, battery);
    }, this);
};
Foxy.prototype.attackSpotted = function(door)
{
    this.runSprite.x = this.var._foxyRoom4X;
    this.runSprite.y = this.var._foxyRoom4Y;
    this.runSprite.animations.add('run');
    this.runSprite.animations.play('run', 5, true);

    this.runAnim(door);

};
Foxy.prototype.realAttack = function(door, battery)
{
    //Mirar si cambiamos el tiempo
 
    this.runSprite.alpha = 0;
    if(!door.getActive() && !battery.emptyBattery())
    {
        this.isAttacking = true;
        this.alphaScreamer(1);
    
        this.game.time.events.add(this.var._timeForReset, function()
        {
            this.game.state.start('death');
        }, this)
    }
    else
    {
        this._path[3]._image.alpha = 0;
        this._pos = this._path[this._pos._connect];
        this._pos._image.alpha = 1;
        this._sprite.visible = false;
        this._sprite.x = this._pos._x;       this._sprite.y = this._pos._y;

        this.isOfficiallyAttacking = false;
    }
        
};
Foxy.prototype.runAnim = function(door)
{
    this.game.time.events.add (200, function()
    {
        this.runSprite.y = this.runSprite.y + 20;

        if(this.runSprite.y <= 430)
            this.runAnim(door);
        else
        {
            this.runSprite.alpha = 0;
            this.runSprite.animations.stop('run');

            this.attackingSpotted = this.game.time.events.add (2500, function()
            {  
                this.realAttack(door);
            }, this);
        }
    }, this);
};
Foxy.prototype.startToMove = function()
{
    return this.startedMoving;
};
Foxy.prototype.returnIsAttacking = function()
{
    return this.isAttacking;
};


function RoomStates (posFoxyX, posFoxyY, imageState, Var, connection, attack)
{
    this._x = posFoxyX;
    this._y = posFoxyY;

    this._image = imageState;
    this._image.scale.setTo(Var._camTam, Var._camTam);
    this._image.x = Var._pirateCovePosX + (Var._tamX - imageState.width) / 2;
    this._image.y = Var._pirateCovePosY + (Var._tamY - imageState.height) / 2;
    this._image.alpha = 0;

    this._connect = connection;
    this._attack = attack;
}

module.exports = Foxy;