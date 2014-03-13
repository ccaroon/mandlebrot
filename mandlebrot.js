var ComplexPlane = require('./complex_plane');
//##############################################################################
function Mandlebrot(xMin, xMax, yMin, yMax) {
  this.xMin = xMin;
  this.xMax = xMax;
  this.yMin = yMin;
  this.yMax = yMax;
}
//##############################################################################
Mandlebrot.prototype.compute = function (iterations, plane) {
  var x,y;
  var xstep, ystep;
  var z,zi,newz,newzi;
  var colour;
  var col;
  var i,j,k;
  var inset;

  /* these are used for calculating the points corresponding to the pixels */
  xstep = (this.xMax-this.xMin)/plane.width;
  ystep = (this.yMax-this.yMin)/plane.height;

  x = this.xMin;
  y = this.yMin;
  for (i=0; i<plane.height; i++)
  {
    for (j=0; j<plane.width; j++)
    {
      z = 0;
      zi = 0;
      inset = 1;
      for (k=0; k<iterations; k++)
      {
        /* z^2 = (a+bi)(a+bi) = a^2 + 2abi - b^2 */
        newz = (z*z)-(zi*zi) + x;
        newzi = 2*z*zi + y;
        z = newz;
        zi = newzi;
        if( ((z*z)+(zi*zi)) > 4 )
        {
          inset = 0;
          colour = k;
          k = iterations;
        }
      }
      if (inset)
      {
        plane.set(i,j,'*');
      }
      else
      { 
        plane.set(i,j,' ');
      }
      x += xstep;
    }
    y += ystep;
    x = this.xMin;
  }
}
//##############################################################################

var m = new Mandlebrot(-2,1,-1,1);
var p = new ComplexPlane(160,60);

m.compute(200, p);
p.display();
