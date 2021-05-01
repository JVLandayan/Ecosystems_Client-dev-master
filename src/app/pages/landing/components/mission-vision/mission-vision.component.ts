import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { LandingService } from 'src/app/shared/services/landing.service';

@Component({
  selector: 'app-mission-vision',
  templateUrl: './mission-vision.component.html',
  styleUrls: ['./mission-vision.component.css'],
})
export class MissionVisionComponent implements OnInit {
  constructor(private landingService: LandingService) {}
  MissionDisplay;
  VisionDisplay;
  contentExists = false;

  ngOnInit(): void {
    this.landingService.FETCH_mission_vision().subscribe((response) => {
      this.MissionDisplay = response.mission;
      this.VisionDisplay = response.vision;
      if (response != null || response != undefined) {
        this.contentExists = true;
      }
    });
  }
}
