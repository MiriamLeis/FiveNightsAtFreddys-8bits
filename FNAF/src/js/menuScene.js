'use strict';

var Menu =
{
    create: function()
    {
        var buttonStart = this.game.add.button(0, 0, 'buttonsCameras', function (){actionOnClick(this.game)}, this);
        
        function actionOnClick (game)
        {
            game.state.start('game');
        }
    }
    
};

module.exports = Menu;