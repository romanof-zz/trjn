'use strict';

angular.
  module('core.service').
  factory('Journey', ['$resource',
    function($resource) {
      return $resource('/journeys/:id');
    }
  ]);
