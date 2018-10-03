'use strict';


var Interact = {
     active: undefined,
     button: undefined,
}

var Door = function()
{
     var doorInteract = new Interact;

     this.doorInteract.active = false;

    function createButton(x,y)
    {
        //Declarar boton
    }

     function changeDoorStatus()
     {
         this.doorInteract.active = !this.doorInteract.active;
     }
}

var Light = function()
{
     var doorInteract = new Interact;

     this.doorInteract.active = false;

     function createButton(x,y)
     {
         //Declarar boton
     }

     function changeLightStatus()
     {
         //Intentar hacer un invoke
         this.doorInteract.active = !this.doorInteract.active;
     }
}

function Monitor ()
{
    

}
this.hola = function()
{
    console.log("hola");
}
hola.prototype.changeMonitorStatus = function()
{
    console.log("yah");
}


