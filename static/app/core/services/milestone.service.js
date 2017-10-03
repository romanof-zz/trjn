'use strict';

angular.
  module('core.services').
  factory('Milestone', ['$resource',
    function($resource) {
      return $resource('/milestones/:id');
    }
  ]);
