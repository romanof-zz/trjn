'use strict';

angular.
  module('journeyDetail').
  component('journeyDetail', {
    templateUrl: 'app/journey-detail/journey-detail.template.html',
    controller: ['$routeParams', 'Journey', 'User', 'Milestone', 'MapFactory',
      function JourneyDetailController($routeParams, Journey, User, Milestone, MapFactory) {
        var self = this;

        self.map = MapFactory.init();

        self.setSelectedMilestone = function(id) {
          self.selected_milestone = Milestone.get({id: id}, function(m) {
            $(".geo-milestone").removeClass("selected");
            $(".geo-milestone-" + m.position).addClass("selected");
            $(".milestone").removeClass("selected");
            $(".milestone-" + m.position).addClass("selected");
          });
        };

        self.journey = Journey.get({id: $routeParams.journeyId},
          function(data) {
            self.author = User.get({id: data['author_id']});
            self.milestones = Milestone.query({journey_id: $routeParams.journeyId}, function(data) {
              L.geoJSON(self.milestones, {
                pointToLayer: function (milestone, latlng) {
                    var marker = L.marker(latlng, {icon: L.divIcon({
                      iconSize: new L.Point(30,30),
                      className: "geo-milestone geo-milestone-" + milestone.properties.position,
                      html: milestone.properties.position
                    })});
                    marker.on("click", function() {
                      self.setSelectedMilestone(milestone.properties.id);
                    });

                    return marker;
                }
              }).addTo(self.map);

              // set map view to the journey.
              var lnt = self.journey.location.split(',');
              self.map.setView(new L.LatLng(lnt[0], lnt[1]), 7);

              // set first milestone as current.
              self.setSelectedMilestone(self.milestones[0].properties.id);
            });
          });
      }
    ]
  });
