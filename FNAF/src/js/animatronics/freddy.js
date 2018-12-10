//--------------------Clases
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');
var Room = require('./room.js');


//---------------------Freddy-------------------------//
function Freddy(sprite, darkFreddy, attack)
{
    this.var = new Const();

    this.darkFreddy = darkFreddy
    this.darkFreddy.alpha = 0;
    this.darkFreddyAnim = this.darkFreddy.animations.add('loop');

    this.attackSprite = attack;
    this.attackSprite.alpha = 0;
    this.attackDarkAnim = this.attackSprite.animations.add('start');

    Animatronics.apply(this,[sprite,  
                            //ruta
                            [new Room (this.var._freddyRoom1X, this.var._freddyRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                            new Room (this.var._freddyRoom2X, this.var._freddyRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, null,null), 
                            new Room (this.var._freddyRoom3X, this.var._freddyRoom3Y, this.var._restroomsPosX, this.var._restroomsPosY, 'restroom', 3, null, null), 
                            new Room (this.var._freddyRoom4X, this.var._freddyRoom4Y, this.var._kitchenPosX, this.var._kitchenPosY, 'kitchen', 4, null, null),
                            new Room (this.var._freddyRoom5X, this.var._freddyRoom5Y, this.var._eastHallPosX, this.var._eastHallPosY, 'eastHall', 5, null, null), 
                            new Room (this.var._freddyRoom6X, this.var._freddyRoom6Y, this.var._eHallCornerPosX, this.var._eHallCornerPosY, 'eHallCorner', null, null, null, true)],
                            //rango de horas de activacion
                            [{min: 2, max: 3}, {min: 0, max: 3}, {min: 0, max: 1}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                            //rango de segundos de movimiento
                            [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}], this.var]);
};
Freddy.prototype = Object.create(Animatronics.prototype);
Freddy.prototype.constructor = Freddy;

Freddy.prototype.move = function(game, bonnie, chica)
{
    var timeToMove = Math.floor(Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min);
    var move = game.time.events.add (timeToMove, function()
    {

    }, this);
};
Freddy.prototype.attack = function()
{

};
Freddy.prototype.attackBattery = function(game, darkness, moveLeft, moveRight)
{
    game.time.events.add(18000, function()
    {
        this.attackSprite.alpha = 1;
        this.attackDarkAnim.play(1, true);
       //suena musiquita
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
        this.attackSprite.alpha = 0;
        this.attackDarkAnim.stop('start');

        moveLeft.inputEnabled = false;
        moveRight.inputEnabled = false;

        //parar musiquita
        darkness.alpha = 0.9; //cambiar

        if (game.camera.x != posCamera)
            var time = 2000;
        else
            var time = 9000;
        game.time.events.add(time, function()
        {
            this.alphaScreamer(1);
            //En un futuro hacer la animacion
            game.time.events.add(1500, function(){ game.state.start('death'); }, this);
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