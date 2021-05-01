import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  currentUser: User;
  activeRoute;

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    this.activeRoute = this.router.url;
  }
}
