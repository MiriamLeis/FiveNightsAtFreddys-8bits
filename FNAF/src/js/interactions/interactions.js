'use strict';

function Interact () 
{
    this._active = false;
};

Interact.prototype.getActive = function(){ return this._active; }
Interact.prototype.changeActive = function(){ this._active = !this._active; }

module.exports = Interact;