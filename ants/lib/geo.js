/******************************************************************************/
/* Point
/******************************************************************************/
function Point (x,y) {
    this.x = x;
    this.y = y;
}

Point.prototype.equals = function(otherPoint) {
    var samePt = false;

    if (this.x === otherPoint.x && this.y === otherPoint.y) {
        samePt = true;
    }

    return (samePt);
};
/******************************************************************************/
/* Line
/******************************************************************************/
function Line (p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
}

Line.prototype.intersectLine = function(otherLine) {
    var s1X, s1Y, s2X, s2Y, iX, iY, s, t, i = null;

    s1X = this.p2.x - this.p1.x;     
    s1Y = this.p2.y - this.p1.y;
    s2X = otherLine.p2.x - otherLine.p1.x;
    s2Y = otherLine.p2.y - otherLine.p1.y;

    s = (-s1Y * (this.p1.x - otherLine.p1.x) + s1X * (this.p1.y - otherLine.p1.y)) / (-s2X * s1Y + s1X * s2Y);
    t = ( s2X * (this.p1.y - otherLine.p1.y) - s2Y * (this.p1.x - otherLine.p1.x)) / (-s2X * s1Y + s1X * s2Y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        iX = this.p1.x + (t * s1X);
        iY = this.p1.y + (t * s1Y);
        i = new Point(iX, iY);
    }

    return (i);
};

Line.prototype.intersectRect = function(rect) {
    var i, doesIntersect = false;

    for (i = 0; i < rect.sides.length; i+=1) {
        if (this.intersectLine(rect.sides[i])) {
            doesIntersect = true;
            break;
        }
    }

    return (doesIntersect);
};
/******************************************************************************/
/* Rectangle
/******************************************************************************/
function Rectangle (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;

    this.topLeft     = new Point(x, y);
    this.topRight    = new Point(x+w, y);
    this.bottomLeft  = new Point(x, y+h);
    this.bottomRight = new Point(x+w, y+h);

    this.top    = new Line(this.topLeft,    this.topRight);
    this.right  = new Line(this.topRight,   this.bottomRight);
    this.bottom = new Line(this.bottomLeft, this.bottomRight);
    this.left   = new Line(this.topLeft,    this.bottomLeft);

    this.sides = [this.top, this.right, this.bottom, this.left];
}

Rectangle.prototype.containsPoint = function(point) {
    var containsPoint = false;

    if (point.x >= this.topLeft.x && point.x <= this.bottomRight.x &&
        point.y >= this.topLeft.y && point.y <= this.bottomRight.y) {
        containsPoint = true;
    } 

    return (containsPoint);
};
