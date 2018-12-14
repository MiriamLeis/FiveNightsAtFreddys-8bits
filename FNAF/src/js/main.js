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
  
  //------------------------------------------------------AUDIOS------------------------------------------
  //Menu
      this.game.load.audio('menuSound', ['./audios/Menu_music.wav', './audios/Menu_music.mp3', './audios/Menu_music.ogg']);
  
  //Death
      this.game.load.audio('deathSound', ['./audios/death.wav', './audios/death.mp3', './audios/death.ogg']);

  //Win
      this.game.load.audio('bellrings', ['./audios/win/Bellrings.wav', './audios/win/Bellrings.mp3', './audios/win/Bellrings.ogg']);
      this.game.load.audio('kidsScream', ['./audios/win/Kids_Scream.wav', './audios/win/Kids_Scream.mp3', './audios/win/Kids_Scream.ogg']);
    
  //Office
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

  //Battery
      this.game.load.audio('outBattery', ['./audios/battery/Power_down.wav', './audios/battery/Power_down.mp3', './audios/battery/Power_down.ogg']);
  
  //Animatronics
      this.game.load.audio('animAttack', ['./audios/animatronics/Scream.wav', './audios/animatronics/Scream.mp3', './audios/animatronics/Scream.ogg']);
      this.game.load.audio('deepSteps', ['./audios/animatronics/Deep_steps.wav', './audios/animatronics/Deep_steps.mp3', './audios/animatronics/Deep_steps.ogg']);

    //Freddy
      this.game.load.audio('freddySong', ['./audios/animatronics/freddy/power out/Music_box.wav', './audios/animatronics/freddy/power out/Music_box.mp3', './audios/animatronics/freddy/power out/Music_box.ogg']);
      this.game.load.audio('freddyEndSong', ['./audios/animatronics/freddy/power out/End_song.wav', './audios/animatronics/freddy/power out/End_song.mp3', './audios/animatronics/freddy/power out/End_song.ogg']);
    
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