var Dice = require('./dice'),
    _    = require('underscore');

function Set(sides, count) {
  var i;

  this.dice = [];
  for (i = 0; i < count; i+=1) {
    this.dice[i] = new Dice(sides);
  }

}

Set.prototype.roll = function() {
  _.each(this.dice, function (d) {
    d.roll();
  })
};

Set.prototype.total = function() {
  var total = 0;
  _.each(this.dice, function (d) {
    total += d.value;
  });

  return (total);
};

Set.prototype.values = function() {
  var values = [];
  values = _.map(this.dice, function (d) {
    return d.value;
  });
  return(values.sort(function (a,b) {return a-b}));
};

Set.prototype.each = function(cb) {
  _.each(this.dice, cb);
};

module.exports = Set;
