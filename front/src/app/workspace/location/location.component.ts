import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Location } from './location';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
	@ViewChild('modal') public Modal:ModalDirective;
	location:Location;
	locationlist:Array<Location>;

  constructor(private api:ApiService, private loader:LoaderService) {
  	this.location=new Location;
  	this.locationlist=[];
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
  	this.api.getAll('location/all')
  	.subscribe(data=>{
  		this.locationlist=data;
  		if(this.locationlist.length==0){
		  	this.location=new Location;
		  	this.Modal.show();
  		}
  	})
  }

  remove(){
    this.loader.show();
    this.api.delete("location/remove",{location:this.location})
    .subscribe(data=>{
      this.locationlist=data;
      this.loader.hide();
      this.Modal.hide();
    })
  }

  edit(l){
    this.location=l;
    this.Modal.show();
  }

  add(){
    this.location=new Location;
    this.Modal.show();
  }

  save(){
    console.log(this.location);
  	 this.loader.show();
     this.api.post("location/save",{location:this.location})
     .subscribe(data=>{
       this.locationlist=data;
       this.loader.hide();
       this.Modal.hide();
     });
  }

}
