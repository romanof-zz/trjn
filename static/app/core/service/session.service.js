'use strict';

angular.
  module('core.service').
  factory('Session', ['$resource',
    function($resource) {
      return $resource('/sessions/:id');
    }
  ]);
