import { HttpClient } from '@angular/common/http';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
})
export class SubscriptionComponent implements OnInit {
  constructor(private http: HttpClient) {}
  form: FormGroup;
  isSubmitted = false;
  scriptUrl =
    'https://script.google.com/macros/s/AKfycbzHcDDC06HnIlrMEaB592WFHYLiStci1I7wQEb6/exec';

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required] }),
    });
  }
  onSubmit(f: NgForm) {
    this.isSubmitted = true;
    const form_payload = new FormData();
    form_payload.append('Email', f.value.email);
    this.http.post(this.scriptUrl, form_payload).subscribe((data) => {
      alert('Thanks for subscribing');
      this.form.reset();
      this.isSubmitted = false;
      window.location.href = '#page-top';
    });
  }
}
