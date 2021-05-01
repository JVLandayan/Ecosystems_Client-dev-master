import { Component, OnInit } from '@angular/core';
import { Merchandise } from 'src/app/shared/models/merchandise.model';
import { AdminService } from 'src/app/shared/services/admin.service';

@Component({
  selector: 'app-merchandise-list',
  templateUrl: './merchandise-list.component.html',
  styleUrls: ['../../../admin.component.css'],
})
export class MerchandiseListComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  merch_list = [];
  pageNum = 1;

  ngOnInit(): void {
    this.adminService.GET_merchs().subscribe((res) => {
      this.merch_list = res;
    });
  }

  onDeleteMerch(id: number) {
    var r = confirm('Confirm Delete?');
    if (r == true) {
      this.adminService.DELETE_merch(id).subscribe(
        () => {
          this.ngOnInit();
        },
        (error) => {
          window.prompt('An error has occured, error type: ' + error);
        }
      );
    }
  }
}
