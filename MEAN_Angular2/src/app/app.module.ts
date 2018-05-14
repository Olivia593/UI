import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs/Subject';

import { AppComponent } from './app.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomeComponent } from './layout/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListPostComponent } from './post/list-post/list-post.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { CreatepostComponent } from './post/createpost/createpost.component';
import { PostService } from './post/post.service';
import { DetailsComponent } from './post/list-post/details/details.component';
import { AuthinterceptorService } from './auth/authinterceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ListPostComponent,
    CreatepostComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path:"home", component:HomeComponent,canActivate:[AuthGuard]},
      { path:"login", component:LoginComponent},
      { path:"register", component:RegisterComponent },
      { path:"createpost", component:CreatepostComponent,canActivate:[AuthGuard] },
      { path:"listpost", component:ListPostComponent, canActivate:[AuthGuard]},
      { path:"details/:title",component:DetailsComponent,canActivate:[AuthGuard]},
      { path:"", redirectTo:"home", pathMatch:"full" },
      { path:"**", redirectTo:"home" }
    ]),
    HttpClientModule
  ],
  providers: [AuthService,CookieService,AuthGuard,PostService,{
    provide: HTTP_INTERCEPTORS,
    useClass:AuthinterceptorService,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
