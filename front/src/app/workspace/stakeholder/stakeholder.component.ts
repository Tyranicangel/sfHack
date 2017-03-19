import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Stakeholder } from './stakeholder';

@Component({
  selector: 'app-stakeholder',
  templateUrl: './stakeholder.component.html',
  styleUrls: ['./stakeholder.component.css']
})
export class StakeholderComponent implements OnInit {
	@ViewChild('modal') public Modal:ModalDirective;
	stakeholder:Stakeholder;
	stakeholders:Array<Stakeholder>;
	rolelist:any;
  constructor(private api:ApiService, private loader:LoaderService) { 
  	this.stakeholder=new Stakeholder;
  	this.stakeholders=[];
  	this.rolelist={
  		"1":"Executive",
			"2":"Business owner",
			"3":"Company DR Lead(s)",
			"4":"Company IT SME(s)",
			"5":"Vendor SME(s)"
  	}
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  	this.api.getAll('stakeholder/all')
  	.subscribe(data=>{
  		if(data.length==0){
		  	this.stakeholder=new Stakeholder;
		  	this.Modal.show();
  		}
  		this.stakeholders=data;
  	});
  }

  save(){
    this.loader.show();
		this.api.post('stakeholder/save',{stakeholder:this.stakeholder})
  		.subscribe(data=>{
        this.loader.hide();
  			this.stakeholders=data;
  			this.Modal.hide();
  		});
  }

  remove(){
    this.loader.show();
  	this.api.post('stakeholder/remove',{stakeholder:this.stakeholder})
  	.subscribe(data=>{
      this.loader.hide();
  		this.stakeholders=data;
  		this.Modal.hide();
  	})
  }

  edit(v){
  	this.stakeholder=v;
  	this.Modal.show();
  }

  add(){
  	this.stakeholder=new Stakeholder;
  	this.Modal.show();
  }

}
