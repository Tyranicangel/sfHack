import { Item } from './item';

export class Infra {
	_id:string;
	name:string;
	type:string;
	items:Item[];
	location:string;
	businessowner:string[];
	itsme:string[];
	vendorsme:string[];

	constructor(){
		this._id="";
		this.name="";
		this.type="";
		this.items=[];
		this.location="";
		this.businessowner=[];
		this.itsme=[];
		this.vendorsme=[];
	}

	addthree(){
		for(var i=0;i<3;i++){
			let it=new Item();
			this.items.push(it);
		}
	}

	add(){
		let it=new Item();
		this.items.push(it);
	}

	remove(i){
		this.items.splice(i,1);
	}

	removeDefault(){
		this.items=[];
	}

	addDefault(dat){
		for (var i = 0;i < dat.length; i++) {
			let it=new Item();
			it.name=dat[i];
			it.check="";
			this.items.push(it);
		}
	}
}
