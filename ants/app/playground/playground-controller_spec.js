describe("Playground: PlaygroundCtrl", function () {
    var ctrl;

    beforeEach(module("Playground"));

    beforeEach(module(function ($provide) {
        var context = {
                canvas: {},
                strokeRect: sinon.stub(),
                fillRect:   sinon.stub(),
                beginPath:  sinon.stub(),
                moveTo:     sinon.stub(),
                lineTo:     sinon.stub(),
                stroke:     sinon.stub()
            },
            element = {
                getContext: sinon.stub().returns(context)
            };

        $provide.value('$window', {
            innerWidth: 1024,
            innerHeight: 768,
            document: {
                getElementById: sinon.stub().returns(element)
            }
        });
    }));

    beforeEach(inject(function ($controller) {
        ctrl = $controller('PlaygroundCtrl');
    }));

    it("init", function (done) {
        var win;
        inject(function ($window) {
            win = $window;
        });

        ctrl.isRunning.should.be.false;
        ctrl.DAY_LENGTH.should.exist;
        ctrl.CAMP_LENGTH.should.exist;

        ctrl.width.should.equal(1024);
        ctrl.height.should.equal(768);

        win.document.getElementById.should.have.been.calledWith('playground');

        ctrl.display.should.exist;
        ctrl.display.canvas.width.should.equal(1024);
        ctrl.display.canvas.height.should.equal(768);

        ctrl.ant1.should.exist;
        ctrl.ant2.should.exist;

        ctrl.display.strokeStyle.should.equal("white");
        ctrl.display.strokeRect.should.have.been.calledWith(0,0,ctrl.width,ctrl.height);

        ctrl.display.fillRect.should.have.callCount(4);

        ctrl.ant1.age.should.equal(2);
        ctrl.ant1.lastAction.should.equal(Ant.ACTION_CAMP);
        ctrl.ant1.daysCamping.should.equal(1);

        ctrl.ant2.age.should.equal(2);
        ctrl.ant2.lastAction.should.equal(Ant.ACTION_CAMP);
        ctrl.ant2.daysCamping.should.equal(1);

        done();
    });

    it("can draw a line", function(done) {
        var s = new Point(0,0),
            e = new Point(25,25),
            line = new Line(s,e);

        ctrl.drawLine(line);

        ctrl.display.beginPath.should.have.been.calledOnce;
        ctrl.display.moveTo.should.have.been.calledWith(s.x, s.y);
        ctrl.display.lineTo.should.have.been.calledWith(e.x, e.y);
        ctrl.display.stroke.should.have.been.calledOnce;

        done();
    });

    it("can draw a path", function(done) {
        var p1 = new Point(12,48), 
            p2 = new Point(45,90);

        ctrl.drawLine = sinon.stub();
        ctrl.drawPath(ctrl.ant1, p1, p2);

        ctrl.display.lineWidth.should.equal(1);
        ctrl.display.strokeStyle.should.equal(ctrl.ant1.color);
        ctrl.drawLine.should.have.been.calledWith(new Line(p1,p2));

        done();
    });

    it("should be able to clear the playground", function (done) {

        ctrl.clear();

        ctrl.display.fillStyle.should.equal("black");
        ctrl.display.fillRect.should.have.been.calledWith(0,0,ctrl.width,ctrl.height);

        done();
    });

    it("should be able to move an ant", function (done) {
        var startPos = ctrl.ant1.getLocation(),
            path;

        path = ctrl.moveAnt(ctrl.ant1);
        path.p1.x.should.equal(startPos.x);
        path.p1.y.should.equal(startPos.y);

        ctrl.ant1.age.should.equal(3);
        ctrl.ant1.lastAction.should.equal(Ant.ACTION_MOVE);
        ctrl.ant1.daysCamping.should.equal(0);

        done();
    });

    it("can start the simulation", function(done) {
        ctrl.eventLoop = sinon.stub();

        expect(ctrl.interval1).to.not.exist;
        expect(ctrl.interval2).to.not.exist;

        ctrl.start();

        ctrl.isRunning.should.be.true;
        // ctrl.eventLoop.should.have.been.called;
        ctrl.interval1.should.exist;
        ctrl.interval2.should.exist;

        clearInterval(ctrl.interval1);
        clearInterval(ctrl.interval2);
        done();
    });

    it("can stop the simulation", function(done) {
        ctrl.start();

        ctrl.isRunning.should.be.true;
        ctrl.interval1.should.exist;
        ctrl.interval2.should.exist;

        ctrl.stop();

        ctrl.isRunning.should.be.false;
        expect(ctrl.interval1).to.not.exist;
        expect(ctrl.interval2).to.not.exist;

        done();
    });

    it("can reset the simulation", function (done) {
        ctrl.stop  = sinon.stub();
        ctrl.clear = sinon.stub();
        ctrl.init  = sinon.stub();

        ctrl.reset();

        ctrl.stop.should.have.been.called;
        ctrl.clear.should.have.been.calledAfter(ctrl.stop);
        ctrl.init.should.have.been.calledAfter(ctrl.clear);

        done();
    });

    it("can step through the simulation", function(done) {
        ctrl.eventLoop = sinon.stub();

        ctrl.isRunning.should.be.false;
        ctrl.step();
        ctrl.eventLoop.should.have.been.calledTwice;
        ctrl.eventLoop.should.have.been.calledWith(ctrl.ant1, ctrl.ant2);
        ctrl.eventLoop.should.have.been.calledWith(ctrl.ant2, ctrl.ant1);

        done();
    });

    it("will not step if the simulation is running", function(done) {
        ctrl.eventLoop = sinon.stub();

        ctrl.start();

        ctrl.isRunning.should.be.true;
        ctrl.step();
        ctrl.eventLoop.should.not.have.been.called;

        ctrl.stop();

        done();
    });

    describe("isButtonDisabled", function () {
        it("should default to false", function (done) {
            ctrl.isButtonDisabled('foobar').should.be.false;
            done();
        });

        it("STOP should be disabled if simulation is not running", function (done) {
            ctrl.isRunning = false;
            ctrl.isButtonDisabled('stop').should.be.true;

            ctrl.isRunning = true;
            ctrl.isButtonDisabled('stop').should.be.false;
            done();
        });

        it("START should be disabled if simulation is running", function (done) {
            ctrl.isRunning = true;
            ctrl.isButtonDisabled('start').should.be.true;

            ctrl.isRunning = false;
            ctrl.isButtonDisabled('start').should.be.false;

            done();
        });

        it("STEP should be disabled if simulation is running", function (done) {
            ctrl.isRunning = true;
            ctrl.isButtonDisabled('step').should.be.true;

            ctrl.isRunning = false;
            ctrl.isButtonDisabled('step').should.be.false;
            done();
        });

    });


});
