var Set = require('../lib/set');

var s = new Set(6, 5);

s.roll();

// s.each(function (d) {
//   console.log(d.value);
// });

var values = s.values();
var util = require('util');
console.log("=====> set.js #12 --> values ["+util.inspect(values)+"]");

function is_yahtzee(set) {
  var values = set.values();

  
}