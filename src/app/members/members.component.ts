import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

declare var stepForm: any;
declare var classie: any;

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit {
  name: any;
  state: string = '';
  items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire,private router: Router) {

    this.items = af.database.list('/items');
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    }); 
  }

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
  }


  ngOnInit() {
      var theForm = document.getElementById( 'theForm' );
      new stepForm( theForm, {
        onSubmit : function( form ) {
          // hide form
          classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );

          /*
          form.submit()
          or
          AJAX request (maybe show loading indicator while we don't have an answer..)
          */

          // let's just simulate something...
          var messageEl = theForm.querySelector( '.final-message' );
          messageEl.innerHTML = 'Thank you! We\'ll be in touch.';
          classie.addClass( messageEl, 'show' );
        }
      } );
  }
}
