import { Component, OnInit ,Inject } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Address } from 'src/app/Models/address';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
