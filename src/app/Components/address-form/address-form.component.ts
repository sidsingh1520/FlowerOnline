import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserService } from 'src/app/Services/user.service';
import { OrderService } from 'src/app/Services/order.service';
import { Address } from 'src/app/Models/address';
import { OrderDto } from 'src/app/Models/order-dto';
import { CartService } from 'src/app/Services/cart.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  isLoggedIn$: any
  email:string=""
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private user:UserService,
    private orderService:OrderService,
    private cartService:CartService,
    private router:Router
  ) { }
    
  
  ngOnInit(): void {
    console.log("Inside NgOnit")
    this.isLoggedIn$ = this.user.loggedInStatus
    let email = localStorage.getItem('email')
    if (email == null) {
      email = 'nouser'
    }
    this.email=email;
  }
  order:OrderDto[]=[] as OrderDto[]
  addressForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    address2: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    postalcode: ['', [Validators.required]],
  })
  submitDetails(){
    this.emptyCart()
    let temp_add=this.addressForm.value
    var obj=JSON.parse(localStorage.getItem("order") || "[]");
    obj.forEach((element:any)=>{
      let temp=new OrderDto(element.email,element.name,element.quantity,element.description,element.size,element.price,element.imageUrl)
      this.order.push(temp)
    })
    let address=new Address(temp_add.firstName,temp_add.lastName,temp_add.address1,temp_add.address2,temp_add.city,temp_add.state,temp_add.country,temp_add.postalcode,this.order)

    this.orderService.addOrder(address).subscribe((data)=>{
      console.log(data)
      this.openSnackBar("Order Placed Successfully","OK")
      this.router.navigate(['accounts/order']);
    },
    (error)=>{
      console.log(error)
    }
    )
  }
  emptyCart(){
    this.cartService.deleteAllProduct(this.email).subscribe(()=>{})
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    })
  }
}
