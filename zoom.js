#!/usr/bin/env node
var Mandlebrot = require('./mandlebrot');
var AsciiCanvas = require('./ascii_canvas');
//##############################################################################
var m = new Mandlebrot(-1, 1, -1, 1),
    p = new AsciiCanvas(160,60);

m.compute(100, p);
p.display();
