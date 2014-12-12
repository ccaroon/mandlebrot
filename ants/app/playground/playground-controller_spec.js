describe("Playground: PlaygroundCtrl", function () {
    var ctrl;

    beforeEach(module("Playground"));

    beforeEach(module(function ($provide) {
        var context = {
                canvas: {},
                strokeRect: sinon.stub(),
                fillRect: sinon.stub()
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

        win.document.getElementById.should.have.been.called;

        ctrl.display.should.exist;
        ctrl.display.canvas.width.should.equal(1024);
        ctrl.display.canvas.height.should.equal(768);

        ctrl.display.strokeStyle.should.equal("white");
        ctrl.display.strokeRect.should.have.been.called;//With(0,0,ctrl.width,ctrl.height);

        ctrl.display.fillRect.should.have.been.calledTwice;

        done();
    });

});
