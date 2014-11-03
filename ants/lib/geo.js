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

    this.top    = new Line(new Point(x,y), new Point(w,y));
    this.right  = new Line(new Point(w,y), new Point(w,h));
    this.bottom = new Line(new Point(w,h), new Point(x,h));
    this.left   = new Line(new Point(x,h), new Point(x,y));

    this.sides = [this.top, this.right, this.bottom, this.left];
}
