import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({name:'triggerfilter'})
@Injectable()
export class TriggerFilter implements PipeTransform {
	transform(items:any[], args1:any):any {
		return items.filter(item=>{console.log(args1);item.role==args1;});
	}
}