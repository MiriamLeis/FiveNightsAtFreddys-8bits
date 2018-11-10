function InsideMonitor (game, Rooms)
{
    this.cam1A = this.addButton(game, Rooms, Rooms.ShowStage, 0, 0,this);
    this.cam1A.frame = 1;
    this.cam1B = this.addButton(game, Rooms, Rooms.DinningRoom, -1, 0,this);
    this.cam5 = this.addButton(game, Rooms, Rooms.Backstage, -2, 0,this);
    this.cam7 = this.addButton(game, Rooms, Rooms.Restrooms, -3, 0,this);
    this.cam6 = this.addButton(game, Rooms,  Rooms.Kitchen, -4, 0,this);
    this.cam4A = this.addButton(game, Rooms, Rooms.EastHall, -5, 0,this);
    this.cam3 = this.addButton(game, Rooms, Rooms.SupplyCloset, -6, 0,this);
    this.cam4B = this.addButton(game, Rooms, Rooms.EHallCorner, -7, 0,this);
    this.cam2A = this.addButton(game, Rooms, Rooms.WestHall, -8, 0,this);
    this.cam2B = this.addButton(game, Rooms, Rooms.WHallCorner, -9, 0,this);
    this.cam1C = this.addButton(game, Rooms, Rooms.PirateCove, -10, 0,this);


};

InsideMonitor.prototype.changeActive = function(button,game, Rooms, n)
{   
    game.camera.x = Rooms.cameraPositions[n].x;
    game.camera.y = Rooms.cameraPositions[n].y;
    this.cam1A.frame = 0;
    this.cam1B.frame = 0;
    this.cam5.frame = 0;
    this.cam7.frame = 0;
    this.cam6.frame = 0;
    this.cam4A.frame = 0;
    this.cam3.frame = 0;
    this.cam4B.frame = 0;
    this.cam2A.frame = 0;
    this.cam2B.frame = 0;
    this.cam1C.frame = 0;
    button.frame = 1;
}

InsideMonitor.prototype.addButton = function(game, Rooms, n, posX, posY, button)
{
    var button = game.add.button(0, 0, 'buttonCameras', function (){this.changeActive(button, game, Rooms, n)}, this);
    
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
