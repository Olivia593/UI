import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  
  authCheck$ = new Subject<any>();

  constructor(private _http:HttpClient,private _cookieService: CookieService,private _router:Router) { }
 
  register(details: any){
    this._http.post('http://localhost:3000/register',details).subscribe((data:any)=>{
        console.log(data)
        if(data.isLoggedIn){
          this._cookieService.set('token',data.token);
          this._cookieService.set('email',details.email);
          this.authCheck$.next(data.isLoggedIn);
          // console.log(data.isLoggedIn);
          this._router.navigate(['/home']);
        }
      });
  }

  login(details: any){
    console.log('login service');
    this._http.post('http://localhost:3000/login',details).subscribe((data:any)=>{
        console.log(data)
        if(data.isLoggedIn){
          this._cookieService.set('token',data.token);
          this._cookieService.set('email',details.email);
          this.authCheck$.next(data.isLoggedIn);
          this._router.navigate(['/home']);
        }
      });
  }
  logout(){
    this.authCheck$.next(false);
  }
  checkUserStatus(){
    return this._cookieService.get('token');
  }
}
