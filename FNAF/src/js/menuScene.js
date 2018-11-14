'use strict';

var Menu =
{
    create: function()
    {
        var buttonStart = this.game.add.button(0, 0, 'buttonsCameras', function (){actionOnClick(this.game)}, this);
        
    }
    
};

//LUCES Y PUERTAS

function actionOnClick (game)
{
    game.state.start('office');
}



module.exports = Menu;