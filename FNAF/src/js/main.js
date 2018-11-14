'use strict';

var PlayScene = require('./play_scene.js');
var MenuScene = require('./menuScene.js');
var CameraScene = require('./cameraScene.js');
var OfficeScene = require('./officeScene.js');


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
    this.game.load.image('eHallCorner','./images/rooms/E.Hall Corner.png');
    this.game.load.image('eastHall','./images/rooms/East Hall.png');
    this.game.load.image('restrooms','./images/rooms/Restrooms.png');
    this.game.load.image('pirateCov1', './images/rooms/PirateCove.png');
    this.game.load.image('pirateCov2', './images/rooms/PirateCove2.png');
    this.game.load.image('pirateCov3', './images/rooms/PirateCove3.png');
    this.game.load.image('office', './images/rooms/Office.png');

    //Animatronics
    this.game.load.spritesheet('bonnie','./images/Bonnie.png', 33, 66, 2);
    this.game.load.spritesheet('chica','./images/Chica.png', 33, 66, 2);
    this.game.load.spritesheet('freddy','./images/Freddy.png', 33, 66, 2);
    this.game.load.spritesheet('darkFreddy','./images/FreddyDark.png', 33, 66, 2);
    this.game.load.image('foxy','./images/Foxy.png');
    this.game.load.spritesheet('foxyRun','./images/FoxyRun.png', 33, 66, 2);

    //Screamers

    //Objects
    this.game.load.spritesheet('buttonsCameras', './images/items/buttonsCameras.png', 33, 33, 22);
    this.game.load.spritesheet('buttonLight', './images/items/buttonLight.png', 66, 33, 2);
    this.game.load.spritesheet('buttonDoor', './images/items/buttonDoor.png', 66, 33, 2);
    this.game.load.spritesheet('doorClose', './images/items/doorClose.png', 264, 462, 3)
    this.game.load.spritesheet('doorOpen', './images/items/doorOpen.png', 264, 462, 3)
    this.game.load.image('camerasMap', './images/items/camerasMap.png');
    this.game.load.image('edge', './images/items/edge.png');
    this.game.load.spritesheet('RECPoint', './images/items/RECPoint.png', 33, 33, 2);
    this.game.load.image('REC', './images/items/REC.png');
    this.game.load.image('sideEdge', './images/items/sideEdge.png');
    this.game.load.spritesheet('buttonMonitor', './images/items/monitorButton.png', 396, 66, 2);
    this.game.load.image('leftLight', './images/items/LeftLight.png');
    this.game.load.image('rightLight', './images/items/RightLight.png');

    //Effects
    this.game.load.spritesheet('staticEffect', './images/effect/static.png', 800, 600, 5);
  },

  create: function () 
  {
    this.game.state.start('office');
  }
};


window.onload = function () 
{
  var game = new Phaser.Game(792, 594, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);
  game.state.add('menu', MenuScene);
  game.state.add('cameras', CameraScene);
  game.state.add('office', OfficeScene);


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