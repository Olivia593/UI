import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService} from '../auth/auth.service';

@Injectable()
export class PostService {

  constructor(private _http:HttpClient, private _authService:AuthService) { }

  createPost(details:any){
    return this._http.post('http://localhost:3000/createpost',details);
  }
  getPosts(){
    return this._http.get('http://localhost:3000/getposts');
  }
  getComments(title:any){
    // console.log(title);
    return this._http.post('http://localhost:3000/getcomments',{'title':title});
  }
  createComments(comments:any){
    return this._http.post('http://localhost:3000/createcomments',comments);
  }
  addLike(like:any){
    return this._http.post('http://localhost:3000/addlike',like);
  }
}
