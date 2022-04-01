import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { HomeComponent } from './pages/home/home.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },

  {path:"home" , component:HomeComponent},
  {path: "emailVerify",canActivate:[AuthGuard], component: EmailVerificationComponent},
  {path: "postfeed",canActivate:[AuthGuard], component: PostFeedComponent},
  {path: "userprofile",canActivate:[AuthGuard], component: UserProfileComponent},
  {path: "userPosts",canActivate:[AuthGuard], component: UserPostsComponent},
  {
    path: '**',
    redirectTo: '',
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
