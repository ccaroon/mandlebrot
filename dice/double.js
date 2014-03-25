var Dice = require('./dice');
var SIDES      = 6,
    ROLL_COUNT = 1000000;

var i,
    sum,
    percent,
    results = [],
    d1 = new Dice(SIDES),
    d2 = new Dice(SIDES);

for (i = 0; i < SIDES*2; i+=1) {
  results[i] = 0;
}

for (i = 0; i < ROLL_COUNT; i+=1) {
  d1.roll();
  d2.roll();

  sum = d1.value + d2.value;

  results[sum-1] += 1;
}

for (i = 0; i < results.length; i+=1) {
  var percent = (results[i] / ROLL_COUNT) * 100;
  console.log(i+1 + ": " + Math.floor(percent) + "%");
}
