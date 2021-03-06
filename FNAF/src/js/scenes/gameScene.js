'use strict';

var Const = require('../const.js');

var Door = require('../interactions/door.js');
var Light = require('../interactions/light.js');

var Bonnie = require('../animatronics/bonnie.js');
var Chica = require('../animatronics/chica.js');
var Freddy = require('../animatronics/freddy.js');
var Foxy = require('../animatronics/foxy.js');

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
        //=====================================================SOUND========================================================================
        this.game.world.resize(this.var._tamX * 13, this.var._tamY);
        this.game.camera.x = this.var._iniCamPos;
        this.realTimeToChange = this.var._timeForHour + this.game.time.now;

        this.inOffice = true;
        this.lastPosOffice = this.var._iniCamPos;

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

        //=====================================================SOUND========================================================================
        //Office ambient
        this.soundAmbient = [this.game.add.audio('ambient1'), this.game.add.audio('ambient2'), this.game.add.audio('ambient3')];
        var rnd = Math.floor(Math.random() * (3 - 0));
        this.soundAmbient[rnd].loop = true;
        this.soundAmbient[rnd].volume = 0.2;
        this.soundAmbient[rnd].play();

        this.soundLight_fan = this.game.add.audio('light_fan');
        this.soundLight_fan.loop = true;
        this.soundLight_fan.volume = 0.05;
        this.soundLight_fan.play();

        //Phone Guy
        this.phoneGuy = [this.game.add.audio('call1'), this.game.add.audio('call2'), this.game.add.audio('call3'), this.game.add.audio('call4'), this.game.add.audio('call5')];
        this.phoneGuy[0].volume = 1.5;
        this.phoneGuy[1].volume = 1.5;
        this.phoneGuy[2].volume = 1.5;
        this.phoneGuy[3].volume = 1.5;
        this.phoneGuy[4].volume = 1.5;

        //Battery out
        this.soundOutBattery = this.game.add.audio('outBattery');

        //Pirate song
        this.pirateSong = this.game.add.audio('foxySong');
        this.pirateSong.volume = 0.05;

        //Kitchen
        this._kitchenSound = [this.game.add.audio('kitchen1'), this.game.add.audio('kitchen2'), this.game.add.audio('kitchen3'), this.game.add.audio('kitchen4')];
        this._kitchenSound[0].volume = 0.5;
        this._kitchenSound[0].loop = true;
        this._kitchenSound[1].volume = 0.5;
        this._kitchenSound[1].loop = true;
        this._kitchenSound[2].volume = 0.5;
        this._kitchenSound[2].loop = true;
        this._kitchenSound[3].volume = 0.5;
        this._kitchenSound[3].loop = true;

        //Monitor
        this.monitorUp = this.game.add.audio('monitorUp');
        this.monitorUp.volume = 0.5;
        this.monitorDown = this.game.add.audio('monitorDown');
        this.monitorDown.volume = 0.5;

        //=====================================================OFFICE========================================================================

        var office = this.game.add.sprite(0, 0, 'office');

        //Side edges
        this.moveLeft = this.game.add.sprite(this.var._edgeIzqPosX, this.var._edgeIzqPosY, 'sideEdge');
        this.moveLeft.inputEnabled = true;
        this.moveRight = this.game.add.sprite(this.var._edgeDerPosX, this.var._edgeDerPosY, 'sideEdge');
        this.moveRight.inputEnabled = true;

        this.moveRight.fixedToCamera = true;
        this.moveLeft.fixedToCamera = true;

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

        //Fredyy
        this.freddy = new Freddy(this.game.add.sprite(0, 0, 'freddy'),
                                this.game.add.sprite(0, 0, 'darkFreddy'),
                                this.game.add.sprite(this.var._spriteFreddyAttackPosX, this.var._spriteFreddyAttackPosY, 'freddyAttack'),
                                this.game.add.audio('animAttack'),
                                this.game.add.audio('deepSteps'),
                                [this.game.add.audio('freddyLaugh1'), this.game.add.audio('freddyLaugh2'), this.game.add.audio('freddyLaugh3')],
                                this.game.add.audio('freddyInOffice'),
                                this.game.add.audio('freddySong'),
                                this.game.add.audio('freddyEndSong'));
                                
        //Bonnie
        this.bonnie = new Bonnie(this.game.add.sprite(0, 0, 'bonnie'),
                                this.game.add.audio('animAttack'),
                                this.game.add.audio('deepSteps'),);
         
        //Chica
        this.chica = new Chica(this.game.add.sprite(0, 0, 'chica'),
                                this.game.add.audio('animAttack'),
                                this.game.add.audio('deepSteps'),);

        //Foxy
        this.foxy = new Foxy (this.game, this.game.add.sprite(0, 0, 'pirateCov1'),
                                this.game.add.sprite(0, 0, 'pirateCov2'),
                                this.game.add.sprite(0, 0, 'pirateCov3'),
                                this.game.add.sprite(0, 0, 'foxy'),
                                this.game.add.audio('animAttack'),
                                this.game.add.audio('foxyKnock'),
                                this.game.add.audio('foxyRun'),
                                this.game.add.sprite(0, 0, 'foxyRun'),
                                this.bonnie);

        //===================================================OFFICE 2.0=================================================================

        //Lights
        this.lightLeft = new Light(this.game, this.var._lightButtonIzqPosX, this.var._lightButtonIzqPosY, this.game.add.sprite(this.var._lightIzqPosX, this.var._lightIzqPosY, 'leftLight'), 
                                    this.game.add.sprite(this.var._spriteBonnieAttackPosX, this.var._spriteBonnieAttackPosY, 'bonnieAttack'), this.bonnie, this.game.add.audio('lightTurnOn'),
                                    this.game.add.audio('interactError'), this.game.add.audio('lightJumpscare'));
        this.lightRight = new Light(this.game, this.var._lightButtonDerPosX, this.var._lightButtonDerPosY, this.game.add.sprite(this.var._lightDerPosX, this.var._lightDerPosY, 'rightLight'), 
                                    this.game.add.sprite(this.var._spriteChicaAttackPosX, this.var._spriteChicaAttackPosY, 'chicaAttack'), this.chica, this.game.add.audio('lightTurnOn'),
                                    this.game.add.audio('interactError'), this.game.add.audio('lightJumpscare'));
        
        //Doors
        this.doorLeft = new Door(this.game, this.var._doorButtonIzqPosX, this.var._doorButtonIzqPosY, this.var._doorIzqPosX, this.var._doorIzqPosY, this.game.add.audio('doorTurnOnOff'), 
                                this.game.add.audio('interactError'));
        this.doorRight = new Door(this.game, this.var._doorButtonDerPosX, this.var._doorButtonDerPosY, this.var._doorDerPosX, this.var._doorDerPosY, this.game.add.audio('doorTurnOnOff'), 
                                this.game.add.audio('interactError'));

        //===============================================STATIC EFFECT MONITOR=============================================================

        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 10, true);
        this.staticEffect._audio = [this.game.add.audio('error1'), this.game.add.audio('error2'), this.game.add.audio('error3'), this.game.add.audio('error4')];

        this.staticEffect.fixedToCamera = true;

        //===============================================DRAKNESS EFFECT=============================================================

        this.darkness = this.game.add.sprite(0, 0, 'darkness');
        this.darkness.alpha = 0;

        this.darkness.fixedToCamera = true;

        //===================================================SCREAMERS=================================================================

        //Bonnie
        this.bonnie.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosX, 'screamerBonnie'));

        //Chica
        this.chica.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosX, 'screamerChica'));

        //Freddy
        this.freddy.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosX, 'screamerFreddy'));

        //Foxy
        this.foxy.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosX, 'screamerFoxy'));

        //===============================================OFFICE EFFECT=============================================================

        this.officeEffect = this.game.add.sprite(0, 0, 'officeEffect');
        this.officeEffect.alpha = 0.5;

        this.officeEffect.fixedToCamera = true;

        //==========================================================NIGHTS========================================================================

        //Noches
        this.nigthsText = this.game.add.sprite(this.var._nigthsTextPosX, this.var._nigthsTextPosY, 'manyTexts', 4);
        this.nigthsText.scale.setTo(this.var._nigthsTextScale,this.var._nigthsTextScale)
        this.nigthsText.fixedToCamera = true;

        //Horas
        this.hourText = this.game.add.sprite(this.var._hourTextPosX, this.var._hourTextPosY, 'manyTexts', 3);
        this.hourText.fixedToCamera = true;

        this.night = new Night(this.game, this.game.add.sprite(this.var._nightNumber1PosX, this.var._nightNumber1PosY, 'numbers'),
                                                    this.game.add.sprite(this.var._nightNumber2PosX,  this.var._nightNumber2PosY, 'numbers'),
                                                    this.game.add.sprite(this.var._nightNumber3PosX,  this.var._nightNumber3PosY, 'numbers') );

        //=======================================================PHONE GUY===========================================================
        this.actualNight = this.night.getNight();
        if (this.actualNight <= 5)
        {
            this.phoneGuy[this.actualNight - 1].play();
            
            this.game.time.events.add(5000, function()
            {
                this.muteCall = this.game.add.button(this.var._muteCallPosX, this.var._muteCallPosY, 'muteCall', function()
                {
                    this.phoneGuy[this.actualNight - 1].stop();
                    this.muteCall.inputEnabled = false;
                    this.muteCall.visible = false;
                }, this, 1, 0);

                this.muteCall.scale.setTo(this.var._muteCallScale, this.var._muteCallScale);
                this.muteCall.alpha = this.var._changeViewAlpha;
                this.muteCall.fixedToCamera = true;
            }, this);
        }

        //=======================================================ANIMATRONICS MOVE===========================================================

        //Bonnie
        this.bonnie.preChangeNight(this.actualNight);
        this.game.time.events.add(this.bonnie.getHour() * this.var._timeForHour, function()
        {
            this.bonnie.move(this.game, this.chica, this.staticEffect,this.doorLeft, this.lightLeft, this.freddy)
        }, this);

        //Chica
        this.chica.preChangeNight(this.actualNight);
        this.game.time.events.add(this.chica.getHour() * this.var._timeForHour, function()
        {
           this.chica.move(this.game, this.bonnie, this.staticEffect,this.doorRight, this.lightRight, this.freddy)
        }, this);

        //Freddy
        this.freddy.changeNight(this.actualNight);
        
        this.game.time.events.add(this.freddy.getHour() * this.var._timeForHour, function()
        {
            this.freddy.move(this.game, this.bonnie, this.chica, this.staticEffect);
        }, this);

        //Foxy
        this.foxy.changeNight(this.actualNight);
        
        this.game.time.events.add(this.foxy.getHour() * this.var._timeForHour, function()
        {
            this.foxy.move(this.doorLeft, this.battery, this.staticEffect);
        }, this);

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
        this.battery = new Battery(this.game, this.game.add.sprite(this.var._batterytPosX, this.var._batterytPosY, 'battery'),
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
                this.monitorDown.stop();
                this.monitorUp.play();

                this.game.camera.x = this.monitor.LastPos();
                this.officeEffect.alpha = 0;
                this.soundAmbient.volume = 0.1;
                this.soundLight_fan.volume = 0.02;

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
                this.monitorUp.stop();
                this.monitorDown.play();

                this.game.camera.x = this.lastPosOffice;
                this.officeEffect.alpha = 0.5;
                this.soundAmbient.volume = 0.2;
                this.soundLight_fan.volume = 0.05;

                this.mapEdge.alpha = 0;
                if(this.staticEffect.alpha == 1)
                {
                    this.staticEffect._audio[0].stop();
                    this.staticEffect._audio[1].stop();
                    this.staticEffect._audio[2].stop();
                    this.staticEffect._audio[3].stop();
                }
                this.staticEffect.alpha = 0;
                this.REC.alpha = 0;
                this.RECPoint.alpha = 0;
                this.map.alpha = 0;
                this.camerasTexts.alpha = 0;
                this.monitor.notInput();

                if (this.bonnie.isInOffice())
                {
                    this.bonnie.alphaScreamer(1);
                    this.changeView.alpha = 0;
                    this.changeView.inputEnabled = false;

                    this.game.time.events.add(this.var._timeForReset, function()
                    {
                        this.game.state.start('death');
                    }, this)
                }
                else if (this.chica.isInOffice())
                {
                    this.chica.alphaScreamer(1);
                    this.changeView.alpha = 0;
                    this.changeView.inputEnabled = false;

                    this.game.time.events.add(this.var._timeForReset, function()
                    { 
                        this.game.state.start('death');
                    }, this)
                }
                else if(this.freddy.attack() && this.freddy.returnLookingAway() && !this.doorRight.getActive())
                {
                    this.freddy.alphaScreamer(1);
                    this.changeView.alpha = 0;
                    this.changeView.inputEnabled = false;

                    this.game.time.events.add(this.var._timeForReset, function()
                    { 
                        this.game.state.start('death');
                    }, this)
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
         
        //----------------------Se ocultan las cosas del Monitor porque empieza en oficina
        this.mapEdge.alpha = 0;
        this.staticEffect.alpha = 0;
        this.REC.alpha = 0;
        this.RECPoint.alpha = 0;
        this.map.alpha = 0;
        this.camerasTexts.alpha = 0;
        this.monitor.notInput();

        this.moveRight.inputEnabled = true;
        this.moveLeft.inputEnabled = true;

        this.attackForDark = false;
        this.alreadyChanged = false;

        this.haveJustArrived = true;
        this.watchingKitchen = false;

        this.bonnieEventInProcess = false;
        this.bonnieAnimDone = false;
        this.chicaEventInProcess = false;
        this.chicaAnimDone = false;
        this.freddyEventInProcess = false;
        this.freddyAnimDone = false;
        this.rndFail = false;
    },

// **************************************************************************************************************************************************** //
// **************************************************************************************************************************************************** //

    update: function () 
    {

        //------Phone Guy-----
        if (this.actualNight < 6)
            if (!this.phoneGuy[this.actualNight - 1].isPlaying && this.muteCall.visible)
            {
                this.muteCall.visible = false;
                this.muteCall.inputEnabled = false;
            }

        //------General------

        if (this.game.input.keyboard.addKey(Phaser.Keyboard.ESC).isDown)
            this.game.state.start('menu');

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

        //-----------------------------------------------------------------ATAQUE DE BATERIA-----------------------------------------------------------------------------------------------
        if (this.battery.emptyBattery() && !this.attackForDark)
        {
            this.game.sound.stopAll();
            this.attackForDark = true;

            this.darkness.alpha = 0.5; //cambiar
            this.officeEffect.alpha = 0.6;

            this.changeView.inputEnabled = false;
            this.changeView.alpha = 0;
            this.doorLeft.enabledInput(false);
            this.doorLeft.reset();
            this.doorRight.enabledInput(false);
            this.doorRight.reset();
            this.lightLeft.enabledInput(false);
            this.lightLeft.reset();
            this.lightRight.enabledInput(false);
            this.lightRight.reset();

            this.soundOutBattery.play();

            if (!this.inOffice)
            {
                this.inOffice = !this.inOffice;

                //Desactivar todo
                this.game.camera.x = this.lastPosOffice;
                this.officeEffect.alpha = 0.5;
                this.mapEdge.alpha = 0;
                this.staticEffect.alpha = 0;
                this.REC.alpha = 0;
                this.RECPoint.alpha = 0;
                this.map.alpha = 0;
                this.camerasTexts.alpha = 0;
                this.monitor.notInput();

                //Activar desplazamiento por la oficina
                this.moveRight.inputEnabled = true;
                this.moveLeft.inputEnabled = true;
            }
            this.freddy.attackBattery(this.game, this.darkness, this.moveLeft, this.moveRight);

        }

        //------------------------------------------------------------------------------------------------------------------------------------------------------------------
        
        //Horas de la noche
        if(this.game.time.now >this.realTimeToChange)
        {
            this.night.changeHour(this.battery); //cuando hagamos la escena de win de la noche posiblemente lo quitemos
            this.realTimeToChange = this.var._timeForHour + this.game.time.now;
        }

        //==========================Freddy===================

        if(!this.inOffice)
        {
            if(!this.freddy.attack() && this.freddy.startToMove())
                this.freddy.spotted(this.game, this.bonnie, this.chica, this.staticEffect);

            if(this.freddy.attack() && !this.doorRight.getActive())
            {
                if(this.game.camera.x != this.var._eHallCornerPosX)
                    this.freddy.lookingAway();
            }
        }

        //======================Freddy and Chica===================

        if (this.game.camera.x == this.var._kitchenPosX && (this.chica.getPos()._name == 'kitchen' || this.freddy.getPos()._name == 'kitchen') && !this.watchingKitchen)
        {
            this.watchingKitchen = true;
            this.kitchenRnd = Math.floor(Math.random() * (4 - 0));
            this._kitchenSound[this.kitchenRnd].play();
        }

        if (((this.game.camera.x == this.var._kitchenPosX && this.chica.getPos()._name != 'kitchen' && this.freddy.getPos()._name != 'kitchen') ||
            (this.game.camera.x != this.var._kitchenPosX)) && this.watchingKitchen)
        {
            this.watchingKitchen = false;
            this._kitchenSound[this.kitchenRnd].stop();
        }

        //==========================Foxy===================

        if(!this.inOffice)
        {
            if(this.foxy.startToMove())
            {
                this.foxy.spotted(this.var, this.doorLeft, this.battery, this.staticEffect);
            }
        }

        if(this.foxy.returnIsAttacking() && !this.alreadyChanged)
        {
            if(!this.inOffice)
            {
                this.game.camera.x = this.lastPosOffice;
                this.officeEffect.alpha = 0.5;

                this.mapEdge.alpha = 0;
                this.staticEffect.alpha = 0;
                this.REC.alpha = 0;
                this.RECPoint.alpha = 0;
                this.map.alpha = 0;
                this.camerasTexts.alpha = 0;
                this.monitor.notInput();
            }

            this.changeView.alpha = 0;
            this.changeView.inputEnabled = false;

            this.moveRight.inputEnabled = false;
            this.moveLeft.inputEnabled = false;


            this.alreadyChanged = true;
        }

        if (this.game.camera.x == this.var._pirateCovePosX && this.foxy.getPos()._connect == 1 && !this.pirateSong.isPlaying && this.haveJustArrived)
        {
            this.haveJustArrived = false;
            var rnd = Math.random() * (1 - 0);
            if (rnd >= 0.9)
                this.pirateSong.play();
        }

        if (this.game.camera.x != this.var._pirateCovePosX && !this.haveJustArrived)
        {
            if (this.pirateSong.isPlaying)
                this.pirateSong.stop();
            this.haveJustArrived = true;
        }
        //======================Bonnie=========

        this.bonnie.foxyAndMe(this.foxy, this.game, this.staticEffect);

        //======================Animatronics=========

        if (this.night.getNight() >= 4 && (!this.bonnieAnimDone || !this.chicaAnimDone || !this.freddyAnimDone))
        {
            var rnd = Math.random();
            if (rnd > 0.9 && !this.rndFail)
            {
                if (this.game.camera.x == this.bonnie.getPos()._posCam.x && this.bonnie.getPos()._name != "showStage" && !this.bonnieAnimDone)
                {
                    this.bonnie.randomAnim(this.game);
                    this.bonnieAnimDone = true;
                }
                else if (this.game.camera.x == this.chica.getPos()._posCam.x && this.chica.getPos()._name != "showStage" && !this.chicaAnimDone)
                {
                    this.chica.randomAnim(this.game);
                    this.chicaAnimDone = true;
                }
                else if (this.game.camera.x == this.freddy.getPos()._posCam.x && this.freddy.getPos()._name != "showStage" && !this.freddyAnimDone)
                {
                    this.freddy.randomAnim(this.game);
                    this.freddyAnimDone = true;
                }
            }
            else
            {
                this.rndFail = true;

                this.game.time.events.add(1000, function()
                {
                    this.rndFail = false;
                }, this);
            }
        }

        if (this.bonnieAnimDone && !this.bonnieEventInProcess)
        {
            this.bonnieEventInProcess = true;
            this.game.time.events.add(10000, function()
            {
                this.bonnieAnimDone = false;
                this.bonnieEventInProcess = false;
            }, this);
        }
        else if (this.chicaAnimDone && !this.chicaEventInProcess)
        {
            this.chicaEventInProcess = true;
            this.game.time.events.add(10000, function()
            {
                this.chicaAnimDone = false;
                this.chicaEventInProcess = false;
            }, this);
        }
        else if (this.freddyAnimDone && !this.freddyEventInProcess)
        {
            this.freddyEventInProcess = true;
            this.game.time.events.add(10000, function()
            {
                this.freddyAnimDone = false;
                this.freddyEventInProcess = false;
            }, this);
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