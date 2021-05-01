import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-merchandise-add',
  templateUrl: './merchandise-add.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class MerchandiseAddComponent implements OnInit {
  form: FormGroup;
  imageSrc: string;
  selectedFile: File = null;
  PhotoFileName: string;
  PhotoFilePath: string;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      MerchImage: new FormControl(null, { validators: [Validators.required] }),
      MerchName: new FormControl(null, { validators: [Validators.required] }),
      MerchLink: new FormControl(null, { validators: [Validators.required] }),
      MerchDetails: new FormControl(null, {
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

    this.adminService.UploadPhotoMerch(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.adminService.photoUrl + this.PhotoFileName;
    });
  }

  onSubmit(f: NgForm) {
    const f_MerchName: string = f.value.MerchName;
    const f_MerchDetails: string = f.value.MerchDetails;
    const f_MerchLink: string = f.value.MerchLink;

    var form_payload = {
      MerchName: f_MerchName,
      MerchDetails: f_MerchDetails,
      MerchLink: f_MerchLink,
      MerchImage: this.PhotoFileName,
    };

    //Data being posted = formData

    var conf = confirm('Confirm Adding?');

    if (conf == true) {
      this.adminService.POST_merch(form_payload).subscribe(
        (event) => {
          console.log(event);
        },
        (error) => {
          console.log(error);
        }
      );
      alert('Successfully Added');
      this.router.navigate(['authpanel', 'merchandise']);
    }
  }
}
