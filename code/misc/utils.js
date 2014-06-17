/**
 *  Utilities
 *  =========
 *
 *
 */

var utils = (function(){

  /** check input events **/
  var supportTouch = !!('ontouchstart' in window || navigator.msMaxTouchPoints > 0);

  var input = {

    'select': supportTouch ? 'touchdown' : 'click',
    'start': supportTouch  ? 'touchdown' : 'mousedown',
    'move':  supportTouch  ? 'touchmove' : 'mousemove',
    'end':   supportTouch  ? 'touchend'  : 'mouseup'
  };

  /**
   *  Transform relative coordinates and regards optional offsets.
   *
   *  @param  {[type]} e       [description]
   *  @param  {[type]} offsetX [description]
   *  @param  {[type]} offsetY [description]
   */
  function getPos (e, offsetX, offsetY) {

    var src = e.currentTarget,
        el  = src;

    var totalOffsetX = offsetX || 0,
        totalOffsetY = offsetY || 0;

    do {

      totalOffsetX += el.offsetLeft;
      totalOffsetY += el.offsetTop;

    } while ( el = el.offsetParent );

    var posX = e.pageX - totalOffsetX,
        posY = e.pageY - totalOffsetY;

    return {
      'x': posX,
      'y': posY
    };
  }


  /**
   *  [getDistance description]
   *
   *  @param  {[type]} src  [description]
   *  @param  {[type]} dest [description]
   */
  var abs = Math.abs;

  function getDistance ( src, dest ) {
    return abs( src.x - dest.x ) + abs( src.y - dest.y ) + abs( src.x + src.y - dest.x - dest.y ) >> 1;
  }


  return {

    input:  input,
    getPos: getPos,
    getDistance: getDistance
  };


})();
