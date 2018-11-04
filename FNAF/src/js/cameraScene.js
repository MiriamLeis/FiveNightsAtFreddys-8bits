'use strict'

require('./interactions.js');

var CameraScene =
{
    preload: function()
    {

    },

    create: function()
    {
        var tamX = this.game.world.width;
        var tamY = this.game.world.height;

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
                4: {sprite: this.game.add.sprite(0, 0, 'foxy'), x: tamX * 4, y: tamY * 4}, //no hay imagen de cocina
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

    //Draw cameras
        addCamera( Rooms.cameraPositions[Rooms.ShowStage], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.DinningRoom], tamX, tamY, 1.5);
        addCamera( Rooms.cameraPositions[Rooms.Backstage], tamX, tamY, 1.5);
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
        this.cam1A = addButton(this.game,Rooms,Rooms.ShowStage, 0, 0, /*0.05, 0.05*/);
        this.cam1B = addButton(this.game,Rooms,Rooms.DinningRoom, -1, 0, /*0.05, 0.05*/);
        this.cam5 = addButton(this.game,Rooms,Rooms.Backstage, -2, 0, /*0.05, 0.05*/);
        this.cam7 = addButton(this.game,Rooms,Rooms.Restrooms, -3, 0, /*0.05, 0.05*/);
        this.cam6 = addButton(this.game,Rooms,Rooms.Kitchen, -4, 0, /*0.05, 0.05*/);
        this.cam4A = addButton(this.game,Rooms,Rooms.EastHall, -5, 0, /*0.05, 0.05*/);
        this.cam3 = addButton(this.game,Rooms,Rooms.SupplyCloset, -6, 0, /*0.05, 0.05*/);
        this.cam4B = addButton(this.game,Rooms,Rooms.EHallCorner, -7, 0, /*0.05, 0.05*/);
        this.cam2A = addButton(this.game,Rooms,Rooms.WestHall, -8, 0, /*0.05, 0.05*/);
        this.cam2B = addButton(this.game,Rooms,Rooms.WHallCorner, -9, 0, /*0.05, 0.05*/);
        this.cam1C = addButton(this.game,Rooms,Rooms.PirateCove, -10, 0, /*0.05, 0.05*/);

    },

    update: function()
    {
    }
};

function actionOnClick(game, Rooms, n)
{
    game.camera.x = Rooms.cameraPositions[n].x;
    game.camera.y = Rooms.cameraPositions[n].y;
}


function addButton(game, Rooms, n, posX, posY/*, tamX, tamY*/)
{
    var buttom = game.add.button(0, 0, 'buttonCameras', function (){actionOnClick(game, Rooms, n)}, this, 1, 0, 1);
    //buttom.scale.setTo(tamX, tamY);
    buttom.anchor.setTo(posX, posY);
    buttom.fixedToCamera = true;

    return buttom;
}

function addCamera(camera, tamX, tamY, tam)
{
    camera.sprite.scale.setTo(tam, tam);
    camera.sprite.x =  camera.x + (tamX - camera.sprite.width)/2;
    camera.sprite.y =  camera.y + (tamY - camera.sprite.height)/2; 
}


module.exports = CameraScene;