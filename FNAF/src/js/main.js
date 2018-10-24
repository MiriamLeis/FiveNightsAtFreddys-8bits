'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
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
    this.game.load.image('eHallCorner','./images/E.Hall Corner.png');
    this.game.load.image('eastHall','./images/rooms/East Hall.png');
    this.game.load.image('restrooms','./images/rooms/Restrooms.png');
    this.game.load.image('pirateCov1', './images/rooms/PirateCove.png');
    this.game.load.image('pirateCov2', './images/rooms/PirateCove2.png');
    this.game.load.image('pirateCov3', './images/rooms/PirateCove3.png');

    //Animatronics
    this.game.load.spritesheet('bonnie','./images/Bonnie.png', 33, 66, 2);
    this.game.load.spritesheet('chica','./images/Chica.png', 33, 66, 2);
    this.game.load.spritesheet('freddy','./images/Freddy.png', 33, 66, 2);
    this.game.load.image('darkFreddy','./images/FreddyDark.png');
    this.game.load.image('foxy','./images/Foxy.png');
    this.game.load.spritesheet('foxyRun','./images/FoxyRun.png', 33, 66, 2);

    //Screamers

    //Objects

  },

  create: function () {
    this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);


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