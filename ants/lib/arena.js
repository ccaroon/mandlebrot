function Arena(elementId) {
    var element = document.getElementById(elementId);

    this.width   = window.innerWidth;
    this.height  = window.innerHeight;
    
    this.display = element.getContext("2d");
    this.display.canvas.width  = this.width;
    this.display.canvas.height = this.height;

    this.drawBoundaries();
}

// Constants & Class Attrs
Arena.DAY_LENGTH  = 125; // in ms
Arena.CAMP_LENGTH = 3;   // in "days"

Arena.prototype.drawBoundaries = function() {
    this.display.strokeStyle = "white";
    this.display.strokeRect(0,0,this.width,this.height);
};

Arena.prototype.moveAnt = function(ant) {
    var startPos = ant.getLocation(), endPos, 
        distance = Ant.chooseDistance(), path;

    endPos = ant.move(distance, this.width, this.height);

    path = new Line(startPos, endPos);

    return(path);
};

Arena.prototype.drawPath = function (ant, startPos, endPos) {
    this.display.lineWidth   = 1;
    this.display.strokeStyle = ant.color;
    this.drawLine(new Line(startPos, endPos));
};

Arena.prototype.drawLine = function (line) {
    this.display.beginPath();
    this.display.moveTo(line.p1.x, line.p1.y);
    this.display.lineTo(line.p2.x, line.p2.y);
    this.display.stroke();
};

Arena.prototype.setCamp = function(ant) {
    this.placeMarker(ant);
    ant.camp();
};

Arena.prototype.placeMarker = function(ant) {
    var pos = ant.getLocation(), lastSite = ant.lastCampSiteLocation();

    this.display.fillStyle = ant.color;
    this.display.fillRect(pos.x-(Ant.CAMP_SIZE/2), pos.y-(Ant.CAMP_SIZE/2), Ant.CAMP_SIZE, Ant.CAMP_SIZE);

    // Mark current location
    this.display.fillStyle = "black";
    this.display.fillRect(pos.x, pos.y, 2, 2);
    if (lastSite) {
        this.display.fillStyle = ant.color;
        this.display.fillRect(lastSite.location.x, lastSite.location.y, 2, 2);
    }

};

Arena.prototype.eventLoop = function(thisAnt, otherAnt, thisInterval, otherInterval) {
    var lastSite, site, path = null;

    if (thisAnt.isFollowing) {
        path = this.moveAnt(thisAnt);
    }
    else if (thisAnt.lastAction === Ant.ACTION_CAMP) {
        if (thisAnt.daysCamping === Arena.CAMP_LENGTH) {
            path = this.moveAnt(thisAnt);
        }
        else {
            thisAnt.camp();
        }
    }

    if (thisAnt.lastAction === Ant.ACTION_MOVE) {
        site = otherAnt.crossesCampSite(path);
        if (site !== null) {
            console.log(thisAnt + " crossed " + otherAnt + "'s camp site #"+site.id+".");

            thisAnt.followTrail(otherAnt, site.id);
            this.drawPath(thisAnt, path.p1, site.location);
        }
        else {
            thisAnt.isFollowing = false;
            this.drawPath(thisAnt, path.p1, path.p2);
        }
    }

    this.setCamp(thisAnt);

    // Did thisAnt find otherAnt?
    if (thisAnt.getLocation().equals(otherAnt.getLocation())) {
        console.log(thisAnt + " has found " + otherAnt);
        clearInterval(thisInterval);
        clearInterval(otherInterval);
        thisAnt.color="green";
        this.placeMarker(thisAnt);
    }

    // is thisAnt dead or has it been toooo loooonnnngggg?
    if (thisAnt.isDead() || thisAnt.age > (365*10)) {
        lastSite = thisAnt.lastCampSiteLocation();
        console.log(thisAnt + " died at camp site #"+lastSite.id);
        clearInterval(thisInterval);
    }

};

Arena.prototype.runSearch = function () {
    var self = this, a1, a2;

    this.ant1 = new Ant(
        "red",
        new Point(_.random(0, this.width), _.random(0, this.height))
    );
    this.ant2 = new Ant(
        "white", 
        new Point(_.random(0, this.width), _.random(0, this.height))
    );

    this.setCamp(this.ant1);
    a1 = setInterval(function () {
        self.eventLoop(self.ant1, self.ant2, a1, a2);
    }, Arena.DAY_LENGTH);

    this.setCamp(this.ant2);
    a2 = setInterval(function () {
        self.eventLoop(self.ant2, self.ant1, a2, a1);
    }, Arena.DAY_LENGTH);
    
};
