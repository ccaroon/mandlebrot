function Ant(color) {

    // Private vars
    this._isDead = false;
    this._name   = color.toUpperCase() + " Ant";
    this._currX  = Math.round(Math.random() * 600);
    this._currY  = Math.round(Math.random() * 600);
    this._campLocations = [];
    
    // Public attributes
    this.age   = 1;
    this.color = color;
    this.nextDirection = Math.ceil(Math.random() * 8);
    this.lastAction    = null;
    this.daysCamping   = 0;
}

// Constants and Class Attrs/Methods
Ant.ACTION_MOVE = "move";
Ant.ACTION_CAMP = "camp";
Ant.CAMP_SIZE   = 7;
Ant.chooseDirection = function () {
    return (Math.ceil(Math.random() * 8));
}

// TODO: wrap around edges of field
Ant.prototype.move  = function(distance) {
    var newX = this._currX, newY = this._currY;

    switch (this.nextDirection) {
        case 1:
            newY -= distance;
            break;
        case 2:
            newX += distance;
            newY -= distance;
            break;
        case 3:
            newX += distance;
            break;
        case 4:
            newX += distance;
            newY += distance;
            break;
        case 5:
            newY += distance;
            break;
        case 6:
            newX -= distance;
            newY += distance;
            break;
        case 7:
            newX -= distance;
            break;
        case 8:
            newX -= distance;
            newY -= distance;
            break;
    }

    this.age += 1;
    this.lastAction    = Ant.ACTION_MOVE;
    this.nextDirection = Ant.chooseDirection();
    this.daysCamping   = 0;

    this._currX = newX;
    this._currY = newY;
    if (this._currX < 0 || this._currY < 0) {
        this._isDead = true;
    }

    return ([this._currX, this._currY]);
};

Ant.prototype.camp = function() {
    var loc = this.getLocation();

    if (this.lastAction === Ant.ACTION_MOVE) {
        this._campLocations.push({ location: {x: loc[0], y: loc[1]}, direction: this.nextDirection });
    }

    this.age += 1;
    this.lastAction = Ant.ACTION_CAMP;
    this.daysCamping += 1;
};

Ant.prototype.isDead = function() {
    return(this._isDead);
};

Ant.prototype.inCampSite = function(ant) {
    var i, site, inSite = false, antLoc = ant.getLocation();;

    for (i = 0; i < this._campLocations.length; i+=1) {
        site = this._campLocations[i];
        if (site.location.x === antLoc[0] & site.location.y === antLoc[1]) {
            inSite = true;
            break;
        }
    }

    return(inSite);
};

Ant.prototype.lastCampSiteLocation = function() { 
    return(this._campLocations[this._campLocations.length-1]);
};

Ant.prototype.getLocation = function() {
    return ([this._currX, this._currY]);
};

Ant.prototype.toString = function() {
    return(this._name);
};
