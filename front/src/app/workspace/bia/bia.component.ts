import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Application } from './application';
import { Stakeholder } from '../stakeholder/stakeholder';
import { Location } from '../location/location';
import { RoleFilter } from '../role.filter';

@Component({
  selector: 'app-bia',
  templateUrl: './bia.component.html',
  styleUrls: ['./bia.component.css'],
})
export class BiaComponent implements OnInit {
	@ViewChild('modal') public Modal:ModalDirective;
	app:Application;
	applist:Array<Application>;
  locationlist:Array<Location>;
	stakeholders:Array<Stakeholder>;
	typelist:any;
	criticallist:any;
  constructor(private api:ApiService, private loader:LoaderService) { 
  	this.app=new Application;
  	this.applist=[];
    this.locationlist=[];
  	this.stakeholders=[];
  	this.typelist={
  		"1":'ERP',
			"2":'MRP',
			"3":'CRM',
			"4":'Other'
  	};
  	this.criticallist={
  		"1":"High",
			"2":"Medium",
			"3":"Low"
  	}
  }

  ngOnInit() {
  	this.api.getAll('stakeholder/all')
  	.subscribe(data=>{
  		this.stakeholders=data;
  	});
    this.api.getAll('location/all')
    .subscribe(data=>{
      this.locationlist=data;
    });
  }

  ngAfterViewInit(){
  	this.api.getAll('application/all')
  	.subscribe(data=>{
  		this.applist=data;
  		console.log(data);
  		if(this.applist.length==0){
		  	this.app=new Application;
		  	this.Modal.show();
  		}
  	})
  }

  edit(a){
  	this.app=a;
  	this.Modal.show();
  }

  save(){
    this.loader.show();
  	this.api.post('application/save',{app:this.app})
  	.subscribe(data=>{
      this.loader.hide();
  		this.applist=data;
  		this.Modal.hide();
  	});
  }

  remove(){
    this.loader.show();
  	this.api.post('application/remove',{app:this.app})
  	.subscribe(data=>{
      this.loader.hide();
  		this.applist=data;
  		this.Modal.hide();
  	});
  }

  add(){
  	this.app=new Application;
  	this.Modal.show();
  }

}
