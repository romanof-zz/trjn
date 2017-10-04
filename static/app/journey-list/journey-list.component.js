'use strict';

angular.
  module('journeyList').
  component('journeyList', {
    templateUrl: 'app/journey-list/journey-list.template.html',
    controller: ['Journey', 'UIHelper',
      function JourneyListController(Journey, UIHelper) {
        self = this;

        self.map = UIHelper.initMap();
        self.map.locate({
          setView: true,
          maxZoom: 1
        });

        self.journeys = Journey.query(function() {
          L.geoJSON(self.journeys, {
              onEachFeature: function(journey, layer) {
                if (journey.properties) {
                  var text = '<a href="#!/journeys/' + journey.properties.id + '">' +
                  journey.properties.title + '</a>' +
                  '<p><span class="budget">' + journey.properties.budget + '$</span> for ' +
                  journey.properties.duration + ' days</p>';
                  layer.bindPopup(text);
                }
              }
          }).addTo(self.map);
        });
      }
    ]
  });
