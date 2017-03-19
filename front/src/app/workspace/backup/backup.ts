export class Backup {
	_id:string;
	application:string;
	frequency:string;
	details:string;
	backuptype:string;

	constructor(){
		this._id="";
		this.application='';
		this.details='';
		this.frequency='';
		this.backuptype="";
	}
}
