'use strict';

//meter phoneGuy
function Night(spriteDec,spriteU, numberNight)
{
    this._night = 1;
    this._hour = 0;
    this._hourArr = [12,1,2,3,4,5,6];

    this.spriteU = spriteU;
    this.spriteDec = spriteDec;
    this.spriteNight = numberNight;

    this.spriteU.fixedToCamera = true;
    this.spriteDec.fixedToCamera = true;
    this.spriteNight.fixedToCamera = true;
    
    this.spriteU.frame = 2;
    this.spriteDec.frame = 1;
    this.spriteNight.frame = 1;

    this.spriteU.scale.setTo(0.8, 0.8);
    this.spriteDec.scale.setTo(0.8, 0.8);
    this.spriteNight.scale.setTo(0.55,0.55);



}
Night.prototype.changeNight = function()
{
    this._night++;
    this.spriteNight.frame++;
   /* this._Freddy.changeInfo(night);
    this._Foxy.changeInfo(night);
    this._Chica.changeInfo(night);
    this._Bonnie.changeInfo(night);*/
}
Night.prototype.startNight = function()
{
    //Los animatronicos se "activan"
}

Night.prototype.finishNight = function()
{
    this._night++;
    this.spriteNight.frame = this._night;

    this.spriteDec.alpha = 1;
    this._hour = 0;
    this.spriteU.frame = this._hourArr[2];
}
Night.prototype.changeHour = function()
{
    this.spriteDec.alpha = 0;
    this._hour++;
    this.spriteU.frame = this._hourArr[this._hour];

    if(this._hour == 6)
        this.finishNight();
}
//Se veran si se añaden mas





    /*//Freddy
    var pathFreddy = [];
    pathFreddy.push(new Room ('showStage', pathFreddy[1], null, null));
    pathFreddy.push(new Room ('showStage', pathFreddy[1], null, null));
    pathFreddy.push(new Room ('diningRoom', pathFreddy[2], null, null));
    pathFreddy.push(new Room ('restroom', pathFreddy[3], null, null));
    pathFreddy.push(new Room ('kitchen', pathFreddy[4], null, null));
    pathFreddy.push(new Room ('eastHall', pathFreddy[5], null, null));
    pathFreddy.push(new Room ('eHallCorner', null, null, null, Freddy.attack()));

    this._Freddy = new Freddy('freddy', '', '', pathFreddy, 0, [[null, null], [null, null], [3, 4], [2, 3], [0, 1], [0, 0]], [[null, null], [null, null], [,], [,], [,], [,]]);

    //Foxy
    var pathFoxy = []; //Mirar mejor
    pathFoxy.push('hide');
    pathFoxy.push('half-hide');
    pathFoxy.push('spotted');
    pathFoxy.push('running');

    this._Foxy = new Foxy('foxy', '', 'foxyRun', pathFoxy, 0, [[null, null], [null, null], [3, 4], [2, 3], [0, 1], [0, 0]], [[, ], [, ], [,], [,], [,], [,]]);

    //Chica
    var pathChica = [];
    pathChica.push (new Room ('showStage', pathChica[1], null, null));
    pathChica.push (new Room ('diningRoom', pathChica[2], pathChica[3], pathChica[4]));
    pathChica.push (new Room ('restroom', pathChica[1], null, null));
    pathChica.push (new Room ('kitchen', pathChica[1], null, null));
    pathChica.push (new Room ('eastHall', pathChica[1], pathChica[5], null));
    pathChica.push (new Room ('eHallCorner', pathChica[4], null, null, Chica.attack()));

    this._Chica = new BonnieChica('chica', '', '', pathChica, 0, [[2, 3], [0, 3], [0, 1], [0, 2], [0, 1], [0, 0]], [[,], [,], [,], [,], [,], [,]]);

    //Bonnie
    var pathBonnie = [];
    pathBonnie.push(new Room ('showStage', pathBonnie[1], null, null));
    pathBonnie.push(new Room ('diningRoom', pathBonnie[2], pathBonnie[3], null));
    pathBonnie.push(new Room ('backStage', pathBonnie[1], null, null));
    pathBonnie.push(new Room ('westHall', pathBonnie[1], pathBonnie[4], pathBonnie[5]));
    pathBonnie.push(new Room ('supplyCloset', pathBonnie[3], pathBonnie[5], null));
    pathBonnie.push(new Room ('wHallCorner', pathBonnie[3], pathBonnie[4], null, Bonnie.attack());

    this._Bonnie = new BonnieChica('bonnie', '', '', pathBonnie, 0, [[2, 2], [0, 1], [1, 2], [0, 1], [0, 1], [0, 0]], [[,], [,], [,], [,], [,], [,]]);*/