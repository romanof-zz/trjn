'use strict';

angular.
  module('core.service').
  factory('Post', ['$resource',
    function($resource) {
      return $resource('/posts/:id');
    }
  ]);
