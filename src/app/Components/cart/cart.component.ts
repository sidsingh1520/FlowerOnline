import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserService } from 'src/app/Services/user.service';
import { Cart } from 'src/app/Models/cart';
import { Order } from 'src/app/Models/order';
import { Address } from 'src/app/Models/address';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  email:string=""
  isLoggedIn$: any
  products:Cart[]=[]
  total:number=0
  order:Order[]=[]
  empty:boolean=false
  address!: Address;
  constructor(private cartService:CartService,
    private _snackBar: MatSnackBar,private user:UserService) { }

  ngOnInit(): void {
    console.log("Inside NgOnit")
    this.isLoggedIn$ = this.user.loggedInStatus
    let email = localStorage.getItem('email')
    if (email == null) {
      email = 'nouser'
    }
    this.email=email;
    this.order=[]
    this.total=0
    this.cartService.getAllProductsByEmail(email).subscribe((data)=>{
      if(data==null){
        this.empty=false
      }
      else{
        this.empty=true
      }
      console.log(data)
      this.products=data
      this.products.forEach(element => {
        let order=new Order(element.id,element.email,element.name,1,element.description,element.size,element.price
          ,element.imageUrl);
        this.order.push(order)
        this.total=this.total+order.price
        console.log(order)
      });
    },(error)=>{
      this.empty=false
      console.log(error)
    })
  }

  totalPrice(){
    this.total=0
    this.order.forEach(element=>{
      this.total=this.total+(element.price*element.quantity)
    })
  }

  deleteProduct(id:number){
    console.log("inside Delete")
    this.cartService.deleteProduct(id).subscribe(()=>{
      console.log("Start Ng on Init")
      this.ngOnInit()
    },
    (error)=>{
      console.log(error)
    }
    )
    
  }
  checkout(){
    localStorage.setItem("order",JSON.stringify(this.order))
  }

}
