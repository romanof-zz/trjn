'use strict';

angular.
  module('core.service').
  factory('User', ['$resource',
    function($resource) {
      return $resource('/users/:id');
    }
  ]);
