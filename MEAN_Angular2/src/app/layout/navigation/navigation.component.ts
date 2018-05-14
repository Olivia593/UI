import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  toggleMenuItems : any = false;

  constructor(private _authService:AuthService, private _cookieService: CookieService) { }

  ngOnInit() {
    this._authService.authCheck$.subscribe((data) => {
      this.toggleMenuItems = data;
    });  
    console.log(this.toggleMenuItems);
  this.toggleMenuItems  = this._authService.checkUserStatus();
}
  logout(){
    this._cookieService.deleteAll();
    this._authService.logout();
    this._authService.authCheck$.subscribe((data)=>{
      this.toggleMenuItems = data;
    });
  }
}
