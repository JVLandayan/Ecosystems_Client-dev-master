import { Component, OnInit } from '@angular/core';
import { Merchandise } from 'src/app/shared/models/merchandise.model';
import { LandingService } from 'src/app/shared/services/landing.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.css'],
})
export class MerchandiseComponent implements OnInit {
  merch_list: Merchandise[];
  apiImgUrl = environment.apiphotoURl;

  constructor(private landingService: LandingService) {
    this.landingService.FETCH_merchandise().subscribe((merchdata) => {
      this.merch_list = merchdata;
    });
  }

  ngOnInit(): void {
    if (this.merch_list.length != 0) {
      this.landingService.merchandiseExists = true;
    }
  }
}
