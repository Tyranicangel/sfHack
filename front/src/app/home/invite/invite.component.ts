import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
	emails:any;
  errorMessage:String;
  @ViewChild('modal') public alertModal:ModalDirective;
  constructor(private router:Router,private api:ApiService, private loader:LoaderService) { 
  	this.emails=[{text:""},{text:""},{text:""}];
  }

  ngOnInit() {
  }

  add(){
  	this.emails.push({text:""});
  }

  remove(i){
  	this.emails.splice(i,1);
  }

  invite(){
    this.loader.show();
    this.api.post('user/invite',{invites:this.emails})
    .subscribe(
      data=>{
        this.loader.hide();
        if(data.success){
          this.router.navigate(['/workspace']);
        }
        else{
          this.alertModal.show();
          this.errorMessage=data.message;
        }
      });
  }

}
