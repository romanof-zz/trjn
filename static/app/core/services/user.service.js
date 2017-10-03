'use strict';

angular.
  module('core.services').
  factory('User', ['$resource',
    function($resource) {
      return $resource('/users/:id');
    }
  ]);
