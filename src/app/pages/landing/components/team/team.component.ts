import { Component, OnInit } from '@angular/core';
import { Teams } from 'src/app/shared/models/teams.model';
import { LandingService } from 'src/app/shared/services/landing.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  team_list: Teams[] = [];
  photoUrl = environment.apiphotoURl;

  constructor(private landingService: LandingService) {
    this.landingService.FETCH_teams().subscribe(
      (data) => {
        this.team_list = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}
}
