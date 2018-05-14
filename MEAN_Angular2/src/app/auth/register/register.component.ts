import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  auth: any = {};
  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  register(){
    this._authService.register(this.auth);
  }
}
