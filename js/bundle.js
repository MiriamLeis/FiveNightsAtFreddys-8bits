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
},{"./const.js":8}],2:[function(require,module,exports){
'use strict';

var Const = require('./const.js');

function InsideMonitor (game, Rooms, camerasTexts)
{
    this.var = new Const();
    
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
},{"./const.js":8}],3:[function(require,module,exports){

//--------------------Clase Animatronicos
function Animatronics(sprite, night, path, hours, actTime, Var)
{
    this.var = Var;
    //Phaser.Sprite.apply(this,game,sprite)
    //this.add.child(....) // buscarlo que no es así (puede que no queráis eso)

    this._sprite = sprite;
    this._sprite.scale.setTo(this.var._spriteAnimScale, this.var._spriteAnimScale);
    this._sprite.frame = 2;

    this._path = path; //Array de functions
    this._pos = this._path[0];
    this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;

    this._hours = hours;
    this._hoursIni = this._hours[night];//Array de noches con las horas de inicio

    this._actTime = actTime; //Array de noches con los parametros de actIni y actFin
    this._actualActTime = actTime[night];
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
    this._screamer.scale.setTo(this.var._screamerScale, this.var._screamerScale);
    this._screamer.alpha = 0;
    this._screamer.fixedToCamera = true;
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
    this._screamer.alpha = n;
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
    staticEffect.alpha = 1;
    game.time.events.add(3000, function()
    {
        if (game.camera.x < this.var._showStagePosX)
            staticEffect.alpha = 0;
        else
            staticEffect.alpha = 0.1;
    }, this)
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
},{}],4:[function(require,module,exports){
var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Bonnie-------------------------//
function Bonnie(sprite, night)
{
    this.var = new Const();
    BonnieChica.apply(this,[sprite, night,
                        //ruta
                        [new Room (this.var._bonnieRoom1X, this.var._bonnieRoom1Y, this.var._showStagePosX, this.var._showStagePosY, 'showStage', 1, null, null), 
                        new Room (this.var._bonnieRoom2X, this.var._bonnieRoom2Y, this.var._dinningRoomPosX, this.var._dinningRoomPosY, 'diningRoom', 2, 3, null), 
                        new Room (this.var._bonnieRoom3X, this.var._bonnieRoom3Y, this.var._backstagePosX, this.var._backstagePosY, 'backStage', 1, null, null), 
                        new Room (this.var._bonnieRoom4X, this.var._bonnieRoom4Y, this.var._westHallPosX, this.var._westHallPosY, 'westHall', 1, 4, 5),
                        new Room (this.var._bonnieRoom5X, this.var._bonnieRoom5Y, this.var._supplyClosetPosX, this.var._supplyClosetPosY, 'supplyCloset', 3, 5, null), 
                        new Room (this.var._bonnieRoom6X, this.var._bonnieRoom6Y, this.var._wHallCornerPosX, this.var._wHallCornerPosY, 'wHallCorner', 3, 4, null, true)],
                        //rango de horas de activacion
                        [{min: 2, max: 2}, {min: 0, max: 1}, {min: 1, max: 2}, {min: 0, max: 1}, {min: 0, max: 1}, {min: 0, max: 0}],
                        //rango de segundos de movimiento
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}], this.var]);
}
Bonnie.prototype = Object.create(BonnieChica.prototype);
Bonnie.prototype.constructor = Bonnie;

module.exports = Bonnie;
},{"../const.js":8,"./bonnieChica.js":5,"./room.js":7}],5:[function(require,module,exports){
//--------------------Clase Animatronicos
var Animatronics = require('./Animatronics.js'); 
 

//----------------BonnieChica
function BonnieChica(sprite, night, path, hour, actTime, Var)
{
    Animatronics.apply(this,[sprite, night, path, hour, actTime, Var]);
    this.dinningRoom = false;
    this.inOffice = false;
    this.attacking = false;
    this.var = Var;
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
BonnieChica.prototype.move = function(game, otherAnimatronic, staticEffect, door, light)
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
                        {
                            console.log("soy chica");
                            this.attack(game, door, light);    
                        }
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
                        {
                            console.log("soy bonnie");
                            this.attack(game ,door, light);
                        }
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
                //Controlar que el efecto de static effect aparezca cuando miras donde estan o donde se van a mover
                if (this._antPos != this._pos)
                    if ((game.camera.x == this._pos._posCam.x && game.camera.y == this._pos._posCam.y) || (game.camera.x == this._antPos._posCam.x && game.camera.y == this._antPos._posCam.y)) //HACER SI ESTA EN MONITOR
                        this.moveEffect(game, staticEffect);

                this._sprite.x = this._pos._x;    this._sprite.y = this._pos._y;

                if(!this.inOffice)
                this.move(game, otherAnimatronic, staticEffect, door, light);
            }
        }, this);
    }else{console.log("sigo intentando moverme XD")}

}

BonnieChica.prototype.isInOffice = function()
{
    return this.inOffice;
}
BonnieChica.prototype.isAttacking = function()
{
    return this.attacking;
}

BonnieChica.prototype.attack = function(game, door, light)
{
    if(!this.inOffice)
    {
        this.alphaSprite(0);
        this.attacking = true;
        console.log("Tas Muerto Crack");
        var timeToMove = Math.floor(((Math.random() * (this._actualActTime.max - this._actualActTime.min)) + this._actualActTime.min) * 1000);//Cambiar por tiempos de ataque

        game.time.events.add(timeToMove, function()
        {
            console.log('po ia e iejado');
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
                else if(this._pos._number == 3)
                {
                    console.log("Pue adioh");
                    this._pos = this._path[this._pos._room2];
                    this.alphaSprite(1);
                }
                else
                {
                    console.log("Pue adioh");
                    this._pos = this._path[this._pos._room1];
                    this.alphaSprite(1);
                }
                this.attacking = false;
            }
        }, this);
    }else{console.log("sigo intentando moverme XD")}

}

module.exports = BonnieChica;
},{"./Animatronics.js":3}],6:[function(require,module,exports){
var Room = require('./room.js'); 
var BonnieChica = require('./bonnieChica.js'); 
var Const = require('../const.js');

//---------------------Chica-------------------------//
function Chica(sprite, night)
{
    this.var = new Const();
    BonnieChica.apply(this,[sprite, night,
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
                        [{min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}, {min: 5, max: 10}], this.var]);
}
Chica.prototype = Object.create(BonnieChica.prototype);
Chica.prototype.constructor = Chica;

module.exports = Chica;
},{"../const.js":8,"./bonnieChica.js":5,"./room.js":7}],7:[function(require,module,exports){

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
},{}],8:[function(require,module,exports){

function Const()
{
    //=====================================================MENUSCENE=============================================
    this._titlePosX = 50; 
    this._titlePosY = 50;

    this._nGPosX = 50; 
    this._nGPosY = 600 - 250;

    //=====================================================GAMESCENE=============================================
    this._tamX = 792;
    this._tamY = 594;

    this._iniCamPos = 396;
    this._timeForHour = 90000;

    this._timeForReset = 2000;

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
    this._edgeDerPosX = this._tamX - 45;
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

    this._cam6PosX = -21.2;
    this._cam6PosY = -15.5;

    this._cam7PosX = -21.8;
    this._cam7PosY = -12.85;

    //=====================================================================NIGHT=========================================

    this._spriteNightNumScale = 0.8;
    this._spriteNightScale = 0.55;

    //============================================================ANIMATRONICS=============================================

    this._spriteAnimScale = 1.5;

    //Screamers
    this._screamerPosX = this._tamX/2 - 160;
    this._screamerPosY = 0;   
    this._screamerScale = 2.5;

    //===========================================================BONNIE/CHICA===============================================

    this._2roomsPercentage1 = 40;

    this._3roomsPercentage1 = 50;
    this._3roomsPercentage2 = 25;

    //=====================================================BONNIE===========================================

    this._bonnieRoom1X = (792 * 2) + 300;
    this._bonnieRoom1Y = 240;

    this._bonnieRoom2X = (792 * 3) + 375;
    this._bonnieRoom2Y = 340;

    this._bonnieRoom3X = (792 * 4) + 450;
    this._bonnieRoom3Y = 310;

    this._bonnieRoom4X = (792 * 10) + 375;
    this._bonnieRoom4Y = 330;

    this._bonnieRoom5X = (792 * 8) + 365;
    this._bonnieRoom5Y = 280;

    this._bonnieRoom6X = (792 * 11) + 375;
    this._bonnieRoom6Y = 280;

    //Attack
    this._spriteBonnieAttackPosX = 34;
    this._spriteBonnieAttackPosY = 132;

    //======================================================CHICA=============================================

    this._chicaRoom1X = (792 * 2) + 450;
    this._chicaRoom1Y = 240;

    this._chicaRoom2X = (792 * 3) + 375;
    this._chicaRoom2Y = 340;

    this._chicaRoom3X = (792 * 5) + 400;
    this._chicaRoom3Y = 200;

    this._chicaRoom4X = (792 * 6) + 375;
    this._chicaRoom4Y = 594 + 66;

    this._chicaRoom5X = (792 * 7) + 365;
    this._chicaRoom5Y = 280;

    this._chicaRoom6X = (792 * 9) + 350;
    this._chicaRoom6Y = 300;

    //Attack
    this._spriteChicaAttackPosX = this._tamX * 2 - 144;
    this._spriteChicaAttackPosY = 176;

};


module.exports = Const;
},{}],9:[function(require,module,exports){
'use strict';

function Interact () 
{
    this._active = false;
};
Interact.prototype.resetInteract = function(){ this._active = false; }
Interact.prototype.getActive = function(){ return this._active; }
Interact.prototype.changeActive = function(){ this._active = !this._active; }

module.exports = Interact;
},{}],10:[function(require,module,exports){
'use strict';

var Interact = require('./Interactions.js');

function Door(game, posXButton, posYButton, posXDoor, posYDoor)
{
    Interact.apply(this);
    
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
    this.resetInteract();
    this.button.frame = 0;
    this.doorCloseAnim.frame = 0;
}
Door.prototype.actionOnClick = function() 
{
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
Door.prototype.enabledInput = function(b)
{
    this.button.inputEnabled = b;
}

module.exports = Door;
},{"./Interactions.js":9}],11:[function(require,module,exports){
'use strict';

var Interact = require('./Interactions.js');
var Const = require('../const.js');

function Light(game, posXButton, posYButton, sprite, animSprite, anim)
{
    this.var = new Const();
    Interact.apply(this);

    this.light = sprite;
    this.light.visible = false;

    this.button = game.add.button(posXButton, posYButton, 'buttonLight', function(){ this.turnOff() }, this);

    this.animSprite = animSprite;
    this.animSprite.alpha = 0;

    this.anim = anim;
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
    this.changeActive();
    if(this._active)
    {
        this.button.frame = 1;
        this.light.visible = true;
        
        if(this.anim.isAttacking())
            this.animSprite.alpha = 1;
    }
    else
    {
        this.button.frame = 0;
        this.light.visible = false;
        this.animSprite.alpha = 0;
    }
}
Light.prototype.enabledInput = function(b)
{
    this.button.inputEnabled = b;
}
module.exports = Light;

},{"../const.js":8,"./Interactions.js":9}],12:[function(require,module,exports){
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
    this.game.load.image('bonnieAttack', './images/animatronics/BonnieAttack.png');
    this.game.load.spritesheet('chica','./images/animatronics/Chica.png', 33, 66, 3);
    this.game.load.image('screamerChica', './images/animatronics/screamerChica.png');
    this.game.load.image('chicaAttack', './images/animatronics/ChicaAttack.png');
    this.game.load.spritesheet('freddy','./images/animatronics/Freddy.png', 33, 66, 3);
    this.game.load.spritesheet('darkFreddy','./images/animatronics/FreddyDark.png', 33, 66, 2);
    this.game.load.image('screamerFreddy', './images/animatronics/screamerFreddy.png');
    this.game.load.spritesheet('freddyAttack', './images/animatronics/FreddyAttack.png', 33, 33, 2);
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
    this.game.load.image('titleText', './images/texts/Title.png');
    this.game.load.spritesheet('newGameText', './images/texts/NewGame.png', 276, 66, 2);
  },

  create: function () 
  {
    this.game.state.start('menu');
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
},{"./const.js":8,"./scenes/deathScene.js":14,"./scenes/gameScene.js":15,"./scenes/menuScene.js":16,"./scenes/winScene.js":17}],13:[function(require,module,exports){
'use strict';

var Const = require('./const.js');
//meter phoneGuy
function Night(game, spriteDec, spriteU, numberNight)
{
    this.var = new Const();
    this.game = game;
    //Control del paso de hora y noches
    if(!localStorage.getItem('numNight'))
    {
        console.log("no sa guardao")

        this._night = 1;
    }
    else
    {
        console.log("sa guardao")

        this._night = JSON.parse(localStorage.getItem('numNight'));
    }
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
Night.prototype.getNight = function() {return this._night;}

Night.prototype.startNight = function()
{
    //animacion hora al terminar
}

Night.prototype.finishNight = function()
{
    this._night++;
    localStorage.setItem("numNight", JSON.stringify(this._night));
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
},{"./const.js":8}],14:[function(require,module,exports){
'use strict';
var Const = require ('../const.js');

var DeathScene =
{
    preload: function()
    {
        this.var = new Const();
    },

    create: function()
    {
        

        //---------------------------------------------------TITLE--------------------------------------------------------
        //Cambiar imagenes
        //this.title = this.game.add.sprite(this.var._titlePosX, this.var._titlePosY, 'titleText');

        //---------------------------------------------------NEW GAME-----------------------------------------------------
        //Cambiar imagenes
        var buttonNewGame = this.game.add.button(this.var._nGPosX, this.var._nGPosY, 'newGameText', function (){ this.game.state.start('game'); }, this, 1, 0, 1);

        //---------------------------------------------------CONTINUE-----------------------------------------------------

        //-------------------------------------------------FREDDY IMAGE---------------------------------------------------


        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;
    }
    
};

module.exports = DeathScene;
},{"../const.js":8}],15:[function(require,module,exports){
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

        //Bonnie
        this.bonnie = new Bonnie(this.game.add.sprite(0, 0, 'bonnie'), 0);
         
        //Chica
        this.chica = new Chica(this.game.add.sprite(0, 0, 'chica'), 0);

        //Draw animatronics
        this.freddy = this.game.add.sprite(Rooms.cameraPositions.ShowStage.x + 390, 280, 'freddy');
        this.freddy.scale.setTo(1.5, 1.5);

        //===================================================OFFICE 2.0=================================================================

        //Lights
        this.lightLeft = new Light(this.game, this.var._lightButtonIzqPosX, this.var._lightButtonIzqPosY, this.game.add.sprite(this.var._lightIzqPosX, this.var._lightIzqPosY, 'leftLight'), this.game.add.sprite(this.var._spriteBonnieAttackPosX, this.var._spriteBonnieAttackPosY, 'bonnieAttack'), this.bonnie);
        this.lightRight = new Light(this.game, this.var._lightButtonDerPosX, this.var._lightButtonDerPosY, this.game.add.sprite(this.var._lightDerPosX, this.var._lightDerPosY, 'rightLight'), this.game.add.sprite(this.var._spriteChicaAttackPosX, this.var._spriteChicaAttackPosY, 'chicaAttack'), this.chica);
        //Doors
        this.doorLeft = new Door(this.game, this.var._doorButtonIzqPosX, this.var._doorButtonIzqPosY, this.var._doorIzqPosX, this.var._doorIzqPosY);
        this.doorRight = new Door(this.game, this.var._doorButtonDerPosX, this.var._doorButtonDerPosY, this.var._doorDerPosX, this.var._doorDerPosY);

        //===================================================SCREAMERS=================================================================

        //Bonnie
        this.bonnie.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosY, 'screamerBonnie'));
        //Chica
        this.chica.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosY, 'screamerChica'));

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
        this.battery = new Battery(this.game, this.game.add.sprite(this.var._batterytPosX, this.var._batterytPosY, 'battery'),
                                    this.game.add.sprite(this.powerLeftText.width + this.var._batteryNumber1PosX, this.var._batteryNumber1PosY, 'numbers'),
                                    this.game.add.sprite(this.powerLeftText.width + this.var._batteryNumber2PosX, this.var._batteryNumber2PosY, 'numbers'),
                                    this.game.add.sprite(this.powerLeftText.width + this.var._batteryNumber3PosX, this.var._batteryNumber3PosY, 'numbers'));
        this.usageText = this.game.add.sprite(this.var._usageTextPosX, this.var._usageTextPosY, 'manyTexts')
        this.usageText.scale.setTo(this.var._usageTextScale, this.var._usageTextScale);

        this.usageText.fixedToCamera = true;

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
                    this.bonnie.alphaScreamer(1);
                    this.changeView.alpha = 0;
                    this.changeView.inputEnabled = false;

                    this.game.time.events.add(this.var._timeForReset, function()
                    {
                        this.game.state.start('death');
                        //------------------DESTRUIR
                        /*this.bonnie.alphaScreamer(0);
                        delete this.bonnie;
                        delete this.chica;
                        //------------------Resetear objetos
                        this.night.reset(this.doorRight, this.doorLeft, this.lightRight, this.lightLeft, this.battery);
                        this.monitor.reset(Rooms);
                        //Bonnie
                        this.bonnie = new Bonnie(this.game.add.sprite(0, 0, 'bonnie'), this.night.getNight() - 1);
                        this.bonnie.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosY, 'screamerBonnie'));
                        //Chica
                        this.chica = new Chica(this.game.add.sprite(0, 0, 'chica'), this.night.getNight() - 1);
                        this.chica.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosY, 'screamerChica'));

                        //-----------------Resetear variables
                        this.changeView.alpha = this.var._changeViewAlpha;
                        this.changeView.inputEnabled = true;
                        this.moveRight.inputEnabled = true;
                        this.moveLeft.inputEnabled = true;
                        this.game.camera.x = this.var._iniCamPos;

                        //------------------Mover animatronicos de nuevo
                        this.bonnie.move(this.game, this.chica, this.staticEffect,this.doorLeft, this.lightLeft);
                        this.chica.move(this.game, this.bonnie, this.staticEffect,this.doorRight, this.lightRight);*/

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
                        //------------------DESTRUIR
                        /*this.chica.alphaScreamer(0);
                        delete this.bonnie;
                        delete this.chica;
                        //------------------Resetear objetos
                        this.night.reset(this.doorRight, this.doorLeft, this.lightRight, this.lightLeft, this.battery);
                        this.monitor.reset(Rooms);
                        //Bonnie
                        this.bonnie = new Bonnie(this.game.add.sprite(0, 0, 'bonnie'), this.night.getNight() - 1);
                        this.bonnie.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosY, 'screamerBonnie'));
                        //Chica
                        this.chica = new Chica(this.game.add.sprite(0, 0, 'chica'), this.night.getNight() - 1);
                        this.chica.createScreamer(this.game.add.sprite(this.var._screamerPosX , this.var._screamerPosY, 'screamerChica'));

                        //-----------------Resetear variables
                        this.changeView.alpha = this.var._changeViewAlpha;
                        this.changeView.inputEnabled = true;
                        this.moveRight.inputEnabled = true;
                        this.moveLeft.inputEnabled = true;
                        this.game.camera.x = this.var._iniCamPos;

                        //------------------Mover animatronicos de nuevo
                        this.bonnie.move(this.game, this.chica, this.staticEffect,this.doorLeft, this.lightLeft);
                        this.chica.move(this.game, this.bonnie, this.staticEffect,this.doorRight, this.lightRight);*/

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
            this.realTimeToChange = this.var._timeForHour + this.game.time.now;
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
},{"../Battery.js":1,"../InsideMonitor.js":2,"../animatronics/bonnie.js":4,"../animatronics/chica.js":6,"../const.js":8,"../interactions/door.js":10,"../interactions/light.js":11,"../nights.js":13}],16:[function(require,module,exports){
'use strict';
var Const = require ('../const.js');

var Menu =
{
    preload: function()
    {
        this.var = new Const();
    },

    create: function()
    {
        

        //---------------------------------------------------TITLE--------------------------------------------------------
        this.title = this.game.add.sprite(this.var._titlePosX, this.var._titlePosY, 'titleText');

        //---------------------------------------------------NEW GAME-----------------------------------------------------
        var buttonNewGame = this.game.add.button(this.var._nGPosX, this.var._nGPosY, 'newGameText', function (){ localStorage.removeItem('numNight'); this.game.state.start('game'); }, this, 1, 0, 1);
        //Cambiar sprite
        var buttonContinue = this.game.add.button(this.var._nGPosX, this.var._nGPosY +100, 'newGameText', function (){ this.game.state.start('game'); }, this, 1, 0, 1);

        //---------------------------------------------------CONTINUE-----------------------------------------------------

        //-------------------------------------------------FREDDY IMAGE---------------------------------------------------


        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;
    }
    
};

module.exports = Menu;
},{"../const.js":8}],17:[function(require,module,exports){
'use strict';
var Const = require ('../const.js');

var WinScene =
{
    preload: function()
    {
        this.var = new Const();
    },

    create: function()
    {
        

        //---------------------------------------------------TITLE--------------------------------------------------------
        //Cambiar imagenes
        //this.title = this.game.add.sprite(this.var._titlePosX, this.var._titlePosY, 'titleText');

        //---------------------------------------------------NEW GAME-----------------------------------------------------
        //Cambiar imagenes
        var buttonNewGame = this.game.add.button(this.var._nGPosX, this.var._nGPosY, 'newGameText', function (){ this.game.state.start('game'); }, this, 1, 0, 1);
        //---------------------------------------------------CONTINUE-----------------------------------------------------

        //-------------------------------------------------FREDDY IMAGE---------------------------------------------------


        //----------------------------------------------------STATIC EFFECT-----------------------------------------------
        this.staticEffect = this.game.add.sprite(0, 0, 'staticEffect');
        this.staticEffect.animations.add('startEffect');
        this.staticEffect.animations.play('startEffect', 5, true);
        this.staticEffect.alpha = 0.4;
    }
    
};

module.exports = WinScene;
},{"../const.js":8}]},{},[12]);
