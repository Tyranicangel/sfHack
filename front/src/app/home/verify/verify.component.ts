import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
	verifyCode:string;
	showMessage:boolean;
	address:string;
	errorMessage:string;
	@ViewChild('modal') public alertModal:ModalDirective;
  constructor(private router:Router,private api:ApiService, private loader:LoaderService) { 
  	this.verifyCode="";
  	this.address="";
  	this.errorMessage="";
  	this.showMessage=false;
  }

  ngOnInit() {
  }

  verify(){
    this.loader.show();
  	this.api.post('user/verify',{code:this.verifyCode})
    .subscribe(
      data=>{
        this.loader.hide();
        if(data.success){
          localStorage.setItem('DrPlan',data.token)
          this.router.navigate(['/invite']);
        }
        else{
          this.alertModal.show();
          this.errorMessage=data.message;
        }
      });
  }

  resend(){
  	this.api.post('user/resend',{data:'none'})
    .subscribe(
      data=>{
        if(data.success){
          this.address=data.message;
          this.showMessage=true;
        }
        else{
          this.alertModal.show();
          this.errorMessage="Unable to send email";
        }
      });
  }



}
