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
        // move back to center
        ant.nextDirection = 1+4;
        ant.move(d, 500, 500);

        ant.nextDirection = 2;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(260,240));
        // move back to center
        ant.nextDirection = 2+4;
        ant.move(d, 500, 500);

        ant.nextDirection = 3;
        ant.move(d, 500, 500);
        ant.getLocation().should.eql(new Point(260,250));
        // move back to center
        ant.nextDirection = 3+4;
        ant.move(d, 500, 500);

        done();
    });

});




