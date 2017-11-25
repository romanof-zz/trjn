import { Component, OnInit } from '@angular/core';

import { Post } from '../common/post';
import { PostService } from '../common/post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() { }

  getUserPosts(userId: number) {
    this.postService.getPosts(userId)
      .subscribe(posts =>  {
        for (var post of posts) {
          var div = document.createElement("div")
          div.innerHTML = post.text
          post.short_text = div.innerText.split(/\s+/).slice(0,50).join(" ") + " ..."
        }
        this.posts = posts
      });
  }
}
