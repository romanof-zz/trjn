'use strict';

angular.module('core', [])
  .factory("UIHelper", function MapFactory() {
    return {
      initMap: function(id = 'map') {
        var map = L.map(id, {
          doubleClickZoom: false
        });

        L.tileLayer("http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg", {
          "attribution":  [
                          'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
                          'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                          'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
                      ].join(""),
            minZoom: 3,
            maxZoom: 18,
        }).addTo(map);

        var bounds = L.latLngBounds(
          L.latLng(-89.98155760646617, -180) /* south-west */,
          L.latLng(89.99346179538875, 180) /* north-east */);

        map.setMaxBounds(bounds);
        map.on('drag', function() {
            map.panInsideBounds(bounds, { animate: false });
        });

        return map;
      },

      transitType: function(type) {
        self.types = [
          /* 0 */ "walk",
          /* 1 */ "public transport",
          /* 2 */ "private transport",
          /* 3 */ "airplane",
        ];
        return self.types[type];
      }
   }
 });
