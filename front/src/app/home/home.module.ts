import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRouting } from './home.routing';
import { ModalModule } from 'ng2-bootstrap';

import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { RegisterComponent } from './register/register.component';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { FindComponent } from './find/find.component';
import { InviteComponent } from './invite/invite.component';
import { SignupComponent } from './signup/signup.component';
import { ResetComponent } from './reset/reset.component';
import { VerifyComponent } from './verify/verify.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, HomeRouting, ModalModule.forRoot()
  ],
  declarations: [HomeComponent, MainComponent, CreateComponent, RegisterComponent, ForgotComponent, LoginComponent, FindComponent, InviteComponent, SignupComponent, ResetComponent, VerifyComponent]
})
export class HomeModule { }