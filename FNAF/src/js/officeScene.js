'use strict';

require('./Interactions.js');
require('./InsideMonitor.js');
require('./Animatronics.js');

var moveLeft;
var moveRight;
var inOffice;
var yaCambiado;
var lastPos;


var mapEdge;
var staticEffect;
var REC;
var RECPoint;
var map;
var monitor;
var changeView;

var OfficeScene =
{
    preload: function ()
    {

    },
    
    create: function () 
    {

        yaCambiado = inOffice = true;
        var tamX = 792;
        var tamY = 594;

        this.game.world.resize(tamX * 13, tamY);
        this.game.camera.x = 396;

        //========================================================================================
//Variables que se cambian cuando vas a office: mapEdge, staticEffect, REC, RECPoint, map

//Variables que se cambian cuando vas a cameras: moveLeft, moveRight


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
                0: {sprite: this.game.add.sprite(0, 0, 'showStage'), x: tamX*2, y: 0},
                1: {sprite: this.game.add.sprite(0, 0, 'dinningRoom'), x: tamX *3, y: 0},
                2: {sprite: this.game.add.sprite(0, 0, 'backstage'), x: tamX * 4, y: 0},
                3: {sprite: this.game.add.sprite(0, 0, 'restrooms'), x: tamX * 5, y: 0},
                4: {sprite: this.game.add.sprite(0, 0, ''), x: tamX * 6, y: 0},
                5: {sprite: this.game.add.sprite(0, 0, 'eastHall'), x: tamX * 7, y: 0},
                6: {sprite: this.game.add.sprite(0, 0, 'supplyCloset'), x: tamX * 8, y: 0},
                7: {sprite: this.game.add.sprite(0, 0, 'eHallCorner'), x: tamX * 9, y: 0},
                8: {sprite: this.game.add.sprite(0, 0, 'westHall'), x: tamX * 10, y: 0},
                9: {sprite: this.game.add.sprite(0, 0, 'wHallCorner'), x: tamX * 11, y: 0},
                10: {sprite: this.game.add.sprite(0, 0, 'pirateCov1'), x: tamX * 12, y: 0},
            }
        }
        
    //Draw edge
        mapEdge = this.game.add.image(0, 0, 'edge');
        mapEdge.fixedToCamera = true;

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

    //Static effect
        staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        staticEffect.alpha = 0.1;
        staticEffect.animations.add('startEffect');
        staticEffect.animations.play('startEffect', 10, true);

        staticEffect.fixedToCamera = true;
        
    //Draw REC
        REC = this.game.add.image(43, 20, 'REC');
        REC.scale.setTo(0.75, 0.75);

        RECPoint = this.game.add.sprite(10, 15, 'RECPoint');
        RECPoint.animations.add('blink');
        RECPoint.animations.play('blink', 1, true);
        
        REC.fixedToCamera = true;
        RECPoint.fixedToCamera = true;

    //Draw map
        map = this.game.add.image(0, 0, 'camerasMap');
        map.scale.setTo(2, 2);
        map.anchor.set(-2, -1.94);
        map.fixedToCamera = true;
        

    //Map buttons
        monitor = new InsideMonitor(this.game, Rooms);



//=============================================================================================================================


        var office = this.game.add.sprite(0, 0, 'office');

        //Door and light buttons
        var lightLeft = new Light(this.game, 56, 60, 34, 94, 'leftLight');
        var lightRight = new Light(this.game, 68.5*4 + tamX+ tamX/2, 61.5, 92 +tamX + tamX/3, 94, 'rightLight');

        var doorLeft = new Door(this.game, 281.25, 27, 180, 77.25);
        var doorRight = new Door(this.game, tamX + 225 * 2, 27, tamX + 173 * 2, 77.25);
        
        


        //Side edges
        moveLeft = this.game.add.sprite(0, 0, 'sideEdge');
        moveLeft.inputEnabled = true;
        moveRight = this.game.add.sprite(792 - 45 , 0, 'sideEdge');
        moveRight.inputEnabled = true;

        moveRight.fixedToCamera = true;
        moveLeft.fixedToCamera = true;

        changeView = this.game.add.button(800/2 - 316.8/2, 600 - 66 - 10, 'buttonMonitor', function() {yaCambiado = true;inOffice = changeScene(this.game, inOffice,monitor.LastPos(), lastPos)}, this, 1, 0);
        changeView.scale.setTo(0.8, 1);
        changeView.alpha = 0.4;
        changeView.fixedToCamera = true;


    },

    update: function()
    {
        
        if (moveLeft.input.pointerOver())
            lastPos = this.game.camera.x =  this.game.camera.x - 10;
        else if (moveRight.input.pointerOver() && this.game.camera.x <785)
            lastPos = this.game.camera.x = this.game.camera.x + 10;

        if(inOffice && yaCambiado)
        {
            mapEdge.alpha = 0;
            staticEffect.alpha = 0;
            REC.alpha = 0;
            RECPoint.alpha = 0;
            map.alpha = 0;
            monitor.notInput();
            
            moveRight.inputEnabled = true;
            moveLeft.inputEnabled = true;

            yaCambiado = false;
        }
        else if(!inOffice && yaCambiado)
        {
            mapEdge.alpha = 1;
            staticEffect.alpha = 0.1;
            REC.alpha = 1;
            RECPoint.alpha = 1;
            map.alpha = 1;
            monitor.Input();
            
            moveRight.inputEnabled = false;
            moveLeft.inputEnabled = false;

            yaCambiado = false;
        }
    }
    
}

function changeScene (game, inOffice, point, point2)
{
    if(inOffice)
    {
        game.camera.x = point;
        return !inOffice;
    }
    else
    {
        game.camera.x = point2;
        return !inOffice;
    }
}



function addCamera(camera, tamX, tamY, tam)
{
    camera.sprite.scale.setTo(tam, tam);
    camera.sprite.x =  camera.x + (tamX - camera.sprite.width)/2;
    camera.sprite.y =  camera.y + (tamY - camera.sprite.height)/2; 
}


module.exports = OfficeScene;