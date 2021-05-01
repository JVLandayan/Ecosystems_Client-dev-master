import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['../../admin.component.css'],
})
export class AdminNavbarComponent implements OnInit {
  constructor(private authService: AuthService) {}
  currentUser: User = this.authService.currentUserValue;

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
  }
}
