import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {
	private showloader=new Subject<any>();
  constructor(private router:Router) { 
  	router.events.subscribe(event=>{
  		if (event instanceof NavigationStart) {
            this.showloader.next(false);
        }
  	});
  }

  show(){
  	this.showloader.next(true);
  }

  hide(){
  	this.showloader.next(false);
  }

  getData() : Observable<any>{
  	return this.showloader.asObservable();
  }

}
