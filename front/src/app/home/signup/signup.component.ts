import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api.service';
import { LoaderService } from '../../loader/loader.service';
import { User } from './user';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	@ViewChild('modal') public alertModal:ModalDirective;
	user:User;
	errorMessage:string;
	verifyToken:string;

	constructor(private router:Router, private api:ApiService, private route:ActivatedRoute, private loader:LoaderService) {
		this.user=new User;
	 }

	ngOnInit() {
		this.route.params.subscribe(params=>{
			this.verifyToken=params['token'];
		});
	}

	register(){
		this.loader.show();
		this.api.put('main/register',{userData:this.user,verifyToken:this.verifyToken})
		.subscribe(
			data=>{
				this.loader.hide();
				if(data.success){
					localStorage.setItem('DrPlan',data.token)
					this.router.navigate(['/workspace']);
				}
				else{
					this.errorMessage=data.message;
					this.alertModal.show();      
				}
			});
	}

}
