'use strict'

require('./InsideMonitor.js');
require('./Animatronics.js');

var goToOffice;


var CameraScene =
{
    preload: function()
    {

    },

    create: function()
    {
        var tamX = 792;
        var tamY = 594;

        this.game.world.resize(tamX * 11, tamY * 11);

    //Cameras
        var Rooms =
        {
            ShowStage: 0,
            DinningRoom: 1,
            Backstage: 2,
            Restrooms: 3,
            Kitchen: 4,
            EastHall: 5,
            SupplyCloset: 6,
            EHallCorner: 7,
            WestHall: 8,
            WHallCorner: 9,
            PirateCove: 10,

            cameraPositions:
            {
                0: {sprite: this.game.add.sprite(0, 0, 'showStage'), x: 0, y: 0},
                1: {sprite: this.game.add.sprite(0, 0, 'dinningRoom'), x: tamX, y: tamY},
                2: {sprite: this.game.add.sprite(0, 0, 'backstage'), x: tamX * 2, y: tamY * 2},
                3: {sprite: this.game.add.sprite(0, 0, 'restrooms'), x: tamX * 3, y: tamY * 3},
                4: {sprite: this.game.add.sprite(0, 0, ''), x: tamX * 4, y: tamY * 4},
                5: {sprite: this.game.add.sprite(0, 0, 'eastHall'), x: tamX * 5, y: tamY * 5},
                6: {sprite: this.game.add.sprite(0, 0, 'supplyCloset'), x: tamX * 6, y: tamY * 6},
                7: {sprite: this.game.add.sprite(0, 0, 'eHallCorner'), x: tamX * 7, y: tamY * 7},
                8: {sprite: this.game.add.sprite(0, 0, 'westHall'), x: tamX * 8, y: tamY * 8},
                9: {sprite: this.game.add.sprite(0, 0, 'wHallCorner'), x: tamX * 9, y: tamY* 9},
                10: {sprite: this.game.add.sprite(0, 0, 'pirateCov1'), x: tamX * 10, y: tamY * 10},
            }
        }
    //Draw edge
    /*var map = this.game.add.image(0, 0, 'edge');
    map.fixedToCamera = true;*/

    //Draw REC
    var REC = this.game.add.image(43, 20, 'REC');
    REC.scale.setTo(0.75, 0.75);
    var RECPoint = this.game.add.sprite(10, 15, 'RECPoint');
    RECPoint.animations.add('blink');
    RECPoint.animations.play('blink', 1, true);
    
    REC.fixedToCamera = true;
    RECPoint.fixedToCamera = true;

    //Draw cameras
        addCamera( Rooms.cameraPositions[Rooms.ShowStage], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.DinningRoom], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.Backstage], tamX, tamY, 0.5);
        addCamera( Rooms.cameraPositions[Rooms.Restrooms], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.Kitchen], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.EastHall], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.SupplyCloset], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.EHallCorner], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.WestHall], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.WHallCorner], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.PirateCove], tamX, tamY, 1.5);

    //Draw map
        var map = this.game.add.image(0, 0, 'camerasMap');
        map.scale.setTo(2, 2);
        map.anchor.set(-2, -1.94);
        map.fixedToCamera = true;
        

    //Buttons
        var monitor = new InsideMonitor(this.game, Rooms);


        goToOffice = this.game.add.sprite(600, 300, 'bonnie');
        goToOffice.inputEnabled = true;
        goToOffice.fixedToCamera = true;


    },

    update: function()
    {
        if (goToOffice.input.pointerOver())
        {
            this.game.state.start('office');
        }
    }
};

function addCamera(camera, tamX, tamY, tam)
{
    camera.sprite.scale.setTo(tam, tam);
    camera.sprite.x =  camera.x + (tamX - camera.sprite.width)/2;
    camera.sprite.y =  camera.y + (tamY - camera.sprite.height)/2; 
}


module.exports = CameraScene;