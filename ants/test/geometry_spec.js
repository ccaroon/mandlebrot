/*jshint expr: true*/
describe ('Point', function () {

    it ("can create a new Point instance", function (done) {
        var x = _.random(600), y = _.random(600), p = new Point(x,y);

        expect(p).to.exist;

        p.x.should.equal(x);
        p.y.should.equal(y);

        done();
    });

    it("can determine if two points are the same", function (done) {
        var x = _.random(600), y = _.random(600),
            p1 = new Point(x,y), p2 = new Point(x,y),
            p3 = new Point(x+1,y);

        p1.equals(p2).should.be.true;
        p2.equals(p1).should.be.true;

        p1.equals(p3).should.be.false;
        p2.equals(p3).should.be.false;

        done();
    });

});

describe("Line", function () {


    it("can create a new Line instance", function (done) {
        var p1 = new Point(0,0), p2 = new Point(100,100),
            line = new Line(p1,p2);

        expect(line).to.exist;
        line.p1.equals(p1).should.be.true;
        line.p2.equals(p2).should.be.true;

        done();
    });

    it("can determine the intersection point of two lines", function (done) {
        var l1 = new Line(new Point(0,0), new Point(100,100)),
            l2 = new Line(new Point(0,100), new Point(100,0)),
            l3 = new Line(new Point(25,10), new Point(35,10)),
            p;

        p = l1.intersectLine(l2);
        expect(p).to.exist;
        p.x.should.equal(50);
        p.y.should.equal(50);

        p = l2.intersectLine(l1);
        expect(p).to.exist;
        p.x.should.equal(50);
        p.y.should.equal(50);

        p = l1.intersectLine(l3);
        expect(p).to.not.exist;

        done();
    });

    it ("can determine if it intersects a Rectangle", function (done) {
        var l  = new Line(new Point(0,0), new Point(100,100)),
            r1 = new Rectangle(25,25,50,50),
            r2 = new Rectangle(0,25,20,20);

        l.intersectRect(r1).should.be.true;
        l.intersectRect(r2).should.be.false;

        done();
    });

});


describe("Rectangle", function() {

    it ("can create a new Rectangle instance", function (done) {
        var r = new Rectangle(0,0, 50, 75);

        expect(r).to.exist;

        r.x.should.equal(0);
        r.y.should.equal(0);
        r.width.should.equal(50);
        r.height.should.equal(75);

        r.topLeft.equals(new Point(0,0)).should.be.true;
        r.topRight.equals(new Point(50,0)).should.be.true;
        r.bottomLeft.equals(new Point(0,75)).should.be.true;
        r.bottomRight.equals(new Point(50,75)).should.be.true;

        r.top.should.eql(new Line(r.topLeft,r.topRight));
        r.bottom.should.eql(new Line(r.bottomLeft, r.bottomRight));
        r.left.should.eql(new Line(r.topLeft, r.bottomLeft));
        r.right.should.eql(new Line(r.topRight, r.bottomRight));

        r.sides.length.should.equal(4);

        done();
    });

    it ("can determine if it contains a Point", function (done) {
        var r = new Rectangle(25,25,50,50);

        r.containsPoint(new Point(25,25)).should.be.true;
        r.containsPoint(new Point(75,25)).should.be.true;
        r.containsPoint(new Point(75,75)).should.be.true;
        r.containsPoint(new Point(25,75)).should.be.true;

        r.containsPoint(new Point(50,50)).should.be.true;
        r.containsPoint(new Point(34,49)).should.be.true;

        r.containsPoint(new Point(10,24)).should.be.false;

        done();
    });
});






