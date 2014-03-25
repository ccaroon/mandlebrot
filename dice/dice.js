function Dice (sides) {
  this._sides = sides;
  this.value = null;
}

Dice.prototype.roll = function () {
  this.value = Math.floor((Math.random()*this._sides)+1); 
};

module.exports = Dice;