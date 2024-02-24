import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { catchError, retry ,throwError } from 'rxjs';
import { Location } from '../Models/location';
const URL_Location = 'http://localhost:8080/location'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }


  addLocation(location:Location){
    return this.http.post<Location>(URL_Location, location,httpOptions)
    .pipe(retry(1), catchError(this.handleError))
  }

  deleteLocation(id:number){
    return this.http.delete<Location>(`${URL_Location}/delete/${id}`)
    .pipe(retry(1),catchError(this.handleError))
  }
  getAllLocations(){
    return this.http.get<Location[]>(`${URL_Location}/all`)
    .pipe(retry(0),catchError(this.handleError))
  }

  updateLocation(id:number,location:Location){
    return this.http.put<Location>(`${URL_Location}/update/${id}`,location,httpOptions)
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
