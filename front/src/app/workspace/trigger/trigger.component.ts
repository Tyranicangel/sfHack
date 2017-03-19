import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Stakeholder } from '../stakeholder/stakeholder';
import { Location } from '../location/location';
import { Infra } from '../infra/infra';
import { Application } from '../bia/application';
import { Trigger } from './trigger';
import { LocationFilter } from '../location.filter';
import { TriggerFilter } from '../trigger.filter';
import { StakeholderFilter } from '../stakeholder.filter';

@Component({
  selector: 'app-trigger',
  templateUrl: './trigger.component.html',
  styleUrls: ['./trigger.component.css']
})
export class TriggerComponent implements OnInit {
	@ViewChild('modal') public Modal:ModalDirective;
	trigger:Trigger;
	triggerlist:Array<Trigger>;
	infralist:Array<Infra>;
	stakeholderlist:Array<Stakeholder>;
	locationlist:Array<Location>;
	applist:Array<Application>;

  constructor(private api:ApiService, private loader:LoaderService) {
  	this.trigger=new Trigger();
  	this.triggerlist=[];
  	this.infralist=[];
  	this.stakeholderlist=[];
  	this.locationlist=[];
  	this.applist=[];
   }

   changed(){
   	this.trigger.businessowner=[];
   	this.trigger.itsme=[];
   	this.trigger.vendorsme=[];
   	for (var i = 0; i < this.trigger.application.length; ++i) {
   		for (var j = 0; j < this.applist.length; ++j) {
   			if(this.applist[j]._id==this.trigger.application[i]){
   				for (var k = 0; k < this.applist[j].businessowner.length; ++k) {
   					if(this.trigger.businessowner.indexOf(this.applist[j].businessowner[k])<0){
   						this.trigger.businessowner.push(this.applist[j].businessowner[k]);
   					}
   				}
   				for (var k = 0; k < this.applist[j].itsme.length; ++k) {
   					if(this.trigger.itsme.indexOf(this.applist[j].itsme[k])<0){
   						this.trigger.itsme.push(this.applist[j].itsme[k]);
   					}
   				}
   				for (var k = 0; k < this.applist[j].vendorsme.length; ++k) {
   					if(this.trigger.vendorsme.indexOf(this.applist[j].vendorsme[k])<0){
   						this.trigger.vendorsme.push(this.applist[j].vendorsme[k]);
   					}
   				}
   			}
   		}
   	}
   	for (var i = 0; i < this.trigger.infra.length; ++i) {
   		for (var j = 0; j < this.infralist.length; ++j) {
   			if(this.infralist[j]._id==this.trigger.infra[i]){
   				for (var k = 0; k < this.infralist[j].businessowner.length; ++k) {
   					if(this.trigger.businessowner.indexOf(this.infralist[j].businessowner[k])<0){
   						this.trigger.businessowner.push(this.infralist[j].businessowner[k]);
   					}
   				}
   				for (var k = 0; k < this.infralist[j].itsme.length; ++k) {
   					if(this.trigger.itsme.indexOf(this.infralist[j].itsme[k])<0){
   						this.trigger.itsme.push(this.infralist[j].itsme[k]);
   					}
   				}
   				for (var k = 0; k < this.infralist[j].vendorsme.length; ++k) {
   					if(this.trigger.vendorsme.indexOf(this.infralist[j].vendorsme[k])<0){
   						this.trigger.vendorsme.push(this.infralist[j].vendorsme[k]);
   					}
   				}
   			}
   		}
   	}
   }

   edit(t){
  	this.trigger=t;
  	this.Modal.show();
  }

  add(){
  	this.trigger=new Trigger;
	this.Modal.show();
  }

  end(){
    this.loader.show();
  	this.api.post('trigger/end',{trigger:this.trigger})
  	.subscribe(data=>{
      this.loader.hide();
  		this.triggerlist=data;
  		this.Modal.hide();
  	});
  }


   save(){
    this.loader.show();
		this.api.post('trigger/save',{trigger:this.trigger})
		.subscribe(data=>{
      this.loader.hide();
			this.triggerlist=data;
			this.Modal.hide();
		})
	}

	convert(dt){
  	if(typeof(dt)=='string'){
	  	let d=new Date(dt.substring(0,10));
	  	return d.toDateString();
  	}
  	else{
  		return dt.toDateString();
  	}
  }

  ngOnInit() {
  	this.api.getAll('stakeholder/all')
  	.subscribe(data=>{
  		this.stakeholderlist=data;
  	});
    this.api.getAll('location/all')
    .subscribe(data=>{
      this.locationlist=data;
    });
    this.api.getAll('application/all')
  	.subscribe(data=>{
  		this.applist=data;
  	});
    this.api.getAll('infra/all')
    .subscribe(data=>{
      for (var i = 0; i < data.length; ++i) {
      	if(data[i].infralist.length>0){
      		for (var j = 0; j < data[i].infralist.length; ++j) {
      			data[i].infralist[j].locationdata=data[i].infratype
      			this.infralist.push(data[i].infralist[j]);
      		}
      	}
      }
    });
  }

  ngAfterViewInit(){
  	this.api.getAll('trigger/all')
  	.subscribe(data=>{
  		this.triggerlist=data;
  		console.log(data);
  		if(this.triggerlist.length==0){
		  	this.trigger=new Trigger;
		  	this.Modal.show();
  		}
  	})
  }

}	
