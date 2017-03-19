import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from './company'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
	company:Company;
  constructor(private router:Router) { 
  	this.company=new Company;
  }

  ngOnInit() {
  }

  create() {
  	localStorage.setItem('companyData',JSON.stringify(this.company));
  	this.router.navigate(['/register']);
  }

}
