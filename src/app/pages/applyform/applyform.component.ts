import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applyform',
  templateUrl: './applyform.component.html',
  styleUrls: ['./applyform.component.css'],
})
export class ApplyformComponent implements OnInit {
  constructor(private http: HttpClient) {}
  form: FormGroup;
  isSubmitted = false;
  scriptUrl =
    'https://script.google.com/macros/s/AKfycbxJF3xtDeVf_uwnz_8hrU6eU76FFFMO1MbOvXF_GJQJgc5_e2o/exec';

  ngOnInit(): void {
    this.form = new FormGroup({
      last_name: new FormControl(null, { validators: [Validators.required] }),
      first_name: new FormControl(null, { validators: [Validators.required] }),
      middle_name: new FormControl(null, { validators: [Validators.required] }),
      student_number: new FormControl(null, {
        validators: [Validators.required],
      }),
      ust_email: new FormControl(null, { validators: [Validators.required] }),
      role: new FormControl({ validators: [Validators.required] }),
    });
  }
  onSubmit(f: NgForm) {
    this.isSubmitted = true;

    const form_payload = new FormData();
    form_payload.append('LastName', f.value.last_name);
    form_payload.append('FirstName', f.value.first_name);
    form_payload.append('MiddleName', f.value.middle_name);
    form_payload.append('StudentNumber', f.value.student_number);
    form_payload.append('UstEmail', f.value.ust_email);
    form_payload.append('Role', f.value.role);

    this.http.post(this.scriptUrl, form_payload).subscribe(() => {
      alert('Successfully Registered');
      this.form.reset();
      this.isSubmitted = false;
    });
  }
}
