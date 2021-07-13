import { Location, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {
  isLoggedIn = false;

  public constructor(private router: Router, private location : Location, private authService : AuthService) { 
    
  }

  ngOnInit(): void {
    //this.isLoggedIn=this.authService.verifyLogin();
    this.authService.verifyLogin().subscribe(value => this.isLoggedIn=value);

  }

  public scroll(str : string):void {
    if(location.pathname==='/'){
      var element = document.getElementById(str);
      element!.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }else{
      this.router.navigate(['/'],{fragment: str});  
    }
  }  

  public logout(){
    if(!confirm('Do you want to close your session??'))
      return;
    
    this.authService.logout(); 
  }
}
