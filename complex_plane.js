//############################################################################
function ComplexPlane (w, h) {
  this.width  = w;
  this.height = h;

  this.plane = [];

  this._init();
}
//############################################################################
ComplexPlane.prototype._init = function () {
  var r, c;

  for (r = 0; r < this.height; r+=1) {
    this.plane[r] = [];
    for (c = 0; c < this.width; c+=1) {
      this.plane[r][c] = ' ';
    }
  }

};
//############################################################################
ComplexPlane.prototype.set = function (x,y,value) {
  // var r, c;
  this.plane[x][y] = value;
};
//############################################################################
ComplexPlane.prototype.display = function () {
  var r, c;

  for (r = 0; r < this.height; r+=1) {
    var row = '';
    for (c = 0; c < this.width; c+=1) {
      row += this.plane[r][c];
    }
    console.log(row);
  }

};
// ############################################################################
module.exports = ComplexPlane;
