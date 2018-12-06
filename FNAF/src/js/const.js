
function Const()
{
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
};

module.exports = Const;