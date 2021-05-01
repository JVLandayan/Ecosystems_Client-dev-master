import { Component, OnInit } from '@angular/core';
import { Merchandise } from 'src/app/shared/models/merchandise.model';
import { Teams } from 'src/app/shared/models/teams.model';
import { Useraccount } from 'src/app/shared/models/useraccount.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class AccountsListComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  accounts_list: Useraccount[];
  pageNum = 1;

  ngOnInit(): void {
    this.adminService.GET_accounts().subscribe((data) => {
      this.accounts_list = data;
      console.log(data);
    });
  }

  onDeleteAccount(id) {
    var r = confirm('Confirm Delete?');
    if (r == true) {
      this.adminService.DELETE_account(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
