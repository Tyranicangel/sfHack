import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { User } from './user';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	@ViewChild('modal') public alertModal:ModalDirective;
	user:User;
  errorMessage:string;
  constructor(private router:Router, private api:ApiService, private loader:LoaderService) { 
  	this.user=new User;
  	this.errorMessage="";
  }

  ngOnInit() {
  }

  login(){
    this.loader.show();
  	this.api.post('main/login',{userData:this.user})
    .subscribe(
      data=>{
        this.loader.hide();
        if(data.success){
          localStorage.setItem('DrPlan',data.token)
          if(data.active){
          	this.router.navigate(['/workspace']);
          }
          else{
          	this.router.navigate(['/verify']);
          }
        }
        else{
          this.errorMessage=data.message;
          this.alertModal.show();
        }
      });
  }

}
