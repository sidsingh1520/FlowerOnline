import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { FlowerService } from 'src/app/Services/flower.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(    private fb: FormBuilder,
    private productService:FlowerService,
    private _snackBar: MatSnackBar,
    private router:Router) { }
  addProductForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    size: ['', [Validators.required]],
    price: [0, [Validators.required]],
    imageUrl: ['', [Validators.required]],
    category: ['', [Validators.required]],
  })
  ngOnInit(): void {
  }
  addProduct(){
    console.log(this.addProductForm.value)
    this.productService.addFlower(this.addProductForm.value).subscribe((data)=>{
      console.log(data)
      this.openSnackBar("Product Added Successfully","OK")
      this.router.navigate(['admin/productlist']);
    },
    (error)=>{
      this.openSnackBar("Something went Wrong","OK")
    }
    )
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    })
  }
}