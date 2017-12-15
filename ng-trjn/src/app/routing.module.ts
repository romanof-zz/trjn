import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPostsComponent }   from './user-posts/user-posts.component';
import { PostDetailComponent }   from './post-detail/post-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile/romanof', pathMatch: 'full' },
  { path: 'profile/:userName', component: UserPostsComponent, data: {state: 'profile'}},
  { path: 'posts/:postId', component: PostDetailComponent, data: {state: 'post'}}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
