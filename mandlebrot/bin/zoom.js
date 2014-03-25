#!/usr/bin/env node
var Mandlebrot  = require('../lib/mandlebrot');
var AsciiCanvas = require('../../shared/lib/ascii_canvas');
//##############################################################################
var m = new Mandlebrot(-1, 1, -1, 1),
    p = new AsciiCanvas(160,60);

m.compute(100, p);
p.display();
