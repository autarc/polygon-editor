/**
 *  Editor
 *  ======
 *
 *
 */

/**
 *  [Editor description]
 *
 *  @param {[type]} id     [description]
 *  @param {[type]} width  [description]
 *  @param {[type]} height [description]
 */
var Editor = function ( id, width, height )  {

  this.parent = document.getElementById(id);

  this.width  = width  || this.parent.offsetWidth;
  this.height = height || this.parent.offsetHeight;

  this.elements = [];
  this.active   = null;

  this.initCanvas(id);
  this.setupHandler();

  this.render();
};


/**
 *  [initCanvas description]
 *
 *  @param  {[type]} id [description]
 */
Editor.prototype.initCanvas = function ( id ) {

  var cvs = document.createElement('canvas');

  cvs.width  = this.width;
  cvs.height = this.height;

  this.cvs = cvs;
  this.ctx = cvs.getContext('2d');

  this.parent.appendChild(cvs);
};

/**
 *  [setupHandler description]
 */
Editor.prototype.setupHandler = function(){

  var posContainer = document.getElementById('position-container');

  var input  = utils.input,
      getPos = utils.getPos,
      getDistance = utils.getDistance;

  var cvs = this.cvs,
      cx = cvs.width/2,
      cy = cvs.height/2;

  this.handler = {
    'start': start.bind(this),
    'drag':  drag.bind(this),
    'move':  move.bind(this),
    'end':   end.bind(this)
  };

  cvs.addEventListener(input.move,  this.handler.move );
  cvs.addEventListener(input.start, this.handler.start );
  cvs.addEventListener(input.end,   this.handler.end   );

  /** **/
  function move (e) {

    var pos = getPos(e, cx, cy);

    posContainer.textContent = [ 'P ( ', pos.x, ' | ' , pos.y, ' )' ].join('');

    this.focus = this.getElement(pos); // mat

    this.cvs.style.cursor = this.focus ? 'pointer' : 'default';

    if ( this.active ) this.handler.drag(e);
  }


  /** **/
  function start (e) {

    if ( this.focus ) {
      this.active = this.focus;
      return;
    }



    // insert an additional point
    var size = 2;

    var pos = getPos(e);
    var px = this.ctx.getImageData(pos.x - size, pos.y - size, 1 + size, 1 + size).data;

    var valid = false;
    for ( var i = 0, l = px.length; i < l; i++ ) {

      if ( px[i] === 255 ) {
        valid = true;
        break;
      }
    }
    if (!valid ) return;  // raw data lookup

    // TODO:  insert != nearest points, but connected
    pos = { 'x': pos.x - cx, 'y': pos.y - cy };

    var poly = this.elements[0];

    // var ranking = Object.create(null),
    //     dist;

    // var order = poly.points.map(function (point, i) {
    //   dist = getDistance(pos, point);
    //   ranking[dist] = i;
    //   return dist;
    // }).sort(function (curr, next) {
    //   return curr - next;
    // });

    // var prev = ranking[order[0]],
    //     next = ranking[order[1]];

    poly.insertPoint(pos);
  }


  /** **/
  function drag (e) {

    var pos = getPos(e, cx, cy);

    this.active.update(pos);
  }

  /** **/
  function end (e) {
    this.active = null;
  }


};

/**
 *  [getElement description]
 *
 *  @param  {[type]} pos [description]
 */
Editor.prototype.getElement = function (pos) {

  var matches = [];

  this.elements.forEach(function (element) {
    matches.push.apply(matches, element.getElements(pos) );
  });

  return matches[0];
};

/**
 *  [load description]
 *
 *  @param  {[type]} data [description]
 */
Editor.prototype.load = function ( data ) {

  this.elements.length = 0;

  var poly = new Polygon(data);

  this.elements.push(poly);
};

/**
 *  [render description]
 */
Editor.prototype.render = function(){

  loop.call(this);

  function loop(){

    this.clear();

    this.draw();

    requestAnimationFrame( loop.bind(this) );
  }
};

/**
 *  [clear description]
 */
Editor.prototype.clear = function(){

  var cx = this.cvs.width/2,
      cy = this.cvs.height/2;

  var ctx = this.ctx;

  ctx.clearRect(0, 0, this.width, this.height);

  var length = 4;

  ctx.beginPath();
  ctx.moveTo(cx - length, cy         );
  ctx.lineTo(cx + length, cy         );
  ctx.moveTo(cx         , cy - length);
  ctx.lineTo(cx         , cy + length);
  ctx.closePath();

  ctx.strokeStyle = '#111';
  ctx.stroke();
};

/**
 *  [draw description]
 */
Editor.prototype.draw = function(){

  var ctx = this.ctx;

  this.elements.forEach(function (element) {
    element.draw(ctx);
  });
};
