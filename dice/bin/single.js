var Dice = require('./dice');
var SIDES = 6, 
    ROLL_COUNT = 100000;

var i,
    results = [],
    d1      = new Dice(SIDES);

for (i = 0; i < SIDES; i+=1) {
  results[i] = 0;
}

for (i = 0; i < ROLL_COUNT; i+=1) {
  d1.roll();
  results[d1.value-1] += 1;
}

for (i = 0; i < results.length; i+=1) {
  var percent = (results[i] / ROLL_COUNT) * 100;
  console.log(i+1 + ": " + Math.floor(percent) + "%");
}
