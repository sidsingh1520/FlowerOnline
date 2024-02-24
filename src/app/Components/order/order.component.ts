import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { UserService } from 'src/app/Services/user.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  dataSource:any=[]
  empty:boolean=true
  role$:any
  isAdmin:boolean=false
  constructor(private order:OrderService,private user:UserService,public dialog: MatDialog) { }
  displayedColumns: string[] = ['name', 'image','email','orderDate', 'size', 'price','quantity','address'];
  ngOnInit(): void {
    let email = localStorage.getItem('email')
    if (email == null) {
      email = 'nouser'
    }
    this.role$=this.user.Role
    this.isAdmin=false
    console.log(this.isAdmin)
    if(this.role$.source._value=="admin"){
      this.isAdmin=true;
      console.log(this.isAdmin)
      this.order.getAllOrders().subscribe(data=>{
        if(data==null){
          this.empty=true
        }
        else{
          this.empty=false
        }
        console.log(data)
        this.dataSource=data
      },(error)=>{
        console.log(error)
        this.empty=true
      })
    }
    else{
      this.order.getAllOrdersByEmail(email).subscribe(data=>{
        if(data==null){
          this.empty=true
        }
        else{
          this.empty=false
        }
        console.log(data)
        this.dataSource=data
      },(error)=>{
        this.empty=true
      })
    }

  }
  viewAddress(id:number){
    this.order.getAddressByOrderId(id).subscribe((element)=>{
      console.log(element)
      this.dialog.open(DialogComponent, {
        data: {
          element
        },
      });
    })


  }
  

}
