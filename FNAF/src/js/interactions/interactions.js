'use strict';

function Interact (sound) 
{
    this._active = false;
    this._sound = sound;
};
Interact.prototype.resetInteract = function(){ this._active = false; }
Interact.prototype.getActive = function(){ return this._active; }
Interact.prototype.changeActive = function(){ this._active = !this._active; }

module.exports = Interact;