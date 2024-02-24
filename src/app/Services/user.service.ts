import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, throwError, retry } from 'rxjs'
import { User } from '../Models/user'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseAuthUrl = 'http://localhost:8080/api/v2'
  httpOptions: any = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    }),
  }
  httpregOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }
  isLogged = new BehaviorSubject<boolean>(this.isLoggedIn())
  UserName = new BehaviorSubject<string | null>(
    localStorage.getItem('userName'),
  )
  role=new BehaviorSubject<string|null>(
    localStorage.getItem('role'),
  )
  result:any
  valid:boolean=false

  constructor(private http: HttpClient) {}


  getAllUsers(){
    return this.http.get<User[]>(`${this.baseAuthUrl}/users/all`)
  }

  register(user: User) {
    return this.http
      .post(`${this.baseAuthUrl}/register`, user, this.httpregOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  doLogin(user: User) {
    return this.http.post(`${this.baseAuthUrl}/login`, user)
  }

  validateToken() {
    let header=new HttpHeaders();
    header.set("Authorization", `Bearer ${this.getToken()}`)
    return this.http.post(
      `${this.baseAuthUrl}/authenticate`,
      header,
    )
  }

  getUser(email: string) {
    return this.http.get<User>(`${this.baseAuthUrl}/users/${email}`)
  }

  changeUserPassword(user: User) {
    return this.http
      .put<User>(`${this.baseAuthUrl}/users/`, user, httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  //for login user
  loginUser(token: string, email: string, userName: string, password: string,role:string) {
    this.isLogged.next(true)
    localStorage.setItem('isLogged', '1')
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    localStorage.setItem('userName', userName)
    localStorage.setItem('password', password)
    localStorage.setItem('role', role)
    return true
  }

  isLoggedIn() {
    let token = localStorage.getItem('token')
    if (token == undefined || token == null || token == '') {
      this.valid=false;
    } else {
      this.valid=true;
    }
    this.validateToken().subscribe((response)=>{
      console.log(response);
      this.result=response;
      if(this.result.message=="Valid token"){
        this.valid=true;
      }
      else{
        this.valid=false;
      }
    }
    )
    return this.valid;
  }

  logout() {
    this.isLogged.next(false)
    localStorage.setItem('isLogged', '0')
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('userName')
    localStorage.removeItem('password')
    localStorage.removeItem('role')
    return true
  }

  getToken() {
    return localStorage.getItem('token')
  }

  get loggedInStatus() {
    return this.isLogged.asObservable()
  }

  get currentUserName() {
    return this.UserName.asObservable()
  }
  get Role(){
    return this.role.asObservable()
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
        () => new Error('This email is already registered, Try signing in'),
      )
    } else {
      return throwError(
        () => new Error('Something went bad ! Please try again after sometime'),
      )
    }
  }
}
