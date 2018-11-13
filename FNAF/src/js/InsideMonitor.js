'use strict';

function InsideMonitor (game, Rooms)
{
    this.cam1A = this.addButton(game, Rooms, Rooms.ShowStage, -19.2, -11.7, this, 0);
    this.cam1A.frame = 11;
    this.cam1B = this.addButton(game, Rooms, Rooms.DinningRoom, -18.2, -12.7, this, 1);
    this.cam1C = this.addButton(game, Rooms, Rooms.PirateCove, -17.2, -14, this, 2);
    this.cam2A = this.addButton(game, Rooms, Rooms.WestHall, -18.4, -15.2, this, 3);
    this.cam2B = this.addButton(game, Rooms, Rooms.WHallCorner, -17.68, -16.2, this, 4);
    this.cam3 = this.addButton(game, Rooms, Rooms.SupplyCloset, -17, -15, this, 5);
    this.cam4A = this.addButton(game, Rooms, Rooms.EastHall, -20, -15.2, this, 6);
    this.cam4B = this.addButton(game, Rooms, Rooms.EHallCorner, -20.72, -16.2, this, 7);
    this.cam5 = this.addButton(game, Rooms, Rooms.Backstage, -16.4, -13, this, 8);
    this.cam6 = this.addButton(game, Rooms,  Rooms.Kitchen, -21.2, -15.15, this, 9);
    this.cam7 = this.addButton(game, Rooms, Rooms.Restrooms, -21.8, -12.85, this, 10);
};

InsideMonitor.prototype.changeActive = function(button,game, Rooms, n, numCam)
{   
    game.camera.x = Rooms.cameraPositions[n].x;
    game.camera.y = Rooms.cameraPositions[n].y;
    this.cam1A.frame = 0;
    this.cam1B.frame = 1;
    this.cam1C.frame = 2;
    this.cam2A.frame = 3;
    this.cam2B.frame = 4;
    this.cam3.frame = 5;
    this.cam4A.frame = 6;
    this.cam4B.frame = 7;
    this.cam5.frame = 8;
    this.cam6.frame = 9;
    this.cam7.frame = 10;

    button.frame = numCam + 11;
}

InsideMonitor.prototype.addButton = function(game, Rooms, n, posX, posY, button, numCam)
{
    var button = game.add.button(0, 0, 'buttonsCameras', function (){this.changeActive(button, game, Rooms, n, numCam)}, this);
    button.frame = numCam;
    
    button.anchor.setTo(posX, posY);
    button.fixedToCamera = true;

    return button;
}

InsideMonitor.prototype.actionOnClick = function(button, game, Rooms, n)
{
   
    game.camera.x = Rooms.cameraPositions[n].x;
    game.camera.y = Rooms.cameraPositions[n].y;
    this.changeActive(button);

}
