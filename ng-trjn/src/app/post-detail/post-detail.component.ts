import { Component, OnInit, Host } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AppComponent } from '../app.component';
import { Post } from '../common/post';
import { PostService } from '../common/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  post: Post;
  backUrl: string;

  constructor(
    @Host() private app: AppComponent,
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.backUrl = app.previousUrl
  }

  ngOnInit() {
    this.postService.getPost(this.route.snapshot.paramMap.get('postId'))
      .subscribe(post => this.post = post);
  }
}
