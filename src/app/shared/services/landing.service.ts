import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchandise } from '../models/merchandise.model';
import { map } from 'rxjs/operators';
import { Teams } from '../models/teams.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'tinymce';
import { Articles } from '../models/articles.model';
import { Author } from '../models/author.model';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  constructor(private http: HttpClient) {}

  merchandiseExists;
  teamsExists;

  //merch-fetch-data
  FETCH_merchandise() {
    return this.http.get<Merchandise[]>(environment.apiUrl + 'merchandise');
  }

  //teams-fetch-data
  FETCH_teams() {
    return this.http.get<Teams[]>(environment.apiUrl + 'teams');
  }

  FETCH_articles() {
    return this.http.get<Articles[]>(environment.apiUrl + 'articles');
  }

  FETCH_article(id) {
    return this.http.get<Articles>(environment.apiUrl + 'articles/' + id);
  }

  FETCH_articleAuthor(id) {
    return this.http.get<Author>(environment.apiUrl + 'accounts/author/' + id);
  }

  FETCH_mission_vision() {
    return this.http.get<State>(environment.apiUrl + 'state/' + 1);
  }
}
