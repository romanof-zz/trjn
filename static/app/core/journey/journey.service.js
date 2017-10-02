'use strict';

angular.
  module('core.journey').
  factory('Journey', ['$resource',
    function($resource) {
      return $resource('/journeys/:id');
    }
  ]);
