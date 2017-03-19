import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { PasswordComponent } from './password/password.component';
import { InvitesComponent } from './invites/invites.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';

import { AccountRouting } from './account.routing';

@NgModule({
  imports: [
    CommonModule,
    AccountRouting
  ],
  declarations: [AccountComponent, PasswordComponent, InvitesComponent, SettingsComponent, DashboardComponent, EditComponent]
})
export class AccountModule { }
