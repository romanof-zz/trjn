'use strict';

angular.
  module('journeyDetail').
  component('journeyDetail', {
    templateUrl: 'app/journey-detail/journey-detail.template.html',
    controller: ['$routeParams', 'Journey', 'User', 'Milestone', 'MapFactory',
      function JourneyDetailController($routeParams, Journey, User, Milestone, MapFactory) {
        var self = this;

        self.map = MapFactory.init();

        self.journey = Journey.get({id: $routeParams.journeyId},
          function(data) {
            self.author = User.get({id: data['author_id']});
            self.milestones = Milestone.query({journey_id: $routeParams.journeyId}, function(data) {
              L.geoJSON(self.milestones, {
                pointToLayer: function (milestone, latlng) {
                    var cName = "geo-milestone";
                    if (milestone.properties.position.toString() == $routeParams.milestone) {
                      self.selected_milestone = milestone;
                      cName = cName.concat(" selected");
                    }

                    return L.marker(latlng, {icon: L.divIcon({
                      iconSize: new L.Point(30,30),
                      className: cName,
                      html: milestone.properties.position
                    })});
                }
              }).addTo(self.map);
              var lnt = self.journey.location.split(',');
              self.map.setView(new L.LatLng(lnt[0], lnt[1]), 7);

            });
          });
      }
    ]
  });
