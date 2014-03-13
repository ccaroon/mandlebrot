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
  var xStep, yStep;
  var z,zi,newZ,newZI;
  var colour;
  var i,j,k;
  var inSet;

  /* these are used for calculating the points corresponding to the pixels */
  xStep = (this.xMax - this.xMin) / plane.width;
  yStep = (this.yMax - this.yMin) / plane.height;

  x = this.xMin;
  y = this.yMin;
  for (i = 0; i < plane.height; i++)
  {
    for (j = 0; j < plane.width; j++)
    {
      z = 0;
      zi = 0;
      inSet = true;
      for (k = 0; k < iterations; k++)
      {
        /* z^2 = (a+bi)(a+bi) = a^2 + 2abi - b^2 */
        newZ = (z*z) - (zi*zi) + x;
        newZI = 2*z*zi + y;
        z = newZ;
        zi = newZI;
        if( ((z*z) + (zi*zi)) > 4 )
        {
          inSet = false;
          colour = k;
          k = iterations;
        }
      }

      if (inSet)
      {
        plane.set(i,j,' ');
      }
      else
      { 
        plane.set(i,j,colour%9);
      }

      x += xStep;
    }

    y += yStep;
    x = this.xMin;
  }
}
//##############################################################################
module.exports = Mandlebrot;
