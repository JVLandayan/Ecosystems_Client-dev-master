import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AsyncSubject } from 'rxjs';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-content-add',
  templateUrl: './content-add.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class ContentAddComponent implements OnInit {
  apiKey = environment.apiKey;
  private editorSubject: Subject<any> = new AsyncSubject();
  form: FormGroup;
  selectedFile: File = null;
  imageSrc: string;
  RTEInit = {
    icons: 'material',
    skin: 'borderless',
    plugins: 'wordcount',
    menubar: false,
    min_height: 150,
  };
  PhotoFileName: string;
  PhotoFilePath: string;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}
  currentUser: User = this.authService.currentUserValue;

  ngOnInit(): void {
    this.form = new FormGroup({
      post_image: new FormControl(null, { validators: [Validators.required] }),
      post_title: new FormControl(null, { validators: [Validators.required] }),
      post_intro: new FormControl(null, { validators: [Validators.required] }),
      post_content: new FormControl(null, {
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

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
  }

  onSubmit(f: NgForm) {
    const postData = new FormData();
    postData.append('post_title', f.value.post_title);
    postData.append('post_content', f.value.post_content);

    const f_postName: string = f.value.post_title;
    const f_content: string = f.value.post_content;
    const f_intro: string = f.value.post_intro;

    const form_payload = {
      Name: f_postName,
      Content: f_content,
      Image: this.PhotoFileName,
      AuthorName: this.currentUser.firstName + ' ' + this.currentUser.lastName,
      AuthorImg: this.currentUser.photoFileName,
      DateofPublish: 'abc',
      ContentIntro: f_intro,
      AuthorId: this.currentUser.id,
    };

    //Data being posted = formData

    var conf = confirm('Confirm Adding?');

    if (conf == true) {
      this.adminService.POST_content(form_payload).subscribe(
        (event) => {
          console.log(event);
        },
        (error) => {
          console.log(error);
        }
      );
      alert('Successfully Added');
      this.router.navigate(['authpanel', 'content']);
    }
  }
}
