'use strict';

angular.
  module('trjn').
  config(['$locationProvider' ,'$routeProvider', "$authProvider",
    function config($locationProvider, $routeProvider, $authProvider) {
      $locationProvider.hashPrefix('!');

      $authProvider.google({
        clientId: '385523340115-3ru32knhjjf8jpe537m2v26btsvuiqn9.apps.googleusercontent.com'
      });

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
