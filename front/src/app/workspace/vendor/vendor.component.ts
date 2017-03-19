import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Vendor } from './vendor';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
	@ViewChild('modal') public Modal:ModalDirective;
	vendor:Vendor;
	vendors:Array<Vendor>;
	filetoUpload:File;
	termslist:any;
	//@todo-change file upload to not create problems as the variable remains set after a file is chosen.

  constructor(private api:ApiService, private loader:LoaderService) { 
  	this.vendor=new Vendor;
  	this.vendors=[];
  	this.termslist={
  		'1':'24/7',
  		'2':'Business hours',
  		'3':'Limited support'
  	}
  }

  ngOnInit() {

  }

  convert(dt){
  	let d=new Date(dt.substring(0,10));
  	return d.toDateString();
  }

  ngAfterViewInit() {
  	this.api.getAll('vendor/all')
  	.subscribe(data=>{
  		if(data.length==0){
		  	this.vendor=new Vendor;
		  	this.Modal.show();
  		}
  		this.vendors=data;
  	});
  }

  fileChangeEvent(fileInput:any){
  	this.filetoUpload=fileInput.target.files[0];
  }

  save(){
    this.loader.show();
  	if(this.filetoUpload){
	  	this.api.upload(this.filetoUpload).then((result)=>{
	  		this.vendor.contractdocument=result['path'];
	  		this.api.post('vendor/save',{vendor:this.vendor})
	  		.subscribe(data=>{
          this.loader.hide();
	  			this.filetoUpload=null;
	  			this.vendors=data;
	  			this.Modal.hide();
	  		});
	  	});
  	}
  	else{
      this.loader.show();
  		this.api.post('vendor/save',{vendor:this.vendor})
	  		.subscribe(data=>{
          this.loader.hide();
	  			this.vendors=data;
	  			this.Modal.hide();
	  		});
  	}
  }

  remove(){
    this.loader.show();
  	this.api.post('vendor/remove',{vendor:this.vendor})
  	.subscribe(data=>{
      this.loader.hide();
  		this.vendors=data;
  		this.Modal.hide();
  	})
  }

  removedoc(){
  	this.vendor.contractdocument="";
  }

  edit(v){
  	this.vendor=v;
  	this.Modal.show();
  }

  add(){
  	this.vendor=new Vendor;
  	this.Modal.show();
  }

}
