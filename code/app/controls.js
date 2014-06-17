/**
 *  Controls
 *  ========
 *
 *
 */

/**
 *  Control input handling for buttons etc.
 *
 *  @param  {[type]} editor [description]
 */
function setupControls (editor) {

  // references
  var loadButton    = document.getElementById('load-btn'),
      saveButton    = document.getElementById('save-btn'),
      exampleButton = document.getElementById('example-btn');

  // current
  var file;

  // handler
  loadButton.addEventListener('change', function (e) {

    var src  = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {

      file = {
        'name': src.name,
        'data': JSON.parse(reader.result),
        'modified': 0
      };

      editor.load(file);
    };

    reader.readAsText(src);
  });

  saveButton.addEventListener(utils.input.select, function (e) {

    if ( !file ) return alert("Load some data first!");

    var link = document.createElement('a'),
        blob = new Blob([ JSON.stringify(file.data) ], { type: 'application/json' }),
        url  = URL.createObjectURL(blob);

    file.modified += 1;

    link.setAttribute('download', file.modified + '-' + file.name );
    link.setAttribute('href', url );

    link.dispatchEvent(new Event(utils.input.select) );
    URL.revokeObjectURL(url);
  });

  exampleButton.addEventListener(utils.input.select, function (e) {

    file = {
      'name': 'example.json',
      'data': {
        "points": [

          /** simple **/

          // { "x": -100,  "y": -100 },
          // { "x": -100,  "y":  100 },
          // { "x": 100,   "y":  100 },
          // { "x": 100,   "y": -100 }

          /** complex **/

          { "x": - 75,  "y": -175 },
          { "x":   75,  "y": -175 },
          { "x":  175,  "y": - 50 },
          { "x":  175,  "y":   50 },
          { "x":   75,  "y":  175 },
          { "x": - 75,  "y":  175 },
          { "x": -175,  "y":   50 },
          { "x": -175,  "y": - 50 }
        ]
      },
      'modified': 0
    };

    editor.load(file);
  });
}
