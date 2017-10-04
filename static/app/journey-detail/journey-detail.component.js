'use strict';

angular.
  module('journeyDetail').
  component('journeyDetail', {
    templateUrl: 'app/journey-detail/journey-detail.template.html',
    controller: ['$routeParams', '$filter', 'Journey', 'User', 'Milestone', 'Transit', 'UIHelper',
      function JourneyDetailController($routeParams, $filter, Journey, User, Milestone, Transit, UIHelper) {
        var self = this;

        self.uihelper = UIHelper;
        self.map = UIHelper.initMap();

        self.setSelectedMilestone = function(id) {
          self.selected_milestone = Milestone.get({id: id}, function(m) {
            angular.element(document.querySelectorAll(".geo-milestone")).removeClass("selected");
            angular.element(document.querySelector(".geo-milestone-" + m.position)).addClass("selected");
            angular.element(document.querySelectorAll(".milestone")).removeClass("selected");
            angular.element(document.querySelector(".milestone-" + m.position)).addClass("selected");
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

              // load transits between milestones.
              self.transits = [];
              Transit.query({journey_id: $routeParams.journeyId}, function (transits) {
                angular.forEach(transits, function(transit, key) {
                  var start_milestone = $filter('filter')(self.milestones, {'properties': {'id':transit.start_milestone_id}})[0];
                  var end_milestone = $filter('filter')(self.milestones, {'properties': {'id':transit.end_milestone_id}})[0];
                  self.transits[start_milestone.properties.position] = transit;

                  var latlngs = [];
                  latlngs.push(new L.LatLng(start_milestone.geometry.coordinates[1],
                                            start_milestone.geometry.coordinates[0]));
                  latlngs.push(new L.LatLng(end_milestone.geometry.coordinates[1],
                                            end_milestone.geometry.coordinates[0]));


                  L.polyline(latlngs).addTo(self.map);
                });
              });
            });
          });
      }
    ]
  });
