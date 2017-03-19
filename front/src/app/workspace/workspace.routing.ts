import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DrgoalsComponent } from './drgoals/drgoals.component';
import { DrstrategyComponent } from './drstrategy/drstrategy.component';
import { PreventiveComponent } from './preventive/preventive.component';
import { StakeholderComponent } from './stakeholder/stakeholder.component';
import { VendorComponent } from './vendor/vendor.component';
import { InfraComponent } from './infra/infra.component';
import { BiaComponent } from './bia/bia.component';
import { TestlogComponent } from './testlog/testlog.component';
import { BackupComponent } from './backup/backup.component';
import { TriggerComponent } from './trigger/trigger.component';
import { LocationComponent } from './location/location.component';


@NgModule({
	imports:[
		RouterModule.forChild([
			{
				path:'',
				component:WorkspaceComponent,
				children:[
				{ path:'',component:DashboardComponent },
				{ path:'drgoals',component:DrgoalsComponent },
				{ path:'drstrategy',component:DrstrategyComponent },
				{ path:'preventive',component:PreventiveComponent },
				{ path:'vendors',component:VendorComponent },
				{ path:'infrastructure',component:InfraComponent },
				{ path:'stakeholders',component:StakeholderComponent },
				{ path:'bia',component:BiaComponent },
				{ path:'testlog',component:TestlogComponent },
				{ path:'backup',component:BackupComponent },
				{ path:'trigger',component:TriggerComponent },
				{ path:'location',component:LocationComponent}
				]
			}
		])],
		exports:[RouterModule]
})

export class WorkspaceRouting {}