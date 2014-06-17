/**
 *  Adapter
 *  =======
 *
 *
 */

(function(win){

  /**
   *  performance
   */
  if ( !win.performance ) {
    win.performance = { now: Date().now() };
  } else if ( !win.performance.now ) {
    win.performance.now = win.performance.webkitNow;
  }

  /**
   *  URL
   */
  if ( !win.URL ) {
    win.URL = win.webkitURL || win.msURL || win.oURL;
  }

  /**
   *  animationFrame
   */
  if ( !win.requestAnimationFrame ) {

    var vendors = [ 'webkit', 'moz' ];

    for ( var i = 0, l = vendors.length; i < l && !win.requestAnimationFrame; i++ ) {

      win.requestAnimationFrame = win[ vendors[i] + 'RequestAnimationFrame' ];
      win.cancelAnimationFrame  = win[ vendors[i] + 'CancelAnimationFrame' ]        ||
                                  win[ vendors[i] + 'CancelRequestAnimationFrame' ];
    }
  }

  /**
   *  Blob
   */
  if ( !win.Blob ) {
    throw new Error('Your browser not supported. Please upgrade to a modern version!');
  }

})(window);
