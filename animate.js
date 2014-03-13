var Mandlebrot = require('./mandlebrot');
var ComplexPlane = require('./complex_plane');
//##############################################################################
var m = new Mandlebrot(-2,1,-1,1);
var p = new ComplexPlane(160,60);

var i = 0;
var doIt = function () {
  console.log("=====> mandlebrot.js #69 --> i ["+i+"]");
  m.compute(i, p);
  p.display();
  i+=1;
  if (i < 50) {
    setTimeout(doIt, 250);
  }
}
doIt();
