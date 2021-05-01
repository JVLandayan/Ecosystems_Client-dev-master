import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/shared/models/articles.model';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { LandingService } from 'src/app/shared/services/landing.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['../articlespage.component.css'],
})
export class ArticleListComponent implements OnInit {
  constructor(private landingService: LandingService) {}
  blogContent: Articles[] = [];
  pageNum = 1;
  photoUrl = environment.apiphotoURl;

  ngOnInit(): void {
    this.landingService.FETCH_articles().subscribe((data) => {
      this.blogContent = data;
      console.log(data);
    });
  }
}
