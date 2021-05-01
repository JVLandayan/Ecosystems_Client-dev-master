import { Component, OnInit } from '@angular/core';
import { Articles } from 'src/app/shared/models/articles.model';
import { LandingService } from 'src/app/shared/services/landing.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  constructor(private landingService: LandingService) {}
  articles_landing_list: Articles[] = [];
  last_article: Articles;
  photoUrl = environment.apiphotoURl;
  isLoaded = false;
  genVar: Articles[];

  ngOnInit(): void {
    this.landingService.FETCH_articles().subscribe((data) => {
      const list_length = data.length;

      this.articles_landing_list = data;
      this.last_article = this.articles_landing_list[list_length - 1]; //list_length-1 references the last data

      this.isLoaded = true;
    });
  }
}
