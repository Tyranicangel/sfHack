import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CreateComponent } from './create/create.component';
import { FindComponent } from './find/find.component';
import { ForgotComponent } from './forgot/forgot.component';
import { InviteComponent } from './invite/invite.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { SignupComponent } from './signup/signup.component';
import { ResetComponent } from './reset/reset.component';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
	imports:[
		RouterModule.forChild([
			{
				path:'',
				component:HomeComponent,
				children:[
					{ path:'',component:MainComponent },
					{ path:'create',component:CreateComponent },
					{ path:'find',component:FindComponent },
					{ path:'forgot',component:ForgotComponent },
					{ path:'invite',component:InviteComponent },
					{ path:'login',component:LoginComponent },
					{ path:'register',component:RegisterComponent },
					{ path:'signup/:token',component:SignupComponent },
					{ path:'reset/:token',component:ResetComponent },
					{ path:'verify',component:VerifyComponent },
					{ path:'**', redirectTo:'', pathMatch:'full' }
				]
			}
		])],
		exports:[RouterModule]
})

export class HomeRouting {}