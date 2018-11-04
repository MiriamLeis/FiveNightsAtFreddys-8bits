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

        this.game.world.resize(tamX * 10, tamY * 10);

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

    //Buttons
        this.cam1A = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.ShowStage)}, this);
        this.cam1A.scale.setTo(0.05, 0.05);
        this.cam1A.anchor.setTo(0, 0);
        this.cam1A.fixedToCamera = true;

        this.cam1B = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.DinningRoom)}, this);
        this.cam1B.scale.setTo(0.05, 0.05);
        this.cam1B.anchor.setTo(-1, 0);
        this.cam1B.fixedToCamera = true;

        this.cam5 = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.Backstage)}, this);
        this.cam5.scale.setTo(0.05, 0.05);
        this.cam5.anchor.setTo(-2, 0);
        this.cam5.fixedToCamera = true;

        this.cam7 = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.Restrooms)}, this);
        this.cam7.scale.setTo(0.05, 0.05);
        this.cam7.anchor.setTo(-3, 0);
        this.cam7.fixedToCamera = true;

        this.cam6 = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.Kitchen)}, this);
        this.cam6.scale.setTo(0.05, 0.05);
        this.cam6.anchor.setTo(-4, 0);
        this.cam6.fixedToCamera = true;

        this.cam4A = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.EastHall)}, this);
        this.cam4A.scale.setTo(0.05, 0.05);
        this.cam4A.anchor.setTo(-5, 0);
        this.cam4A.fixedToCamera = true;

        this.cam3 = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.SupplyCloset)}, this);
        this.cam3.scale.setTo(0.05, 0.05);
        this.cam3.anchor.setTo(-6, 0);
        this.cam3.fixedToCamera = true;

        this.cam4B = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.EHallCorner)}, this);
        this.cam4B.scale.setTo(0.05, 0.05);
        this.cam4B.anchor.setTo(-7, 0);
        this.cam4B.fixedToCamera = true;

        this.cam2A = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.WestHall)}, this);
        this.cam2A.scale.setTo(0.05, 0.05);
        this.cam2A.anchor.setTo(-8, 0);
        this.cam2A.fixedToCamera = true;

        this.cam2B = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.WHallCorner)}, this);
        this.cam2B.scale.setTo(0.05, 0.05);
        this.cam2B.anchor.setTo(-9, 0);
        this.cam2B.fixedToCamera = true;

        this.cam1C = this.game.add.button(0, 0, 'button', function (){actionOnClick(this.game, Rooms, Rooms.PirateCove)}, this);
        this.cam1C.scale.setTo(0.05, 0.05);
        this.cam1C.anchor.setTo(-10, 0);
        this.cam1C.fixedToCamera = true;

    //Draw cameras
        /*ShowStage*/
        Rooms.cameraPositions[Rooms.ShowStage].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.ShowStage].sprite.x =  
            Rooms.cameraPositions[Rooms.ShowStage].x + (tamX - Rooms.cameraPositions[Rooms.ShowStage].sprite.width)/2;
        Rooms.cameraPositions[Rooms.ShowStage].sprite.y =  
            Rooms.cameraPositions[Rooms.ShowStage].y + (tamY - Rooms.cameraPositions[Rooms.ShowStage].sprite.height)/2;

        /*DinningRoom*/
        Rooms.cameraPositions[Rooms.DinningRoom].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.DinningRoom].sprite.x =  
            Rooms.cameraPositions[Rooms.DinningRoom].x + (tamX - Rooms.cameraPositions[Rooms.DinningRoom].sprite.width)/2;
        Rooms.cameraPositions[Rooms.DinningRoom].sprite.y =  
            Rooms.cameraPositions[Rooms.DinningRoom].y + (tamY - Rooms.cameraPositions[Rooms.DinningRoom].sprite.height)/2;

        /*Backstage*/
        Rooms.cameraPositions[Rooms.Backstage].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.Backstage].sprite.x =  
            Rooms.cameraPositions[Rooms.Backstage].x + (tamX - Rooms.cameraPositions[Rooms.Backstage].sprite.width)/2;
        Rooms.cameraPositions[Rooms.Backstage].sprite.y =  
            Rooms.cameraPositions[Rooms.Backstage].y + (tamY - Rooms.cameraPositions[Rooms.Backstage].sprite.height)/2;

        /*Restrooms*/
        Rooms.cameraPositions[Rooms.Restrooms].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.Restrooms].sprite.x =  
            Rooms.cameraPositions[Rooms.Restrooms].x + (tamX - Rooms.cameraPositions[Rooms.Restrooms].sprite.width)/2;
        Rooms.cameraPositions[Rooms.Restrooms].sprite.y =  
            Rooms.cameraPositions[Rooms.Restrooms].y + (tamY - Rooms.cameraPositions[Rooms.Restrooms].sprite.height)/2;

        /*Kitchen*/
        Rooms.cameraPositions[Rooms.Kitchen].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.Kitchen].sprite.x =  
            Rooms.cameraPositions[Rooms.Kitchen].x + (tamX - Rooms.cameraPositions[Rooms.Kitchen].sprite.width)/2;
        Rooms.cameraPositions[Rooms.Kitchen].sprite.y =  
            Rooms.cameraPositions[Rooms.Kitchen].y + (tamY - Rooms.cameraPositions[Rooms.Kitchen].sprite.height)/2;

        /*EastHall*/
        Rooms.cameraPositions[Rooms.EastHall].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.EastHall].sprite.x =  
            Rooms.cameraPositions[Rooms.EastHall].x + (tamX - Rooms.cameraPositions[Rooms.EastHall].sprite.width)/2;
        Rooms.cameraPositions[Rooms.EastHall].sprite.y =  
            Rooms.cameraPositions[Rooms.EastHall].y + (tamY - Rooms.cameraPositions[Rooms.EastHall].sprite.height)/2;

        /*SupplyCloset*/
        Rooms.cameraPositions[Rooms.SupplyCloset].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.SupplyCloset].sprite.x =  
            Rooms.cameraPositions[Rooms.SupplyCloset].x + (tamX - Rooms.cameraPositions[Rooms.SupplyCloset].sprite.width)/2;
        Rooms.cameraPositions[Rooms.SupplyCloset].sprite.y =  
            Rooms.cameraPositions[Rooms.SupplyCloset].y + (tamY - Rooms.cameraPositions[Rooms.SupplyCloset].sprite.height)/2;

        /*EHallCorner*/
        Rooms.cameraPositions[Rooms.EHallCorner].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.EHallCorner].sprite.x =  
            Rooms.cameraPositions[Rooms.EHallCorner].x + (tamX - Rooms.cameraPositions[Rooms.EHallCorner].sprite.width)/2;
        Rooms.cameraPositions[Rooms.EHallCorner].sprite.y =  
            Rooms.cameraPositions[Rooms.EHallCorner].y + (tamY - Rooms.cameraPositions[Rooms.EHallCorner].sprite.height)/2;

        /*WestHall*/
        Rooms.cameraPositions[Rooms.WestHall].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.WestHall].sprite.x =  
            Rooms.cameraPositions[Rooms.WestHall].x + (tamX - Rooms.cameraPositions[Rooms.WestHall].sprite.width)/2;
        Rooms.cameraPositions[Rooms.WestHall].sprite.y =  
            Rooms.cameraPositions[Rooms.WestHall].y + (tamY - Rooms.cameraPositions[Rooms.WestHall].sprite.height)/2;

        /*WHallCorner*/
        Rooms.cameraPositions[Rooms.WHallCorner].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.WHallCorner].sprite.x =  
            Rooms.cameraPositions[Rooms.WHallCorner].x + (tamX - Rooms.cameraPositions[Rooms.WHallCorner].sprite.width)/2;
        Rooms.cameraPositions[Rooms.WHallCorner].sprite.y =  
            Rooms.cameraPositions[Rooms.WHallCorner].y + (tamY - Rooms.cameraPositions[Rooms.WHallCorner].sprite.height)/2;

        /*PirateCove*/
        Rooms.cameraPositions[Rooms.PirateCove].sprite.scale.setTo(1.5, 1.5);

        Rooms.cameraPositions[Rooms.PirateCove].sprite.x =  
            Rooms.cameraPositions[Rooms.PirateCove].x + (tamX - Rooms.cameraPositions[Rooms.PirateCove].sprite.width)/2;
        Rooms.cameraPositions[Rooms.PirateCove].sprite.y =  
            Rooms.cameraPositions[Rooms.PirateCove].y + (tamY - Rooms.cameraPositions[Rooms.PirateCove].sprite.height)/2;
    },

    update: function()
    {
    }
};

function actionOnClick(game, Rooms, n)
{
    game.camera.x = Rooms.cameraPositions[n].x;
    game.camera.y = Rooms.cameraPositions[n].y;
    console.log ('hey');
}

module.exports = CameraScene;