#!/usr/bin/env node
var Mandlebrot = require('./mandlebrot');
var AsciiCanvas = require('./ascii_canvas');
//##############################################################################
var m = new Mandlebrot(-2,1,-1,1),
    c = new AsciiCanvas(195,65);

m.compute(150, c);
c.display();
