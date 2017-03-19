export class Trigger {
	_id:string;
	location:string;
	application:string[];
	infra:string[];
	businessowner:string[];
	itsme:string[];
	vendorsme:string[];
	ended:any;
	comments:string;

	constructor(){
		this._id="";
		this.location="";
		this.application=[];
		this.infra=[];
		this.businessowner=[];
		this.itsme=[];
		this.vendorsme=[];
		this.ended="";
		this.comments="";
	}
}
