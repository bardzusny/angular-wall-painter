# angular-wall-painter

`angular-wall-painter` is a simple `Angular.JS` directive, allowing you to *paint* pre-defined areas (*"walls"*) within any provided image.

For now basically a sandbox project, released *"as-is"* due to time constraints.

### Installation

After installing `angular-wall-painter` package using `bower`:

````bash
bower install angular-wall-painter
````

And making sure `angular-wall-painter.js` and `angular-wall-painter.css` files are included within your `index.html` file, all you need to do is to include `angular-wall-painter` in your project dependencies:

````javascript
angular.module('project', [
  'angular-wall-painter'
]);
````

### Example usage

**Controller:**

````javascript
function MainCtrl($scope) {

  // each "wall" is an array of points
  // which themselves are arrays of given point coordinates (in px): [ x, y ]
  // all coordinates are relative to top-left corner of the provided image
  $scope.walls = [
    [
      // first wall - simple rectangle
      [ 100, 100 ],
      [ 300, 100 ],
      [ 300, 300 ],
      [ 100, 300 ]
    ], [
      // second wall
      [ 500, 500 ],
      [ 550, 500 ],
      [ 600, 550 ],
      [ 400, 400 ]
    ], [
      // third wall
      [ 800, 600 ],
      [ 900, 600 ],
      [ 850, 650 ],
    ]
  ];

  // colors - one for each defined wall
  $scope.colors = [
    'red',
    '#F27EE3',
    'rgba(102, 217, 87, 0.5)'
  ];

  // "windows" are areas excluded from being painted on
  // even if within boundaries of a "wall", each "window" area will
  // be filled with the appropriate part of the original image
  $scope.windows = [
    [
      [ 150, 150 ],
      [ 250, 150 ],
      [ 250, 250 ],
      [ 150, 250 ]
    ]
  ];

  // whether "walls" are to be painted under or above provided image
  // default value is "false", which means that all provided images 
  // must be pre-processed to have their walls made (semi-)transparent
  $scope.paintWallsAboveImage = true;
}

angular
  .module('project')
  .controller('MainCtrl', MainCtrl);

````

**view:**
````html
<wall-painter
  wall-painter-img="http://lorempixel.com/g/1000/1000"
  wall-painter-walls="{{ walls }}"
  wall-painter-colors="{{ colors }}"
  wall-painter-windows="{{ windows }}"
  wall-painter-paint-above-image="{{ paintWallsAboveImage }}"
></wall-painter>
````

**Plunker**: http://plnkr.co/edit/eEdURQTdir7p51EdGTtH?p=preview

### Dependencies

Aside from `Angular.JS` and what it provides by itself - literally none.

### Future

`angular-wall-painter` is inspired by directive used in one-page application installed on touch-screen terminals in several paint shops.

Features present in the original directive that are yet-to-be-implemented in `angular-wall-painter`:

* usage of clickable `SVG` elements, broadcasting adequate scope event upon tapping on any specific wall
* ability to **select** any specific wall
* ability to define **brushes** for specific walls - small images marking currently active wall

Other **ToDo**:

* proper README
* proper demo page
* **TESTS!** - most likely to be written using [Protractor](https://github.com/angular/protractor/)
