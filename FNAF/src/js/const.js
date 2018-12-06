
function Const()
{
    //=====================================================GAMESCENE=============================================
    this._tamX = 792;
    this._tamY = 594;

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
    this._spriteBonnieAttackPosX = 0;
    this._spriteBonnieAttackPosY = 0;

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
    this._spriteChicaAttackPosX = 0;
    this._spriteChicaAttackPosY = 0;

};


module.exports = Const;