'use strict';

angular.
  module('trjn').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/journeys', {
          template: '<journey-list></journey-list>'
        }).
        when('/journeys/:journeyId', {
          template: '<journey-detail></journey-detail>'
        }).
        otherwise('/journeys');
    }
  ]);
