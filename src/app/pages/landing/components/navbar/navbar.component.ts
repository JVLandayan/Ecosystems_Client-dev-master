import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LandingService } from 'src/app/shared/services/landing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private landingService: LandingService) {}
  merchExists = false;

  ngOnInit(): void {
    this.landingService.FETCH_merchandise().subscribe((response) => {
      if (response.length != 0) this.merchExists = true;
    });
  }
}
