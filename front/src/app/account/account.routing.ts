import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';
import { InvitesComponent } from './invites/invites.component';
import { PasswordComponent } from './password/password.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
	imports:[
		RouterModule.forChild([
			{
				path:'',
				component:AccountComponent,
				children:[
				{ path:'',component:DashboardComponent },
				{ path:'edit',component:EditComponent },
				{ path:'invites',component:InvitesComponent },
				{ path:'password',component:PasswordComponent },
				{ path:'settings',component:SettingsComponent }
				]
			}
		])],
		exports:[RouterModule]
})

export class AccountRouting {}