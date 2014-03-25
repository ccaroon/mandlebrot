#!/usr/bin/env node
var Mandlebrot  = require('../lib/mandlebrot');
var AsciiCanvas = require('../../shared/lib/ascii_canvas');
//##############################################################################
var m = new Mandlebrot(-2,1,-1,1),
    c = new AsciiCanvas(195,65);

m.compute(150, c);
c.display();
