import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Merchandise } from '../models/merchandise.model';
import { State } from '../models/state.model';
import { Teams } from '../models/teams.model';
import { Useraccount } from '../models/useraccount.model';

declare var tinymce: any;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}
  readonly apiUrl = 'http://localhost:5000/api/';
  readonly photoUrl = 'http://localhost:5000/Photos/';

  //START Accounts
  POST_account(userData) {
    return this.http.post(this.apiUrl + 'accounts', userData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  //Get account(1)
  GET_account(id: number) {
    return this.http.get<Useraccount>(this.apiUrl + 'accounts/' + id); //in the api url. add the id to reference the specific block
  }

  //Get Accounts []
  GET_accounts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'accounts');
  }

  DELETE_account(id) {
    return this.http.delete(this.apiUrl + 'accounts/' + id);
  }

  UPDATE_account(userData, id) {
    return this.http.patch(this.apiUrl + 'accounts/' + id, userData);
  }

  UPDATE_account_pass(userData, id) {
    return this.http.put(this.apiUrl + 'accounts/' + id + '/pass', userData);
  }
  UPDATE_account_image(userData, id) {
    return this.http.put(this.apiUrl + 'accounts/' + id + '/image', userData);
  }

  UploadPhotoAccount(val: any) {
    return this.http.post(this.apiUrl + 'accounts/SaveFile', val);
  }
  //END Accounts

  //START Content
  POST_content(content) {
    return this.http.post(this.apiUrl + 'articles', content);
  }

  GET_contents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'articles');
  }
  GET_content(id: number) {
    return this.http.get(this.apiUrl + 'articles/' + id);
  }

  PUT_content(content, id: number) {
    return this.http.put(this.apiUrl + 'articles/' + id, content);
  }
  PATCH_content(content, id: number) {
    return this.http.patch(this.apiUrl + 'articles/' + id, content);
  }
  DELETE_content(id) {
    return this.http.delete(this.apiUrl + 'articles/' + id);
  }
  UploadPhotoArticle(val: any) {
    return this.http.post(this.apiUrl + 'article/SaveFile', val);
  }
  //End Content

  //START MERCH
  //Add merch
  POST_merch(credentials) {
    return this.http.post(this.apiUrl + 'merchandise', credentials);
  }

  //Get Merch(1)
  GET_merch(id: number) {
    return this.http.get<Merchandise>(this.apiUrl + 'merchandise/' + id); //in the api url. add the id to reference the specific block
  }

  //Merch List
  GET_merchs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'merchandise');
  }

  DELETE_merch(merchId) {
    return this.http.delete(this.apiUrl + 'merchandise/' + merchId);
  }

  UPDATE_merch(merchData, id: number) {
    return this.http.patch(this.apiUrl + 'merchandise/' + id, merchData);
  }
  UploadPhotoMerch(val: any) {
    return this.http.post(this.apiUrl + 'merchandise/SaveFile', val);
  }

  //END MERCH

  //TEAMS START
  POST_teams_member(credentials) {
    return this.http.post(this.apiUrl + 'teams', credentials);
  }

  //GET_Team member
  GET_team_member(id: number) {
    return this.http.get<Teams>(this.apiUrl + 'teams/' + id); //in the api url. add the id to reference the specific block
  }

  //Get teams  []
  GET_teams_list(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'teams');
  }

  DELETE_teams_member(accountId) {
    return this.http.delete(this.apiUrl + 'teams/' + accountId);
  }

  UPDATE_teams_member(credentials, id: number) {
    return this.http.patch(this.apiUrl + 'teams/' + id, credentials);
  }
  UploadPhotoTeams(val: any) {
    return this.http.post(this.apiUrl + 'teams/SaveFile', val);
  }

  //TEAMS END

  //STATE START

  POST_state(form_payload) {
    return this.http.post(this.apiUrl + 'state', form_payload);
  }

  GET_state(id: number) {
    return this.http.get<State>(this.apiUrl + 'state/' + id);
  }

  UPDATE_state(form_payload, id) {
    return this.http.put(this.apiUrl + 'state/' + id, form_payload);
  }

  //STATE ENd
}
