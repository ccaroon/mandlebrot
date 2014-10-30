function Ants(elementId) {
    var c = document.getElementById(elementId);

    this.width  = c.width;
    this.height = c.height;
    this.field    = c.getContext("2d");

    this.drawBoundaries();

    this.ant1 = new Ant("red");
    this.ant2 = new Ant("white");
}

// Constants & Class Attrs
Ants.DAY_LENGTH = 125;
Ants.CAMP_LENGTH = 3;
Ants.MIN_TRAVEL_DISTANCE = 20;
Ants.MAX_TRAVEL_DISTANCE = 20;

Ants.getDistance = function () {
    var d = Math.ceil(Math.random() * (Ants.MAX_TRAVEL_DISTANCE/2))+Ants.MIN_TRAVEL_DISTANCE;

    return(d);
}

Ants.prototype.drawBoundaries = function() {
    this.field.fillStyle   = "white";
    this.field.strokeStyle = "white";
    this.field.strokeRect(0,0,this.width,this.height);
};

Ants.prototype.moveAnt = function(ant) {
    var currPos = ant.getLocation(),
        endPos, distance = Ants.getDistance();
        endPos  = ant.move(distance,this.width, this.height);

    // this.field.lineWidth = 1;
    // this.field.strokeStyle = "black";//ant.color;

    // this.field.beginPath();
    // this.field.moveTo(currPos[0], currPos[1]);
    // this.field.lineTo(endPos[0], endPos[1]);
    // this.field.stroke();
};

Ants.prototype.setCamp = function(ant) {
    this.placeMarker(ant);
    ant.camp();
};

Ants.prototype.placeMarker = function(ant) {
    var pos = ant.getLocation(), lastSite = ant.lastCampSiteLocation();

    this.field.fillStyle = ant.color;
    this.field.fillRect(pos[0]-(Ant.CAMP_SIZE/2), pos[1]-(Ant.CAMP_SIZE/2), Ant.CAMP_SIZE, Ant.CAMP_SIZE);

    this.field.fillStyle = "black";
    this.field.fillRect(pos[0], pos[1], 1, 1);

    if (lastSite) {
        this.field.fillStyle = ant.color;
        this.field.fillRect(lastSite.location.x, lastSite.location.y, 2, 2);
    }

};

Ants.prototype.act = function(ant) {
    if (ant.lastAction === Ant.ACTION_CAMP) {
        if (ant.daysCamping === Ants.CAMP_LENGTH) {
            this.moveAnt(ant);
            this.setCamp(ant);
        }
        else {
            ant.camp();
        }
    }
};

Ants.prototype.animate = function(ant, iID) {
    this.act(ant);
    if (ant.isDead() || ant.age > 365) {
        console.log(ant + " is dead!");
        clearInterval(iID);
    }
};

Ants.prototype.run = function () {
    var self = this, a1, a2;

    this.setCamp(this.ant1);
    this.setCamp(this.ant2);

    a1 = setInterval(function () {
        var siteID;
        self.animate(self.ant1, a1);
        siteID = self.ant2.inCampSite(self.ant1);
        if (siteID) {
            console.log(self.ant1 + " is in " + self.ant2 + "'s camp site #"+siteID+".");
            // self.ant1.follow(self.ant2, siteID);
        }
    }, Ants.DAY_LENGTH);

    a2 = setInterval(function () {
        var siteID;
        self.animate(self.ant2, a2);
        siteID = self.ant1.inCampSite(self.ant2);
        if (siteID) {
            console.log(self.ant2 + " is in " + self.ant1 + "'s camp site #"+siteID+".");
            // self.ant2.follow(self.ant1, siteID);
        }
    }, Ants.DAY_LENGTH);
    
}
