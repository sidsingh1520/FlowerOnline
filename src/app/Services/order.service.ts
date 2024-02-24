import { Injectable } from '@angular/core';
import { Order } from '../Models/order';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { catchError, retry ,throwError } from 'rxjs';
import { Cart } from '../Models/cart';
import { Address } from '../Models/address';
const URL_ORDER = 'http://localhost:8080/order'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(private http: HttpClient) { }

  getAllOrdersByEmail(email:string){
    return this.http.get<Order[]>(`${URL_ORDER}/user/${email}`)
    .pipe(retry(0),catchError(this.handleError))
  }
  getBestSelling(){
    return this.http.get<any>(`${URL_ORDER}/best/selling`)
    .pipe(retry(0),catchError(this.handleError))
  }

  addOrder(address:Address | any){
    return this.http.post<Address>(`${URL_ORDER}/address`, address,httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }

  deleteOrder(id:number|undefined){
    return this.http.delete<Order>(`${URL_ORDER}/delete/${id}`)
    .pipe(retry(1),catchError(this.handleError))
  }
  getAllOrders(){
    return this.http.get<Order[]>(URL_ORDER)
    .pipe(retry(0),catchError(this.handleError))
  }
  getAddressByOrderId(id:number|undefined){
    return this.http.get<Address>(`${URL_ORDER}/address/${id}`)
    .pipe(retry(0),catchError(this.handleError))  
  }


  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      )
    }
    // Return an observable with a user-facing error message.
    if (error.status === 409) {
      return throwError(
        () => new Error('You have already added this city to watchlist'),
      )
    } else {
      return throwError(
        () => new Error('Something went bad ! Please try again after sometime'),
      )
    }
  }
}
