export class Vendor {
	_id:string;
	vendorcompany:string;
	supportterms:string;
	contract:string;
	contractdocument:any;
	contractexpiry:string;
	managername:string;
	managerphone:string;
	manageremail:string;

	constructor(){
		this._id="";
		this.vendorcompany="";
		this.supportterms="1";
		this.contract="false";
		this.contractdocument="";
		this.contractexpiry="";
		this.managername="";
		this.managerphone="";
		this.manageremail="";
	}
}
