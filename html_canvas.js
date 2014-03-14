// ##############################################################################
function HtmlCanvas (elementId) {
  var c = document.getElementById(elementId);

  this.width  = c.width;
  this.height = c.height;
  this.ctx    = c.getContext("2d");

  this._gen_color_palette();
}
//##############################################################################
HtmlCanvas.prototype.set = function(x,y,value) {
  this.ctx.fillStyle = this._color_value_to_color(value);
  this.ctx.fillRect(y,x,1,1);
}
//##############################################################################
HtmlCanvas.prototype._color_value_to_grayscale = function (value) {
  var intensity,
      hexStr = (value % 256).toString(16);

  intensity = "#"+hexStr+hexStr+hexStr;

  return (intensity);
}
//##############################################################################
HtmlCanvas.prototype._color_value_to_color = function (value) {
  var pLen = this.palette.length;
  var color = this.palette[value % pLen];
  return("#"+color);
}
//##############################################################################
HtmlCanvas.prototype._gen_color_palette = function () {
  var red, green, blue, 
      i = 0,
      groups = 5,
      inc    = Math.floor(255 / groups);
  
  this.palette = [];

  for (red = 0; red <= 255; red+=inc) {
    r = red.toString(16);
    r = r.length < 2 ? '0'+r : r;
    for (green = 0; green <= 255; green+=inc) {
      g = green.toString(16);
      g = g.length < 2 ? '0'+g : g;
      for (blue = 0; blue <= 255; blue+=inc) {
        b = blue.toString(16);
        b = b.length < 2 ? '0'+b : b;
        this.palette[i] = r+g+b;
        i+=1;
      }
    }
  }
  console.log("Palette Size: "+this.palette.length);
}
//##############################################################################
HtmlCanvas.prototype._color_value_to_bw = function (value) {
  var color;

  switch (value % 2) {
    case 0: 
      color = "black";
      break;
    case 1:
      color = "white";
      break;
  }

  return (color);
}
//##############################################################################
HtmlCanvas.prototype._color_value_to_rainbow = function (value) {
  var color;

  switch (value % 8) {
    case 0: 
      color = "black";
      break;
    case 1:
      color = "red";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "yellow";
      break;
    case 4:
      color = "green";
      break;
    case 5:
      color = "blue";
      break;
    case 6:
      color = "indigo";
      break;
    case 7:
      color = "violet";
      break;
    default:
      color = "white";
      break;
  }

  return (color);
}
