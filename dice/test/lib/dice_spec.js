var expect = require('must'),
    _      = require('underscore'),
    Dice   = require('../../lib/dice');

describe ("Dice", function () {

  it ("can create a dice", function (done) {
    var dice = new Dice(_.random(4,20));
    expect(dice).to.not.be.null();
    expect(dice.value).to.be.null();
    done();
  });

  it ("can roll a dice", function (done) {
    var sides = _.random(4,20),
        dice  = new Dice(sides);

    expect(dice).to.not.be.null();

    expect(dice.value).to.be.null();
    dice.roll();
    expect(dice.value).to.not.be.null();

    dice.value.must.be.between(1,sides);

    done();
  });

});
