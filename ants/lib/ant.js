function Ant(color, startPos) {

    // Private vars
    this._isDead = false;
    this._name   = color.toUpperCase() + " Ant";
    this._location = startPos;
    this._campLocations = [];
    this._campID = 0;
    
    // Public attributes
    this.age   = 1;
    this.color = color;
    this.lastDirection = null;
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
Ant.MIN_DISTANCE = 30;
Ant.MAX_DISTANCE = 50;

Ant.prototype.chooseDirection = function () {
    var newDirection = null;

    // Make sure we don't go back to where we just left
    do {
        newDirection = Math.ceil(Math.random() * 8);        
    } while (Math.abs(newDirection - this.lastDirection) === 4);

    return (newDirection);
};

Ant.prototype.chooseDistance = function() {
    var d = _.random(Ant.MIN_DISTANCE, Ant.MAX_DISTANCE);
    // var d = 15;
    return (d);
};

Ant.prototype.move  = function(distance, maxX, maxY) {
    var newX = this._location.x, newY = this._location.y;

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
    this.lastDirection = this.nextDirection;
    this.nextDirection = this.chooseDirection();
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

    this._location = new Point(newX, newY);

    return (this._location);
};

Ant.prototype.camp = function() {
    var loc = this.getLocation(), boundaries;

    if (this.lastAction === Ant.ACTION_MOVE) {
        boundaries = new Rectangle(
            loc.x - (Ant.CAMP_SIZE/2), 
            loc.y - (Ant.CAMP_SIZE/2),
            Ant.CAMP_SIZE, 
            Ant.CAMP_SIZE
        );
        this._campLocations.push(
            {
                id:         this._campID++,
                location:   loc,
                boundaries: boundaries,
                direction:  this.nextDirection
            }
        );
    }

    this.age += 1;
    this.lastAction = Ant.ACTION_CAMP;
    this.daysCamping += 1;
};

Ant.prototype.followTrail = function(ant, siteID) {
    var site = ant.getCampSite(siteID);

    this.isFollowing = true;
    this._location = site.location;
    this.nextDirection = site.direction;
};

Ant.prototype.isDead = function() {
    return(this._isDead);
};

Ant.prototype.inCampSite = function(ant) {
    var i, site, siteID = null, antLoc = ant.getLocation();

    // Reverse lookup. Want the most recent time at a site
    for (i = this._campLocations.length-1; i >= 0; i-=1) {
        site = this._campLocations[i];

        if (site.boundaries.containsPoint(antLoc)) {
            siteID = site.id;
            break;
        }
    }

    return(siteID);
};

Ant.prototype.crossesCampSite = function(path) {
    var i, site = null;

    // Reverse lookup. Want the most recent time at a site
    for (i = this._campLocations.length-1; i >= 0; i-=1) {
        site = this._campLocations[i];

        if (path.intersectRect(site.boundaries)) {
            break;
        }
        else {
            site = null;
        }
    }

    return(site);
};

Ant.prototype.lastCampSiteLocation = function() { 
    return(this._campLocations[this._campLocations.length-1]);
};

Ant.prototype.getCampSite = function(siteID) {
    return (this._campLocations[siteID]);
};

Ant.prototype.getLocation = function() {
    return (this._location);
};

Ant.prototype.toString = function() {
    return(this._name);
};
