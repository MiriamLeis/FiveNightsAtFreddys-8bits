'use strict';

var Const = require('./const.js');

function InsideMonitor (game, Rooms, camerasTexts)
{
    this.var = new Const();
    this.changeCamSound = game.add.audio('changeCam');
    this.changeCamSound.volume = 0.5;
    
    this.cam1A = this.addButton(game, camerasTexts, Rooms.cameraPositions.ShowStage, this.var._cam1APosX, this.var._cam1APosY, this, 0);
    this.cam1B = this.addButton(game, camerasTexts, Rooms.cameraPositions.DinningRoom, this.var._cam1BPosX, this.var._cam1BPosY, this, 1);
    this.cam1C = this.addButton(game, camerasTexts, Rooms.cameraPositions.PirateCove, this.var._cam1CPosX, this.var._cam1CPosY, this, 2);
    this.cam2A = this.addButton(game, camerasTexts, Rooms.cameraPositions.WestHall, this.var._cam2APosX, this.var._cam2APosY, this, 3);
    this.cam2B = this.addButton(game, camerasTexts, Rooms.cameraPositions.WHallCorner, this.var._cam2BPosX, this.var._cam2BPosY, this, 4);
    this.cam3 = this.addButton(game, camerasTexts, Rooms.cameraPositions.SupplyCloset, this.var._cam3PosX, this.var._cam3PosY, this, 5);
    this.cam4A = this.addButton(game, camerasTexts, Rooms.cameraPositions.EastHall, this.var._cam4APosX, this.var._cam4APosY, this, 6);
    this.cam4B = this.addButton(game, camerasTexts, Rooms.cameraPositions.EHallCorner, this.var._cam4BPosX, this.var._cam4BPosY, this, 7);
    this.cam5 = this.addButton(game, camerasTexts, Rooms.cameraPositions.Backstage, this.var._cam5PosX, this.var._cam5PosY, this, 8);
    this.cam6 = this.addButton(game, camerasTexts, Rooms.cameraPositions.Kitchen, this.var._cam6PosX, this.var._cam6PosY, this, 9);
    this.cam7 = this.addButton(game, camerasTexts, Rooms.cameraPositions.Restrooms, this.var._cam7PosX, this.var._cam7PosY, this, 10);
    
    this.cam1A.frame = 11;
    this.lastPos = Rooms.cameraPositions.ShowStage.x;
};
InsideMonitor.prototype.reset = function(Rooms)
{   
    this.cam1A.frame = 11;
    this.lastPos = Rooms.cameraPositions.ShowStage.x;
}
InsideMonitor.prototype.changeActive = function(button, game, roomName, roomCam, numCam)
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
    roomName.frame = roomCam.nameFrame;
    this.changeCamSound.play();
}
InsideMonitor.prototype.addButton = function(game, roomName, roomCam, posX, posY, button, numCam)
{
    var button = game.add.button(0, 0, 'buttonsCameras', function (){this.changeActive(button, game, roomName, roomCam, numCam)}, this);
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

module.exports = InsideMonitor;