import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
	username:string;
	company:string;
  constructor(private router:Router, private api:ApiService) {
  	this.username="";
  	this.company="";
  }

  ngOnInit() {
  	this.api.getAll('user/check')
    .subscribe(
      data=>{
        if(data.success){
        	this.username=data.username;
        	this.company=data.company;
        }
        else{
        	this.router.navigateByUrl('/verify');
        }
      },
      error=>{
        if(error.status==401){
          this.router.navigateByUrl('/login');
        }
      });
  }

}
