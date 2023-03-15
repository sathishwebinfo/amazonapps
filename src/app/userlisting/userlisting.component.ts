import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../services/auth.service';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.scss']
})
export class UserlistingComponent implements OnInit {
  userlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private _service: AuthService,
    private _dialog: MatDialog
  ) {
    this.loadUser();
  }
  ngOnInit(): void {

  }
  loadUser() {
    this._service.getAll().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource(this.userlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'action'];

  updateUser(code: any) {
    const popup = this._dialog.open(UpdatepopupComponent, {
      width: "50%",
      data:{
        usercode:code
      }
    })
    popup.afterClosed().subscribe(res => {
      this.loadUser();
    });
  }
  openDialog(){
    
  }
}
