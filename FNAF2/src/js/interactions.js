'use strict';

var Interact = {
     active: undefined,
     button: undefined,

}

var Door = function()
{
     var doorInteract = new Interact;

     this.doorInteract.active = false;


     function changeDoorStatus()
     {
         this.doorInteract.active = !this.doorInteract.active;
     }

}

var door1 = new Door();

var door2 = new Door();

door2.button = game.add.button()

