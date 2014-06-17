/**
 *  Polygon
 *  =======
 *
 *
 */

var Polygon = function (file) {

  this.file = file;
  this.elements = [];

  this.initPoints();
};


/**
 *  [initPoints description]
 *  Extend each point to update their reference in the original dataset.
 *  @return {[type]} [description]
 */
Polygon.prototype.initPoints = function(){

  var data = this.file.data;

  var points = data.points.map(function (coords, i) {

    var point = new Point(coords);
    point.setOrigin = function (point) {
      data.points[i] = point;
    };

    return point;
  });

  // this.rays   = rays;
  this.points = points;

  this.elements.push.apply(this.elements, points);
};


Polygon.prototype.insertPoint = function (pos) {

  var point = new Point(pos),
      data  = this.file.data,
      index = data.points.length;

  point.setOrigin = function (point) {
    data.points[index] = point;
  };

  data.points.push(pos);
  this.points.push(point);
  this.elements.push(point);
};


/**
 *  [getElements description]
 *
 *  @param  {[type]} pos [description]
 */
Polygon.prototype.getElements = function (pos) {

  var matches = [],
      point;

  for ( var i = 0, l = this.points.length; i < l; i++ ){

    point = this.points[i];

    if ( pos.x           > point.x + point.r ||
         pos.x + point.r < point.x           ||   // pos.x + pos.w
         pos.y           > point.y + point.r ||
         pos.y + point.r < point.y
      ) continue;

    matches.push(point);
  }

  return matches;
};


/**
 *  [draw description]
 *  @param  {[type]} ctx [description]
 *  @return {[type]}     [description]
 */
Polygon.prototype.draw = function (ctx) {

  var cvs = ctx.canvas;

  var cx = cvs.width/2,
      cy = cvs.height/2;


  ctx.beginPath();

  this.points.forEach(function (point) {

    var posX = cx + point.x,
        posY = cy + point.y;

    ctx.lineTo(posX, posY);
  });

  ctx.closePath();

  ctx.strokeStyle = '#FFF';
  ctx.stroke();

  // sub-elements
  this.elements.forEach(function (element) {
    element.draw(ctx);
  });

};
