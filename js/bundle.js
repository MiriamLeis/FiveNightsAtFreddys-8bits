(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
//--------------------Clase Animatronicos
function Animatronics(sprite, screamer, path, hours, actTime)
{
    //Phaser.Sprite.apply(this,game,sprite)
    //this.add.child(....) // buscarlo que no es así (puede que no queráis eso)

    this._sprite = sprite;
    this._sprite.scale.setTo(1.5, 1.5);
    this._sprite.frame = 2;

    this._screamer = screamer;
    this._screamer.scale.setTo(2.5, 2.5);
    this._screamer.alpha = 0;
    this._screamer.fixedToCamera = true;

    this._path = path; //Array de functions
    this._pos = this._path[0];
    this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;

    this._hours = hours;
    this._hoursIni = this._hours[0];//Array de noches con las horas de inicio

    this._actTime = actTime; //Array de noches con los parametros de actIni y actFin
    this._actualActTime = actTime[0];
};

Animatronics.prototype = Object.create(Phaser.Sprite.prototype);
Animatronics.prototype.constructor = Animatronics;

Animatronics.prototype.getPos = function() {return this._pos;};
Animatronics.prototype.activateAnim = function()
{//MIRAR
    this._sprite.animations.add('animation');
    this._sprite.animations.play('animation', 10, true);
};
Animatronics.prototype.showScreamer = function()
{
    this._screamer.alpha = 1;
};
Animatronics.prototype.changeInfo = function(night)
{
    this._pos = this._path[0];
    this._hoursIni = this._hours[night];
    this._actualActTime = this._actTime[night];
};
Animatronics.prototype.moveEffect = function(game, staticEffect)
{  
    staticEffect.alpha = 1;
    game.time.events.add(3000, function(){staticEffect.alpha = 0.1}, this)
};

//-----------------FreddyFoxy
function FreddyFoxy(sprite, screamer, posIni, hour, actTime)
{
    Animatronics.apply(this,[sprite, screamer, path, hourIni, actTime]);
};
FreddyFoxy.prototype = Object.create(Animatronics.prototype);
FreddyFoxy.prototype.constructor = FreddyFoxy;




//---------------------Foxy-------------------------//
function Foxy(sprite, screamer, animation, posIni, hourIni, actTime)
{
    FreddyFoxy.apply(this,[sprite, screamer, animation, path, posIni, hourIni, actTime]);
};
Foxy.prototype = Object.create(FreddyFoxy.prototype);
Foxy.prototype.constructor = Foxy;

Foxy.prototype.move = function(){};
Foxy.prototype.attack = function(){};



//---------------------Freddy-------------------------//
function Freddy(sprite, screamer, animation, posIni, hourIni, actTime)
{
    FreddyFoxy.apply(this,[sprite, screamer, animation, path, posIni, hourIni, actTime]);
};
Freddy.prototype = Object.create(FreddyFoxy.prototype);
Freddy.prototype.constructor = Freddy;

Freddy.prototype.move = function(){};
Freddy.prototype.attack = function(){};


module.exports = Animatronics;
},{}],2:[function(require,module,exports){
'use strict';

function Battery(spriteBar, spriteCent, spriteDec, spriteU)
{
    //Sprite de las barritas
    this.spriteBar = spriteBar;
    this.spriteBar.scale.setTo(0.70, 0.60);
    this.spriteBar.fixedToCamera = true;

    //Sprite de los porcentajes
    this.spriteCent = spriteCent;
    this.spriteCent.scale.setTo(0.6, 0.6);
    this.spriteCent.fixedToCamera = true;

    this.spriteDec = spriteDec;
    this.spriteDec.scale.setTo(0.6, 0.6);
    this.spriteDec.fixedToCamera = true;

    this.spriteU = spriteU;
    this.spriteU.scale.setTo(0.6, 0.6);
    this.spriteU.fixedToCamera = true;

    //Cosillas para el control del tiempo
    this.restBattery = 100;
    this.batteryUssage = 1; //De primeras
    this.timeToChange = 10000; //De primeras
    this.realTimeToChange = 0;

    this.times = [];
    this.times.push(10000);
    this.times.push(5000);
    this.times.push(3000);
    this.times.push(2000);

    this.spriteCent.frame = 1;
}


Battery.prototype.emptyBattery = function() 
{
    return (this.restBattery == 0);
}

Battery.prototype.tellBattery = function() 
{
    return this.restBattery;
}

Battery.prototype.tellBatteryTime = function() 
{
    return this.timeToChange;
}

Battery.prototype.increaseBatteryUsage = function(time) 
{
    this.batteryUssage++;

    if(this.batteryUssage <= 4)
    {
        this.realTimeToChange = this.timeToChange - time;

        if(this.realTimeToChange > this.times[this.batteryUssage - 1])
            this.timeToChange = time + this.times[this.batteryUssage - 1];

        this.spriteBar.frame = this.batteryUssage -1;
    }
        
}

Battery.prototype.decreaseBatteryUsage = function(time) 
{
    this.batteryUssage--;

    if(this.batteryUssage >= 1 && this.batteryUssage < 4)
    {
        this.realTimeToChange = this.timeToChange - time;
        
        this.timeToChange = time + this.realTimeToChange;

        this.spriteBar.frame = this.batteryUssage - 1;
    }
    else 
    {
        this.realTimeToChange = this.timeToChange - time;

        this.timeToChange = this.timeToChange - this.realTimeToChange +  this.times[3] - (this.times[3] - this.realTimeToChange);
    }
}

// Este metodo lo controla el update de la GameScene 
Battery.prototype.decreaseBattery = function() 
{
    if(this.restBattery > 0)
    {
        this.restBattery--;

        this.spriteCent.frame = 0
        this.spriteDec.frame = Math.trunc(this.restBattery/10);
        this.spriteU.frame = this.restBattery%10;

        if(this.batteryUssage <= 4)
            this.timeToChange = this.timeToChange + this.times[this.batteryUssage - 1];
        else
            this.timeToChange = this.timeToChange + this.times[3];
    }
    else if (this.restBattery == 0)
        this.spriteU.frame = 0;
}

Battery.prototype.reset = function()
{
    this.restBattery = 100;
    //his.batteryUssage = 1;
    this.spriteCent.frame = 1;
    this.spriteDec.frame = 0;
    this.spriteU.frame = 0;
}

module.exports = Battery;
},{}],3:[function(require,module,exports){
'use strict';

function InsideMonitor (game, Rooms, camerasTexts)
{
    this.cam1A = this.addButton(game, camerasTexts, Rooms.cameraPositions.ShowStage, -19.2, -11.7, this, 0);
    this.cam1B = this.addButton(game, camerasTexts, Rooms.cameraPositions.DinningRoom, -18.2, -12.7, this, 1);
    this.cam1C = this.addButton(game, camerasTexts, Rooms.cameraPositions.PirateCove, -17.2, -14, this, 2);
    this.cam2A = this.addButton(game, camerasTexts, Rooms.cameraPositions.WestHall, -18.4, -15.2, this, 3);
    this.cam2B = this.addButton(game, camerasTexts, Rooms.cameraPositions.WHallCorner, -17.68, -16.2, this, 4);
    this.cam3 = this.addButton(game, camerasTexts, Rooms.cameraPositions.SupplyCloset, -17, -15, this, 5);
    this.cam4A = this.addButton(game, camerasTexts, Rooms.cameraPositions.EastHall, -20, -15.2, this, 6);
    this.cam4B = this.addButton(game, camerasTexts, Rooms.cameraPositions.EHallCorner, -20.72, -16.2, this, 7);
    this.cam5 = this.addButton(game, camerasTexts, Rooms.cameraPositions.Backstage, -16.4, -13, this, 8);
    this.cam6 = this.addButton(game, camerasTexts, Rooms.cameraPositions.Kitchen, -21.2, -15.15, this, 9);
    this.cam7 = this.addButton(game, camerasTexts, Rooms.cameraPositions.Restrooms, -21.8, -12.85, this, 10);
    
    this.cam1A.frame = 11;
    this.lastPos = Rooms.cameraPositions.ShowStage.x;
};

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
},{}],4:[function(require,module,exports){
'use strict';

function Interact () 
{
    this._active = false;
};

Interact.prototype.getActive = function(){ return this._active; }
Interact.prototype.changeActive = function(){ this._active = !this._active; }

module.exports = Interact;
},{}],5:[function(require,module,exports){
var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 

//---------------------Bonnie-------------------------//
function Bonnie(sprite, screamer)
{
    BonnieChica.apply(this,[sprite, screamer,
                        //ruta
                        [new Room ((792 * 2) + 300, 240, 'showStage', 1, null, null), 
                        new Room ((792 * 3) + 375, 340, 'diningRoom', 2, 3, null), 
                        new Room ((792 * 4) + 450, 310, 'backStage', 1, null, null), 
                        new Room ((792 * 10) + 375, 330, 'westHall', 1, 4, 5),
                        new Room ((792 * 8) + 365, 280, 'supplyCloset', 3, 5, null), 
                        new Room ((792 * 11) + 375, 280, 'wHallCorner', 3, 4, null, this.attack())],
                        //rango de horas de activacion
                        [{min: 2, max: 2}, {min: 0, max: 1}, {min: 1, max: 2}, {min: 0, max: 1}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}]]);
}
Bonnie.prototype = Object.create(BonnieChica.prototype);
Bonnie.prototype.constructor = Bonnie;

module.exports = Bonnie;
},{"./bonnieChica.js":6,"./room.js":15}],6:[function(require,module,exports){
//--------------------Clase Animatronicos
var Animatronics = require('./Animatronics.js'); 
var Room = require('./room.js'); 
 

//----------------BonnieChica
function BonnieChica(sprite, screamer, path, hour, actTime)
{
    Animatronics.apply(this,[sprite, screamer, path, hour, actTime]);
    this.dinningRoom = false;
    this.isMoving = false;
};
BonnieChica.prototype = Object.create(Animatronics.prototype);
BonnieChica.prototype.constructor = BonnieChica;

BonnieChica.prototype.dinningRoomTrue = function()
{
    this.dinningRoom = true;
}
BonnieChica.prototype.dinningRoomFalse = function()
{
    this.dinningRoom = false;
}

BonnieChica.prototype.move = function(game, otherAnimatronic/*, staticEffect*/)
{
    //Tiempo para moverse
    var timeToMove = Math.floor(((Math.random() * (this._actualActTime.max - this._actualActTime.min)) + this._actualActTime.min) * 1000);
    console.log(timeToMove);

    //Cambiar el pos del animatronico
    game.time.events.add(timeToMove, function()
    {
        //this.moveEffect(game, staticEffect);
        this._sprite.frame = 0;

        if (this._pos._number == 2)
        {
            var percentage = Math.floor(Math.random() * (101 - 0));

            if (percentage > 40)
            {
                if(this._path[this._pos._room2]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                {
                    this._pos = this._path[this._pos._room2];
                    this.dinningRoomTrue()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
                else if (this._path[this._pos._room2]._name != "diningRoom")
                {
                    this._pos = this._path[this._pos._room2];
                    this.dinningRoomFalse()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
            }
            
            else if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomTrue()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
            else if (this._path[this._pos._room1]._name != "diningRoom")
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomFalse()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
        }
        else if (this._pos._number == 3)
        {
            var percentage = Math.floor(Math.random() * (101 - 0));

            if (percentage > 50)
            {

                if(this._path[this._pos._room3]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                {
                    this._pos = this._path[this._pos._room3];
                    this.dinningRoomTrue()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
                else if (this._path[this._pos._room3]._name != "diningRoom")
                {
                    this._pos = this._path[this._pos._room3];
                    this.dinningRoomFalse()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
            }
            else if (percentage > 25)
            {
                if(this._path[this._pos._room2]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                {
                    this._pos = this._path[this._pos._room2];
                    this.dinningRoomTrue()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
                else if (this._path[this._pos._room2]._name != "diningRoom")
                {
                    this._pos = this._path[this._pos._room2];
                    this.dinningRoomFalse()
                    this.isMoving = true;
                    this.noLongerMoving(game);
                }
            }
            else if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomTrue()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
            else if (this._path[this._pos._room1]._name != "diningRoom")
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomFalse()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
        }
        else
        {
            if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomTrue()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }
            else if (this._path[this._pos._room1]._name != "diningRoom")
            {
                this._pos = this._path[this._pos._room1];
                this.dinningRoomFalse()
                this.isMoving = true;
                    this.noLongerMoving(game);
            }

        }
        console.log(this._pos._name)
        this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;
        this.move(game, otherAnimatronic);
    }, this);
};
BonnieChica.prototype.attack = function(){};
BonnieChica.prototype.noLongerMoving = function(game)
{
    game.time.events.add(1000, function(){ this.isMoving = false},this);
};
BonnieChica.prototype.returnIsMoving = function()
{
    return this.isMoving;
};


module.exports = BonnieChica;
},{"./Animatronics.js":1,"./room.js":15}],7:[function(require,module,exports){
var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 

//---------------------Chica-------------------------//
function Chica(sprite, screamer, animation, posIni, hourIni, actTime)
{
    BonnieChica.apply(this,[sprite, screamer,
                        //ruta
                        [new Room ((792 * 2) + 450, 240, 'showStage', 1, null, null), 
                        new Room ((792 * 3) + 375, 340, 'diningRoom', 2, 3, 4), 
                        new Room ((792 * 5) + 400, 200, 'restroom', 1, null, null), 
                        new Room ((792 * 6) + 375, 594 + 66, 'kitchen', 1, null, null),
                        new Room ((792 * 7) + 365, 280, 'eastHall', 1, 5, null), 
                        new Room ((792 * 9) + 350, 300, 'eHallCorner', 4, null, null, this.attack())],
                        //rango de horas de activacion
                        [{min: 2, max: 3}, {min: 0, max: 3}, {min: 0, max: 1}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}]]);
}
Chica.prototype = Object.create(BonnieChica.prototype);
Chica.prototype.constructor = Chica;


module.exports = Chica;
},{"./bonnieChica.js":6,"./room.js":15}],8:[function(require,module,exports){
'use strict';

var Interact = require('./Interactions.js');

function Door(game, posXButton, posYButton, posXDoor, posYDoor)
{
    Interact.apply(this);
    
    var doorOpen = game.add.sprite(posXDoor, posYDoor, 'doorOpen', 2);
    var doorOpenAnim = doorOpen.animations.add('open');
    
    var doorClose = game.add.sprite(posXDoor, posYDoor, 'doorClose');
    var doorCloseAnim = doorClose.animations.add('close');

    var button = game.add.button(posXButton, posYButton, 'buttonDoor', function(){this.actionOnClick(button, doorOpenAnim, doorCloseAnim)}, this);
};

Door.prototype = Object.create(Interact.prototype);
Door.prototype.constructor = Door;

Door.prototype.actionOnClick = function(button, doorAnimOp, doorAnimClos) 
{
    this.changeActive();
    if (this._active)
    {
        button.frame = 1;
        doorAnimOp.frame = 2;
        doorAnimClos.play(10, true);
        doorAnimClos.loop = false;
    }
    else
    {
        button.frame = 0;
        doorAnimClos.frame = 0;
        doorAnimOp.play(10, true);
        doorAnimOp.loop = false;
    }
}


module.exports = Door;
},{"./Interactions.js":4}],9:[function(require,module,exports){
'use strict';

var Interact = require('./Interactions.js');
var Door = require('./door.js');
var Light = require('./light.js');

var Animatronics = require('./Animatronics.js');
var Bonnie = require('./bonnie.js');
var Chica = require('./chica.js');

var Battery = require('./Battery.js');
var Night = require('./nights.js');
var InsideMonitor = require('./InsideMonitor.js');

var GameScene =
{
    preload: function () 
    {

    },

    create: function () 
    {
        
        var tamX = 792;
        var tamY = 594;
        this.game.world.resize(tamX * 13, tamY);
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

        //Door and light buttons
        this.lightLeft = new Light(this.game, 157, 274, 34, 94, 'leftLight');
        this.lightRight = new Light(this.game, 51.5 * 4 + tamX + tamX / 2, 274, 92 + tamX + tamX / 3, 94, 'rightLight');

        this.doorLeft = new Door(this.game, 157, 220, 185, 78);
        this.doorRight = new Door(this.game, tamX + 301 * 2, 220, tamX + 173 * 2, 78);

        //Side edges
        this.moveLeft = this.game.add.sprite(0, 0, 'sideEdge');
        this.moveLeft.inputEnabled = true;
        this.moveRight = this.game.add.sprite(792 - 45, 0, 'sideEdge');
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
                ShowStage: {nameFrame: 0, sprite: this.game.add.sprite(0, 0, 'showStage'), x: tamX * 2, y: 0 },
                DinningRoom: {nameFrame: 1, sprite: this.game.add.sprite(0, 0, 'dinningRoom'), x: tamX * 3, y: 0 },
                Backstage: {nameFrame: 2, sprite: this.game.add.sprite(0, 0, 'backstage'), x: tamX * 4, y: 0 },
                Restrooms: {nameFrame: 3, sprite: this.game.add.sprite(0, 0, 'restrooms'), x: tamX * 5, y: 0 },
                Kitchen: {nameFrame: 4, sprite: this.game.add.sprite(0, 0, 'kitchen'), x: tamX * 6, y: 0 },
                EastHall: {nameFrame: 5, sprite: this.game.add.sprite(0, 0, 'eastHall'), x: tamX * 7, y: 0 },
                SupplyCloset: {nameFrame: 6, sprite: this.game.add.sprite(0, 0, 'supplyCloset'), x: tamX * 8, y: 0 },
                EHallCorner: {nameFrame: 7, sprite: this.game.add.sprite(0, 0, 'eHallCorner'), x: tamX * 9, y: 0 },
                WestHall: {nameFrame: 8, sprite: this.game.add.sprite(0, 0, 'westHall'), x: tamX * 10, y: 0 },
                WHallCorner: {nameFrame: 9, sprite: this.game.add.sprite(0, 0, 'wHallCorner'), x: tamX * 11, y: 0 },
                PirateCove: {nameFrame: 10, sprite: this.game.add.sprite(0, 0, 'pirateCov1'), x: tamX * 12, y: 0 },
            }
        }

        //Draw cameras
        addCamera(Rooms.cameraPositions.ShowStage, tamX, tamY, 1.5);
        addCamera(Rooms.cameraPositions.DinningRoom, tamX, tamY, 1.5);
        addCamera(Rooms.cameraPositions.Backstage, tamX, tamY, 1.5);
        addCamera(Rooms.cameraPositions.Restrooms, tamX, tamY, 1.5);
        addCamera(Rooms.cameraPositions.Kitchen, tamX, 300, 0.3);
        addCamera(Rooms.cameraPositions.EastHall, tamX, tamY, 1.5);
        addCamera(Rooms.cameraPositions.SupplyCloset, tamX, tamY, 1.5);
        addCamera(Rooms.cameraPositions.EHallCorner, tamX, tamY, 1.5);
        addCamera(Rooms.cameraPositions.WestHall, tamX, tamY, 1.5);
        addCamera(Rooms.cameraPositions.WHallCorner, tamX, tamY, 1.5);
        addCamera(Rooms.cameraPositions.PirateCove, tamX, tamY, 1.5);

        //===================================================ANIMATRONICS=================================================================

        //Bonnie
        this.bonnie = new Bonnie(this.game.add.sprite(0, 0, 'bonnie'), this.game.add.sprite(tamX/2 - 160 , 0, 'screamerBonnie'));

        //Chica
        this.chica = new Chica(this.game.add.sprite(0, 0, 'chica'), this.game.add.sprite(tamX/2 - 160 , 0, 'screamerChica'));

        //Draw animatronics
        this.freddy = this.game.add.sprite(Rooms.cameraPositions.ShowStage.x + 390, 280, 'freddy');
        this.freddy.scale.setTo(1.5, 1.5);

        //===============================================STATIC EFFECT MONITOR=============================================================

        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 10, true);

        this.staticEffect.fixedToCamera = true;

        //===================================================ANIMATRONICS MOVE===========================================================

        this.bonnie.move(this.game, this.chica/*, this.staticEffect*/);

        this.chica.move(this.game, this.bonnie);

        //=====================================================MONITOR=====================================================================

        //Draw edge
        this.mapEdge = this.game.add.image(0, 0, 'edge');
        this.mapEdge.fixedToCamera = true;

        //Texto de las camaras
        this.camerasTexts = this.game.add.sprite(tamX - 190, tamY - 250, 'camerasTexts');
        this.camerasTexts.scale.setTo(0.5, 0.5);
        this.camerasTexts.fixedToCamera = true;

        //Draw REC
        this.REC = this.game.add.image(45, 20, 'REC');
        this.REC.scale.setTo(0.75, 0.75);

        this.RECPoint = this.game.add.sprite(12, 15, 'RECPoint');
        this.RECPoint.animations.add('blink');
        this.RECPoint.animations.play('blink', 1, true);

        this.REC.fixedToCamera = true;
        this.RECPoint.fixedToCamera = true;

        //Draw map
        this.map = this.game.add.image(0, 0, 'camerasMap');
        this.map.scale.setTo(2, 2);
        this.map.anchor.set(-2, -1.94);
        this.map.fixedToCamera = true;

        //Draw map buttons
        this.monitor = new InsideMonitor(this.game, Rooms, this.camerasTexts);

        //==========================================================BATTERY========================================================================

        //Porcentaje
        this.powerLeftText = this.game.add.sprite(20, 490, 'manyTexts', 1)
        this.powerLeftText.scale.setTo(0.6, 0.6);
        this.percentageText = this.game.add.sprite(this.powerLeftText.width + 79, 490, 'manyTexts', 2);
        this.percentageText.scale.setTo(0.6, 0.6);

        this.powerLeftText.fixedToCamera = true;
        this.percentageText.fixedToCamera = true;

        //Barritas
        this.battery = new Battery(this.game.add.sprite(100, 525, 'battery'),
                                    this.game.add.sprite(this.powerLeftText.width + 10, 490, 'numbers'),
                                    this.game.add.sprite(this.powerLeftText.width + 33, 490, 'numbers'),
                                    this.game.add.sprite(this.powerLeftText.width + 56, 490, 'numbers'));
        this.usageText = this.game.add.sprite(20, 530, 'manyTexts')
        this.usageText.scale.setTo(0.6, 0.6);

        this.usageText.fixedToCamera = true;

        //=================================================CHANGE MONITOR/CAMERA=============================================================

        this.changeView = this.game.add.button(800 / 2 - 316.8 / 2, 600 - 66 - 10, 'buttonMonitor', function () 
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

                this.moveRight.inputEnabled = true;
                this.moveLeft.inputEnabled = true;

                this.battery.decreaseBatteryUsage(this.game.time.now);
            }

            this.inOffice = !this.inOffice;

         }, this, 1, 0);


        this.changeView.scale.setTo(0.8, 1);
        this.changeView.alpha = 0.4;
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
        this.nigthsText = this.game.add.sprite(tamX - 140, 60, 'manyTexts', 4);
        this.nigthsText.scale.setTo(0.7,0.7)
        this.nigthsText.fixedToCamera = true;

        //Horas
        this.hourText = this.game.add.sprite(tamX - 80, 10, 'manyTexts', 3);
        this.hourText.fixedToCamera = true;

        this.night = new Night(this.game.add.sprite(tamX -145, 17, 'numbers'),this.game.add.sprite(tamX - 115, 17, 'numbers'),this.game.add.sprite(tamX - 50, 64, 'numbers') );
    },

    update: function () 
    {
        if (this.moveLeft.input.pointerOver())
        {
            this.lastPosOffice = this.game.camera.x = this.game.camera.x - 13;
            if(this.game.camera.x < 1 && this.lightRight.getActive())
                this.lightRight.turnOff();

        }
        else if (this.moveRight.input.pointerOver() && this.game.camera.x < 781)
        {
            this.lastPosOffice = this.game.camera.x = this.game.camera.x + 13;
            if(this.game.camera.x > 780 && this.lightLeft.getActive())
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

        if((this.bonnie.returnIsMoving() && !this.inOffice) || (this.chica.returnIsMoving() && !this.inOffice))
        {
            this.staticEffect.alpha =1;
        }
        else if(!this.inOffice)
        {
            this.staticEffect.alpha =0.1;
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
},{"./Animatronics.js":1,"./Battery.js":2,"./InsideMonitor.js":3,"./Interactions.js":4,"./bonnie.js":5,"./chica.js":7,"./door.js":8,"./light.js":10,"./nights.js":13}],10:[function(require,module,exports){
'use strict';

var Interact = require('./Interactions.js');


function Light(game, posXButton, posYButton, posXLight, posYLight,sprite)
{
    Interact.apply(this);

    this.light = game.add.sprite(posXLight, posYLight,sprite);
    this.light.visible = false;

    this.button = game.add.button(posXButton, posYButton, 'buttonLight', function(){this.turnOff()}, this);
};

Light.prototype = Object.create(Interact.prototype);
Light.prototype.constructor = Light;
Light.prototype.turnOff = function() 
{
    this.changeActive();
    if(this._active)
    {
        this.button.frame = 1;
        this.light.visible = true;
    }
    else
    {
        this.button.frame = 0;
        this.light.visible = false;
    }
}
module.exports = Light;

},{"./Interactions.js":4}],11:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');
var MenuScene = require('./menuScene.js');
var GameScene = require('./gameScene.js');


var BootScene = 
{
  preload: function () 
  {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () 
  {
    this.game.state.start('preloader');
  }
};


var PreloaderScene =
{
  preload: function () 
  {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    //Rooms
    this.game.load.image('showStage','./images/rooms/ShowStage.png');
    this.game.load.image('dinningRoom','./images/rooms/DinningRoom.png');
    this.game.load.image('backstage','./images/rooms/Backstage.png');
    this.game.load.image('supplyCloset', './images/rooms/SupplyCloset.png');
    this.game.load.image('wHallCorner','./images/rooms/W.Hall Corner.png');
    this.game.load.image('westHall', './images/rooms/West Hall.png');
    this.game.load.image('westHall', './images/rooms/West Hall.png');
    this.game.load.image('kitchen', './images/rooms/kitchenText.png');
    this.game.load.image('eHallCorner','./images/rooms/E.Hall Corner.png');
    this.game.load.image('eastHall','./images/rooms/East Hall.png');
    this.game.load.image('restrooms','./images/rooms/Restrooms.png');
    this.game.load.image('pirateCov1', './images/rooms/PirateCove.png');
    this.game.load.image('pirateCov2', './images/rooms/PirateCove2.png');
    this.game.load.image('pirateCov3', './images/rooms/PirateCove3.png');
    this.game.load.image('office', './images/rooms/Office.png');

    //Animatronics
    this.game.load.spritesheet('bonnie','./images/animatronics/Bonnie.png', 33, 66, 3);
    this.game.load.image('screamerBonnie', './images/animatronics/screamerBonnie.png');
    this.game.load.spritesheet('chica','./images/animatronics/Chica.png', 33, 66, 3);
    this.game.load.image('screamerChica', './images/animatronics/screamerChica.png');
    this.game.load.spritesheet('freddy','./images/animatronics/Freddy.png', 33, 66, 3);
    this.game.load.spritesheet('darkFreddy','./images/animatronics/FreddyDark.png', 33, 66, 2);
    this.game.load.image('screamerFreddy', './images/animatronics/screamerFreddy.png');
    this.game.load.image('foxy','./images/animatronics/Foxy.png');
    this.game.load.spritesheet('foxyRun','./images/animatronics/FoxyRun.png', 33, 66, 2);
    this.game.load.image('screamerFoxy', './images/animatronics/screamerFoxy.png');

    //Objects
    this.game.load.spritesheet('buttonsCameras', './images/items/buttonsCameras.png', 33, 33, 22);
    this.game.load.spritesheet('buttonLight', './images/items/buttonLight.png', 33, 66, 2);
    this.game.load.spritesheet('buttonDoor', './images/items/buttonDoor.png', 33, 66, 2);
    this.game.load.spritesheet('doorClose', './images/items/doorClose.png', 264, 462, 3)
    this.game.load.spritesheet('doorOpen', './images/items/doorOpen.png', 264, 462, 3)
    this.game.load.image('camerasMap', './images/items/camerasMap.png');
    this.game.load.image('edge', './images/items/edge.png');
    this.game.load.spritesheet('RECPoint', './images/items/RECPoint.png', 33, 33, 2);
    this.game.load.image('sideEdge', './images/items/sideEdge.png');
    this.game.load.spritesheet('buttonMonitor', './images/items/monitorButton.png', 396, 66, 2);
    this.game.load.image('leftLight', './images/items/LeftLight.png');
    this.game.load.image('rightLight', './images/items/RightLight.png');
    this.game.load.spritesheet('battery', './images/items/battery.png', 143, 66, 4);

    //Effects
    this.game.load.spritesheet('staticEffect', './images/effect/static.png', 800, 600, 5);

    //Text
    
    this.game.load.image('REC', './images/texts/REC.png');
    this.game.load.spritesheet('camerasTexts', './images/texts/camerasNames.png', 364, 66, 11);
    this.game.load.spritesheet('manyTexts', './images/texts/manyTexts.png', 264, 66, 5);
    this.game.load.spritesheet('numbers', './images/texts/numbers.png', 33, 66, 10);
  },

  create: function () 
  {
    this.game.state.start('game');
  }
};


window.onload = function () 
{
  var game = new Phaser.Game(792, 594, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('menu', MenuScene);
  game.state.add('game', GameScene);


  game.state.start('boot');
};


function Main()
{
  /*
  Create
  {
    Se crea 1 menu,
    Se crea phoneguy,
    Se crea 1 night,
    Se crea 1 office.
  }

  Update
  {
    Audio phoneGuy.

    Bucle del juego
    {
      Booleano de finPartida,
      Cambio a escena oficina,
      Actualizacion de los animatronicos,
      Input.
    }
  }


  */
}
},{"./gameScene.js":9,"./menuScene.js":12,"./play_scene.js":14}],12:[function(require,module,exports){
'use strict';

var Menu =
{
    create: function()
    {
        var buttonStart = this.game.add.button(0, 0, 'buttonsCameras', function (){actionOnClick(this.game)}, this);
        
        function actionOnClick (game)
        {
            game.state.start('game');
        }
    }
    
};

module.exports = Menu;
},{}],13:[function(require,module,exports){
'use strict';

//meter phoneGuy
function Night(spriteDec, spriteU, numberNight)
{
    //Control del paso de hora y noches
    this._night = 1;
    this._hour = 0;
    this._hourArr = [12,1,2,3,4,5,6];

    this.spriteU = spriteU;
    this.spriteDec = spriteDec;
    this.spriteNight = numberNight;

    this.spriteU.fixedToCamera = true;
    this.spriteDec.fixedToCamera = true;
    this.spriteNight.fixedToCamera = true;
    
    this.spriteU.frame = 2;
    this.spriteDec.frame = 1;
    this.spriteNight.frame = 1;

    this.spriteU.scale.setTo(0.8, 0.8);
    this.spriteDec.scale.setTo(0.8, 0.8);
    this.spriteNight.scale.setTo(0.55,0.55);
}
Night.prototype.changeNight = function(freddy, chica, bonnie, /*foxy*/)
{
    this._night++;
    this.spriteNight.frame++;
    freddy.changeInfo(night);
    chica.changeInfo(night);
    bonnie.changeInfo(night);
    //foxy.changeInfo(night);
}
Night.prototype.startNight = function()
{
    //animacion hora al terminar
}

Night.prototype.finishNight = function()
{
    this._night++;
    this.spriteNight.frame = this._night;

    this.spriteDec.alpha = 1;
    this._hour = 0;
    this.spriteU.frame = this._hourArr[2];
}
Night.prototype.changeHour = function(battery)
{
    this.spriteDec.alpha = 0;
    this._hour++;
    this.spriteU.frame = this._hourArr[this._hour];

    if(this._hour == 6)
    {
        this.finishNight();
        battery.reset();
    }
}

module.exports = Night;
//Se veran si se añaden mas





    /*//Freddy
    var pathFreddy = [];
    pathFreddy.push(new Room ('showStage', pathFreddy[1], null, null));
    pathFreddy.push(new Room ('showStage', pathFreddy[1], null, null));
    pathFreddy.push(new Room ('diningRoom', pathFreddy[2], null, null));
    pathFreddy.push(new Room ('restroom', pathFreddy[3], null, null));
    pathFreddy.push(new Room ('kitchen', pathFreddy[4], null, null));
    pathFreddy.push(new Room ('eastHall', pathFreddy[5], null, null));
    pathFreddy.push(new Room ('eHallCorner', null, null, null, Freddy.attack()));

    this._Freddy = new Freddy('freddy', '', '', pathFreddy, 0, [[null, null], [null, null], [3, 4], [2, 3], [0, 1], [0, 0]], [[null, null], [null, null], [,], [,], [,], [,]]);

    //Foxy
    var pathFoxy = []; //Mirar mejor
    pathFoxy.push('hide');
    pathFoxy.push('half-hide');
    pathFoxy.push('spotted');
    pathFoxy.push('running');

    this._Foxy = new Foxy('foxy', '', 'foxyRun', pathFoxy, 0, [[null, null], [null, null], [3, 4], [2, 3], [0, 1], [0, 0]], [[, ], [, ], [,], [,], [,], [,]]);*/

    //Bonnie
    /*var path = [];
    path.push(new Room ('showStage', 1, null, null));
    path.push(new Room ('diningRoom', 2, path[3], null));
    path.push(new Room ('backStage', 1, null, null));
    path.push(new Room ('westHall', 1, 4, path[5]));
    path.push(new Room ('supplyCloset', path[3], path[5], null));
    path.push(new Room ('wHallCorner', path[3], path[4], null, this.attack()));*/

    /*this.hour =  [];
    this.hour.push({min: 2, max: 2});
    this.hour.push({min: 0, max: 1});
    this.hour.push({min: 1, max: 2});
    this.hour.push({min: 0, max: 1});
    this.hour.push({min: 0, max: 1});
    this.hour.push({min: 0, max: 0});

    this.actTime = [];
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});
    this.actTime.push({min: 5, max: 10});*/
},{}],14:[function(require,module,exports){
'use strict';

var PlayScene = 
{
  create: function () 
  {   
  
    /*var bonnie = this.game.add.sprite(0,0,'bonnie');
    bonnie.frame = 1;
    var chica = this.game.add.sprite(66,0,'chica');
    chica.frame = 1;*/

    var button = this.game.add.button(0, 0, 'buttonsCameras', actionOnClick, this, 2, 2);

    /*var map = this.game.add.image(0, 0, 'camerasMap');

    console.log (this.game.world.width);
    this.game.world.resize(1000, 1000);
    console.log (this.game.camera.x);*/
  }
};

function actionOnClick()
{
  this.button.frame = 11;
}

  module.exports = PlayScene;

},{}],15:[function(require,module,exports){

//CREACION RUTAS
function Room(x, y, name, room1, room2, room3, attack = null)
{
    this._x = x;
    this._y = y;
    this._name = name;

    if (room1 != null)
    {
        this._room1 = room1;
        this._number = 1;

        if(room2 != null)
        {
            this._room2 = room2;
            this._number++;
            
            if (room3 != null)
            {
                this._room3 = room3
                this._number++;
            }
        }
    }

    if (attack != null)
    {
        this._number++;
        this._attack = attack;
    }
}

module.exports = Room;
},{}]},{},[11]);
