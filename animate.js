#!/usr/bin/env node
var Mandlebrot = require('./mandlebrot');
var AsciiCanvas = require('./ascii_canvas');
//##############################################################################
var m = new Mandlebrot(-2,1,-1,1),
    p = new AsciiCanvas(160,60),
    i = 1;

var run = function () {
  console.log("------------------------------- "+i+" -------------------------------");
  m.compute(i, p);
  p.display();
  i+=1;
  if (i <= 50) {
    setTimeout(run, 250);
  }
}
run();
