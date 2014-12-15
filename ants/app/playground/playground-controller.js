angular.module("Playground", [])
.controller("PlaygroundCtrl", ["$window", function ($window) {
    var self = this, element;

    self.isRunning = false;

    // Constants & Class Attrs
    self.DAY_LENGTH  = 125; // in ms
    self.CAMP_LENGTH = 3;   // in "days"

    self.width   = $window.innerWidth;
    self.height  = $window.innerHeight;
    
    element = $window.document.getElementById('playground');
    self.display = element.getContext("2d");
    self.display.canvas.width  = self.width;
    self.display.canvas.height = self.height;

    self.drawBoundaries = function() {
        self.display.strokeStyle = "white";
        self.display.strokeRect(0,0,self.width,self.height);
    };

    self.moveAnt = function(ant) {
        var startPos = ant.getLocation(), endPos, 
            distance = Ant.chooseDistance(), path;

        endPos = ant.move(distance, self.width, self.height);

        path = new Line(startPos, endPos);

        return(path);
    };

    self.drawPath = function (ant, startPos, endPos) {
        self.display.lineWidth   = 1;
        self.display.strokeStyle = ant.color;
        self.drawLine(new Line(startPos, endPos));
    };

    self.drawLine = function (line) {
        self.display.beginPath();
        self.display.moveTo(line.p1.x, line.p1.y);
        self.display.lineTo(line.p2.x, line.p2.y);
        self.display.stroke();
    };

    self.setCamp = function(ant) {
        self.placeMarker(ant);
        ant.camp();
    };

    self.placeMarker = function(ant) {
        var pos = ant.getLocation(), lastSite = ant.lastCampSiteLocation();

        self.display.fillStyle = ant.color;
        self.display.fillRect(pos.x-(Ant.CAMP_SIZE/2), pos.y-(Ant.CAMP_SIZE/2), Ant.CAMP_SIZE, Ant.CAMP_SIZE);

        // Mark current location
        self.display.fillStyle = "black";
        self.display.fillRect(pos.x, pos.y, 2, 2);
        if (lastSite) {
            self.display.fillStyle = ant.color;
            self.display.fillRect(lastSite.location.x, lastSite.location.y, 2, 2);
        }

    };

    self.clear = function () {
        self.display.fillStyle = "black";
        self.display.fillRect(0,0,self.width, self.height);
    };

    self.eventLoop = function(thisAnt, otherAnt) {
        var lastSite, site, path = null;

        if (thisAnt.isFollowing) {
            path = self.moveAnt(thisAnt);
        }
        else if (thisAnt.lastAction === Ant.ACTION_CAMP) {
            if (thisAnt.daysCamping === self.CAMP_LENGTH) {
                path = self.moveAnt(thisAnt);
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
                self.drawPath(thisAnt, path.p1, site.location);
            }
            else {
                thisAnt.isFollowing = false;
                self.drawPath(thisAnt, path.p1, path.p2);
            }
        }

        self.setCamp(thisAnt);

        // Did thisAnt find otherAnt?
        if (thisAnt.getLocation().equals(otherAnt.getLocation())) {
            console.log(thisAnt + " has found " + otherAnt);
            self.stop();
            thisAnt.color="green";
            self.placeMarker(thisAnt);
        }

        // is thisAnt dead or has it been toooo loooonnnngggg?
        if (thisAnt.isDead() || thisAnt.age > (365*10)) {
            lastSite = thisAnt.lastCampSiteLocation();
            console.log(thisAnt + " died at camp site #"+lastSite.id);
            self.stop();
        }

    };

    self.init = function () {
        self.ant1 = new Ant(
            "red",
            new Point(_.random(0, self.width), _.random(0, self.height))
        );
        self.ant2 = new Ant(
            "white", 
            new Point(_.random(0, self.width), _.random(0, self.height))
        );

        self.drawBoundaries();

        self.setCamp(self.ant1);
        self.setCamp(self.ant2);
    };

    self.start = function () {
        self.interval1 = setInterval(function () {
            self.eventLoop(self.ant1, self.ant2);
        }, self.DAY_LENGTH);

        self.interval2 = setInterval(function () {
            self.eventLoop(self.ant2, self.ant1);
        }, self.DAY_LENGTH);

        self.isRunning = true;
    };

    self.stop = function () {
        clearInterval(self.interval1);
        clearInterval(self.interval2);

        self.isRunning = false;
        self.interval1 = null;
        self.interval2 = null;
    };

    self.reset = function () {
        self.stop();
        self.clear();
        self.init();
    };

    self.step = function () {
        if (self.isRunning === false) {
            self.eventLoop(self.ant1, self.ant2);
            self.eventLoop(self.ant2, self.ant1);
        }
    };

    self.isButtonDisabled = function (buttonName) {
        var disabled = false;

        switch (buttonName) {
            case 'step':
            case 'start':
                if (self.isRunning === true) {
                    disabled = true;
                }
                break;
            case 'stop':
                if (self.isRunning === false) {
                    disabled = true;
                }
                break;
            default:
                disabled = false;
        }

        return (disabled);
    };

    self.init();

}]);
