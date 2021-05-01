import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Articles } from 'src/app/shared/models/articles.model';
import { Author } from 'src/app/shared/models/author.model';

import { LandingService } from 'src/app/shared/services/landing.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
})
export class ArticlePageComponent implements OnInit {
  activeArticle: Articles;
  articleAuthor: Author;
  id;
  photoUrlApi = environment.apiphotoURl;
  isPhotoLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private landingService: LandingService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.landingService.FETCH_article(this.id).subscribe((data) => {
      this.activeArticle = data;
      console.log(data);
    });
    setTimeout(() => {
      this.landingService
        .FETCH_articleAuthor(this.activeArticle.authorId)
        .subscribe((data) => {
          this.articleAuthor = data;

          setTimeout(() => {
            this.isPhotoLoaded = true;
          }, 1000);
        });
    }, 1500);
  }
}
