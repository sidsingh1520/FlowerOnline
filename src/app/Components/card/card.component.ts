import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/Models/cart';
import { CartService } from 'src/app/Services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserService } from 'src/app/Services/user.service';
import { Output, EventEmitter } from '@angular/core';
import { Flower } from 'src/app/Models/flower';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  email:string=""
  @Input() product={} as Flower
  @Output() addToCartEvent = new EventEmitter<Cart>();
  cart:Cart[]=[]
  isLoggedIn$: any
  constructor(private cartService:CartService,
    private _snackBar: MatSnackBar,private user:UserService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.user.loggedInStatus
    let email = localStorage.getItem('email')
    if (email == null) {
      email = 'nouser'
    }
    this.email=email;
  }


  addToCart(product:Flower){
    let cart=new Cart(product.id,this.email,product.name,product.description,product.size,product.price,product.imageUrl)
    console.log(cart)
    this.cartService.addProduct(cart).subscribe((data)=>this.openSnackBar('Added To Cart', 'Ok'))
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    })
  }


}
