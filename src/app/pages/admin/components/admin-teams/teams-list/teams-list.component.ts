import { Component, OnInit } from '@angular/core';
import { Teams } from 'src/app/shared/models/teams.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class TeamsListComponent implements OnInit {
  constructor(private adminService: AdminService) {}
  teams_list = [];
  photoUrl = this.adminService.photoUrl;

  ngOnInit(): void {
    this.adminService.GET_teams_list().subscribe(
      (data) => {
        this.teams_list = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onDeleteTeamMember(id) {
    var f = confirm('Confirm Delete?');
    if (f == true) {
      this.adminService.DELETE_teams_member(id).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}
