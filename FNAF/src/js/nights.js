'use strict';

//meter phoneGuy
function Night(spriteDec, spriteU, numberNight)
{
    //Control del paso de hora y noches
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
Night.prototype.changeNight = function(freddy, chica, bonnie, /*foxy*/)
{
    this._night++;
    this.spriteNight.frame++;
    freddy.changeInfo(night);
    chica.changeInfo(night);
    bonnie.changeInfo(night);
    //foxy.changeInfo(night);
}
Night.prototype.startNight = function()
{
    //animacion hora al terminar
}

Night.prototype.finishNight = function()
{
    this._night++;
    this.spriteNight.frame = this._night;

    this.spriteDec.alpha = 1;
    this._hour = 0;
    this.spriteU.frame = this._hourArr[2];
}
Night.prototype.changeHour = function(battery)
{
    this.spriteDec.alpha = 0;
    this._hour++;
    this.spriteU.frame = this._hourArr[this._hour];

    if(this._hour == 6)
    {
        this.finishNight();
        battery.reset();
    }
}

module.exports = Night;
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

    this._Foxy = new Foxy('foxy', '', 'foxyRun', pathFoxy, 0, [[null, null], [null, null], [3, 4], [2, 3], [0, 1], [0, 0]], [[, ], [, ], [,], [,], [,], [,]]);*/

    //Bonnie
    /*var path = [];
    path.push(new Room ('showStage', 1, null, null));
    path.push(new Room ('diningRoom', 2, path[3], null));
    path.push(new Room ('backStage', 1, null, null));
    path.push(new Room ('westHall', 1, 4, path[5]));
    path.push(new Room ('supplyCloset', path[3], path[5], null));
    path.push(new Room ('wHallCorner', path[3], path[4], null, this.attack()));*/

    /*this.hour =  [];
    this.hour.push({min: 2, max: 2});
    this.hour.push({min: 0, max: 1});
    this.hour.push({min: 1, max: 2});
    this.hour.push({min: 0, max: 1});
    this.hour.push({min: 0, max: 1});
    this.hour.push({min: 0, max: 0});

    this.actTime = [];
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});*/