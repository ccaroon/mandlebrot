#!/usr/bin/env node
var Mandlebrot = require('./mandlebrot');
var AsciiCanvas = require('./ascii_canvas');
//##############################################################################
var m = new Mandlebrot(-2,1,-1,1),
    c = new AsciiCanvas(195,65),
    i = 1;

var run = function () {
  m.compute(i, c);
  c.display();
  i+=1;
  if (i <= 50) {
    setTimeout(run, 250);
  }
}
run();
