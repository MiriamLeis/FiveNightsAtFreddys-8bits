'use strict';
Animatronics = require('./animatronics.js');

function Night (phoneGuy)
{
    this._night = night;
    this._phoneGuy = phoneGuy; //Array audios. Implementar cuando sepamos como funcionan los audios
    //Freddy
    var pathFreddy = [6];
    pathFreddy[0] = new Room ('showStage', pathFreddy[1], null, null);
    pathFreddy[1] = new Room ('diningRoom', pathFreddy[2], null, null);
    pathFreddy[2] = new Room ('restroom', pathFreddy[3], null, null);
    pathFreddy[3] = new Room ('kitchen', pathFreddy[4], null, null);
    pathFreddy[4] = new Room ('eastHall', pathFreddy[5], null, null);
    pathFreddy[5] = new Room ('eHallCorner', null, null, null, /*Freddy.attack()*/);

    this._Freddy = new Freddy('freddy', '', '', pathFreddy, 0, [[null, null], [null, null], [3, 4], [2, 3], [0, 1], [0, 0]], [[null, null], [null, null], [,], [,], [,], [,]]);

    //Foxy
    var pathFoxy = [4]; //Mirar mejor
    pathFoxy[0] = 'hide';
    pathFoxy[1] = 'half-hide';
    pathFoxy[2] = 'spotted';
    pathFoxy[3] = 'running';

    this._Foxy = new Foxy('foxy', '', 'foxyRun', pathFoxy, 0, [[null, null], [null, null], [3, 4], [2, 3], [0, 1], [0, 0]], [[, ], [, ], [,], [,], [,], [,]]);

    //Chica
    var pathChica = [6];
    pathChica[0] = new Room ('showStage', pathChica[1], null, null);
    pathChica[1] = new Room ('diningRoom', pathChica[2], pathChica[3], pathChica[4]);
    pathChica[2] = new Room ('restroom', pathChica[1], null, null);
    pathChica[3] = new Room ('kitchen', pathChica[1], null, null);
    pathChica[4] = new Room ('eastHall', pathChica[1], pathChica[5], null);
    pathChica[5] = new Room ('eHallCorner', pathChica[4], null, null, /*Chica.attack()*/);

    this._Chica = new BonnieChica('chica', '', '', pathChica, 0, [[2, 3], [0, 3], [0, 1], [0, 2], [0, 1], [0, 0]], [[,], [,], [,], [,], [,], [,]]);

    //Bonnie
    var pathBonnie = [6];
    pathBonnie[0] = new Room ('showStage', pathBonnie[1], null, null);
    pathBonnie[1] = new Room ('diningRoom', pathBonnie[2], pathBonnie[3], null);
    pathBonnie[2] = new Room ('backStage', pathBonnie[1], null, null);
    pathBonnie[3] = new Room ('westHall', pathBonnie[1], pathBonnie[4], pathBonnie[5]);
    pathBonnie[4] = new Room ('supplyCloset', pathBonnie[3], pathBonnie[5], null);
    pathBonnie[5] = new Room ('wHallCorner', pathBonnie[3], pathBonnie[4], null, /*Bonnie.attack()*/);

    this._Bonnie = new BonnieChica('bonnie', '', '', pathBonnie, 0, [[2, 2], [0, 1], [1, 2], [0, 1], [0, 1], [0, 0]], [[,], [,], [,], [,], [,], [,]]);
}
Night.prototype.changeNight = function(night)
{
    this._night = night;
    this._Freddy.changeInfo(night);
    this._Foxy.changeInfo(night);
    this._Chica.changeInfo(night);
    this._Bonnie.changeInfo(night);
}
Night.prototype.startNight = function()
{
    //Los animatronicos se "activan"
}
//Se veran si se añaden mas