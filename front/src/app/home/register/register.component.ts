import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { User } from './user';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('modal') public alertModal:ModalDirective;
	user:User;
	company:any;
  errorMessage:string;
  constructor(private api:ApiService, private router:Router, private loader:LoaderService) { 
  	this.user=new User;
    this.errorMessage="Email already in use";
  }

  ngOnInit() {
    if(localStorage.getItem('companyData')){  
  	  this.company=JSON.parse(localStorage.getItem('companyData'));
    }
    else{
      this.router.navigate(['/create']);
    }
  }

  register(){
    this.loader.show();
  	this.api.put('main/create',{companyData:this.company,userData:this.user})
    .subscribe(
      data=>{
        this.loader.hide();
        if(data.success){
          localStorage.removeItem('companyData');
          localStorage.setItem('DrPlan',data.token)
          this.router.navigate(['/verify']);
        }
        else{
          this.errorMessage=data.message;
          this.alertModal.show();      
        }
      });
  }

}