import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserPostsComponent }   from './user-posts/user-posts.component';
import { PostDetailComponent }   from './post-detail/post-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile/romanov', pathMatch: 'full' },
  { path: 'profile/:userName', component: UserPostsComponent },
  { path: 'posts/:postId', component: PostDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}
