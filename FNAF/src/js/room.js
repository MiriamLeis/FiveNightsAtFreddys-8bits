
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