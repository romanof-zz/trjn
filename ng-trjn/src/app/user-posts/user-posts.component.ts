import { Component, OnInit } from '@angular/core';

import { Post } from '../common/post';
import { PostService } from '../common/post.service';
import { listAnimation } from './user-posts.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  animations: [listAnimation]
})
export class UserPostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router
  ) { }

  ngOnInit() { }

  getUserPosts(userId: string) {
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

  navigateToDetails(postId: string) {
    this.router.navigate(['/posts/' + postId]);
  }

  userPostsMouseEnter(event:any) {
    event.target.classList.add("highlighted");
  }

  userPostsMouseLeave(event:any) {
    event.target.classList.remove("highlighted");
  }
}
