'use strict';

Animatronics = require('./animatronics.js');

function Night(phoneGuy)
{
    this._night = night;
    this._phoneGuy = phoneGuy; //Array audios. Implementar cuando sepamos como funcionan los audios
    //Freddy
    var pathFreddy = [];
    pathFreddy.push(new Room ('showStage', pathFreddy[1], null, null));
    pathFreddy.push(new Room ('showStage', pathFreddy[1], null, null));
    pathFreddy.push(new Room ('diningRoom', pathFreddy[2], null, null));
    pathFreddy.push(new Room ('restroom', pathFreddy[3], null, null));
    pathFreddy.push(new Room ('kitchen', pathFreddy[4], null, null));
    pathFreddy.push(new Room ('eastHall', pathFreddy[5], null, null));
    pathFreddy.push(new Room ('eHallCorner', null, null, null, /*Freddy.attack()*/));

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
    pathChica.push (new Room ('eHallCorner', pathChica[4], null, null, /*Chica.attack()*/));

    this._Chica = new BonnieChica('chica', '', '', pathChica, 0, [[2, 3], [0, 3], [0, 1], [0, 2], [0, 1], [0, 0]], [[,], [,], [,], [,], [,], [,]]);

    //Bonnie
    var pathBonnie = [];
    pathBonnie.push(new Room ('showStage', pathBonnie[1], null, null));
    pathBonnie.push(new Room ('diningRoom', pathBonnie[2], pathBonnie[3], null));
    pathBonnie.push(new Room ('backStage', pathBonnie[1], null, null));
    pathBonnie.push(new Room ('westHall', pathBonnie[1], pathBonnie[4], pathBonnie[5]));
    pathBonnie.push(new Room ('supplyCloset', pathBonnie[3], pathBonnie[5], null));
    pathBonnie.push(new Room ('wHallCorner', pathBonnie[3], pathBonnie[4], null, /*Bonnie.attack()*/));

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