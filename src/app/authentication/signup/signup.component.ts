import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string[] = [];
  signupMessage: any = null;

  constructor(private _apiService: ApiService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      username: new FormControl(null, Validators.required),
    });
  }

  onSignup() {
    this.errorMessage = []
    this.signupMessage = null;
    const message = this._apiService.signupUser(
      this.signupForm.value.email,
      this.signupForm.value.password,
      this.signupForm.value.username,
    ).subscribe((res) => {
      this.signupMessage = res;
    }, (err) => {
      this.errorMessage = [...err.error.data]
    });

  }
}
