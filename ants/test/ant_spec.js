/*jshint expr: true*/
describe ("Ant", function () {

    it("can create a new Ant instance", function (done) {
        var a = new Ant("red", new Point(12,34));

        expect(a).to.exist;

        a.age.should.equal(1);
        a.color.should.equal("red");
        expect(a.lastDirection).to.be.null;
        a.nextDirection.should.be.greaterThan(0).and.lessThan(9);
        expect(a.lastAction).to.be.null;
        a.daysCamping.should.equal(0);
        a.isFollowing.should.be.false;
        a.toString().should.equal("RED Ant");

        done();
    });

    it("can choose it's next direction", function (done) {
        var ant = new Ant("blue", new Point(0,0)),
            nextDirection;

        expect(ant).to.exist;
        expect(ant.lastDirection).to.be.null;
        expect(ant.nextDirection).to.not.be.null;

        nextDirection = ant.nextDirection;

        ant.chooseDirection();
        expect(ant.lastDirection).to.not.be.null;
        ant.lastDirection.should.equal(nextDirection);

        expect(ant.nextDirection).to.not.be.null;        
        ant.nextDirection.should.be.greaterThan(0).and.lessThan(9);
        // not allowed to go back the way it came
        (Math.abs(ant.nextDirection - ant.lastDirection)).should.not.equal(4);

        done();
    });

    it("can choose a movement distance", function (done) {
        var i, d;

        for (i = 0; i < 100; i+=1) {
            d = Ant.chooseDistance();
            d.should.be.at.least(Ant.MIN_DISTANCE).and.at.most(Ant.MAX_DISTANCE);
        }

        done();
    });

    it ("can move", function (done) {
        var startPos = new Point(250,250),
            ant = new Ant("pink", startPos),
            d = 10;

        expect(ant).to.exist;
        ant.getLocation().should.eql(startPos);

        ant.nextDirection = 1;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(250,240));

        ant.age.should.equal(2);
        ant.lastAction.should.equal(Ant.ACTION_MOVE);
        ant.daysCamping.should.equal(0);

        done();
    });

    it ("can move in 8 directions", function (done) {
        var startPos = new Point(250,250),
            ant = new Ant("pink", startPos),
            d = 10;

        expect(ant).to.exist;
        ant.getLocation().should.eql(startPos);

        ant.nextDirection = Ant.N;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(250,240));
        // move back to center
        ant.nextDirection = Ant.S;
        ant.move(d, 500, 500);

        ant.nextDirection = Ant.NE;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(260,240));
        // move back to center
        ant.nextDirection = Ant.SW;
        ant.move(d, 500, 500);

        ant.nextDirection = Ant.E;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(260,250));
        // move back to center
        ant.nextDirection = Ant.W;
        ant.move(d, 500, 500);

        ant.nextDirection = Ant.SE;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(260,260));
        // move back to center
        ant.nextDirection = Ant.NW;
        ant.move(d, 500, 500);

        ant.nextDirection = Ant.S;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(250,260));
        // move back to center
        ant.nextDirection = Ant.N;
        ant.move(d, 500, 500);

        ant.nextDirection = Ant.SW;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(240,260));
        // move back to center
        ant.nextDirection = Ant.NE;
        ant.move(d, 500, 500);

        ant.nextDirection = Ant.W;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(240,250));
        // move back to center
        ant.nextDirection = Ant.E;
        ant.move(d, 500, 500);

        ant.nextDirection = Ant.NW;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(240,240));
        // move back to center
        ant.nextDirection = Ant.SE;
        ant.move(d, 500, 500);

        done();
    });

    describe("Edge Behavior", function () {
        it("should stop if hit wall", function (done) {
            var ant = new Ant("green", new Point(50,50));

            Ant.EDGE_BEHAVIOR = Ant.EDGE_HIT_WALL;

            ant.nextDirection = Ant.E;
            ant.move(100, 100, 100);
            ant.getLocation().should.eql(new Point(100,50));

            ant.nextDirection = Ant.S;
            ant.move(100, 100, 100);
            ant.getLocation().should.eql(new Point(100,100));

            ant.nextDirection = Ant.W;
            ant.move(200, 100, 100);
            ant.getLocation().should.eql(new Point(0,100));        

            ant.nextDirection = Ant.N;
            ant.move(200, 100, 100);
            ant.getLocation().should.eql(new Point(0,0));        

            done();
        });

        it("should die if fall off", function (done) {
            var ant;

            Ant.EDGE_BEHAVIOR = Ant.EDGE_FALL_OFF;

            ant = new Ant("green", new Point(50,50));
            ant.nextDirection = Ant.E;
            ant.move(51, 100, 100);
            ant.isDead().should.be.true;

            ant = new Ant("green", new Point(50,50));
            ant.nextDirection = Ant.W;
            ant.move(51, 100, 100);
            ant.isDead().should.be.true;

            ant = new Ant("green", new Point(50,50));
            ant.nextDirection = Ant.N;
            ant.move(51, 100, 100);
            ant.isDead().should.be.true;

            ant = new Ant("green", new Point(50,50));
            ant.nextDirection = Ant.S;
            ant.move(51, 100, 100);
            ant.isDead().should.be.true;            

            done();
        });


    });


});




