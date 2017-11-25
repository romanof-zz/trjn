import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Post } from './post';

import { environment } from '../../environments/environment';

@Injectable()
export class PostService {
  private postUrl = environment.urlRoot + 'posts';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  getPosts(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}?author=${userId}`);
  }

  getPost(postId: number): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${postId}`);
  }
}
