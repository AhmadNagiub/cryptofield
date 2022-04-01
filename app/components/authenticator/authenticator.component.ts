import { Component, OnInit } from '@angular/core';
// angularx-social-links
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
// import firebaseTs
import { FirebaseTSAuth } from 'firebasets/firebasetsAuth/firebaseTSAuth';

// bottomsheet
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.scss']
})
export class AuthenticatorComponent implements OnInit {

  state = AuthenticatorCompState.LOGIN;
  firebasetsAuth: FirebaseTSAuth;


  constructor(private authService: SocialAuthService , private bottomSheetRef: MatBottomSheetRef) {
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
  }


  // for mat-card actions to choose which dev will appear
  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }

  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }

  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }
  onLoginWithClick(){
    this.state = AuthenticatorCompState.LOGIN_WITH;

  }
// for divs put in *ngIf to take the action and show up
  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }

  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }
  isLoginWithState(){
    return this.state == AuthenticatorCompState.LOGIN_WITH;
  }
  //For changing header
  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Login";
      case AuthenticatorCompState.REGISTER:
        return "Register";
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Forgot Password";
      case AuthenticatorCompState.LOGIN_WITH:
        return "Login With";
    }
}

// Sign in with social links
signInWithGoogle(): void {
  this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
}

signInWithFB(): void {
  this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
}

signOut(): void {
  this.authService.signOut();
}

// functions
// Register
register(registerEmail: HTMLInputElement,registerPassword: HTMLInputElement,registerConfirmPassword: HTMLInputElement){
  let email = registerEmail.value;
  let password = registerPassword.value;
  let confirmPassword = registerConfirmPassword.value;

  if(this.isNotEmpty(email) && this.isNotEmpty(password) && this.isNotEmpty(confirmPassword) && this.isAMatch(password, confirmPassword)){

    this.firebasetsAuth.createAccountWith(
      {email,password,
         onComplete: (uc) => {
          this.bottomSheetRef.dismiss()
         },
         onFail: (err) => {

         }
       });
  }
}

// login
login(loginEmail:HTMLInputElement , loginPass:HTMLInputElement){
  let email = loginEmail.value;
  let password = loginPass.value;
  if(this.isNotEmpty(email) && this.isNotEmpty(password)){

      this.firebasetsAuth.signInWith(
        {email: email,password: password,
            onComplete: (uc) => {
              this.bottomSheetRef.dismiss()
            },
            onFail: (err) => {
                alert(err);
            }
        }
    );

  }

}

// reset Email
reset(resetEmail: HTMLInputElement){
  let email = resetEmail.value;
  if(this.isNotEmpty(email)) {

     this.firebasetsAuth.sendPasswordResetEmail(   {
      email: email,
      onComplete: (err) => {
        this.bottomSheetRef.dismiss()

      }
   });

  }
}

// functions to make check
// validate password is equal confirmpassword
isAMatch(text: string, comparedWith: string){
  return text == comparedWith;  //true
}
// check that all inputs are valid and not empty
isNotEmpty(text: string){
  return text != null && text.length > 0;
}
}

// define enum contain 4 values
export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD,
  LOGIN_WITH
}
