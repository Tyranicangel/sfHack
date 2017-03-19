export class Testlog {
	_id:string;
	application:string;
	details:string;
	date:any;
	testedby:string;
	approvedby:string;
	result:string;
	comments:string;

	constructor(){
		this._id="";
		this.application='';
		this.details='';
		this.date='';
		this.testedby='';
		this.approvedby='';
		this.result='';
		this.comments='';
	}
}
