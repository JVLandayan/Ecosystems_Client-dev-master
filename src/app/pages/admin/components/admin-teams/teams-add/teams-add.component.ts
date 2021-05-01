import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-teams-add',
  templateUrl: './teams-add.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class TeamsAddComponent implements OnInit {
  form: FormGroup;
  imageSrc: string;
  selectedFile: File = null;
  PhotoFileName: string;
  PhotoFilePath: string;
  urlValid = false;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required] }),
      teams_name: new FormControl(null, { validators: [Validators.required] }),
      teams_role: new FormControl(null, { validators: [Validators.required] }),
      teams_detail: new FormControl(null, {
        validators: [Validators.required],
      }),
      teams_facebook_link: new FormControl(null, {
        validators: [],
      }),
      teams_twitter_link: new FormControl(null, {
        validators: [],
      }),
      teams_instagram_link: new FormControl(null, {
        validators: [],
      }),
    });
  }

  get formControls() {
    return this.form.controls;
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

    this.adminService.UploadPhotoTeams(formData).subscribe((data: any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.adminService.photoUrl + this.PhotoFileName;
    });
  }

  onSubmit(f: NgForm) {
    const userData = new FormData();
    userData.append('image', this.selectedFile, this.selectedFile.name);
    userData.append('teams_name', f.value.teams_name);
    userData.append('teams_detail', f.value.teams_detail);
    userData.append('teams_facebook_link', f.value.teams_facebook_link);
    userData.append('teams_twitter_link', f.value.teams_twitter_link);
    userData.append('teams_instagram_link', f.value.teams_instagram_link);

    const f_name: string = f.value.teams_name;
    const f_details: string = f.value.teams_detail;
    const f_role: string = f.value.teams_role;
    const f_facebook: string = f.value.teams_facebook_link;
    const f_twitter: string = f.value.teams_twitter_link;
    const f_instagram: string = f.value.teams_instagram_link;
    const form_payload = {
      TeamsImage: this.PhotoFileName,
      TeamsName: f_name,
      TeamsRole: f_role,
      TeamsDetails: f_details,
      TeamsFacebook: f_facebook,
      TeamsInstagram: f_instagram,
      TeamsTwitter: f_twitter,
    };

    //Data being posted = formData
    var conf = confirm('Confirm Adding?');

    if (conf == true) {
      this.adminService.POST_teams_member(form_payload).subscribe(
        () => {},
        (error) => {
          console.log(error);
        }
      );
      alert('Successfully Added');
      this.router.navigate(['authpanel', 'teams']);
    }
  }
}
