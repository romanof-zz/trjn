'use strict';

angular.
  module('core.service').
  factory('Milestone', ['$resource',
    function($resource) {
      return $resource('/milestones/:id');
    }
  ]);
