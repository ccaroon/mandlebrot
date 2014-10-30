function Ant(color) {

    // Private vars
    this._isDead = false;
    this._name   = color.toUpperCase() + " Ant";
    this._currX  = Math.round(Math.random() * 600);
    this._currY  = Math.round(Math.random() * 600);
    this._campLocations = [];
    this._campID = 0;
    this._following     = null;
    this._followingSite = null;
    
    // Public attributes
    this.age   = 1;
    this.color = color;
    this.nextDirection = Math.ceil(Math.random() * 8);
    this.lastAction    = null;
    this.daysCamping   = 0;
}

// Constants & Class Attrs/Methods
Ant.ACTION_MOVE = "move";
Ant.ACTION_CAMP = "camp";
Ant.CAMP_SIZE   = 10;
Ant.chooseDirection = function () {
    return (Math.ceil(Math.random() * 8));
};

// TODO: "bounce" off walls instead of wrap
Ant.prototype.move  = function(distance, maxX, maxY) {
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

    if (this._following) {

    }
    else {

    }

    this.age += 1;
    this.lastAction    = Ant.ACTION_MOVE;
    this.nextDirection = Ant.chooseDirection();
    this.daysCamping   = 0;

    // Wrap around edges
    if (newX < 0) {
        newX = maxX + newX;
    }
    if (newX > maxX) {
        newX = newX - maxX;
    }
    if (newY < 0) {
        newY = maxY + newY;
    }
    if (newY > maxY) {
        newY = newY - maxY;
    }

    this._currX = newX;
    this._currY = newY;

    return ([this._currX, this._currY]);
};

Ant.prototype.camp = function() {
    var loc = this.getLocation();

    if (this.lastAction === Ant.ACTION_MOVE) {
        this._campLocations.push(
            {
                id:       this._campID++,
                location: {x: loc[0], y: loc[1]}, 
                direction: this.nextDirection
            }
        );
    }

    this.age += 1;
    this.lastAction = Ant.ACTION_CAMP;
    this.daysCamping += 1;
};

Ant.prototype.follow = function(ant, startingSiteID) {
    var site = ant.getSiteInfo(startingSiteID);

    this._following     = ant;

    this._currX = site.location.x;
    this._currY = site.location.y;
    this.nextDirection = site.direction;
    // this._followingSite = startingSiteID;
};

Ant.prototype.isDead = function() {
    return(this._isDead);
};

Ant.prototype.inCampSite = function(ant) {
    var i, site, siteID = null, antLoc = ant.getLocation(),
        siteTopLeft, siteBottomRight;

    for (i = 0; i < this._campLocations.length; i+=1) {
        site = this._campLocations[i];

        siteTopLeft = {
            x: site.location.x - Ant.CAMP_SIZE,
            y: site.location.y - Ant.CAMP_SIZE
        };
        siteBottomRight = {
            x: site.location.x + Ant.CAMP_SIZE,
            y: site.location.y + Ant.CAMP_SIZE
        };

        if (antLoc[0] > siteTopLeft.x && antLoc[0] < siteBottomRight.x &&
            antLoc[1] > siteTopLeft.y && antLoc[1] < siteBottomRight.y) {
            siteID = site.id;
            break;
        }
    }

    return(siteID);
};


Ant.prototype.lastCampSiteLocation = function() { 
    return(this._campLocations[this._campLocations.length-1]);
};

Ant.prototype.getSiteInfo = function(siteID) {
    return (this._campLocations[siteID]);
};

Ant.prototype.getLocation = function() {
    return ([this._currX, this._currY]);
};

Ant.prototype.toString = function() {
    return(this._name);
};
