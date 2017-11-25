import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  userName: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('userName');
  }
}
