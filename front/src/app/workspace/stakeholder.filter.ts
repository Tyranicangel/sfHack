import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({name:'stakeholderfilter'})
@Injectable()
export class StakeholderFilter implements PipeTransform {
	transform(items:any[], args:any):any {
		return items.filter(item=>args.indexOf(item._id)>=0);
	}
}