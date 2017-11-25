import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postId: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId');
  }
}
