import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	contract_3:number;
	contract_6:number;
	contract_exp:number;
  stat:string;
	apps:number;
	tested_2016:number;
	tested_2017:number;
  trigger_2016:number;
  trigger_2017:number;
  active_dr:number;
	backlogged:number;
  constructor(private api:ApiService, private loader:LoaderService) {
  	this.contract_3=0;
  	this.contract_6=0;
  	this.contract_exp=0;
  	this.apps=0;
  	this.tested_2016=0;
  	this.tested_2017=0;
  	this.backlogged=0;
    this.trigger_2016=0;
    this.trigger_2017=0;
    this.active_dr=0;
    this.stat='safe';
   }

  ngOnInit() {
  	this.api.getAll('/report/dashboard')
  	.subscribe(data=>{
  		this.contract_exp=data[0];
  		this.contract_3=data[1];
  		this.contract_6=data[2];
  		this.apps=data[3];
  		this.tested_2016=data[4];
  		this.tested_2017=data[5];
  		this.backlogged=data[6];
      this.trigger_2016=data[7];
      this.trigger_2017=data[8];
      this.active_dr=data[9];
      if(this.active_dr>0){
        this.stat='dr';
      }
      else if(this.contract_exp>0 || this.tested_2016<this.apps || this.backlogged<this.apps){
        this.stat='attn';
      }
      else{
        this.stat='safe';
      }
      console.log(this.stat);
  	});
  }

}
