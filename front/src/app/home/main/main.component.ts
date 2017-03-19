import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	showMenu:boolean;
  constructor() { 
  	this.showMenu=false;
  }

  ngOnInit() {
  }

  show_menu(){
  	this.showMenu=true;
  }

  hide_menu(){
  	this.showMenu=false;
  }

}
