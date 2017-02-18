import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {fadeInAnimation} from "../../../route.animation";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'ms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation ]
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  error: any;

  constructor(public af: AngularFire, private router: Router){ 
    this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/']);
  }

  loginFb() {
    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
        (success) => {
        this.router.navigate(['/']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }
  
  loginTwitter(){
    this.af.auth.login({
      provider: AuthProviders.Twitter,
      method: AuthMethods.Popup,
    }).then((success) => {
      this.router.navigate(['/']);
    }).catch((err) => {
      this.error = err;
    })
  }  

}
