import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({name:'locationfilter'})
@Injectable()
export class LocationFilter implements PipeTransform {
	transform(items:any[], args:any):any {
		return items.filter(item=>item.location==args);
	}
}