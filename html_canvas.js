function HtmlCanvas (elementId) {
  var c = document.getElementById(elementId);

  this.width  = c.width;
  this.height = c.height;
  this.ctx    = c.getContext("2d");
}

HtmlCanvas.prototype.set = function(x,y,color) {
  color = color % 255;
  this.ctx.fillStyle = "#"+color.toString(16)+color.toString(16)+color.toString(16);

  this.ctx.fillRect(y,x,1,1);
}
