import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
	@ViewChild('modal') public alertModal:ModalDirective;
	password:string;
	confirm:string;
  	errorMessage:string;
  	verifyToken:string;

  constructor(private router:Router, private api:ApiService, private route:ActivatedRoute) { 
  	this.password="";
  	this.confirm="";
  	this.errorMessage="";
  }

  ngOnInit() {
  	this.route.params.subscribe(params=>{
  		this.verifyToken=params['token'];
  	});
  }

  reset(){
  	this.api.post('main/reset',{pass:this.password,verifyToken:this.verifyToken})
    .subscribe(
      data=>{
        if(data.success){
          this.router.navigate(['/login']);
        }
        else{
          this.errorMessage=data.message;
          this.alertModal.show();      
        }
      });
  }
}
