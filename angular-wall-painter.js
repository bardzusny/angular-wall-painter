(function() {
  'use strict';

  var wallPainterDirective = function() {
    var directive = {
      restrict: 'E',
      template: '' +
        '<div class="wall-painter-container" ng-class="{\'paint-above-image\': paintAboveImage}">' +
        '<img ng-src="{{ imageUrl }}">' +
        '<canvas class="walls" />' +
        '<canvas class="windows" />' +
        '</div>',
      replace: true,
      scope: {
        wallPainterImg: '@',
        wallPainterWalls: '@',
        wallPainterColors: '@',
        wallPainterWindows: '@',
        wallPainterPaintAboveImage: '@'
      },
      link: function(scope, elem) {
        var walls = JSON.parse(scope.wallPainterWalls);
        var windows = scope.wallPainterWindows ? JSON.parse(scope.wallPainterWindows) : [];
        var colors = JSON.parse(scope.wallPainterColors);

        var imgElem = elem.find('img')[0];
        var baseCanvasElem = elem.find('canvas')[0];
        var windowsCanvasElem = elem.find('canvas')[1];
        var bc = baseCanvasElem.getContext('2d'); // base canvas - for walls
        var wc = windowsCanvasElem.getContext('2d'); // canvas for windows

        var colorsWatch = scope.$watch('wallPainterColors', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            colors = JSON.parse(newVal);
            bc.clearRect(0, 0, baseCanvasElem.width, baseCanvasElem.height);
            paintWalls();
          }
        });

        scope.paintAboveImage = scope.wallPainterPaintAboveImage;
        scope.imageUrl = scope.wallPainterImg;

        imgElem.onload = function() {
          baseCanvasElem.width = imgElem.width;
          baseCanvasElem.height = imgElem.height;
          windowsCanvasElem.width = imgElem.width;
          windowsCanvasElem.height = imgElem.height;

          paintWalls();
          buildWindows();
        };

        scope.$on('$destroy', function() {
          colorsWatch();
        });

        function paintWalls() {
          walls.forEach(function(points, wallIndex) {
            bc.fillStyle = colors[wallIndex];
            bc.beginPath();

            points.forEach(function(point, pointIndex) {
              if (pointIndex === 0) {
                bc.moveTo(point[0], point[1]);
              } else {
                bc.lineTo(point[0], point[1]);
              }
            });

            bc.closePath();
            bc.fill();
          });
        }

        function buildWindows() {
          windows.forEach(function(points) {
            wc.save();
            wc.beginPath();

            points.forEach(function(point, pointIndex) {
              if (pointIndex === 0) {
                wc.moveTo(point[0], point[1]);
              } else {
                wc.lineTo(point[0], point[1]);
              }
            });

            wc.closePath();

            wc.clip();
            wc.drawImage(imgElem, 0, 0);

            wc.restore();
          });
        }
      }
    };

    return directive;
  };

  angular.module('angular-wall-painter', [])
    .directive('wallPainter', wallPainterDirective);

})();
