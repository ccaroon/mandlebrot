var expect = require('must'),
    _      = require('underscore'),
    Set    = require('../../lib/set');

describe ("Set", function () {

  it ("can create a set of dice", function (done) {
    var set = new Set(_.random(4,20), _.random(2,6));
    expect(set).to.not.be.null();
    set.total().must.equal(0);
    done();
  });

  it ("can roll a set of dice", function (done) {
    var sides = _.random(4,20),
        count = _.random(2,6),
        set   = new Set(sides, count);

    expect(set).to.not.be.null();

    set.total().must.be.equal(0);
    set.roll();
    set.total().must.not.equal(0);

    _.each(set.values(), function (v) {
      expect(v).to.not.be.null();
    });

    done();
  });

});
