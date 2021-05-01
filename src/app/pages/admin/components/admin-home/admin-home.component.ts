import { NgIf } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { Useraccount } from 'src/app/shared/models/useraccount.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['../../admin.component.css'],
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}
  user: Useraccount;
  currentUser: User = this.authService.currentUserValue;
  photoApiUrl = environment.apiphotoURl;

  form: FormGroup;
  imageSrc: string;
  selectedFile: File = null;
  PhotoFileName: string;
  PhotoFilePath: string;

  //edit modes
  EditmodeImage = false;
  Editmodepass = false;
  switchModeEditProfile() {
    this.EditmodeImage = !this.EditmodeImage;
  }

  switchModeChangePass() {
    this.Editmodepass = !this.Editmodepass;
  }

  exitEdit() {
    this.EditmodeImage = false;
    this.Editmodepass = false;
    this.ngOnInit;
  }

  ngOnInit(): void {
    this.adminService.GET_account(this.currentUser.id).subscribe((data) => {
      this.user = data;
      console.log(data);
    });
    this.form = new FormGroup({
      password_new: new FormControl(null, {
        validators: [Validators.required],
      }),
      password_new_confirm: new FormControl(null, {
        validators: [Validators.required],
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onImageSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [image] = event.target.files;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          fileSource: reader.result,
        });
      };
    }
    const formData: FormData = new FormData();
    formData.append('uploadedFile', this.selectedFile, this.selectedFile.name);
    formData.append('extn', this.selectedFile.name.split('.').pop());

    this.adminService.UploadPhotoAccount(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.adminService.photoUrl + this.PhotoFileName;
    });
  }

  onSubmit(f: NgForm) {
    const form_payload = {
      firstName: 'string',
      middleName: 'string',
      lastName: 'string',
      email: 'string',
      photoFileName:
        this.PhotoFileName == undefined ? 'abc' : this.PhotoFileName,
      password: this.form.value.password_new,
      resetToken: '',
    };

    if (this.form.value.image == null || this.form.value.image == '') {
      this.adminService
        .UPDATE_account_pass(form_payload, this.currentUser.id)
        .subscribe(
          (data) => {
            alert('Successfully Updated');
            this.ngOnInit();
          },
          (error) => {
            alert('It seems like something happened');
            this.ngOnInit();
          }
        );
    } else if (
      this.form.value.password == null ||
      this.form.value.password == ''
    ) {
      this.adminService
        .UPDATE_account_image(form_payload, this.currentUser.id)
        .subscribe(
          (data) => {
            alert('Successfully Updated');
            this.ngOnInit();
          },
          (error) => {
            alert('It seems like something happened');
            this.ngOnInit();
          }
        );
    }

    this.exitEdit();
  }
}
