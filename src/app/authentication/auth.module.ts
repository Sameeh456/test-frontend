import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '../authentication/signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule],
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
})
export class AuthModule { }
