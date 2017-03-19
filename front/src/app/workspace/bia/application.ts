export class Application {
	_id:string;
	name:string;
	type:string;
	description:string;
	criticality:string;
	location:string;
	businessowner:string[];
	itsme:string[];
	vendorsme:string[];
	supporthours:string;
	supportcover:string;
	rto:string;
	rpo:string;
	security:string;
	workaround:string;

	constructor(){
		this._id="";
		this.name="";
		this.type="";
		this.description="";
		this.criticality="";
		this.businessowner=[];
		this.itsme=[];
		this.vendorsme=[];
		this.supporthours="";
		this.supportcover="";
		this.rto="";
		this.rpo="";
		this.security="";
		this.workaround="";
	}
}
