import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}
  form: FormGroup;
  form_email: FormGroup;
  login = true;
  error = '';
  loading = false;
  submitted = false;
  currentUser = this.authService.currentUserValue;
  apiUrl = environment.apiUrl;
  isForgotPassSubmitted = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      loginEmail: new FormControl(null, {
        validators: [Validators.required],
      }),
      loginPass: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.form_email = new FormGroup({
      forgot_email: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    if (this.currentUser) {
      this.router.navigateByUrl('authpanel');
    }
  }

  switchpage() {
    this.login = !this.login;
  }

  onSubmit_email(f: NgForm, submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    const form_payload = {
      email: f.value.forgot_email,
    };

    this.http.post(this.apiUrl + 'auth/forgotpass', form_payload).subscribe(
      () => {
        alert('A password reset link has been sent to your email');
        this.form_email.reset();
        submitBtn.disabled = false;
      },
      (error) => {
        alert(error);
      }
    );
  }

  //login
  onSubmit(f: NgForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login(f.value.loginEmail, f.value.loginPass)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['authpanel']);
        },
        (error) => {
          alert(error);
          this.loading = false;
        }
      );
  }
}
