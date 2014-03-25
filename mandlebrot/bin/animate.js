#!/usr/bin/env node
var Mandlebrot  = require('../lib/mandlebrot');
var AsciiCanvas = require('../../shared/lib/ascii_canvas');
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
