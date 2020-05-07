import { SharedModule } from './../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../authentication/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from '../authentication/signup/signup.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, PagesRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, SharedModule],
  declarations: [
    HomeComponent,
  ],
})
export class PagesModule { }
