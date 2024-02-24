import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { Flower } from '../Models/flower';
import { catchError, retry ,throwError } from 'rxjs';
import { Cart } from '../Models/cart';


const URL_FLOWER = 'http://localhost:8080/cart'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  getAllProductsByEmail(email:string){
    return this.http.get<Cart[]>(`${URL_FLOWER}/user/${email}`)
    .pipe(retry(0),catchError(this.handleError))
  }

  addProduct(cart:Cart){
    return this.http.post<Cart>(URL_FLOWER, cart,httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }

  deleteProduct(id:number|undefined){
    return this.http.delete<Cart>(`${URL_FLOWER}/delete/${id}`)
    .pipe(retry(1),catchError(this.handleError))
  }

  deleteAllProduct(email:string){
    return this.http.delete<Cart>(`${URL_FLOWER}/delete/cart/${email}`)
    .pipe(retry(1),catchError(this.handleError))
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
