import { Component, OnInit } from '@angular/core'
import { Flower } from 'src/app/Models/flower';
import { FlowerService } from 'src/app/Services/flower.service'
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public filterCategory:any
  constructor(private flowerService:FlowerService,private order:OrderService) {}
  searchKey:string=""
  flowers:Flower[]=[]
  selected:string="az"
  ngOnInit(): void {
    this.flowerService.getAllFlowers().subscribe((data)=>{
      console.log(data)
    this.flowers=data;
    this.filterCategory=data
    this.clicked(this.selected)
  })
  }


  clicked(value:string){
    console.log(value)
    if(value==="htl"){
      this.filterCategory=this.flowers.sort((a,b)=>a.price>b.price?-1:1)
    }
    else if(value==="lth"){
      this.filterCategory=this.flowers.sort((a,b)=>a.price<b.price?-1:1)
    }
    else if(value==="az"){
      this.filterCategory=this.flowers.sort((a,b)=>a.name<b.name?-1:1)
    }
    else if(value==="bs"){
      let lst=[] as any
      this.flowers.forEach(data=>{
        this.order.getBestSelling().subscribe(element=>{
          let arr=element
          arr.forEach((a:any) => {
            if(a[0]===data.name){
              lst.push(data)
            }
          });
        })
      })
      this.filterCategory=lst

    }
    
  }

  filter(category:string){
    this.filterCategory=this.flowers.filter((a:any)=>{
      if(a.category == category|| category==''){
        return a;
      }
    })
  }

}
