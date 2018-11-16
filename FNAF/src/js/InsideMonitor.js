'use strict';

function InsideMonitor (game, Rooms)
{
    this.cam1A = this.addButton(game, Rooms.cameraPositions.ShowStage, -19.2, -11.7, this, 0);
    this.cam1B = this.addButton(game, Rooms.cameraPositions.DinningRoom, -18.2, -12.7, this, 1);
    this.cam1C = this.addButton(game, Rooms.cameraPositions.PirateCove, -17.2, -14, this, 2);
    this.cam2A = this.addButton(game, Rooms.cameraPositions.WestHall, -18.4, -15.2, this, 3);
    this.cam2B = this.addButton(game, Rooms.cameraPositions.WHallCorner, -17.68, -16.2, this, 4);
    this.cam3 = this.addButton(game, Rooms.cameraPositions.SupplyCloset, -17, -15, this, 5);
    this.cam4A = this.addButton(game, Rooms.cameraPositions.EastHall, -20, -15.2, this, 6);
    this.cam4B = this.addButton(game, Rooms.cameraPositions.EHallCorner, -20.72, -16.2, this, 7);
    this.cam5 = this.addButton(game, Rooms.cameraPositions.Backstage, -16.4, -13, this, 8);
    this.cam6 = this.addButton(game, Rooms.cameraPositions.Kitchen, -21.2, -15.15, this, 9);
    this.cam7 = this.addButton(game, Rooms.cameraPositions.Restrooms, -21.8, -12.85, this, 10);
    
    this.cam1A.frame = 11;
    this.lastPos = Rooms.cameraPositions.ShowStage.x;
};

InsideMonitor.prototype.changeActive = function(button, game, roomCam, numCam)
{   
    this.lastPos = game.camera.x = roomCam.x;
    game.camera.y = roomCam.y;
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

InsideMonitor.prototype.addButton = function(game, roomCam, posX, posY, button, numCam)
{
    var button = game.add.button(0, 0, 'buttonsCameras', function (){this.changeActive(button, game, roomCam, numCam)}, this);
    button.frame = numCam;
    
    button.anchor.setTo(posX, posY);
    button.fixedToCamera = true;

    return button;
}

InsideMonitor.prototype.notInput = function()
{
    this.cam1A.inputEnabled = false;
    this.cam1B.inputEnabled = false;
    this.cam1C.inputEnabled = false;
    this.cam2A.inputEnabled = false;
    this.cam2B.inputEnabled = false;
    this.cam3.inputEnabled = false;
    this.cam4A.inputEnabled = false;
    this.cam4B.inputEnabled = false;
    this.cam5.inputEnabled = false;
    this.cam6.inputEnabled = false;
    this.cam7.inputEnabled = false;

    this.cam1A.alpha = 0;
    this.cam1B.alpha = 0;
    this.cam1C.alpha = 0;
    this.cam2A.alpha = 0;
    this.cam2B.alpha = 0;
    this.cam3.alpha = 0;
    this.cam4A.alpha = 0;
    this.cam4B.alpha = 0;
    this.cam5.alpha = 0;
    this.cam6.alpha = 0;
    this.cam7.alpha = 0;
    

}
InsideMonitor.prototype.Input = function()
{
    this.cam1A.inputEnabled = true;
    this.cam1B.inputEnabled = true;
    this.cam1C.inputEnabled = true;
    this.cam2A.inputEnabled = true;
    this.cam2B.inputEnabled = true;
    this.cam3.inputEnabled = true;
    this.cam4A.inputEnabled = true;
    this.cam4B.inputEnabled = true;
    this.cam5.inputEnabled = true;
    this.cam6.inputEnabled = true;
    this.cam7.inputEnabled = true;

    this.cam1A.alpha = 1;
    this.cam1B.alpha = 1;
    this.cam1C.alpha = 1;
    this.cam2A.alpha = 1;
    this.cam2B.alpha = 1;
    this.cam3.alpha = 1;
    this.cam4A.alpha = 1;
    this.cam4B.alpha = 1;
    this.cam5.alpha = 1;
    this.cam6.alpha = 1;
    this.cam7.alpha = 1;
}


InsideMonitor.prototype.LastPos = function()
{
    return this.lastPos;
}