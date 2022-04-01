import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

// Angular maerial ui
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
// firebaseTs
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
// angularx-social-links

import {SocialLoginModule,SocialAuthServiceConfig,} from 'angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from 'angularx-social-login';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
import { EmailVerificationComponent } from './pages/email-verification/email-verification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostsComponent } from './components/posts/posts.component';
import { ReplyComponent } from './components/reply/reply.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserPostsComponent } from './pages/user-posts/user-posts.component';

const AngularMaterial = [MatButtonModule, MatBottomSheetModule, MatCardModule , MatDialogModule , MatIconModule];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AuthenticatorComponent,
    EmailVerificationComponent,
    ProfileComponent,
    PostFeedComponent,
    CreatePostComponent,
    PostsComponent,
    ReplyComponent,
    UserProfileComponent,
    UserPostsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    AppRoutingModule,
    ...AngularMaterial,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '38699432267-6ouj12nu0gpa8kcoofsojps6v24e9s5p.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('645973376521929')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    FirebaseTSApp.init(environment.firebaseConfig);
  }
}
