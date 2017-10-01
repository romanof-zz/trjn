$(document).ready(function() {
  var map = L.map('mapid', {
               doubleClickZoom: false
             })
             .locate({
               setView: true,
               maxZoom: 5
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

  var southWest = L.latLng(-89.98155760646617, -180),
      northEast = L.latLng(89.99346179538875, 180);
  var bounds = L.latLngBounds(southWest, northEast);
  map.setMaxBounds(bounds);
  map.on('drag', function() {
      map.panInsideBounds(bounds, { animate: false });
  });

  $.get('/journeys/geojson', function(data) {
    L.geoJSON(data, {
        onEachFeature: function(feature, layer) {
          if (feature.properties) {
            var text = feature.properties.title + "<br />" +
                       feature.properties.budget + "$<br />" +
                       feature.properties.duration + " days";
            layer.bindPopup(text);
          }
        }
    }).addTo(map);
  });
});
