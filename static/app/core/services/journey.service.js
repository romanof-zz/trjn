'use strict';

angular.
  module('core.services').
  factory('Journey', ['$resource',
    function($resource) {
      return $resource('/journeys/:id');
    }
  ]);
