'use strict';

angular.
  module('core.service').
  factory('Transit', ['$resource',
    function($resource) {
      return $resource('/transits/:id');
    }
  ]);
