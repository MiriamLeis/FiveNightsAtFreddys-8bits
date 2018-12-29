//--------------------Clases
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');


//---------------------Foxy-------------------------//
function Foxy (game, room1, room2, room3, sprite, attackSound, moveSound, runSound, runSprite)
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
    this.spottedMoving = false;
    this.alreadyAttacked = false;
    this.realAttackStarted = false;
    Animatronics.apply(this,[sprite, attackSound, moveSound,
                            //ruta
                            [new RoomStates(this.var._foxyRoom1X, this.var._foxyRoom1Y, room1, this.var, 1, false),
                            new RoomStates(this.var._foxyRoom2X, this.var._foxyRoom2Y, room2, this.var, 2, false),
                            new RoomStates(this.var._foxyRoom3X, this.var._foxyRoom3Y, room3, this.var, 3, false),
                            new RoomStates(this.var._foxyRoom4X, this.var._foxyRoom4Y, room3, this.var, 0, true)],
                            //rango de horas de activacion
                            [{min: 3, max: 5}, {min: 1, max: 4}, {min: 1, max: 3}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                            //rango de segundos de movimiento
                            [{min: 20, max: 30}, {min: 18, max: 25}, {min: 12, max: 20}, {min: 10, max: 15}, {min: 7, max: 12}, {min: 6, max: 10}], this.var]);
    this._sprite.visible = false;

    //Sonidos
        this._moveSound.volume = 0.8;
        //Run
        this.runSound = runSound;
        this.runSound.loop = true;

}
Foxy.prototype = Object.create(Animatronics.prototype);
Foxy.prototype.constructor = Foxy;

Foxy.prototype.move = function(door, battery, staticEffect)
{
    this.game.time.events.add (200, function()
    {
        this.isOfficiallyAttacking = false;
        if(this.alreadyAttacked)
            this.alreadyAttacked = false;
    },this);
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
            this.move(door, battery, staticEffect);
        else 
            this.attack(door, battery, staticEffect);
    }, this);
};
Foxy.prototype.spotted = function(Var, door, battery, staticEffect)
{
    if(this.game.camera.x == Var._pirateCovePosX  && !this._pos._attack && !this.isOfficiallyAttacking)
    {
        this.game.time.events.remove(this.movement);
        this.move(door, battery, staticEffect);
    }
    else if(this.game.camera.x == this.var._westHallPosX && this._pos._attack && !this.isOfficiallyAttacking && !this.realAttackStarted)
    {
        this.isOfficiallyAttacking = true;
        this.game.time.events.remove(this.attacking);
        this.attackSpotted(door, battery, staticEffect);
    }
};
Foxy.prototype.attack = function(door, battery, staticEffect)
{
    var timeToMove = Math.floor((Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min) * 1000);//Cambiar tiempos
    this.runSprite.alpha = 1;

    this.attacking = this.game.time.events.add (timeToMove, function()
    {  
        this.realAttack(door, battery, staticEffect);
    }, this);
};
Foxy.prototype.attackSpotted = function(door, battery, staticEffect)
{
    this.spottedMoving = true;
    this.runSprite.x = this.var._foxyRoom4X;
    this.runSprite.y = this.var._foxyRoom4Y;
    this.runSprite.animations.add('run');
    this.runSprite.animations.play('run', 5, true);
    this.runSound.play();

    this.runAnim(door, battery, staticEffect);

};
Foxy.prototype.realAttack = function(door, battery, staticEffect)
{
    this.realAttackStarted = true;
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
        this._moveSound.play();

        this._moveSound.onStop.add(function() 
        {  
            if(!this.alreadyAttacked )
            {
                this.alreadyAttacked = true;
                if(this.game.camera.x == this.var._pirateCovePosX)
                    this.moveEffect(this.game, staticEffect);

                this._path[3]._image.alpha = 0;
                this._pos = this._path[this._pos._connect];
                this._pos._image.alpha = 1;
                this._sprite.visible = false;
                this._sprite.x = this._pos._x;       this._sprite.y = this._pos._y;
                
                this.realAttackStarted = false;
                this.move(door, battery, staticEffect);
            }
        }, this);
    }
        
};
Foxy.prototype.runAnim = function(door, battery, staticEffect)
{
    this.game.time.events.add (200, function()
    {
        this.notLookedWhileMoving();
        if(this.spottedMoving && this.runSprite.y <= 430)
        {
            this.runSprite.y = this.runSprite.y + 20;

            this.runAnim(door, battery, staticEffect);
        }
        else
        {
            this.runSound.stop();
            
            this.spottedMoving = false;
            this.runSprite.alpha = 0;
            this.runSprite.animations.stop('run');

            this.attackingSpotted = this.game.time.events.add (5000, function()
            {  
                this.realAttack(door, battery, staticEffect);
            }, this);
        }
    }, this);
};
Foxy.prototype.notLookedWhileMoving = function()
{
    if(this.game.camera.x != this.var._westHallPosX && this.spottedMoving)
        this.spottedMoving = false; 
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