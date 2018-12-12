var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Bonnie-------------------------//
function Bonnie(sprite)
{
    this.var = new Const();
    this.visible = true;

    BonnieChica.apply(this,[sprite,
                        //ruta
                        [new Room (this.var._bonnieRoom1X, this.var._bonnieRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                        new Room (this.var._bonnieRoom2X, this.var._bonnieRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, 3, null), 
                        new Room (this.var._bonnieRoom3X, this.var._bonnieRoom3Y, this.var._backstagePosX, this.var._backstagePosY, 'backStage', 1, null, null), 
                        new Room (this.var._bonnieRoom4X, this.var._bonnieRoom4Y, this.var._westHallPosX, this.var._westHallPosY, 'westHall', 1, 4, 5),
                        new Room (this.var._bonnieRoom5X, this.var._bonnieRoom5Y, this.var._supplyClosetPosX, this.var._supplyClosetPosY, 'supplyCloset', 3, 5, null), 
                        new Room (this.var._bonnieRoom6X, this.var._bonnieRoom6Y, this.var._wHallCornerPosX, this.var._wHallCornerPosY, 'wHallCorner', 3, 4, null, true)],
                        //rango de horas de activacion
                        [{min: 0, max: 0}, {min: 0, max: 1}, {min: 1.5, max: 2}, {min: 0, max: 0.5}, {min: 0, max: 0}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 5, max: 10}, {min: 15, max: 25}, {min: 7, max: 15}, {min: 5, max: 12}, {min: 3, max: 6}, {min: 2, max: 5}],
                        //rango de segundos de ataque
                        [{min: 5, max: 10}, {min: 8, max: 12}, {min: 6.5, max: 11}, {min: 5.5, max: 9}, {min: 3, max: 5}, {min: 2, max: 4}], this.var]);

}
Bonnie.prototype = Object.create(BonnieChica.prototype);
Bonnie.prototype.constructor = Bonnie;

Bonnie.prototype.foxyAndMe = function(foxy, game, staticEffect)
{
    if(this._pos._name == 'westHall' && foxy._pos._x == this.var._foxyRoom4X && this.visible)
    {   
        this.alphaSprite(0);
        this.visible = false;
    }
    else if(foxy._pos._x != this.var._foxyRoom4X && !this.isAttacking() && !this.visible)
    {
        if (game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y)
            this.moveEffect(game, staticEffect);
        this.alphaSprite(1);
        this.visible = true;
    }
    else if(this._pos._name != 'westHall' && !this.isAttacking()&& !this.visible)
    {
        if (game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y)
            this.moveEffect(game, staticEffect);
        this.alphaSprite(1);
        this.visible = true;
    }
};

module.exports = Bonnie;