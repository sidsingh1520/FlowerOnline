import { Component, OnInit ,ViewChild} from '@angular/core';
import { Flower } from 'src/app/Models/flower';
import { FlowerService } from 'src/app/Services/flower.service';
import { FormBuilder, Validators } from '@angular/forms'
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  clicked:boolean=false
  dataSource:any=[]
  empty:boolean=true
  constructor(    private _snackBar: MatSnackBar, private fb: FormBuilder,private productService:FlowerService,private _liveAnnouncer: LiveAnnouncer) { }
  displayedColumns: string[] = ['name', 'image','size','category', 'price','update','delete'];
  updateProductForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    size: ['', [Validators.required]],
    price: [0, [Validators.required]],
    imageUrl: ['', [Validators.required]],
    category: ['', [Validators.required]],
  })
  flower=new Flower(0,"","","",0,"","")
  ngOnInit(): void {
    let email = localStorage.getItem('email')
    if (email == null) {
      email = 'nouser'
    }
    this.clicked=false
    this.productService.getAllFlowers().subscribe(data=>{
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
  deleteProduct(id:number){
    console.log(id)
    this.productService.deleteFlower(id).subscribe((data)=>{
      this.openSnackBar("Delete Successful","OK")
      this.ngOnInit()
    })
  }

  updateProduct(element:Flower){
    this.clicked=!this.clicked
    console.log(this.clicked)
    this.flower.id=element.id;
    this.flower.name=element.name;
    this.flower.description=element.description;
    this.flower.size=element.size;
    this.flower.price=element.price;
    this.flower.description=element.description;
    this.flower.imageUrl=element.imageUrl;
    this.flower.category=element.category;
  }
  updateProductList(){
    this.productService.updateFlower(this.flower.id,this.flower).subscribe((data)=>{
      this.openSnackBar("Update Successful","OK")
      this.ngOnInit()
    })
  }
  @ViewChild(MatSort) sort!: MatSort;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    })
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
