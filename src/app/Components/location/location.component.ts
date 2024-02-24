import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { Location } from 'src/app/Models/location';
import { LocationService } from 'src/app/Services/location.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locations:Location[]=[]
  toggle:boolean=false
  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private user:UserService,
    private location:LocationService,
    private router:Router
  ) { }
  isLoggedIn$: any
  isAdmin:boolean=false
  ngOnInit(): void {
    console.log("Inside NgOnit")
    this.isLoggedIn$ = this.user.loggedInStatus
    let role = localStorage.getItem('role') || ""
    if (role == "admin") {
      this.isAdmin = true
    }
    else{
      this.isAdmin=false
    }
    this.location.getAllLocations().subscribe(data=>{
      console.log(data)
      this.locations=data
    })

  }
  addressForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    phone: [0, [Validators.required]],
    country: ['', [Validators.required]],
    pinCode: ['', [Validators.required]],
  })
  onClick(){
    this.toggle=!this.toggle
    this.ngOnInit()
  }

  submitDetails(){
    console.log(this.addressForm.value)
    this.location.addLocation(this.addressForm.value).subscribe(data=>{
      console.log(data)
      this.openSnackBar("Location Added Successfully","OK")
      this.onClick()
    })
  }
  delete(id:number){
    this.location.deleteLocation(id).subscribe(()=>{
      this.openSnackBar("Delete Successful","OK")
      this.ngOnInit()
    })
  }

  contactUs(phone:string){
    this.openSnackBar("Contact Us At : "+ phone,"OK")
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['blue-snackbar'],
    })
  }
}
