import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { AuthenticatorComponent } from './components/authenticator/authenticator.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ANSocialApp';
  userHasProfile: boolean = true;
  name:any
  private static userDocument: UserDocument ;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();

  constructor(private router: Router,private _MatBottomSheet:MatBottomSheet) {
    this.auth.listenToSignInStateChanges((user) => {
      this.auth.checkSignInState({
        whenSignedIn: (user) => {
          this.getUserProfile();
        },
        whenSignedOut: (user) => {
          AppComponent.userDocument = <UserDocument> <unknown>null;
          this.router.navigate(['']);

        },
        whenSignedInAndEmailNotVerified: (user) => {
          // this.router.navigate(['emailVerify']);
        },
        whenSignedInAndEmailVerified: (user) => {
        },
        whenChanged: (user) => {},
      });
    });
  }
  ngOnInit(): void {

  }
  LogIn(){
    this._MatBottomSheet.open(AuthenticatorComponent);
  }
  onLogoutClick(){
    this.auth.signOut();
}

  loggedIn() {
    return this.auth.isSignedIn();
  }
  public static gerUserDocument() {
    return AppComponent.userDocument;
  }
  getUserProfile() {
    this.firestore.listenToDocument({
      name: 'Getting Document',
      path: ['Users', this.auth.getAuth().currentUser!.uid],
      onUpdate: (result) => {
        AppComponent.userDocument = <UserDocument>result.data();
        this.userHasProfile = result.exists;
        AppComponent.userDocument.userId =<string>this.auth.getAuth().currentUser?.uid;
        if (this.userHasProfile) {
          this.router.navigate(['postfeed']);
        }
      },
    });
  }
  getUserName() {
   try{
     return  AppComponent.userDocument.publicName
   }
   catch(err){
     return
   }
  }
}

export interface UserDocument {
  publicName: string;
  userId: string;
  age: number;
  fullName: string;
  email: EmailValidator;
  description: string;
}
