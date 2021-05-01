import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Teams } from 'src/app/shared/models/teams.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-teams-update',
  templateUrl: './teams-update.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class TeamsUpdateComponent implements OnInit {
  form: FormGroup;
  imageSrc: string;
  selectedFile: File = null;
  id: number;
  inputName;
  inputDetails;
  inputFacebook;
  inputInstagram;
  inputTwitter;
  inputRole;
  imgSrc;
  inputImage;
  PhotoFileName: string;
  PhotoFilePath: string;
  imgLoaded = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.adminService.GET_team_member(this.id).subscribe((data) => {
      this.inputName = data.teamsName;
      this.inputDetails = data.teamsDetails;
      this.inputFacebook = data.teamsFacebook;
      this.inputInstagram = data.teamsInstagram;
      this.inputTwitter = data.teamsTwitter;
      this.inputRole = data.teamsRole;
      this.inputImage = data.teamsImage;
      this.imageSrc = this.adminService.photoUrl + this.inputImage;
    });
    this.form = new FormGroup({
      image: new FormControl(null, { validators: [Validators.required] }),
      teams_name: new FormControl(null, { validators: [Validators.required] }),
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
      teams_role: new FormControl(null, {
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
    const form_payload = [];

    if (this.inputName != null) {
      form_payload.push({
        op: 'replace',
        path: '/teamsName',
        value: this.inputName,
      });
    }
    if (this.inputRole != null) {
      form_payload.push({
        op: 'replace',
        path: '/teamsRole',
        value: this.inputRole,
      });
    }
    if (this.inputDetails != null) {
      form_payload.push({
        op: 'replace',
        path: '/teamsDetails',
        value: this.inputDetails,
      });
    }
    if (this.inputFacebook != null) {
      form_payload.push({
        op: 'replace',
        path: '/teamsFacebook',
        value: this.inputFacebook,
      });
    }
    if (this.inputInstagram != null) {
      form_payload.push({
        op: 'replace',
        path: '/teamsInstagram',
        value: this.inputInstagram,
      });
    }
    if (this.inputTwitter != null) {
      form_payload.push({
        op: 'replace',
        path: '/teamsTwitter',
        value: this.inputTwitter,
      });
    }
    if (this.PhotoFileName != null) {
      form_payload.push({
        op: 'replace',
        path: '/teamsImage',
        value: this.PhotoFileName,
      });
    }

    //Data being posted = formData
    var conf = confirm('Are you sure with the update?');

    if (conf == true) {
      this.adminService
        .UPDATE_teams_member(form_payload, this.id)
        .subscribe((event) => {
          console.log(event);
        });
    }
    this.router.navigate(['authpanel', 'teams']);
    alert('Teams Updated Successfully');
  }
}
