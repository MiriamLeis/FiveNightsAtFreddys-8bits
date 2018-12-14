'use strict';

function Interact (sound, errorSound) 
{
    this._active = false;
    this._block = false;
    this._errorSound = errorSound;
    this._errorSound.volume = 0.2;
    this._sound = sound;
};
Interact.prototype.resetInteract = function(){ this._active = false; }
Interact.prototype.getActive = function(){ return this._active; }
Interact.prototype.changeActive = function(){ this._active = !this._active; }

module.exports = Interact;