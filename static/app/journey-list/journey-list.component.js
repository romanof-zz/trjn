'use strict';

angular.
  module('journeyList').
  component('journeyList', {
    templateUrl: 'app/journey-list/journey-list.template.html',
    controller: ['Journey',
      function JourneyListController(Journey) {
        self = this;

        self.map = L.map('mapid', {
          doubleClickZoom: false
        })
        .locate({
          setView: true,
          maxZoom: 4
        });

        L.tileLayer("http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg", {
          "attribution":  [
                          'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, ',
                          'Data by <a href="http://openstreetmap.org/">OpenStreetMap</a>, ',
                          'under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
                      ].join(""),
            minZoom: 3,
            maxZoom: 18,
        }).addTo(self.map);

        self.bounds = L.latLngBounds(
          L.latLng(-89.98155760646617, -180) /* south-west */,
          L.latLng(89.99346179538875, 180) /* north-east */);
        self.map.setMaxBounds(self.bounds);
        self.map.on('drag', function() {
            self.map.panInsideBounds(self.bounds, { animate: false });
        });


        self.journeys = Journey.query(function() {
          L.geoJSON(self.journeys, {
              onEachFeature: function(feature, layer) {
                if (feature.properties) {
                  var text = feature.properties.title + "<br />" +
                             feature.properties.budget + "$<br />" +
                             feature.properties.duration + " days";
                  layer.bindPopup(text);
                }
              }
          }).addTo(self.map);

        });
      }
    ]
  });