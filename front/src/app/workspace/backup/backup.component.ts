import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Backup } from './backup';
import { Application } from '../bia/application';
import { IdFilter } from '../id.filter';

@Component({
  selector: 'app-backup',
  templateUrl: './backup.component.html',
  styleUrls: ['./backup.component.css']
})
export class BackupComponent implements OnInit {
	@ViewChild('modal') public Modal:ModalDirective;
	backup:Backup;
	backuplist:Array<Backup>;
	applist:Array<Application>;
	frequencylist:any;
  types:any;
  constructor(private api:ApiService, private loader:LoaderService) { 
  	this.backup=new Backup;
    this.types={
      "1":"Cloud Backup",
      "2":"Tape Backup",
      "3":"Local Storage Backup"
    };

  	this.backuplist=[];
  	this.applist=[];
  	this.frequencylist={
  		"1":"Weekly",
			"2":"Daily",
			"3":"Realtime"
  	}
  }

  ngOnInit() {
  	this.api.getAll('application/all')
  	.subscribe(data=>{
  		this.applist=data;
  	})
  }

  ngAfterViewInit(){
  	this.api.getAll('backup/all')
  	.subscribe(data=>{
  		this.backuplist=data;
  		if(this.backuplist.length==0){
		  	this.backup=new Backup;
		  	this.Modal.show();
  		}
  	})
  }

  edit(b){
  	this.backup=b;
  	this.Modal.show();
  }

  remove(){
    this.loader.show();
  	this.api.post('backup/remove',{backup:this.backup})
  	.subscribe(data=>{
      this.loader.hide();
  		this.backuplist=data;
  		this.Modal.hide();
  	});

  }

	add(){
		this.backup=new Backup;
		this.Modal.show();
	}

	save(){
    this.loader.show();
		this.api.post('backup/save',{backup:this.backup})
		.subscribe(data=>{
      this.loader.hide();
			this.backuplist=data;
			this.Modal.hide();
		})
	}

}
