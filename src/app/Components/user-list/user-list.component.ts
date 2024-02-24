import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { User } from 'src/app/Models/user';
import { UserService } from 'src/app/Services/user.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

let user=new User("Sid","email","pass","lko","india","7880","user",new Date())
let user2=new User("Rahul","email","pass","lko","india","7880","user",new Date())
var ELEMENT_DATA: User[] = [
  user,user2
];


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements  OnInit {
  displayedColumns: string[] = ['name', 'email', 'city', 'country','phone'];
  dataSource:any=[]
  searchKey:string=""
  constructor(private _liveAnnouncer: LiveAnnouncer,private user:UserService) {
    this.user.getAllUsers().subscribe((data)=>{
      console.log(data)
      this.dataSource=new MatTableDataSource(data)
    })
  }
  ngOnInit(): void {
    this.user.getAllUsers().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })

  }
  @ViewChild(MatSort) sort!: MatSort;



  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
