import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { State } from 'src/app/shared/models/state.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-others',
  templateUrl: './admin-others.component.html',
  styleUrls: ['../../admin.component.css'],
})
export class AdminOthersComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  form: FormGroup;
  input_vision;
  input_mission;
  defaultId = 1;
  editMode = false;

  stateData: State;

  ngOnInit(): void {
    this.form = new FormGroup({
      input_mission: new FormControl(null, {
        validators: [Validators.required],
      }),
      input_vision: new FormControl(null, {
        validators: [Validators.required],
      }),
    });

    this.adminService.GET_state(this.defaultId).subscribe((response) => {
      this.input_vision = response.vision;
      this.input_mission = response.mission;
      this.stateData = response;
    });
  }

  onSubmit(f: NgForm) {
    const form_payload = {
      mission: f.value.input_mission,
      vision: f.value.input_vision,
    };

    if (this.stateData != null || this.stateData != undefined) {
      var conf = confirm('Confirm Update?');
      if (conf == true) {
        this.adminService.UPDATE_state(form_payload, this.defaultId).subscribe(
          (response) => {
            alert('Succesfully Updated');
          },
          (error) => alert(error)
        );
      }
    } else {
      this.adminService.POST_state(form_payload).subscribe(
        (response) => {
          alert('Successfully Added');
        },
        (error) => {
          alert(error);
        }
      );
    }
  }
}
