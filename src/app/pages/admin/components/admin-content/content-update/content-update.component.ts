import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncSubject, Subject } from 'rxjs';
import { Articles } from 'src/app/shared/models/articles.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-content-update',
  templateUrl: './content-update.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class ContentUpdateComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  apiKey = environment.apiKey;
  private editorSubject: Subject<any> = new AsyncSubject();
  form: FormGroup;
  selectedFile: File = null;
  imageSrc: string;
  RTEinitial;
  imgSrc;
  RTEInit = {
    icons: 'material',
    skin: 'borderless',
    plugins: 'wordcount',
    menubar: false,
    min_height: 400,
  };
  PhotoFileName: string;
  PhotoFilePath: string;
  id: number;
  inputTitle;
  inputImage;
  isLoaded = false;
  inputIntro;
  form_image;

  ngOnInit(): void {
    this.form = new FormGroup({
      post_image: new FormControl(null, { validators: [] }),
      post_title: new FormControl(null, { validators: [Validators.required] }),
      post_intro: new FormControl(null, { validators: [Validators.required] }),
      post_content: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
    this.id = this.route.snapshot.params['id'];
    this.adminService.GET_content(this.id).subscribe((data: Articles) => {
      this.inputTitle = data.name;
      this.RTEinitial = data.content;
      this.inputImage = data.image;
      this.inputIntro = data.contentIntro;
      this.imageSrc = this.adminService.photoUrl + this.inputImage;
    });
    setTimeout(() => {
      this.imgSrc = this.adminService.photoUrl + this.inputImage;
      this.isLoaded = true;
    }, 1000);
  }

  handleEditorInit(e) {
    this.editorSubject.next(e.editor);
    this.editorSubject.complete();
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
    const f_postName: string = f.value.post_title;
    const f_content: string = f.value.post_content;
    const f_intro: string = f.value.post_intro;
    const content_payload = f_content == null ? this.RTEinitial : f_content;
    if (this.PhotoFileName == null) {
      this.form_image = this.inputImage;
    } else {
      this.form_image = this.PhotoFileName;
    }

    const form_payload = {
      content: content_payload,
      image: this.form_image,
      contentIntro: f_intro,
      name: f_postName,
    };

    var conf = confirm('Are you sure with the update?');
    if (conf == true) {
      this.adminService.PUT_content(form_payload, this.id).subscribe(
        (event) => {
          console.log(event);
        },
        (error) => {
          console.log(error);
        }
      );
      this.router.navigate(['authpanel', 'content']);
      alert('Content Updated Successfuly');
    }
  }
}
