(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var Const = require('./const.js');

function Battery(game, spriteBar, spriteCent, spriteDec, spriteU)
{
    this.var = new Const();

    //Sprite de las barritas
    this.spriteBar = spriteBar;
    this.spriteBar.scale.setTo(this.var._spriteBarScaleX, this.var._spriteBarScaleY);
    this.spriteBar.fixedToCamera = true;

    //Sprite de los porcentajes
    this.spriteCent = spriteCent;
    this.spriteCent.scale.setTo(this.var._spriteNumScale, this.var._spriteNumScale);
    this.spriteCent.fixedToCamera = true;

    this.spriteDec = spriteDec;
    this.spriteDec.scale.setTo(this.var._spriteNumScale, this.var._spriteNumScale);
    this.spriteDec.fixedToCamera = true;

    this.spriteU = spriteU;
    this.spriteU.scale.setTo(this.var._spriteNumScale, this.var._spriteNumScale);
    this.spriteU.fixedToCamera = true;

    //Cosillas para el control del tiempo
    this.restBattery = 100;
    this.batteryUssage = 1; //De primeras
    this.timeToChange = this.var._timeToChange1 + game.time.now; //De primeras
    this.realTimeToChange = 0;

    this.times = [];
    this.times.push(this.var._timeToChange1);
    this.times.push(this.var._timeToChange2);
    this.times.push(this.var._timeToChange3);
    this.times.push(this.var._timeToChange4);

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
    this.batteryUssage = 1;
    this.spriteCent.frame = 1;
    this.spriteDec.frame = 0;
    this.spriteU.frame = 0;
}

module.exports = Battery;
},{"./const.js":10}],2:[function(require,module,exports){
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
},{"./const.js":10}],3:[function(require,module,exports){

//--------------------Clase Animatronicos
function Animatronics(sprite, attackSound, moveSound, path, hours, actTime, Var)
{
    this.var = Var;
    //Phaser.Sprite.apply(this,game,sprite)
    //this.add.child(....) // buscarlo que no es así (puede que no queráis eso)

    this._sprite = sprite;
    this._sprite.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);

    this._attackSound = attackSound;

    this._moveSound = moveSound;
    this._moveSound.volume = 0.5;

    this._path = path; //Array de functions
    this._pos = this._path[0];
    this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;

    this._hours = hours;

    this._actTime = actTime; //Array de noches con los parametros de actIni y actFin
};

Animatronics.prototype = Object.create(Phaser.Sprite.prototype);
Animatronics.prototype.constructor = Animatronics;

Animatronics.prototype.delete = function()
{
    this._sprite.destroy();
    this._screamer.destroy();
}
Animatronics.prototype.createScreamer = function(screamer)
{
    this._screamer = screamer;
    this._screamer.fixedToCamera = true;
    this._screamer.alpha = 0;
    this._screamerAnim = this._screamer.animations.add('screamer');
};
Animatronics.prototype.getPos = function() 
{
    return this._pos;
};
Animatronics.prototype.activateAnim = function()
{//MIRAR
    this._sprite.animations.add('animation');
    this._sprite.animations.play('animation', 10, true);
};
Animatronics.prototype.alphaScreamer = function(n)
{
    this._attackSound.play();
    this._screamer.alpha = n;
    this._screamerAnim.play(8, false);
};
Animatronics.prototype.alphaSprite = function(n)
{
    this._sprite.alpha = n;
}
Animatronics.prototype.changeInfo = function(night)
{
    this._pos = this._path[0];
    this._hoursIni = this._hours[night];
    this._actualActTime = this._actTime[night];
};
Animatronics.prototype.moveEffect = function(game, staticEffect)
{  
    var rnd = Math.floor(Math.random() * (4 - 0));
    staticEffect._audio[rnd].play();
    staticEffect.alpha = 1;

    game.time.events.add(3000, function()
    {
        staticEffect._audio[rnd].stop();
        if (game.camera.x < this.var._showStagePosX)
            staticEffect.alpha = 0;
        else
            staticEffect.alpha = 0.1;
    }, this);
};
Animatronics.prototype.changeNight = function(night)
{
    this._actualActTime = this._actTime[night - 1];
    this._hoursIni = this._hours[night - 1];//Array de noches con las horas de inicio
}
Animatronics.prototype.getHour = function()
{
    return (Math.random() * (this._hoursIni.max - this._hoursIni.min)) + this._hoursIni.min;
}

//---------------------Foxy-------------------------//
/*function Foxy(sprite, screamer, animation, posIni, hourIni, actTime)
{
    FreddyFoxy.apply(this,[sprite, screamer, animation, path, posIni, hourIni, actTime]);
};
Foxy.prototype = Object.create(FreddyFoxy.prototype);
Foxy.prototype.constructor = Foxy;

Foxy.prototype.move = function(){};
Foxy.prototype.attack = function(){};*/

module.exports = Animatronics;
},{}],4:[function(require,module,exports){
var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Bonnie-------------------------//
function Bonnie(sprite, attackSound, moveSound)
{
    this.var = new Const();
    this.visible = true;

    BonnieChica.apply(this,[sprite, attackSound, moveSound,
                        //ruta
                        [new Room (this.var._bonnieRoom1X, this.var._bonnieRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                        new Room (this.var._bonnieRoom2X, this.var._bonnieRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, 3, null), 
                        new Room (this.var._bonnieRoom3X, this.var._bonnieRoom3Y, this.var._backstagePosX, this.var._backstagePosY, 'backStage', 1, null, null), 
                        new Room (this.var._bonnieRoom4X, this.var._bonnieRoom4Y, this.var._westHallPosX, this.var._westHallPosY, 'westHall', 1, 4, 5),
                        new Room (this.var._bonnieRoom5X, this.var._bonnieRoom5Y, this.var._supplyClosetPosX, this.var._supplyClosetPosY, 'supplyCloset', 3, 5, null), 
                        new Room (this.var._bonnieRoom6X, this.var._bonnieRoom6Y, this.var._wHallCornerPosX, this.var._wHallCornerPosY, 'wHallCorner', 3, 4, null, true)],
                        //rango de horas de activacion
                        [{min: 2, max: 2}, {min: 0, max: 1}, {min: 1.5, max: 2}, {min: 0, max: 0.5}, {min: 0, max: 0}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 15, max: 25}, {min: 10, max: 20}, {min: 7, max: 15}, {min: 5, max: 12}, {min: 3, max: 6}, {min: 2, max: 5}],
                        //rango de segundos de ataque
                        [{min: 10, max: 15}, {min: 8, max: 12}, {min: 6.5, max: 11}, {min: 5.5, max: 9}, {min: 3, max: 5}, {min: 2, max: 4}], this.var]);

}
Bonnie.prototype = Object.create(BonnieChica.prototype);
Bonnie.prototype.constructor = Bonnie;

Bonnie.prototype.foxyAndMe = function(foxy, game, staticEffect)
{
    if(this._pos._name == 'westHall' && foxy._pos._x == this.var._foxyRoom4X && this.visible)
    {   
        this.alphaSprite(0);
        this.visible = false;
    }
    else if(foxy._pos._x != this.var._foxyRoom4X && !this.isAttacking() && !this.visible)
    {
        if (game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y)
            this.moveEffect(game, staticEffect);
        this.alphaSprite(1);
        this.visible = true;
    }
    else if(this._pos._name != 'westHall' && !this.isAttacking()&& !this.visible)
    {
        if (game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y)
            this.moveEffect(game, staticEffect);
        this.alphaSprite(1);
        this.visible = true;
    }
};

module.exports = Bonnie;
},{"../const.js":10,"./bonnieChica.js":5,"./room.js":9}],5:[function(require,module,exports){
//--------------------Clase Animatronicos
var Animatronics = require('./Animatronics.js'); 
 

//----------------BonnieChica
function BonnieChica(sprite, attackSound, moveSound, path, hour, actTime, attackTime, Var)
{
    Animatronics.apply(this,[sprite, attackSound, moveSound, path, hour, actTime, Var]);
    
    this._sprite.frame = 2;
    this.dinningRoom = false;
    this.inOffice = false;
    this.attacking = false;
    this.var = Var;
    this.attackTime = attackTime;
};
BonnieChica.prototype = Object.create(Animatronics.prototype);
BonnieChica.prototype.constructor = BonnieChica;

BonnieChica.prototype.randomAnim = function(game)
{
    if (this._sprite.visible || this._sprite.alpha == 1)
    {
        this._sprite.frame = 1
        game.time.events.add(1000, function()
        {
            this._sprite.frame = 0;
        }, this);
    }
}
BonnieChica.prototype.preChangeNight = function(night)
{
    this.attackTimeIni = this.attackTime[night];
    this.changeNight(night);
}
BonnieChica.prototype.dinningRoomTrue = function()
{
    this.dinningRoom = true;
}
BonnieChica.prototype.dinningRoomFalse = function()
{
    this.dinningRoom = false;
}
BonnieChica.prototype.move = function(game, otherAnimatronic, staticEffect, door, light, freddy)
{
    if(!this.inOffice)
    {
        //Tiempo para moverse
        var timeToMove = Math.floor(((Math.random() * (this._actualActTime.max - this._actualActTime.min)) + this._actualActTime.min) * 1000);

        //Cambiar el pos del animatronico
        game.time.events.add(timeToMove, function()
        {
            //Controlar que, si esta atacando, no se mueva
            if(!this.inOffice)
            {
                this._antPos = this._pos;

                if (this._pos._number == 2)
                {
                    var percentage = Math.floor(Math.random() * (101 - 0));

                    if (!this._pos._attack)
                    {
                        if (percentage > this.var._2roomsPercentage1)
                        {
                            if(this._path[this._pos._room2]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                            {
                                this._pos = this._path[this._pos._room2];
                                this.dinningRoomTrue();
                            }
                            else if (this._path[this._pos._room2]._name != "diningRoom")
                            {
                                this._pos = this._path[this._pos._room2];
                                this.dinningRoomFalse();
                            }
                        }
                        else if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                        {
                            this._pos = this._path[this._pos._room1];
                            this.dinningRoomTrue();
                        }
                        else if (this._path[this._pos._room1]._name != "diningRoom")
                        {
                            this._pos = this._path[this._pos._room1];
                            this.dinningRoomFalse();
                        }
                    }
                    else
                    {
                        
                        if (!light.getActive() && percentage > this.var._2roomsPercentage1)
                            this.attack(game ,door, light, staticEffect, freddy);   
                        else
                            this._pos = this._path[this._pos._room1];
                    }
                }
                else if (this._pos._number == 3)
                {
                    var percentage = Math.floor(Math.random() * (101 - 0));

                    if (!this._pos._attack)
                    {
                        if (percentage > this.var._3roomsPercentage1)
                        {

                            if(this._path[this._pos._room3]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                            {
                                this._pos = this._path[this._pos._room3];
                                this.dinningRoomTrue();
                            }
                            else if (this._path[this._pos._room3]._name != "diningRoom")
                            {
                                this._pos = this._path[this._pos._room3];
                                this.dinningRoomFalse();
                            }
                        }
                        else if (percentage > this.var._3roomsPercentage2)
                        {
                            if(this._path[this._pos._room2]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                            {
                                this._pos = this._path[this._pos._room2];
                                this.dinningRoomTrue();
                            }
                            else if (this._path[this._pos._room2]._name != "diningRoom")
                            {
                                this._pos = this._path[this._pos._room2];
                                this.dinningRoomFalse();
                            }
                        }
                        else if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                        {
                            this._pos = this._path[this._pos._room1];
                            this.dinningRoomTrue();
                        }
                        else if (this._path[this._pos._room1]._name != "diningRoom")
                        {
                            this._pos = this._path[this._pos._room1];
                            this.dinningRoomFalse();
                        }
                    }
                    else
                    {
                        if (!light.getActive() && percentage > this.var._3roomsPercentage1)
                            this.attack(game ,door, light, staticEffect, freddy);
                        else if (percentage > this.var._3roomsPercentage2)
                            this._pos = this._path[this._pos._room2];
                        else
                            this._pos = this._path[this._pos._room1];
                    }
                }
                else
                {
                    if (this._path[this._pos._room1]._name == "diningRoom" && !otherAnimatronic.dinningRoom)
                    {
                        this._sprite.frame = 0;
                        this._pos = this._path[this._pos._room1];
                        this.dinningRoomTrue();
                    }
                    else if (this._path[this._pos._room1]._name != "diningRoom")
                    {
                        this._pos = this._path[this._pos._room1];
                        this.dinningRoomFalse();
                    }
                }

                //FreddyOscuro
                if (this._antPos != this._pos)
                {
                    if(this._antPos._name == freddy._pos._name)
                        freddy.hideDarkSprite();
                    else if(this._pos._name == freddy._pos._name)
                        freddy.showDarkSprite();
                //Controlar que el efecto de static effect aparezca cuando miras donde estan o donde se van a mover
                    if ((game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y) || (game.camera.x == this._antPos._posCam.x && game.camera.y == this._antPos._posCam.y)) //HACER SI ESTA EN MONITOR
                        this.moveEffect(game, staticEffect);
                    
                    var audioRandom = Math.random() * (1 - 0)
                    if(audioRandom > 0.8)
                        this._moveSound.play();

                    this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;
                }

                if(!this.inOffice)
                this.move(game, otherAnimatronic, staticEffect, door, light, freddy);
            }
        }, this);
    }

}
BonnieChica.prototype.isInOffice = function()
{
    return this.inOffice;
}
BonnieChica.prototype.isAttacking = function()
{
    return this.attacking;
}
BonnieChica.prototype.attack = function(game, door, light, staticEffect, freddy)
{
    if(!this.inOffice)
    {
        if (game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y)
            this.moveEffect(game, staticEffect);

        if (freddy._pos._name == this._pos._name)
            freddy.hideDarkSprite();
            
        this.alphaSprite(0);
        this.attacking = true;
        var timeToMove = Math.floor(((Math.random() * (this.attackTimeIni.max - this.attackTimeIni.min)) + this.attackTimeIni.min) * 1000);//Cambiar por tiempos de ataque

        game.time.events.add(timeToMove, function()
        {
            if(!this.inOffice)
            {
                if(!door.getActive())
                {
                    if(light.getActive()) 
                        light.turnOff();

                    this.inOffice = true;
                    light.enabledInput(false);
                    door.enabledInput(false);
                }
                else
                {
                    if(this._pos._number == 3)
                        this._pos = this._path[this._pos._room2];
                    else
                        this._pos = this._path[this._pos._room1];
                    
                    this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;
                    this.alphaSprite(1);

                    if (game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y)
                        this.moveEffect(game, staticEffect);

                    if (freddy._pos._name == this._pos._name)
                        freddy.showDarkSprite();
                }
                this.attacking = false;
            }
        }, this);
    }

}

module.exports = BonnieChica;
},{"./Animatronics.js":3}],6:[function(require,module,exports){
var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Chica-------------------------//
function Chica(sprite, attackSound, moveSound)
{
    this.var = new Const();
    BonnieChica.apply(this,[sprite, attackSound, moveSound,
                        //ruta
                        [new Room (this.var._chicaRoom1X, this.var._chicaRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                        new Room (this.var._chicaRoom2X, this.var._chicaRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, 3, 4), 
                        new Room (this.var._chicaRoom3X, this.var._chicaRoom3Y, this.var._restroomsPosX, this.var._restroomsPosY, 'restroom', 1, null, null), 
                        new Room (this.var._chicaRoom4X, this.var._chicaRoom4Y, this.var._kitchenPosX, this.var._kitchenPosY, 'kitchen', 1, null, null),
                        new Room (this.var._chicaRoom5X, this.var._chicaRoom5Y, this.var._eastHallPosX, this.var._eastHallPosY, 'eastHall', 1, 5, null), 
                        new Room (this.var._chicaRoom6X, this.var._chicaRoom6Y, this.var._eHallCornerPosX, this.var._eHallCornerPosY, 'eHallCorner', 4, null, null, true)],
                        //rango de horas de activacion 
                        [{min: 2, max: 3}, {min: 0, max: 3}, {min: 0, max: 1}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 20, max: 30}, {min: 15, max: 25}, {min: 5, max: 10}, {min: 15, max: 20}, {min: 7, max: 10}, {min: 5, max: 8}],
                        //rango de segundos de ataque
                        [{min: 10, max: 15}, {min: 8, max: 12}, {min: 7, max: 11}, {min: 6, max: 9}, {min: 3, max: 5}, {min: 3.5, max: 4.5}], this.var]);

}
Chica.prototype = Object.create(BonnieChica.prototype);
Chica.prototype.constructor = Chica;

module.exports = Chica;
},{"../const.js":10,"./bonnieChica.js":5,"./room.js":9}],7:[function(require,module,exports){
//--------------------Clases
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');


//---------------------Foxy-------------------------//
function Foxy (game, room1, room2, room3, sprite, attackSound, moveSound, runSound, runSprite)
{
    this.var = new Const();
    this.game = game;
    
    this.runSprite = runSprite;
    this.runSprite.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);
    this.runSprite.alpha = 0;
    this.runSprite.x = this.var._foxyRoom4X;
    this.runSprite.y = this.var._foxyRoom4Y;

    this.startedMoving = false;
    this.isAttacking = false;
    this.isOfficiallyAttacking = false;
    this.spottedMoving = false;
    this.alreadyAttacked = false;
    this.realAttackStarted = false;
    Animatronics.apply(this,[sprite, attackSound, moveSound,
                            //ruta
                            [new RoomStates(this.var._foxyRoom1X, this.var._foxyRoom1Y, room1, this.var, 1, false),
                            new RoomStates(this.var._foxyRoom2X, this.var._foxyRoom2Y, room2, this.var, 2, false),
                            new RoomStates(this.var._foxyRoom3X, this.var._foxyRoom3Y, room3, this.var, 3, false),
                            new RoomStates(this.var._foxyRoom4X, this.var._foxyRoom4Y, room3, this.var, 0, true)],
                            //rango de horas de activacion
                            [{min: 3, max: 5}, {min: 1, max: 4}, {min: 1, max: 3}, {min: 0, max: 2}, {min: 0, max: 1}, {min: 0, max: 0}],
                            //rango de segundos de movimiento
                            [{min: 20, max: 30}, {min: 18, max: 25}, {min: 12, max: 20}, {min: 10, max: 15}, {min: 7, max: 12}, {min: 6, max: 10}], this.var]);
    this._sprite.visible = false;

    //Sonidos
        this._moveSound.volume = 0.8;
        //Run
        this.runSound = runSound;
        this.runSound.loop = true;

}
Foxy.prototype = Object.create(Animatronics.prototype);
Foxy.prototype.constructor = Foxy;

Foxy.prototype.move = function(door, battery, staticEffect)
{
    this.game.time.events.add (200, function()
    {
        this.isOfficiallyAttacking = false;
        if(this.alreadyAttacked)
            this.alreadyAttacked = false;
    },this);
    this.startedMoving = true;

    var timeToMove = Math.floor((Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min) * 1000);

    this.movement = this.game.time.events.add (timeToMove, function()
    {
        var antPos = this._pos;
        if(!this._pos._attack)
        {
            if(this._pos._connect == 3 && this.game.camera.x == this.var._westHallPosX){}        
            else
            {
                this._pos = this._path[this._pos._connect];
                antPos._image.alpha = 0;
                this._pos._image.alpha = 1;

                if(this._pos == this._path[0] || this._pos == this._path[3])
                    this._sprite.visible = false;
                else
                    this._sprite.visible = true;
            }
        }

        this._sprite.x = this._pos._x;       this._sprite.y = this._pos._y;

        if(!this._pos._attack)
            this.move(door, battery, staticEffect);
        else 
            this.attack(door, battery, staticEffect);
    }, this);
};
Foxy.prototype.spotted = function(Var, door, battery, staticEffect)
{
    if(this.game.camera.x == Var._pirateCovePosX  && !this._pos._attack && !this.isOfficiallyAttacking)
    {
        this.game.time.events.remove(this.movement);
        this.move(door, battery, staticEffect);
    }
    else if(this.game.camera.x == this.var._westHallPosX && this._pos._attack && !this.isOfficiallyAttacking && !this.realAttackStarted)
    {
        this.isOfficiallyAttacking = true;
        this.game.time.events.remove(this.attacking);
        this.attackSpotted(door, battery, staticEffect);
    }
};
Foxy.prototype.attack = function(door, battery, staticEffect)
{
    var timeToMove = Math.floor((Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min) * 1000);//Cambiar tiempos
    this.runSprite.alpha = 1;

    this.attacking = this.game.time.events.add (timeToMove, function()
    {  
        this.realAttack(door, battery, staticEffect);
    }, this);
};
Foxy.prototype.attackSpotted = function(door, battery, staticEffect)
{
    this.spottedMoving = true;
    this.runSprite.x = this.var._foxyRoom4X;
    this.runSprite.y = this.var._foxyRoom4Y;
    this.runSprite.animations.add('run');
    this.runSprite.animations.play('run', 5, true);
    this.runSound.play();

    this.runAnim(door, battery, staticEffect);

};
Foxy.prototype.realAttack = function(door, battery, staticEffect)
{
    this.realAttackStarted = true;
    this.runSprite.alpha = 0;
    if(!door.getActive() && !battery.emptyBattery())
    {
        this.isAttacking = true;
        this.alphaScreamer(1);
    
        this.game.time.events.add(this.var._timeForReset, function()
        {
            this.game.state.start('death');
        }, this)
    }
    else
    {
        this._moveSound.play();

        this._moveSound.onStop.add(function() 
        {  
            if(!this.alreadyAttacked )
            {
                this.alreadyAttacked = true;
                if(this.game.camera.x == this.var._pirateCovePosX)
                    this.moveEffect(this.game, staticEffect);

                this._path[3]._image.alpha = 0;
                this._pos = this._path[this._pos._connect];
                this._pos._image.alpha = 1;
                this._sprite.visible = false;
                this._sprite.x = this._pos._x;       this._sprite.y = this._pos._y;
                
                this.realAttackStarted = false;
                this.move(door, battery, staticEffect);
            }
        }, this);
    }
        
};
Foxy.prototype.runAnim = function(door, battery, staticEffect)
{
    this.game.time.events.add (200, function()
    {
        this.notLookedWhileMoving();
        if(this.spottedMoving && this.runSprite.y <= 430)
        {
            this.runSprite.y = this.runSprite.y + 20;

            this.runAnim(door, battery, staticEffect);
        }
        else
        {
            this.runSound.stop();
            
            this.spottedMoving = false;
            this.runSprite.alpha = 0;
            this.runSprite.animations.stop('run');

            this.attackingSpotted = this.game.time.events.add (5000, function()
            {  
                this.realAttack(door, battery, staticEffect);
            }, this);
        }
    }, this);
};
Foxy.prototype.notLookedWhileMoving = function()
{
    if(this.game.camera.x != this.var._westHallPosX && this.spottedMoving)
        this.spottedMoving = false; 
};
Foxy.prototype.startToMove = function()
{
    return this.startedMoving;
};
Foxy.prototype.returnIsAttacking = function()
{
    return this.isAttacking;
};


function RoomStates (posFoxyX, posFoxyY, imageState, Var, connection, attack)
{
    this._x = posFoxyX;
    this._y = posFoxyY;

    this._image = imageState;
    this._image.scale.setTo(Var._camTam, Var._camTam);
    this._image.x = Var._pirateCovePosX + (Var._tamX - imageState.width) / 2;
    this._image.y = Var._pirateCovePosY + (Var._tamY - imageState.height) / 2;
    this._image.alpha = 0;

    this._connect = connection;
    this._attack = attack;
}

module.exports = Foxy;
},{"../const.js":10,"./Animatronics.js":3}],8:[function(require,module,exports){
//--------------------Clases
var Animatronics = require('./Animatronics.js'); 
var Const = require('../const.js');
var Room = require('./room.js');


//---------------------Freddy-------------------------//
function Freddy(sprite, darkFreddy, attack, attackSound, moveSound, laughSounds, intoTheOfficeSound, song, endSong)
{
    this.var = new Const();
    
    this.darkFreddy = darkFreddy
    this.darkFreddy.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);
    this.darkFreddy.alpha = 0;

    this.attackSprite = attack;
    this.attackSprite.alpha = 0;
    this.attackDarkAnim = this.attackSprite.animations.add('start');

    this.lookAway = false;
    this.startedMoving = false;

    Animatronics.apply(this,[sprite, attackSound, moveSound,
                            //ruta
                            [new Room (this.var._freddyRoom1X, this.var._freddyRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                            new Room (this.var._freddyRoom2X, this.var._freddyRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, null,null), 
                            new Room (this.var._freddyRoom3X, this.var._freddyRoom3Y, this.var._restroomsPosX, this.var._restroomsPosY, 'restroom', 3, null, null), 
                            new Room (this.var._freddyRoom4X, this.var._freddyRoom4Y, this.var._kitchenPosX, this.var._kitchenPosY, 'kitchen', 4, null, null),
                            new Room (this.var._freddyRoom5X, this.var._freddyRoom5Y, this.var._eastHallPosX, this.var._eastHallPosY, 'eastHall', 5, null, null), 
                            new Room (this.var._freddyRoom6X, this.var._freddyRoom6Y, this.var._eHallCornerPosX, this.var._eHallCornerPosY, 'eHallCorner', null, null, null, true)],
                            //rango de horas de activacion 
                            [{min: 6, max: 6}, {min: 2, max: 5}, {min: 3, max: 4}, {min: 3, max: 3}, {min: 0, max: 0.5}, {min: 0, max: 0}],
                            //rango de segundos de movimiento
                            [{min: 2, max: 20}, {min: 20, max: 25}, {min: 15, max: 25}, {min: 10, max: 15}, {min: 8, max: 14}, {min: 4, max: 10}], this.var]);
                            
    this._sprite.frame = 2;

    //Sonidos
        //musiquita
        this._song = song;
        this._endSong = endSong;
        //risas
        this._laughSounds = laughSounds;
        this._laughSounds[0].volume = 0.2;
        this._laughSounds[1].volume = 0.2;
        this._laughSounds[2].volume = 0.2;
        //in office
        this._intoTheOfficeSound = intoTheOfficeSound;
        this._intoTheOfficeSound.volume = 0.3;
};
Freddy.prototype = Object.create(Animatronics.prototype);
Freddy.prototype.constructor = Freddy;

Freddy.prototype.randomAnim = function(game)
{
    if (this._sprite.visible || this._sprite.alpha == 1)
    {
        this._sprite.frame = 1
        game.time.events.add(1000, function()
        {
            this._sprite.frame = 0;
        }, this);
    }
}
Freddy.prototype.move = function(game, bonnie, chica, staticEffect)
{
    this.startedMoving = true;

    var timeToMove = Math.floor((Math.random() * (this._actualActTime.max - this._actualActTime.min) + this._actualActTime.min) * 1000);
    
    this.movement = game.time.events.add (timeToMove, function()
    {
        var rnd = Math.random() * (1 - 0);
        if (rnd > 0.5)
        {
            var audio = Math.floor(Math.random() * (4 - 0));
            if(audio == 3)
                this._moveSound.play();
            else
                this._laughSounds[audio].play();
        }

        this._sprite.frame = 0;
        var antPos = this._pos;
        if(!this._pos._attack)
            this._pos = this._path[this._pos._room1];

        this._sprite.x = this._pos._x;       this._sprite.y = this._pos._y;
        this.darkFreddy.x = this._pos._x;    this.darkFreddy.y = this._pos._y;

        if(this._pos._name == bonnie._pos._name || (this._pos._name == chica._pos._name && !chica.isInOffice()))
            this.showDarkSprite();
        else
            this.hideDarkSprite();
        
        if (game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y && antPos != this._pos)
            this.moveEffect(game, staticEffect);

        if(!this._pos._attack)
            this.move(game, bonnie, chica, staticEffect);
    }, this);
};
Freddy.prototype.spotted = function(game, bonnie, chica, staticEffect)
{
    if(game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y && !this._pos._attack)
    {
        game.time.events.remove(this.movement);
        this.move(game, bonnie, chica, staticEffect);
    }
};
Freddy.prototype.showDarkSprite = function()
{
    this.darkFreddy.animations.add('loop');
    this.darkFreddy.alpha = 1;
    this.darkFreddy.animations.play('loop', 1, true);
    this._sprite.alpha = 0;
};
Freddy.prototype.hideDarkSprite = function()
{
    this.darkFreddy.alpha = 0;
    this.darkFreddy.animations.stop('loop');
    this._sprite.alpha = 1;
};
Freddy.prototype.attack = function()
{
    return this._pos._attack;
};
Freddy.prototype.lookingAway = function()
{
    this.lookAway = true;
    this._intoTheOfficeSound.play();
};
Freddy.prototype.returnLookingAway = function()
{
    return this.lookAway;
};
Freddy.prototype.startToMove = function()
{
    return this.startedMoving;
};
Freddy.prototype.attackBattery = function(game, darkness, moveLeft, moveRight)
{
    game.time.events.add(18000, function()
    {
        this.attackSprite.alpha = 1;
        this.attackDarkAnim.play(1, true);
        this._song.play();
        posCamera = game.camera.x;

        game.time.events.add(6000, function()
        {
            var cont = 6000;
            this.dontMoveAttack(game, posCamera, cont, darkness, moveLeft, moveRight);
        }, this);
    }, this);
};
Freddy.prototype.dontMoveAttack = function(game, posCamera, cont, darkness, moveLeft, moveRight)
{
    if (game.camera.x != posCamera || cont >= 21000)
    {
        this._song.stop();
        this._endSong.play();

        this.attackSprite.alpha = 0;
        this.attackDarkAnim.stop('start');

        moveLeft.inputEnabled = false;
        moveRight.inputEnabled = false;
        darkness.alpha = 0.9; //cambiar

        if (game.camera.x != posCamera)
            var time = 2500;
        else
            var time = 9000;
        game.time.events.add(time, function()
        {
            this.alphaScreamer(1);
            game.time.events.add(this.var._timeForReset, function(){ game.state.start('death'); }, this);
        }, this);
    }
    else
        game.time.events.add(3000, function()
        {
            cont += 3000;
            this.dontMoveAttack(game, posCamera, cont, darkness, moveLeft, moveRight);
        }, this);
}

module.exports = Freddy;
},{"../const.js":10,"./Animatronics.js":3,"./room.js":9}],9:[function(require,module,exports){

//CREACION RUTAS
function Room(x, y, posX, posY, name, room1, room2, room3, attack = false)
{
    this._x = x;
    this._y = y;
    this._name = name;
    this._posCam = {x: posX, y: posY};
    this._attack = attack;

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

    if (attack != false)
        this._number++;

}

module.exports = Room;
},{}],10:[function(require,module,exports){

function Const()
{
    //=====================================================MENUSCENE=============================================
    this._titlePosX = 50; 
    this._titlePosY = 50;

    this._nGPosX = 50; 
    this._nGPosY = 600 - 175;

    this._contPosX = 50; 
    this._contPosY = 600 - 100;

    this._freddyPosX = 800 - 350; 
    this._freddyPosY = 0;

    //=====================================================GAMESCENE=============================================
    this._tamX = 792;
    this._tamY = 594;

    this._iniCamPos = 396;
    this._timeForHour = 90000;

    this._timeForReset = 1000;

    //Mute Call
    this._muteCallPosX = (this._tamX / 2) - 40;
    this._muteCallPosY = 10;

    this._muteCallScale = 0.5;

    //Luces
    this._lightButtonIzqPosX = 157;
    this._lightButtonIzqPosY = 274;
    this._lightIzqPosX = 34;
    this._lightIzqPosY = 94;
    this._lightButtonDerPosX = 51.5 * 4 + this._tamX + this._tamX / 2;
    this._lightButtonDerPosY = 274;
    this._lightDerPosX = 92 + this._tamX + this._tamX / 3;
    this._lightDerPosY = 94;

    //Puertas
    this._doorButtonIzqPosX = 157;
    this._doorButtonIzqPosY = 220;
    this._doorIzqPosX = 185;
    this._doorIzqPosY = 78;
    this._doorButtonDerPosX = this._tamX + 301 * 2;
    this._doorButtonDerPosY = 220;
    this._doorDerPosX = this._tamX + 173 * 2;
    this._doorDerPosY = 78;

    //Edges
    this._edgeIzqPosX = 0;
    this._edgeIzqPosY = 0;
    this._edgeDerPosX = this._tamX - 325;
    this._edgeDerPosY = 0;

    //Cameras
    this._showStagePosX = this._tamX * 2;
    this._showStagePosY = 0;
    this._dinningRoomPosX = this._tamX * 3;
    this._dinningRoomPosY = 0;
    this._backstagePosX = this._tamX * 4;
    this._backstagePosY = 0;
    this._restroomsPosX = this._tamX * 5;
    this._restroomsPosY = 0;
    this._kitchenPosX = this._tamX * 6;
    this._kitchenPosY = 0;
    this._eastHallPosX = this._tamX * 7;
    this._eastHallPosY = 0;
    this._supplyClosetPosX = this._tamX * 8;
    this._supplyClosetPosY = 0;
    this._eHallCornerPosX = this._tamX * 9;
    this._eHallCornerPosY = 0;
    this._westHallPosX = this._tamX * 10;
    this._westHallPosY = 0;
    this._wHallCornerPosX = this._tamX * 11;
    this._wHallCornerPosY = 0;
    this._pirateCovePosX = this._tamX * 12;
    this._pirateCovePosY = 0;

    this._camTam = 1.5;
    this._camKitchenTam = 0.3;
    this._camKitchenY = 300;

    //Monitor stuff
    this._cameraTextPosX = this._tamX - 190;
    this._cameraTextPosY = this._tamY - 250;
    this._cameraTextScale = 0.5;

    this._recPosX = 45;
    this._recPosY = 20;
    this._recScale = 0.75;

    this._recPointPosX = 12;
    this._recPointPosY = 15;

    this._mapPosX = -2;
    this._mapPosY = -1.94;
    this._mapScale = 2;

    //Battery
    this._powerLeftTextPosX = 20;
    this._powerLeftTextPosY = 490;
    this._powerLeftTextScale = 0.6;

    this._percentageTextPosX = 79;
    this._percentageTextPosY = 490;
    this._percentageTextScale = 0.6;

    this._batterytPosX = 100;
    this._batterytPosY= 525;
    
    this._batteryNumber1PosX = 10;
    this._batteryNumber1PosY = 490;

    this._batteryNumber2PosX = 33;
    this._batteryNumber2PosY = 490;

    this._batteryNumber3PosX = 56;
    this._batteryNumber3PosY = 490;

    this._usageTextPosX = 20;
    this._usageTextPosY = 530;
    this._usageTextScale = 0.6;

    this._changeViewPosX = 400 - 316.8 / 2;
    this._changeViewPosY = 600 - 66 - 10;
    this._changeViewScaleX = 0.8;
    this._changeViewScaleY = 1;
    this._changeViewAlpha = 0.4;

    //Nights
    this._nigthsTextPosX = this._tamX - 140;
    this._nigthsTextPosY = 60;
    this._nigthsTextScale = 0.7;

    
    this._hourTextPosX = this._tamX - 80;
    this._hourTextPosY = 10;

    this._nightNumber1PosX = this._tamX -145;
    this._nightNumber1PosY = 17;

    this._nightNumber2PosX = this._tamX -115;
    this._nightNumber2PosY = 17;

    this._nightNumber3PosX = this._tamX -50;
    this._nightNumber3PosY = 64;

    //Update
    this._camMovSpeed = 13;

    this._turnOffLeftLightPos =1;
    this._turnOffRightLightPos =781;

    //================================================================Battery=========================================

    this._spriteBarScaleX = 0.7;
    this._spriteBarScaleX = 0.6;

    this._spriteNumScale = 0.6;

    this._timeToChange1 = 10000;
    this._timeToChange2 = 5000;
    this._timeToChange3 = 3000;
    this._timeToChange4 = 2000;

    //==============================================================InsideMoniter===============================

    this._cam1APosX = -19.2;
    this._cam1APosY = -11.7;

    this._cam1BPosX = -18.2;
    this._cam1BPosY = -12.7;

    this._cam1CPosX = -17.2;
    this._cam1CPosY =  -14;

    this._cam2APosX = -18.4;
    this._cam2APosY = -15.2;

    this._cam2BPosX = -17.68;
    this._cam2BPosY = -16.2;

    this._cam3PosX = -17;
    this._cam3PosY = -15;

    this._cam4APosX = -20;
    this._cam4APosY = -15.2;
    
    this._cam4BPosX = -20.72;
    this._cam4BPosY = -16.2;

    this._cam5PosX = -16.4;
    this._cam5PosY = -13;

    this._cam6PosX = -21.8;
    this._cam6PosY = -15.5;

    this._cam7PosX = -21.8;
    this._cam7PosY = -12.85;

    //==========================================================NIGHT=========================================

    this._spriteNightNumScale = 0.8;
    this._spriteNightScale = 0.55;

    //============================================================ANIMATRONICS=============================================

    this._spriteAnimScale = 1.5;

    //------Screamers
    this._screamerPosX = 0;
    this._screamerPosY = 0;

    //===========================================================BONNIE/CHICA===============================================

    this._2roomsPercentage1 = 40;

    this._3roomsPercentage1 = 50;
    this._3roomsPercentage2 = 25;

    //=====================================================BONNIE===========================================

    this._bonnieRoom1X = (this._tamX * 2) + 300;
    this._bonnieRoom1Y = 240;

    this._bonnieRoom2X = (this._tamX * 3) + 375;
    this._bonnieRoom2Y = 340;

    this._bonnieRoom3X = (this._tamX * 4) + 450;
    this._bonnieRoom3Y = 310;

    this._bonnieRoom4X = (this._tamX * 10) + 375;
    this._bonnieRoom4Y = 330;

    this._bonnieRoom5X = (this._tamX * 8) + 365;
    this._bonnieRoom5Y = 280;

    this._bonnieRoom6X = (this._tamX * 11) + 375;
    this._bonnieRoom6Y = 280;

    //Attack
    this._spriteBonnieAttackPosX = 34;
    this._spriteBonnieAttackPosY = 132;

    //======================================================CHICA=============================================

    this._chicaRoom1X = (this._tamX * 2) + 450;
    this._chicaRoom1Y = 240;

    this._chicaRoom2X = (this._tamX * 3) + 375;
    this._chicaRoom2Y = 340;

    this._chicaRoom3X = (this._tamX * 5) + 400;
    this._chicaRoom3Y = 200;

    this._chicaRoom4X = (this._tamX * 6) + 375;
    this._chicaRoom4Y = this._tamY + 66;

    this._chicaRoom5X = (this._tamX * 7) + 365;
    this._chicaRoom5Y = 280;

    this._chicaRoom6X = (this._tamX * 9) + 350;
    this._chicaRoom6Y = 330;

    //Attack
    this._spriteChicaAttackPosX = this._tamX * 2 - 144;
    this._spriteChicaAttackPosY = 176;

    //======================================================FREDDY=============================================

    this._freddyRoom1X = (this._tamX * 2) + 390;
    this._freddyRoom1Y = 280;

    this._freddyRoom2X = (this._tamX * 3) + 375;
    this._freddyRoom2Y = 220;

    this._freddyRoom3X = (this._tamX * 5) + 310;
    this._freddyRoom3Y = 420;

    this._freddyRoom4X = (this._tamX * 6) + 375;
    this._freddyRoom4Y = this._tamY + 66;

    this._freddyRoom5X = (this._tamX * 7) + 385;
    this._freddyRoom5Y = 400;

    this._freddyRoom6X = (this._tamX * 9) + 360;
    this._freddyRoom6Y = 280;

    //Attack
    this._spriteFreddyAttackPosX = 220;
    this._spriteFreddyAttackPosY = 150;

     //======================================================FOXY=============================================

    this._foxyRoom1X = this._pirateCovePosX + 370;
    this._foxyRoom1Y = 250;

    this._foxyRoom2X = this._pirateCovePosX + 370;
    this._foxyRoom2Y = 250;

    this._foxyRoom3X = this._pirateCovePosX + 310;
    this._foxyRoom3Y = 300;

    this._foxyRoom4X = this._westHallPosX + 375;
    this._foxyRoom4Y = 230;

    //Run
    this._spriteFoxyRunPosX = 34;
    this._spriteFoxyRunPosY = 132;

    //Attack
    this._spriteFoxyAttackPosX = 34;
    this._spriteFoxyAttackPosY = 132;

    //=====================================================DEATHSCENE=============================================
    this._gOTextPosX = 50; 
    this._gOTextPosY = this._tamY - 70;

    //====================================================WIN SCENE============================================
    this._winTextX = this._tamX / 2 - 403 / 2 + 90;
    this._winTextY = this._tamX/2 - 186 / 2 - 60;

    this._winTalX = 0;
    this._winTalY = 0;
};


module.exports = Const;
},{}],11:[function(require,module,exports){
'use strict';

function Interact (sound, errorSound) 
{
    this._active = false;
    this._block = false;
    this._errorSound = errorSound;
    this._errorSound.volume = 0.2;
    this._sound = sound;
};
Interact.prototype.resetInteract = function(){ this._active = false; }
Interact.prototype.getActive = function(){ return this._active; }
Interact.prototype.changeActive = function(){ this._active = !this._active; }

module.exports = Interact;
},{}],12:[function(require,module,exports){
'use strict';

var Interact = require('./Interactions.js');

function Door(game, posXButton, posYButton, posXDoor, posYDoor, sound, errorSound)
{
    Interact.apply(this, [sound, errorSound]);
    
    this.doorOpen = game.add.sprite(posXDoor, posYDoor, 'doorOpen', 2);
    this.doorOpenAnim = this.doorOpen.animations.add('open');
    
    this.doorClose = game.add.sprite(posXDoor, posYDoor, 'doorClose');
    this.doorCloseAnim = this.doorClose.animations.add('close');

   this.button = game.add.button(posXButton, posYButton, 'buttonDoor', function(){this.actionOnClick()}, this);
};

Door.prototype = Object.create(Interact.prototype);
Door.prototype.constructor = Door;

Door.prototype.reset = function()
{
    if (this._active)
    {
        this._sound.play();
        this.resetInteract();
        this.button.frame = 0;
        this.doorCloseAnim.frame = 0;
        this.doorOpenAnim.play(10, true);
        this.doorOpenAnim.loop = false;
    }
}
Door.prototype.actionOnClick = function() 
{
    if (!this._block)
    {
        this._sound.play();
        this.changeActive();
        if (this._active)
        {
            this.button.frame = 1;
            this.doorOpenAnim.frame = 2;
            this.doorCloseAnim.play(10, true);
            this.doorCloseAnim.loop = false;
        }
        else
        {
            this.button.frame = 0;
            this.doorCloseAnim.frame = 0;
            this.doorOpenAnim.play(10, true);
            this.doorOpenAnim.loop = false;
        }
    }
    else
        this._errorSound.play();
}
Door.prototype.enabledInput = function(b)
{
    this._block = !b;
}

module.exports = Door;
},{"./Interactions.js":11}],13:[function(require,module,exports){
'use strict';

var Interact = require('./Interactions.js');
var Const = require('../const.js');

function Light(game, posXButton, posYButton, sprite, animSprite, anim, sound, errorSound, windowscare)
{
    this.var = new Const();
    Interact.apply(this, [sound, errorSound]);

    this.light = sprite;
    this.light.visible = false;

    this.button = game.add.button(posXButton, posYButton, 'buttonLight', function(){ this.turnOff() }, this);

    this.animSprite = animSprite;
    this.animSprite.alpha = 0;

    this.anim = anim;

    this.windowscareAlreadySound = false;

    //Sounds
    this._sound.loop = true;
    this._windowscare = windowscare;
};

Light.prototype = Object.create(Interact.prototype);
Light.prototype.constructor = Light;

Light.prototype.reset = function()
{
    this.resetInteract();
    this.button.frame = 0;
    this.light.visible = false;
    this.animSprite.alpha = 0;
}
Light.prototype.turnOff = function() 
{
    if (!this._block)
    {
        this.changeActive();
        if(this._active)
        {
            this._sound.play();
            this.button.frame = 1;
            this.light.visible = true;
            
            if(this.anim.isAttacking())
            {
                this.animSprite.alpha = 1;
                if (!this.windowscareAlreadySound)
                {
                    this._windowscare.play();
                    this.windowscareAlreadySound = true;
                }
            }
            else
            {
                if (this.windowscareAlreadySound)
                    this.windowscareAlreadySound = false;
            }
        }
        else
        {
            this._sound.stop();
            this.button.frame = 0;
            this.light.visible = false;
            this.animSprite.alpha = 0;
        }
    }
    else
        this._errorSound.play();
}
Light.prototype.enabledInput = function(b)
{
    this._block = !b;
}
module.exports = Light;

},{"../const.js":10,"./Interactions.js":11}],14:[function(require,module,exports){
'use strict';

var Const = require('./const.js')
var MenuScene = require('./scenes/menuScene.js');
var GameScene = require('./scenes/gameScene.js');
var DeathScene = require('./scenes/deathScene.js');
var WinScene = require('./scenes/winScene.js');

var BootScene = 
{
  preload: function () 
  {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.image('logoMA', 'images/LogoMABlanco.png');
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
    this.logo = this.game.add.sprite(400 - 170, 100, 'logoMA');
    this.logo.scale.setTo(2);
    this.loadingBar = this.game.add.sprite(0, 590, 'preloader_bar');
    this.load.setPreloadSprite(this.loadingBar);

    this.load.onLoadComplete.add(this.loadComplete, this);

    // TODO: load here the assets for the game
  
  //------------------------------------------------------AUDIOS------------------------------------------
  //Menu
      this.game.load.audio('menuSound', ['./audios/Menu_music.wav', './audios/Menu_music.mp3', './audios/Menu_music.ogg']);
  
  //Death
      this.game.load.audio('deathSound', ['./audios/death.wav', './audios/death.mp3', './audios/death.ogg']);

  //Win
      this.game.load.audio('bellrings', ['./audios/win/Bellrings.wav', './audios/win/Bellrings.mp3', './audios/win/Bellrings.ogg']);
      this.game.load.audio('kidsScream', ['./audios/win/Kids_Scream.wav', './audios/win/Kids_Scream.mp3', './audios/win/Kids_Scream.ogg']);
    
  //Office
      //Phone Guy
      this.game.load.audio('call1', ['./audios/phoneGuy/Audio1.wav', './audios/phoneGuy/Audio1.mp3', './audios/phoneGuy/Audio1.ogg']);
      this.game.load.audio('call2', ['./audios/phoneGuy/Audio2.wav', './audios/phoneGuy/Audio2.mp3', './audios/phoneGuy/Audio2.ogg']);
      this.game.load.audio('call3', ['./audios/phoneGuy/Audio3.wav', './audios/phoneGuy/Audio3.mp3', './audios/phoneGuy/Audio3.ogg']);
      this.game.load.audio('call4', ['./audios/phoneGuy/Audio4.wav', './audios/phoneGuy/Audio4.mp3', './audios/phoneGuy/Audio4.ogg']);
      this.game.load.audio('call5', ['./audios/phoneGuy/Audio5.wav', './audios/phoneGuy/Audio5.mp3', './audios/phoneGuy/Audio5.ogg']);

      //Ambient
      this.game.load.audio('ambient1', ['./audios/ambient/Ambient1.wav', './audios/ambient/Ambient1.mp3', './audios/ambient/Ambient1.ogg']);
      this.game.load.audio('ambient2', ['./audios/ambient/Ambient2.wav', './audios/ambient/Ambient2.mp3', './audios/ambient/Ambient2.ogg']);
      this.game.load.audio('ambient3', ['./audios/ambient/Ambient3.wav', './audios/ambient/Ambient3.mp3', './audios/ambient/Ambient3.ogg']);
      this.game.load.audio('light_fan', ['./audios/ambient/Light_Fan.wav', './audios/ambient/Light_Fan.mp3', './audios/ambient/Light_Fan.ogg']);

  //Interactions
      this.game.load.audio('interactError', ['./audios/interactions/Error.wav', './audios/interactions/Error.mp3', './audios/interactions/Error.ogg']);

      //Doors
      this.game.load.audio('doorTurnOnOff', ['./audios/interactions/doors/Turn_on_off.wav', './audios/interactions/doors/Turn_on_off.mp3', './audios/interactions/doors/Turn_on_off.ogg']);

      //Lights
      this.game.load.audio('lightTurnOn', ['./audios/interactions/lights/Turn_on.wav', './audios/interactions/lights/Turn_on.mp3', './audios/interactions/lights/Turn_on.ogg']);
      this.game.load.audio('lightJumpscare', ['./audios/interactions/lights/Windowscare.wav', './audios/interactions/lights/Windowscare.mp3', './audios/interactions/lights/Windowscare.ogg']);

  //Monitor
      //Interact
      this.game.load.audio('monitorUp', ['./audios/monitor/Put_up.wav', './audios/monitor/Put_up.mp3', './audios/monitor/Put_up.ogg']);
      this.game.load.audio('monitorDown', ['./audios/monitor/Put_down.wav', './audios/monitor/Put_down.mp3', './audios/monitor/Put_down.ogg']);
      //Error
      this.game.load.audio('error1', ['./audios/monitor/error/Garble1.wav', './audios/monitor/error/Garble1.mp3', './audios/monitor/error/Garble1.ogg']);
      this.game.load.audio('error2', ['./audios/monitor/error/Garble2.wav', './audios/monitor/error/Garble2.mp3', './audios/monitor/error/Garble2.ogg']);
      this.game.load.audio('error3', ['./audios/monitor/error/Garble3.wav', './audios/monitor/error/Garble3.mp3', './audios/monitor/error/Garble3.ogg']);
      this.game.load.audio('error4', ['./audios/monitor/error/Garble4.wav', './audios/monitor/error/Garble4.mp3', './audios/monitor/error/Garble4.ogg']);
      //Buttons
      this.game.load.audio('changeCam', ['./audios/monitor/changeCam/change.wav', './audios/monitor/changeCam/change.mp3', './audios/monitor/changeCam/change.ogg']);
  
  //Battery
      this.game.load.audio('outBattery', ['./audios/battery/Power_down.wav', './audios/battery/Power_down.mp3', './audios/battery/Power_down.ogg']);
  
  //Kitchen
      this.game.load.audio('kitchen1', ['./audios/kitchen/kitchen1.wav', './audios/kitchen/kitchen1.mp3', './audios/kitchen/kitchen1.ogg']);
      this.game.load.audio('kitchen2', ['./audios/kitchen/kitchen2.wav', './audios/kitchen/kitchen2.mp3', './audios/kitchen/kitchen2.ogg']);
      this.game.load.audio('kitchen3', ['./audios/kitchen/kitchen3.wav', './audios/kitchen/kitchen3.mp3', './audios/kitchen/kitchen3.ogg']);
      this.game.load.audio('kitchen4', ['./audios/kitchen/kitchen4.wav', './audios/kitchen/kitchen4.mp3', './audios/kitchen/kitchen4.ogg']);

  //Animatronics
      this.game.load.audio('animAttack', ['./audios/animatronics/Scream.wav', './audios/animatronics/Scream.mp3', './audios/animatronics/Scream.ogg']);
      this.game.load.audio('deepSteps', ['./audios/animatronics/Deep_steps.wav', './audios/animatronics/Deep_steps.mp3', './audios/animatronics/Deep_steps.ogg']);

    //Freddy
      this.game.load.audio('freddySong', ['./audios/animatronics/freddy/power out/Music_box.wav', './audios/animatronics/freddy/power out/Music_box.mp3', './audios/animatronics/freddy/power out/Music_box.ogg']);
      this.game.load.audio('freddyEndSong', ['./audios/animatronics/freddy/power out/End_song.wav', './audios/animatronics/freddy/power out/End_song.mp3', './audios/animatronics/freddy/power out/End_song.ogg']);
      //Laugh
      this.game.load.audio('freddyLaugh1', ['./audios/animatronics/freddy/moves/laugh/Laugh_Giggle_Girl_1d.wav', './audios/animatronics/freddy/moves/laugh/Laugh_Giggle_Girl_1d.mp3', './audios/animatronics/freddy/moves/laugh/Laugh_Giggle_Girl_1d.ogg']);
      this.game.load.audio('freddyLaugh2', ['./audios/animatronics/freddy/moves/laugh/Laugh_Giggle_Girl_2d.wav', './audios/animatronics/freddy/moves/laugh/Laugh_Giggle_Girl_2d.mp3', './audios/animatronics/freddy/moves/laugh/Laugh_Giggle_Girl_2d.ogg']);
      this.game.load.audio('freddyLaugh3', ['./audios/animatronics/freddy/moves/laugh/Laugh_Giggle_Girl_8d.wav', './audios/animatronics/freddy/moves/laugh/Laugh_Giggle_Girl_8d.mp3', './audios/animatronics/freddy/moves/laugh/Laugh_Giggle_Girl_8d.ogg']);
      //Footsteps
      this.game.load.audio('freddyInOffice', ['./audios/animatronics/freddy/moves/footsteps/Running_fast.wav', './audios/animatronics/freddy/moves/footsteps/Running_fast.mp3', './audios/animatronics/freddy/moves/footsteps/Running_fast.ogg']);

    //Foxy
      this.game.load.audio('foxyKnock', ['./audios/animatronics/foxy/attack/Knock2.wav', './audios/animatronics/foxy/attack/Knock2.mp3', './audios/animatronics/foxy/attack/Knock2.ogg']);
      this.game.load.audio('foxyRun', ['./audios/animatronics/foxy/attack/Run.wav', './audios/animatronics/foxy/attack/Run.mp3', './audios/animatronics/foxy/attack/Run.ogg']);
      this.game.load.audio('foxySong', ['./audios/animatronics/foxy/pirateCove/Pirate_song2.wav', './audios/animatronics/foxy/pirateCove/Pirate_song2.mp3', './audios/animatronics/foxy/pirateCove/Pirate_song2.ogg']);

  //----------------------------------------------IMAGES AND SPRITESHEETS---------------------------------  
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
    this.game.load.spritesheet('screamerBonnie', './images/animatronics/screamerBonnie.png', 800, 600, 6);
    this.game.load.image('bonnieAttack', './images/animatronics/BonnieAttack.png');
    this.game.load.spritesheet('chica','./images/animatronics/Chica.png', 33, 66, 3);
    this.game.load.spritesheet('screamerChica', './images/animatronics/screamerChica.png', 800, 600, 6);
    this.game.load.image('chicaAttack', './images/animatronics/ChicaAttack.png');
    this.game.load.spritesheet('freddy','./images/animatronics/Freddy.png', 33, 66, 3);
    this.game.load.spritesheet('darkFreddy','./images/animatronics/FreddyDark.png', 33, 66, 2);
    this.game.load.spritesheet('screamerFreddy', './images/animatronics/screamerFreddy.png', 800, 598, 6);
    this.game.load.spritesheet('freddyAttack', './images/animatronics/FreddyAttack.png', 198, 198, 2);
    this.game.load.image('foxy','./images/animatronics/Foxy.png');
    this.game.load.spritesheet('foxyRun','./images/animatronics/FoxyRun.png', 33, 66, 2);
    this.game.load.spritesheet('screamerFoxy', './images/animatronics/screamerFoxy.png', 800, 600, 6);

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
    this.game.load.image('rightLight', './images/items/rightLight.png');
    this.game.load.spritesheet('battery', './images/items/battery.png', 143, 66, 4);
    this.game.load.spritesheet('muteCall', './images/items/MuteCall.png', 198, 66, 2);
    this.game.load.spritesheet('startButton', './images/startButton.png', 150, 70, 2);

    //Effects
    this.game.load.spritesheet('staticEffect', './images/effect/static.png', 800, 600, 5);
    this.game.load.image('officeEffect', './images/effect/borde.png');
    this.game.load.image('darkness', './images/effect/fondoOficina.png');

    //Text
    this.game.load.image('REC', './images/texts/REC.png');
    this.game.load.spritesheet('camerasTexts', './images/texts/camerasNames.png', 364, 66, 11);
    this.game.load.spritesheet('manyTexts', './images/texts/manyTexts.png', 264, 66, 5);
    this.game.load.spritesheet('numbers', './images/texts/numbers.png', 33, 66, 10);
    this.game.load.image('titleText', './images/texts/Title.png');
    this.game.load.spritesheet('newGameText', './images/texts/NewGame.png', 276, 66, 2);
    this.game.load.spritesheet('continueText', './images/texts/Continue.png', 272, 66, 2);
    this.game.load.image('gameOverText', './images/texts/GameOver.png');
    this.game.load.image('freddyMenu', './images/animatronics/FreddyMenu.png');
    this.game.load.spritesheet('win', './images/texts/WIN.png', 450, 186, 7);
    this.game.load.image('end', './images/texts/END.png');
    this.game.load.image('1Night', './images/texts/1Night.png');
    this.game.load.image('2Night', './images/texts/2Night.png');
    this.game.load.image('3Night', './images/texts/3Night.png');
    this.game.load.image('4Night', './images/texts/4Night.png');
    this.game.load.image('5Night', './images/texts/5Night.png');
    this.game.load.image('6Night', './images/texts/6Night.png');
    this.game.load.image('Newspaper', './images/texts/Newspaper.png');
  },

  loadComplete: function () 
  {
    this.loadingBar.visible = false;
    var button = this.game.add.button(400 - 59.5, 500, 'startButton', function () { this.game.state.start('menu'); }, this, 1, 0, 1);
    button.alpha = 0.5;
    button.scale.setTo(0.7);
  }
};


window.onload = function () 
{
  var game = new Phaser.Game(792, 594, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('menu', MenuScene);
  game.state.add('game', GameScene);
  game.state.add('death', DeathScene);
  game.state.add('win', WinScene);


  game.state.start('boot');
};
},{"./const.js":10,"./scenes/deathScene.js":16,"./scenes/gameScene.js":17,"./scenes/menuScene.js":18,"./scenes/winScene.js":19}],15:[function(require,module,exports){
'use strict';

var Const = require('./const.js');

//meter phoneGuy
function Night(game, spriteDec, spriteU, numberNight)
{
    this.var = new Const();
    this.game = game;
    
    //Control del paso de hora y noches
    if(!localStorage.getItem('numNight'))
        this._night = 1;
    else
        this._night = JSON.parse(localStorage.getItem('numNight'));

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
    this.spriteNight.frame = this._night;

    this.spriteU.scale.setTo(this.var._spriteNightNumScale, this.var._spriteNightNumScale);
    this.spriteDec.scale.setTo(this.var._spriteNightNumScale, this.var._spriteNightNumScale);
    this.spriteNight.scale.setTo(this.var._spriteNightScale,this.var._spriteNightScale);
}
Night.prototype.reset = function(doorR, doorL, lightR, lightL, battery)
{
    doorR.reset();
    doorL.reset();
    lightR.reset();
    lightL.reset();
    battery.reset();
}
Night.prototype.getNight = function() 
{
    return this._night;
}
Night.prototype.startNight = function()
{
    //animacion hora al terminar
}
Night.prototype.finishNight = function()
{
    if(this._night <= 6)
    {
        this._night++;
        localStorage.setItem("numNight", JSON.stringify(this._night));
    }       
        this.game.state.start('win');
}
Night.prototype.changeHour = function(battery)
{
    this.spriteDec.alpha = 0;
    this._hour++;
    this.spriteU.frame = this._hourArr[this._hour];

    if(this._hour == 6)
    {
        this.finishNight();
    }
}
module.exports = Night;
},{"./const.js":10}],16:[function(require,module,exports){
'use strict';
var Const = require ('../const.js');

var DeathScene =
{
    preload: function()
    {
        this.var = new Const();
        this.game.sound.stopAll();
    },

    create: function()
    {
        //---------------------------------------------------SOUND--------------------------------------------------------
        var sound = this.game.add.audio('deathSound');
        sound.play();
        
        //-------------------------------------------------FREDDY IMAGE---------------------------------------------------
        var freddy = this.game.add.sprite(this.var._freddyPosX, this.var._freddyPosY, 'freddyMenu');
        
        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;

        //----------------------------------------------------GAME OVER TEXT-----------------------------------------------
        this.game.time.events.add(2000, function ()
        { 
            this.game.add.sprite(this.var._gOTextPosX, this.var._gOTextPosY, 'gameOverText'); 
        }, this);

        //---------------------------------------------------RETURN MENU-----------------------------------------------------
        this.game.time.events.add(10000, function()
        { 
            this.game.state.start('menu'); 
        }, this);
    }
    
};

module.exports = DeathScene;
},{"../const.js":10}],17:[function(require,module,exports){
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
},{"../Battery.js":1,"../InsideMonitor.js":2,"../animatronics/bonnie.js":4,"../animatronics/chica.js":6,"../animatronics/foxy.js":7,"../animatronics/freddy.js":8,"../const.js":10,"../interactions/door.js":12,"../interactions/light.js":13,"../nights.js":15}],18:[function(require,module,exports){
'use strict';
var Const = require ('../const.js');

var Menu =
{
    preload: function()
    {
        this.var = new Const();
        this.game.sound.stopAll();
    },

    create: function()
    {
        //---------------------------------------------------SOUND--------------------------------------------------------
        var song = this.game.add.audio('menuSound');
        song.loop = true;
        song.play();
        
        var click = this.game.add.audio('freddyEndSong');
        
        //---------------------------------------------------TITLE--------------------------------------------------------
        var title = this.game.add.sprite(this.var._titlePosX, this.var._titlePosY, 'titleText');

        //-------------------------------------------------FREDDY IMAGE---------------------------------------------------
        var freddy = this.game.add.sprite(this.var._freddyPosX, this.var._freddyPosY, 'freddyMenu');

        //---------------------------------------------------IMAGES--------------------------------------------------------
        this.getJob = this.game.add.sprite(0, 0, 'Newspaper');
        this.getJob.alpha = 0;
        this.introNight = [this.game.add.sprite(0, 0, '1Night'),
                            this.game.add.sprite(0, 0, '2Night'),
                            this.game.add.sprite(0, 0, '3Night'),
                            this.game.add.sprite(0, 0, '4Night'),
                            this.game.add.sprite(0, 0, '5Night'),
                            this.game.add.sprite(0, 0, '6Night')]
        this.introNight[0].alpha = 0;
        this.introNight[1].alpha = 0;
        this.introNight[2].alpha = 0;
        this.introNight[3].alpha = 0;
        this.introNight[4].alpha = 0;
        this.introNight[5].alpha = 0;

        //---------------------------------------------------NEW GAME-----------------------------------------------------
        var buttonNewGame = this.game.add.button(this.var._nGPosX, this.var._nGPosY, 'newGameText', function ()
        { 
            click.play();
            localStorage.removeItem('numNight');
            this.game.time.events.add(500, function()
            {
                buttonNewGame.alpha = 0;
                buttonNewGame.inputEnabled = false;
                buttonContinue.alpha = 0;
                buttonContinue.inputEnabled = false;

                this.staticEffect.alpha = 0;
                this.game.sound.stopAll();
                this.getJob.alpha = 1;

                this.game.time.events.add(5000, function()
                {
                    this.introNight[0].alpha = 1;
                    this.game.time.events.add(3000, function()
                    {
                        this.game.state.start('game');
                    }, this);
                }, this);
            }, this);
        }, this, 1, 0, 1);

        //---------------------------------------------------CONTINUE-----------------------------------------------------
        var buttonContinue = this.game.add.button(this.var._contPosX, this.var._contPosY, 'continueText', function ()
        { 
            click.play();
            this.game.time.events.add(500, function()
            {
                buttonNewGame.alpha = 0;
                buttonNewGame.inputEnabled = false;
                buttonContinue.alpha = 0;
                buttonContinue.inputEnabled = false;

                this.staticEffect.alpha = 0;
                this.game.sound.stopAll();

                this._night = JSON.parse(localStorage.getItem('numNight'));
                if(this._night == 7)
                {
                    localStorage.setItem("numNight", JSON.stringify(6));
                    this.introNight[5].alpha = 1;
                }
                else if (this._night == null)
                    this.introNight[0].alpha = 1;
                else
                    this.introNight[this._night - 1].alpha = 1;

                this.game.time.events.add(3000, function()
                {
                    this.game.state.start('game');
                }, this);
            }, this);
        }, this, 1, 0, 1);

        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;
    }
    
};

module.exports = Menu;
},{"../const.js":10}],19:[function(require,module,exports){
'use strict';
var Const = require ('../const.js');

var WinScene =
{
    preload: function()
    {
        this.var = new Const();
        this.game.sound.stopAll();
    },

    create: function()
    {
        //---------------------------------------------------SOUND--------------------------------------------------------
        var bellrings = this.game.add.audio('bellrings');
        var kidsScream = this.game.add.audio('kidsScream');
        
        //--------------------------------------------------HORA-----------------------------------------------
        this.hourText = this.game.add.sprite(this.var._winTextX, this.var._winTextY, 'win');
        this.hourText.scale.setTo(0.5,0.5);
        this.hourText.animations.add('6am');

        bellrings.play();
        this.hourText.animations.play('6am', 0.9, false);

        //---------------------------------------------------IMAGES--------------------------------------------------------
        this.introNight = [this.game.add.sprite(0, 0, '2Night'),
                            this.game.add.sprite(0, 0, '3Night'),
                            this.game.add.sprite(0, 0, '4Night'),
                            this.game.add.sprite(0, 0, '5Night'),
                            this.game.add.sprite(0, 0, '6Night')]
        this.introNight[0].alpha = 0;
        this.introNight[1].alpha = 0;
        this.introNight[2].alpha = 0;
        this.introNight[3].alpha = 0;
        this.introNight[4].alpha = 0;

        //---------------------------------------------------CHANGE SCENE-----------------------------------------------------
        this.game.time.events.add(9000, function()
        {
            kidsScream.play();
            this.game.time.events.add(7000, function()
            {
                this._night = JSON.parse(localStorage.getItem('numNight'));
                if(this._night == 7)
                {
                    this.winText = this.game.add.sprite(this.var._winTalX, this.var._winTalY, 'end');

                    this.game.time.events.add(7000, function()
                    {
                          this.game.state.start('menu');
                    },this);
                }
                else
                {
                    this.game.sound.stopAll();
                    this.introNight[this._night - 2].alpha = 1;
                    this.game.time.events.add(3000, function()
                    {
                        this.game.state.start('game');
                    }, this);
                }
            }, this);
        },this);
    }
    
};

module.exports = WinScene;
},{"../const.js":10}]},{},[14]);
