import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Testlog } from './testlog';
import { Application } from '../bia/application';
import { Stakeholder } from '../stakeholder/stakeholder';
import { IdFilter } from '../id.filter';

@Component({
  selector: 'app-testlog',
  templateUrl: './testlog.component.html',
  styleUrls: ['./testlog.component.css']
})
export class TestlogComponent implements OnInit {
	@ViewChild('modal') public Modal:ModalDirective;
	testlog:Testlog;
	testlist:Array<Testlog>;
	stakeholderlist:Array<Stakeholder>;
	applist:Array<Application>;
  constructor(private api:ApiService, private loader:LoaderService) { 
  	this.testlog=new Testlog;
  	this.testlist=[];
  	this.stakeholderlist=[];
  	this.applist=[];
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

  	this.api.getAll('application/all')
  	.subscribe(data=>{
  		this.applist=data;
  	})
  }

  ngAfterViewInit(){
  	this.api.getAll('testlog/all')
  	.subscribe(data=>{
  		this.testlist=data;
  		if(this.testlist.length==0){
		  	this.testlog=new Testlog;
		  	this.Modal.show();
  		}
  	})
  }

  edit(t){
  	this.testlog=t;
  	var x=new Date(t.date.substring(0,10));
  	this.testlog.date=x.getFullYear().toString() + '-' + ("0" + (x.getMonth() + 1)).slice(-2) + '-' + ("0" + (x.getDate())).slice(-2);
  	this.Modal.show();
  }

  remove(){
    this.loader.show();
  	this.api.post('testlog/remove',{testlog:this.testlog})
  	.subscribe(data=>{
      this.loader.hide();
  		this.testlist=data;
  		this.Modal.hide();
  	});

  }

	add(){
		this.testlog=new Testlog;
		this.Modal.show();
	}

	save(){
    this.loader.show();
		this.api.post('testlog/save',{testlog:this.testlog})
		.subscribe(data=>{
      this.loader.hide();
			this.testlist=data;
			this.Modal.hide();
		})
	}

}
