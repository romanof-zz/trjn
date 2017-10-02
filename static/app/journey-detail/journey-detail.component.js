'use strict';

angular.
  module('journeyDetail').
  component('journeyDetail', {
    templateUrl: 'app/journey-detail/journey-detail.template.html',
    controller: ['$routeParams', 'Journey', 'User',
      function JourneyDetailController($routeParams, Journey, User) {
        var self = this;
        self.journey = Journey.get({id: $routeParams.journeyId},
          function(data) {
            self.author = User.get({id: data['author_id']});
          });
      }
    ]
  });
