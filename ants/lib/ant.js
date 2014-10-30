function Ant(color) {

    // Private vars
    this._isDead = false;
    this._name   = color.toUpperCase() + " Ant";
    this._currX  = Math.round(Math.random() * 1200);
    this._currY  = Math.round(Math.random() * 600);
    this._campLocations = [];
    this._campID = 0;
    
    // Public attributes
    this.age   = 1;
    this.color = color;
    this.nextDirection = Math.ceil(Math.random() * 8);
    this.lastAction    = null;
    this.daysCamping   = 0;
    this.isFollowing   = false;
}

// Constants & Class Attrs/Methods
Ant.ACTION_MOVE = "move";
Ant.ACTION_CAMP = "camp";
Ant.CAMP_SIZE   = 10;
// wrap | bounce | die (default)
Ant.EDGE_BEHAVIOR = "bounce"; 
Ant.chooseDirection = function () {
    return (Math.ceil(Math.random() * 8));
};

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

    this.age += 1;
    this.lastAction    = Ant.ACTION_MOVE;
    this.nextDirection = Ant.chooseDirection();
    this.daysCamping   = 0;

    if (Ant.EDGE_BEHAVIOR === "wrap") {
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
    }
    else if (Ant.EDGE_BEHAVIOR === "bounce") {
        if (newX < 0) {
            newX = 0;
        }
        if (newX > maxX) {
            newX = maxX;
        }
        if (newY < 0) {
            newY = 0;
        }
        if (newY > maxY) {
            newY = maxY;
        }
    }
    else {
        // Fall off and die
        if (newX < 0 || newX > maxX || newY < 0 || newY > maxY) {
            this._isDead = true;
        }
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

Ant.prototype.followTrail = function(ant, siteID) {
    var site = ant.getSiteInfo(siteID);

    this.isFollowing = true;
    this._currX = site.location.x;
    this._currY = site.location.y;
    this.nextDirection = site.direction;
};

Ant.prototype.isDead = function() {
    return(this._isDead);
};

Ant.prototype.inCampSite = function(ant) {
    var i, site, siteID = null, antLoc = ant.getLocation(),
        siteTopLeft, siteBottomRight;

    // Reverse lookup. Want the most recent time at a site
    for (i = this._campLocations.length-1; i >= 0; i-=1) {
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
