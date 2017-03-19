import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
	email:string;
	errorMessage:string;
	showMessage:boolean;
	@ViewChild('modal') public alertModal:ModalDirective;
  constructor(private router:Router, private api:ApiService, private loader:LoaderService) { 
  	this.email="";
  	this.showMessage=false;
  	this.errorMessage="";
  }

  ngOnInit() {
  }

  forgot(){
    this.loader.show();
  	this.api.post('main/forgot',{email:this.email})
    .subscribe(
      data=>{
        this.loader.hide();
        if(data.success){
          this.showMessage=true;
        }
        else{
          this.alertModal.show();
          this.errorMessage=data.message;
        }
      });
  }

}
