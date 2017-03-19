import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Strategy } from './strategy';

@Component({
  selector: 'app-preventive',
  templateUrl: './preventive.component.html',
  styleUrls: ['./preventive.component.css']
})
export class PreventiveComponent implements OnInit {
	strats:Strategy[];
	showForm:boolean;

  constructor(private api:ApiService) { 
    this.strats=[];
    this.showForm=false;
  }

  ngOnInit() {
    this.api.getAll('prevent/all')
      .subscribe(
        data=>{
          this.strats=data;
          if(this.strats.length==0){
            let strat1:Strategy=new Strategy;
            this.strats.push(strat1);
            let strat2:Strategy=new Strategy;
            this.strats.push(strat2);
            let strat3:Strategy=new Strategy;
            this.strats.push(strat3);
            this.showForm=true;
          }
        });
  }

  edit(){
    this.showForm=true;
  }

  saveForm(){
    this.api.post('prevent/create',{strats:this.strats})
    .subscribe(
      data=>{
        if(data.success){
          this.api.getAll('prevent/all')
          .subscribe(
            data=>{
              this.strats=data;
            });
        }
      });
    this.showForm=false;
  }

  add(){
    let strat:Strategy=new Strategy;
    this.strats.push(strat);
  }

  remove(i){
  	this.strats.splice(i,1);
  }

}
