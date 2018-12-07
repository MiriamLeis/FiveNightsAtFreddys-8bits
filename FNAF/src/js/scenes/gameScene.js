'use strict';

var Const = require('../const.js');

var Door = require('../interactions/door.js');
var Light = require('../interactions/light.js');

var Bonnie = require('../animatronics/bonnie.js');
var Chica = require('../animatronics/chica.js');

var Battery = require('../Battery.js');
var Night = require('../nights.js');
var InsideMonitor = require('../InsideMonitor.js');

var GameScene =
{
    preload: function () 
    {
        this.var = new Const();
    },

    create: function () 
    {
        this.game.world.resize(this.var._tamX * 13, this.var._tamY);
        this.game.camera.x = 396;
        this.timeForHour = 90000;
        this.realTimeToChange = this.timeForHour;

        this.inOffice = true;
        this.lastPosOffice = 396;

        this.moveLeft;
        this.moveRight;


        this.mapEdge;
        this.staticEffect;
        this.REC;
        this.RECPoint;
        this.map;
        this.monitor;
        this.changeView;

        this.doorRCount = false;
        this.doorLCount = false;
        this.lightRCount = false;
        this.lightLCount = false;


        //=====================================================OFFICE========================================================================


        var office = this.game.add.sprite(0, 0, 'office');

        //Side edges
        this.moveLeft = this.game.add.sprite(this.var._edgeIzqPosX, this.var._edgeIzqPosY, 'sideEdge');
        this.moveLeft.inputEnabled = true;
        this.moveRight = this.game.add.sprite(this.var._edgeDerPosX, this.var._edgeDerPosY, 'sideEdge');
        this.moveRight.inputEnabled = true;

        this.moveRight.fixedToCamera = true;
        this.moveLeft.fixedToCamera = true;

        //Doors
        this.doorLeft = new Door(this.game, this.var._doorButtonIzqPosX, this.var._doorButtonIzqPosY, this.var._doorIzqPosX, this.var._doorIzqPosY);
        this.doorRight = new Door(this.game, this.var._doorButtonDerPosX, this.var._doorButtonDerPosY, this.var._doorDerPosX, this.var._doorDerPosY);

        //=====================================================CAMERAS========================================================================

        var ShowStage = 'ShowStage';
        var DinningRoom = 'DinningRoom';
        var Backstage = 'Backstage'; 
        var Restrooms = 'Restrooms'; 
        var Kitchen = 'Kitchen'; 
        var EastHall = 'East Hall';
        var SupplyCloset = 'SupplyCloset';
        var EHallCorner = 'E.Hall';
        var WestHall = 'WestHall';
        var WHallCorner = 'W.Hall';
        var PirateCove = 'PirateCove';

        //Cameras
        var Rooms =
        {
            cameraPositions:
            {
                ShowStage: {nameFrame: 0, sprite: this.game.add.sprite(0, 0, 'showStage'), x: this.var._showStagePosX, y: this.var._showStagePosY },
                DinningRoom: {nameFrame: 1, sprite: this.game.add.sprite(0, 0, 'dinningRoom'), x: this.var._dinningRoomPosX, y: this.var._dinningRoomPosY },
                Backstage: {nameFrame: 2, sprite: this.game.add.sprite(0, 0, 'backstage'), x: this.var._backstagePosX, y: this.var._backstagePosY },
                Restrooms: {nameFrame: 3, sprite: this.game.add.sprite(0, 0, 'restrooms'), x: this.var._restroomsPosX, y: this.var._restroomsPosY },
                Kitchen: {nameFrame: 4, sprite: this.game.add.sprite(0, 0, 'kitchen'), x: this.var._kitchenPosX, y: this.var._kitchenPosY },
                EastHall: {nameFrame: 5, sprite: this.game.add.sprite(0, 0, 'eastHall'), x: this.var._eastHallPosX, y: this.var._eastHallPosY },
                SupplyCloset: {nameFrame: 6, sprite: this.game.add.sprite(0, 0, 'supplyCloset'), x: this.var._supplyClosetPosX, y: this.var._supplyClosetPosY },
                EHallCorner: {nameFrame: 7, sprite: this.game.add.sprite(0, 0, 'eHallCorner'), x: this.var._eHallCornerPosX, y: this.var._eHallCornerPosY },
                WestHall: {nameFrame: 8, sprite: this.game.add.sprite(0, 0, 'westHall'), x: this.var._westHallPosX, y: this.var._westHallPosY },
                WHallCorner: {nameFrame: 9, sprite: this.game.add.sprite(0, 0, 'wHallCorner'), x: this.var._wHallCornerPosX, y: this.var._wHallCornerPosY },
                PirateCove: {nameFrame: 10, sprite: this.game.add.sprite(0, 0, 'pirateCov1'), x: this.var._pirateCovePosX, y: this.var._pirateCovePosY },
            }
        }
        //Draw cameras
        addCamera(Rooms.cameraPositions.ShowStage, this.var._tamX, this.var._tamY, this.var._camTam);
        addCamera(Rooms.cameraPositions.DinningRoom, this.var._tamX, this.var._tamY, this.var._camTam);
        addCamera(Rooms.cameraPositions.Backstage, this.var._tamX, this.var._tamY, this.var._camTam);
        addCamera(Rooms.cameraPositions.Restrooms, this.var._tamX, this.var._tamY, this.var._camTam);
        addCamera(Rooms.cameraPositions.Kitchen, this.var._tamX, this.var._camKitchenY, this.var._camKitchenTam);
        addCamera(Rooms.cameraPositions.EastHall, this.var._tamX, this.var._tamY, this.var._camTam);
        addCamera(Rooms.cameraPositions.SupplyCloset, this.var._tamX, this.var._tamY, this.var._camTam);
        addCamera(Rooms.cameraPositions.EHallCorner, this.var._tamX, this.var._tamY, this.var._camTam);
        addCamera(Rooms.cameraPositions.WestHall, this.var._tamX, this.var._tamY, this.var._camTam);
        addCamera(Rooms.cameraPositions.WHallCorner, this.var._tamX, this.var._tamY, this.var._camTam);
        addCamera(Rooms.cameraPositions.PirateCove, this.var._tamX, this.var._tamY, this.var._camTam);

        //===================================================ANIMATRONICS=================================================================

        //Bonnie
        this.bonnie = new Bonnie(this.game.add.sprite(0, 0, 'bonnie'),
                                this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosY, 'screamerBonnie'));
         
        //Chica
        this.chica = new Chica(this.game.add.sprite(0, 0, 'chica'),
                                this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosY, 'screamerChica'),);

        //Draw animatronics
        this.freddy = this.game.add.sprite(Rooms.cameraPositions.ShowStage.x + 390, 280, 'freddy');
        this.freddy.scale.setTo(1.5, 1.5);

        //===================================================OFFICE 2.0=================================================================

        //Lights
        this.lightLeft = new Light(this.game, this.var._lightButtonIzqPosX, this.var._lightButtonIzqPosY, this.game.add.sprite(this.var._lightIzqPosX, this.var._lightIzqPosY, 'leftLight'), this.game.add.sprite(this.var._spriteBonnieAttackPosX, this.var._spriteBonnieAttackPosY, 'bonnieAttack'), this.bonnie);
        this.lightRight = new Light(this.game, this.var._lightButtonDerPosX, this.var._lightButtonDerPosY, this.game.add.sprite(this.var._lightDerPosX, this.var._lightDerPosY, 'rightLight'), this.game.add.sprite(this.var._spriteChicaAttackPosX, this.var._spriteChicaAttackPosY, 'chicaAttack'), this.chica);

        //===============================================STATIC EFFECT MONITOR=============================================================

        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 10, true);

        this.staticEffect.fixedToCamera = true;

        //===================================================ANIMATRONICS MOVE===========================================================

        this.bonnie.move(this.game, this.chica, this.staticEffect,this.doorLeft, this.lightLeft);

        this.chica.move(this.game, this.bonnie, this.staticEffect,this.doorRight, this.lightRight);

        //=====================================================MONITOR=====================================================================

        //Draw edge
        this.mapEdge = this.game.add.image(0, 0, 'edge');
        this.mapEdge.fixedToCamera = true;

        //Texto de las camaras
        this.camerasTexts = this.game.add.sprite(this.var._cameraTextPosX, this.var._cameraTextPosY, 'camerasTexts');
        this.camerasTexts.scale.setTo(this.var._cameraTextScale, this.var._cameraTextScale);
        this.camerasTexts.fixedToCamera = true;

        //Draw REC
        this.REC = this.game.add.image(this.var._recPosX, this.var._recPosY, 'REC');
        this.REC.scale.setTo(this.var._recScale, this.var._recScale);

        this.RECPoint = this.game.add.sprite(this.var._recPointPosX, this.var._recPointPosY, 'RECPoint');
        this.RECPoint.animations.add('blink');
        this.RECPoint.animations.play('blink', 1, true);

        this.REC.fixedToCamera = true;
        this.RECPoint.fixedToCamera = true;

        //Draw map
        this.map = this.game.add.image(0, 0, 'camerasMap');
        this.map.scale.setTo(this.var._mapScale, this.var._mapScale);
        this.map.anchor.set(this.var._mapPosX, this.var._mapPosY);
        this.map.fixedToCamera = true;

        //Draw map buttons
        this.monitor = new InsideMonitor(this.game, Rooms, this.camerasTexts);

        //==========================================================BATTERY========================================================================

        //Porcentaje
        this.powerLeftText = this.game.add.sprite(this.var._powerLeftTextPosX, this.var._powerLeftTextPosY, 'manyTexts', 1)
        this.powerLeftText.scale.setTo(this.var._powerLeftTextScale, this.var._powerLeftTextScale);
        this.percentageText = this.game.add.sprite(this.powerLeftText.width + this.var._percentageTextPosX, this.var._percentageTextPosY, 'manyTexts', 2);
        this.percentageText.scale.setTo(this.var._percentageTextScale, this.var._percentageTextScale);

        this.powerLeftText.fixedToCamera = true;
        this.percentageText.fixedToCamera = true;

        //Barritas
        this.battery = new Battery(this.game.add.sprite(this.var._batterytPosX, this.var._batterytPosY, 'battery'),
                                    this.game.add.sprite(this.powerLeftText.width + this.var._batteryNumber1PosX, this.var._batteryNumber1PosY, 'numbers'),
                                    this.game.add.sprite(this.powerLeftText.width + this.var._batteryNumber2PosX, this.var._batteryNumber2PosY, 'numbers'),
                                    this.game.add.sprite(this.powerLeftText.width + this.var._batteryNumber3PosX, this.var._batteryNumber3PosY, 'numbers'));
        this.usageText = this.game.add.sprite(this.var._usageTextPosX, this.var._usageTextPosY, 'manyTexts')
        this.usageText.scale.setTo(this.var._usageTextScale, this.var._usageTextScale);

        this.usageText.fixedToCamera = true;

        //=================================================CHANGE MONITOR/CAMERA=============================================================
        
        this.changeView = this.game.add.button(this.var._changeViewPosX, this.var._changeViewPosY, 'buttonMonitor', function () 
        { 

            if (this.inOffice) 
            {
                this.game.camera.x = this.monitor.LastPos();

                this.mapEdge.alpha = 1;
                this.staticEffect.alpha = 0.1;
                this.REC.alpha = 1;
                this.RECPoint.alpha = 1;
                this.map.alpha = 1;
                this.camerasTexts.alpha = 1;
                
                if(this.lightRight.getActive())
                    this.lightRight.turnOff();

                if(this.lightLeft.getActive())
                    this.lightLeft.turnOff();   
                    
                this.monitor.Input();


                this.moveRight.inputEnabled = false;
                this.moveLeft.inputEnabled = false;

                this.battery.increaseBatteryUsage(this.game.time.now);
            }
            else 
            {
                this.game.camera.x = this.lastPosOffice;

                this.mapEdge.alpha = 0;
                this.staticEffect.alpha = 0;
                this.REC.alpha = 0;
                this.RECPoint.alpha = 0;
                this.map.alpha = 0;
                this.camerasTexts.alpha = 0;
                this.monitor.notInput();

                if (this.bonnie.isInOffice())
                {
                    this.bonnie.showScreamer();
                    this.changeView.alpha = 0;
                    this.changeView.inputEnabled = false;
                }
                else if (this.chica.isInOffice())
                {
                    this.chica.showScreamer();
                    this.changeView.alpha = 0;
                    this.changeView.inputEnabled = false;
                }
                else
                {
                    this.moveRight.inputEnabled = true;
                    this.moveLeft.inputEnabled = true;

                    this.battery.decreaseBatteryUsage(this.game.time.now);
                }
            }

            this.inOffice = !this.inOffice;

         }, this, 1, 0);


        this.changeView.scale.setTo(this.var._changeViewScaleX, this.var._changeViewScaleY);
        this.changeView.alpha = this.var._changeViewAlpha;
        this.changeView.fixedToCamera = true;
         
        this.mapEdge.alpha = 0;
        this.staticEffect.alpha = 0;
        this.REC.alpha = 0;
        this.RECPoint.alpha = 0;
        this.map.alpha = 0;
        this.camerasTexts.alpha = 0;
        this.monitor.notInput();

        this.moveRight.inputEnabled = true;
        this.moveLeft.inputEnabled = true;

        //==========================================================NIGHTS========================================================================
        //Noches
        this.nigthsText = this.game.add.sprite(this.var._nigthsTextPosX, this.var._nigthsTextPosY, 'manyTexts', 4);
        this.nigthsText.scale.setTo(this.var._nigthsTextScale,this.var._nigthsTextScale)
        this.nigthsText.fixedToCamera = true;

        //Horas
        this.hourText = this.game.add.sprite(this.var._hourTextPosX, this.var._hourTextPosY, 'manyTexts', 3);
        this.hourText.fixedToCamera = true;

        this.night = new Night(this.game.add.sprite(this.var._nightNumber1PosX, this.var._nightNumber1PosY, 'numbers'),this.game.add.sprite(this.var._nightNumber2PosX,  this.var._nightNumber2PosY, 'numbers'),this.game.add.sprite(this.var._nightNumber3PosX,  this.var._nightNumber3PosY, 'numbers') );
    },

    update: function () 
    {
        if (this.moveLeft.input.pointerOver())
        {
            this.lastPosOffice = this.game.camera.x = this.game.camera.x - this.var._camMovSpeed;
            if(this.game.camera.x < this.var._turnOffLeftLightPos  && this.lightRight.getActive())
                this.lightRight.turnOff();

        }
        else if (this.moveRight.input.pointerOver() && this.game.camera.x < this.var._turnOffRightLightPos )
        {
            this.lastPosOffice = this.game.camera.x = this.game.camera.x + this.var._camMovSpeed;
            if(this.game.camera.x > this.var._turnOffRightLightPos  && this.lightLeft.getActive())
                this.lightLeft.turnOff();
        }

        //------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        //Puerta derecha
        if(this.doorRight.getActive() && !this.doorRCount)
        {
            this.battery.increaseBatteryUsage(this.game.time.now);
            this.doorRCount = !this.doorRCount;
        }
        else if (!this.doorRight.getActive() && this.doorRCount)
        {
            this.battery.decreaseBatteryUsage(this.game.time.now);
            this.doorRCount = !this.doorRCount;
        }

         //Puerta izquierda
        if(this.doorLeft.getActive() && !this.doorLCount)
        {
            this.battery.increaseBatteryUsage(this.game.time.now);
            this.doorLCount = !this.doorLCount;
        }
        else if (!this.doorLeft.getActive() && this.doorLCount)
        {
            this.battery.decreaseBatteryUsage(this.game.time.now);
            this.doorLCount = !this.doorLCount;
        }

        //Luz derecha
        if(this.lightRight.getActive() && !this.lightRCount)
        {
            this.battery.increaseBatteryUsage(this.game.time.now);
            this.lightRCount = !this.lightRCount;
        }
        else if (!this.lightRight.getActive() && this.lightRCount)
        {
            this.battery.decreaseBatteryUsage(this.game.time.now);
            this.lightRCount = !this.lightRCount;
        }

         //Luz izquierda
        if(this.lightLeft.getActive() && !this.lightLCount)
        {
            this.battery.increaseBatteryUsage(this.game.time.now);
            this.lightLCount = !this.lightLCount;
        }
        else if (!this.lightLeft.getActive() && this.lightLCount)
        {
            this.battery.decreaseBatteryUsage(this.game.time.now);
            this.lightLCount = !this.lightLCount;
        }

        //Disminuye la bateria
        if (this.game.time.now > this.battery.tellBatteryTime())
        {
            this.battery.decreaseBattery();
        }

        //------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        //Horas de la noche
        if(this.game.time.now >this.realTimeToChange)
        {
            this.night.changeHour(this.battery); //cuando hagamos la escena de win de la noche posiblemente lo quitemos
            this.realTimeToChange = this.timeForHour + this.game.time.now;
        }
    }

}


function addCamera(camera, camTamX, camTamY, camTam) 
{
    //Sprite de la habitacion
    camera.sprite.scale.setTo(camTam, camTam);
    camera.sprite.x = camera.x + (camTamX - camera.sprite.width) / 2;
    camera.sprite.y = camera.y + (camTamY - camera.sprite.height) / 2;
}


module.exports = GameScene;