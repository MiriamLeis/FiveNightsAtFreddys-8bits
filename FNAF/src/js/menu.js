'use strict';

var PlayScene = require('./play_scene.js');

var Menu =
{
    create: function()
    {
        this._buttonNew = this.game.add.button(0, 0, 'bonnie', actionOnClick, this);
        //this._buttonContinue = buttonC;
        //this._buttonExit = buttonE;
        
    }
};

//LUCES Y PUERTAS
/*
function actionOnClick ()
{
    if(!this.activo)
    {
        this.activo = true
        this._buttonNew.frame = 1;
    }
    else
    {
        this.activo = false
        this._buttonNew.frame = 0;
    }
}
*/


module.exports = Menu;