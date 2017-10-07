'use strict';

angular.
  module('userMenu').
  component('userMenu', {
    templateUrl: 'app/user-menu/user-menu.template.html',
    controller: ['$auth', '$scope', 'Session', function UserMenuController($auth, $scope, Session) {
      self = this;
      self.authenticate = $auth.authenticate;

      self.logout = function () {
        Session.delete({id: $auth.getToken()}, function() {}, function() {});
        $auth.logout();
      };

      $scope.isAuthenticated = function() {
        if ($auth.isAuthenticated()) {
          if(!$scope.currentUser) {
            $scope.currentUser = Session.get({id: $auth.getToken()})
          }
          return true;
        }
        return false;
      };
    }]
  });
