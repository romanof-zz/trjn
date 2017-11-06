'use strict';

angular.
  module('postDetail').
  component('postDetail', {
    templateUrl: 'app/post-detail/post-detail.template.html',
    controller: ['$routeParams', 'Post', 
      function PostDetailController($routeParams, Post) {
        self = this;
        self.post = Post.get({id: $routeParams.postId});
      }
    ]
  });
