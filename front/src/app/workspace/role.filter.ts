import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({name:'rolefilter'})
@Injectable()
export class RoleFilter implements PipeTransform {
	transform(items:any[], args:any):any {
		return items.filter(item=>item.role==args);
	}
}