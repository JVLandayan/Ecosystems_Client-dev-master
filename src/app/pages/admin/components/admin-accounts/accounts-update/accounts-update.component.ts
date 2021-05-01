import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Useraccount } from 'src/app/shared/models/useraccount.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-accounts-update',
  templateUrl: './accounts-update.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class AccountsUpdateComponent implements OnInit {
  form: FormGroup;
  imageSrc: string;
  selectedFile: File = null;
  referenceUser: Useraccount;
  isLoaded = false;
  inputImage;
  inputLast;
  inputFirst;
  inputMiddle;
  inputEmail;
  imgSrc;
  PhotoFileName: string;
  PhotoFilePath: string;
  imgLoaded = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  id: number;
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.adminService.GET_account(this.id).subscribe((data) => {
      this.isLoaded = true;
      this.inputLast = data.lastName;
      this.inputFirst = data.firstName;
      this.inputMiddle = data.middleName;
      this.inputEmail = data.email;
      this.inputImage = data.photoFileName;
      this.imageSrc = this.adminService.photoUrl + this.inputImage;
    });
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [],
      }),
      last_name: new FormControl(null, {
        validators: [Validators.required],
      }),
      first_name: new FormControl(null, {
        validators: [Validators.required],
      }),
      middle_name: new FormControl(null, {
        validators: [Validators.required],
      }),
      ust_email: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    setTimeout(() => {
      this.imgSrc = this.adminService.photoUrl + this.inputImage;
      this.imgLoaded = true;
    }, 1000);
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

    var form_payload = [];
    if (f_firstvalue != null) {
      form_payload.push({
        op: 'replace',
        path: '/FirstName',
        value: f_firstvalue,
      });
    }
    if (f_middlevalue != null) {
      form_payload.push({
        op: 'replace',
        path: '/MiddleName',
        value: f_middlevalue,
      });
    }
    if (f_lastvalue != null) {
      form_payload.push({
        op: 'replace',
        path: '/LastName',
        value: f_lastvalue,
      });
    }
    if (f_email != null) {
      form_payload.push({
        op: 'replace',
        path: '/Email',
        value: f_email,
      });
    }
    if (this.PhotoFileName != null) {
      form_payload.push({
        op: 'replace',
        path: '/PhotoFileName',
        value: this.PhotoFileName,
      });
    }

    //Data being posted = formData
    var conf = confirm('Are you sure with the update?');
    if (conf == true) {
      this.adminService.UPDATE_account(form_payload, this.id).subscribe(
        (event) => {},
        (error) => {
          console.log(error);
        }
      );
      this.router.navigate(['authpanel', 'accounts']);
      alert('Account Updated Successfully');
    }
  }
}
