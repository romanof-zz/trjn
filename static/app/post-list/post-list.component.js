'use strict';

angular.
  module('postList').
  component('postList', {
    templateUrl: 'app/post-list/post-list.template.html',
    controller: ['Post',
      function PostListController(Post) {
        self = this;
        self.posts = Post.query();
      }
    ]
  });
