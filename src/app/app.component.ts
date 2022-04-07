/*********************************************************************************** 
* WEB422 – Assignment 04 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students. 
* 
* Name: _Moxa Jayeshkumar Panchal_____ Student ID: _____148885197__ Date: ___24-03-2022_______ 
*
* Angular App (Deployed) Link:
*
* User API (Heroku) Link: https://peaceful-hollows-80155.herokuapp.com/
* 
********************************************************************************/


import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web422-a6';
  searchString:String="";
  token:any;
  routeSubscription:Subscription | undefined;

  constructor( private rou: Router, private a:AuthService  ){}

  handleSearch(){
  this.rou.navigate(["/search"], { queryParams: {q: this.searchString}});
  this.searchString="";
}

ngOnInit() {
  this.routeSubscription= this.rou.events.subscribe({ 
     next: (event:Event)=>{
       if (event instanceof NavigationStart) {
         this.token = this.a.readToken();
       }
     }
   })
 }
 
 ngOnDestroy(): void {
     this.routeSubscription?.unsubscribe();
 }
 
 logout(){
   localStorage.clear();
   this.rou.navigate(['/login']);
 }
 
}
