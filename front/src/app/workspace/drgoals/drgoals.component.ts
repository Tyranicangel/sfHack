import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Goal } from './goal';

@Component({
  selector: 'app-drgoals',
  templateUrl: './drgoals.component.html',
  styleUrls: ['./drgoals.component.css']
})
export class DrgoalsComponent implements OnInit {
	goals:Goal[];
	showForm:boolean;
  @ViewChild('modal') public alertModal:ModalDirective;
  constructor(private api:ApiService, private loader:LoaderService) {
  	this.showForm=false;
    this.goals=[];
  }

  ngOnInit() {
    this.api.getAll('goals/all')
      .subscribe(
        data=>{
          this.goals=data;
          if(this.goals.length==0){
            let goal:Goal=new Goal;
            this.goals.push(goal);
            let goal1:Goal=new Goal;
            this.goals.push(goal1);
            let goal2:Goal=new Goal;
            this.goals.push(goal2);
            this.showForm=true;
          }
        });
  }

  edit(){
  	this.showForm=true;
  }

  saveForm(){
    this.loader.show();
    this.api.post('goals/create',{goals:this.goals})
    .subscribe(
      data=>{
        this.loader.hide();
        if(data.success){
          this.api.getAll('goals/all')
          .subscribe(
            data=>{
              this.goals=data;
            });
        }
      });
  	this.showForm=false;
  }

  add(){
    let goal:Goal=new Goal;
  	this.goals.push(goal);
  }

  remove(i){
  	this.goals.splice(i,1);
  }


}
