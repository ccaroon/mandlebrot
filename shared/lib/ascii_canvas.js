var chalk    = require('chalk'),
    colorMap = ['black', 'red', 'green', 'yellow', 'blue', 'magenta','cyan','white','gray'];
//##############################################################################
function AsciiCanvas (w, h) {
  this.width  = w;
  this.height = h;

  this.plane = [];

  this._init();
}
//##############################################################################
AsciiCanvas.prototype._init = function (value) {
  var r, c;

  if (value === undefined) {
    value = ' ';
  }

  for (r = 0; r < this.height; r+=1) {
    this.plane[r] = [];
    for (c = 0; c < this.width; c+=1) {
      this.plane[r][c] = value;
    }
  }

};
//##############################################################################
AsciiCanvas.prototype.clear = function (value) {
  this._init(value);
};
//##############################################################################
AsciiCanvas.prototype.set = function (r,c,value) {
  // var color = value % 7 + 30;
  var color = value % 9;

  // this.plane[r][c] = "\033[1;"+color+"m+\033[0m";
  this.plane[r][c] = chalk[colorMap[color]]('+');
};
//##############################################################################
AsciiCanvas.prototype.display = function () {
  var r, c;

  for (r = 0; r < this.height; r+=1) {
    var row = '';
    for (c = 0; c < this.width; c+=1) {
      row += this.plane[r][c];
    }
    console.log(row);
  }

};
//##############################################################################
module.exports = AsciiCanvas;
