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
    var s1_x, s1_y, s2_x, s2_y, s, t, i = null;

    s1_x = this.p2.x - this.p1.x;     
    s1_y = this.p2.y - this.p1.y;
    s2_x = otherLine.p2.x - otherLine.p1.x;
    s2_y = otherLine.p2.y - otherLine.p1.y;

    s = (-s1_y * (this.p1.x - otherLine.p1.x) + s1_x * (this.p1.y - otherLine.p1.y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (this.p1.y - otherLine.p1.y) - s2_y * (this.p1.x - otherLine.p1.x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1)
    {
        // Collision detected
        i_x = this.p1.x + (t * s1_x);
        i_y = this.p1.y + (t * s1_y);
        i = new Point(i_x, i_y);
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
