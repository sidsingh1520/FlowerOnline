import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { Flower } from '../Models/flower';
import { catchError, retry ,throwError } from 'rxjs';


const URL_FLOWER = 'http://localhost:8080/product'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  constructor(private http: HttpClient) { }

  addFlower(flower:Flower){
    return this.http.post<Flower>(URL_FLOWER, flower,httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }

  updateFlower(id:number,flower:Flower){
    return this.http.put<Flower>(`${URL_FLOWER}/update/${id}`, flower,httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }


  getAllFlowers(){
    return this.http.get<Flower[]>(URL_FLOWER)
    .pipe(retry(2),catchError(this.handleError))
  }
  deleteFlower(id:number|undefined){
    return this.http.delete<Flower>(`${URL_FLOWER}/delete/${id}`)
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
