import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css'],
})
export class ForgotpassComponent implements OnInit {
  form: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}
  apiUrl = environment.apiUrl;
  token;
  email;

  ngOnInit(): void {
    this.form = new FormGroup({
      new_password: new FormControl(null, {
        validators: [Validators.required],
      }),
      confirm_new_password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.token = queryParams['token'];
      this.email = queryParams['email'];
    });
  }

  onSubmit(f: NgForm) {
    const form_payload = {
      Token: this.token,
      Email: this.email,
      NewPassword: f.value.new_password,
    };
    this.http.post(this.apiUrl + 'auth/ResetPassword', form_payload).subscribe(
      (data) => {
        alert('Password Updated');
        this.router.navigate(['login']);
      },
      (error) => {
        alert(error);
      }
    );
  }
}
