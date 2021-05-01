import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Articles } from '../models/articles.model';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(public datepipe: DatePipe) {}

  latestDate: any;

  getDate() {
    this.latestDate = new Date();
    const latest_date = this.datepipe.transform(this.latestDate, 'yyyy-MM-dd');
    return latest_date;
  }
}
