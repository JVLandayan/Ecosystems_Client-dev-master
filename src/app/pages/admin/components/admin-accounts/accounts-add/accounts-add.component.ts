import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ToolsService } from 'src/app/shared/services/tools.service';

@Component({
  selector: 'app-accounts-add',
  templateUrl: './accounts-add.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class AccountsAddComponent implements OnInit {
  form: FormGroup;
  imageSrc: string;
  selectedFile: File = null;
  PhotoFileName: string;
  PhotoFilePath: string;
  isAdded = false;

  constructor(private adminService: AdminService, private router: Router) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required] }),
      last_name: new FormControl(null, { validators: [Validators.required] }),
      first_name: new FormControl(null, { validators: [Validators.required] }),
      middle_name: new FormControl(null, { validators: [Validators.required] }),
      ust_email: new FormControl(null, { validators: [Validators.required] }),
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
    const f_firstvalue: string = f.value.first_name;
    const f_middlevalue: string = f.value.middle_name;
    const f_lastvalue: string = f.value.last_name;
    const f_email: string = f.value.ust_email;

    var form_payload = {
      AuthId: 2,
      FirstName: f_firstvalue,
      MiddleName: f_middlevalue,
      LastName: f_lastvalue,
      Email: f_email,
      PhotoFileName: this.PhotoFileName,
      Password: '123',
    };

    //Data being posted = formData
    console.log(this.isAdded);

    var conf = confirm('Confirm Adding?');

    if (conf == true) {
      this.adminService.POST_account(form_payload).subscribe(
        () => {
          this.isAdded = true;
        },
        (error) => {
          alert(error);
          console.log(this.isAdded);
        }
      );
    }
    if (this.isAdded == true) {
      alert('Account Added');
      this.router.navigate(['authpanel', 'accounts']);
    }
  }
}
