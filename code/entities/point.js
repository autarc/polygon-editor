/**
 *  Point
 *  =====
 *
 *
 */

/**
 *  [Point description]
 *
 *  @param {[type]} coords [description]
 *  @param {[type]} size   [description]
 */
var Point = function (coords, size) {

  this.r = size || 10;

  this.x = coords.x;
  this.y = coords.y;
};

/**
 *  [update description]
 *
 *  @param  {[type]} pos [description]
 */
Point.prototype.update = function (pos) {

  this.setOrigin(pos);

  this.x = pos.x;
  this.y = pos.y;
};

/**
 *  [draw description]
 *
 *  @param  {[type]} ctx [description]
 */
Point.prototype.draw = function (ctx) {

  var cvs = ctx.canvas;

  var cx = cvs.width/2,
      cy = cvs.height/2;

  ctx.beginPath();
  ctx.arc(cx + this.x, cy + this.y, this.r, 0, Math.PI * 2, true);
  ctx.closePath();

  ctx.fillStyle = 'red';
  ctx.fill();
};
