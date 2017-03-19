import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({name:'idfilter'})
@Injectable()
export class IdFilter implements PipeTransform {
	transform(items:any[], args:any):any {
		return items.filter(item=>item._id==args);
	}
}