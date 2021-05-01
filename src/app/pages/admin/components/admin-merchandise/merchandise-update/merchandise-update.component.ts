import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-merchandise-update',
  templateUrl: './merchandise-update.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class MerchandiseUpdateComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  form: FormGroup;
  id: number;
  imageSrc: string;
  selectedFile: File = null;
  input_item_name;
  input_item_link;
  input_item_details;
  imgSrc;
  PhotoFileName: string;
  PhotoFilePath: string;
  input_image;
  imgLoaded = false;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.adminService.GET_merch(this.id).subscribe(
      (data) => {
        this.input_item_name = data.merchName;
        this.input_item_link = data.merchLink;
        this.input_item_details = data.merchDetails;
        this.input_image = data.merchImage;
      },
      (error) => {
        console.log(error);
      }
    );
    this.form = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required] }),
      item_name: new FormControl(null, { validators: [Validators.required] }),
      item_link: new FormControl(null, { validators: [Validators.required] }),
      item_details: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    setTimeout(() => {
      this.imgSrc = this.adminService.photoUrl + this.input_image;
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
    //Data being posted = formData
    const f_item_name: string = f.value.item_name;
    const f_item_details: string = f.value.item_details;
    const f_item_link: string = f.value.item_link;
    const f_email: string = f.value.ust_email;

    var form_payload = [];
    if (f_item_name != null) {
      form_payload.push({
        op: 'replace',
        path: '/merchName',
        value: f_item_name,
      });
    }
    if (f_item_details != null) {
      form_payload.push({
        op: 'replace',
        path: '/merchDetails',
        value: f_item_details,
      });
    }
    if (f_item_link != null) {
      form_payload.push({
        op: 'replace',
        path: '/merchLink',
        value: f_item_link,
      });
    }
    if (this.PhotoFileName != null) {
      form_payload.push({
        op: 'replace',
        path: '/merchImage',
        value: this.PhotoFileName,
      });
    }

    var conf = confirm('Are you sure with the update?');

    if (conf == true) {
      this.adminService.UPDATE_merch(form_payload, this.id).subscribe(
        (event) => {
          console.log(event);
        },
        (error) => {
          console.log(error);
        }
      );
      this.router.navigate(['authpanel', 'merchandise']);
      alert('Merchandise Updated Successfully');
    }
  }
}
