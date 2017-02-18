import { Component, OnInit } from '@angular/core';
import {fadeInAnimation, fallIn} from "../../../route.animation";
import {Router} from "@angular/router";
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';


declare var stepsForm:any;
declare var classie:any;

@Component({
  selector: 'ms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [ fadeInAnimation, fallIn() ]
})
export class RegisterComponent implements OnInit {

  name: string;
  state: string = '';
  error: any;

  constructor(public af: AngularFire,private router: Router) {
    this.af.auth.subscribe(auth => { 
      if(auth) {
        this.router.navigateByUrl('/');
      }
    });
  }

  ngOnInit() {
    var theForm = document.getElementById( 'theForm' );
    new stepsForm( theForm, {});    
  }

  showMessageAfterSignup(message:string){
    var theForm = document.getElementById( 'theForm' );
    classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );
    var messageEl = theForm.querySelector( '.final-message' );
    messageEl.innerHTML = message;
    classie.addClass( messageEl, 'show' );    
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.showMessageAfterSignup("Check your email for a link to sign in!");
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        this.router.navigate(['/'])
      }).catch(
        (err) => {
        this.error = err;
      })
    }
  }
  register() {
    this.router.navigate(['/']);
  }

}
