import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from '../../post.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  posts: any = [];
  post: any = {};
  comments: any = [];
  showDetails:boolean = false;
  newComments:any = {};
  like:any = {};
  info: any = {};
  likes: any  = [];
  count: number = 1;
  isLike: boolean = false;
  constructor(private _activateRoute:ActivatedRoute,private _postService:PostService,private _router:Router,private _cookieService:CookieService) { }

  ngOnInit() {
    this._activateRoute.params.subscribe((data) => {
      console.log(data.title);
      var title = data.title;
      this._postService.getPosts().subscribe((data)=>{
        this.posts = data;
        console.log(this.posts);
        this.post = this.posts.filter(item=>item.title==title)[0];
        console.log(this.post);
      });
  });
  }
  gotolist(){
    this._router.navigate(['/listpost']);
  }
  getComments(title:any){
    this.showDetails = true;
    this._postService.getComments(title).subscribe((data)=>{
      this.comments = data;
      console.log(this.comments);
    });
  }
  createComments(title:any){
    this.newComments.title = title;
    this._postService.createComments(this.newComments).subscribe((data)=>{
      console.log("new comment added");
    })
    this.getComments(title);
  }
  addLike(title:any){
    this.isLike = !this.isLike;
    this.info.email = this._cookieService.get('email');
    this.info.title = title;
    this._postService.addLike(this.info).subscribe((data)=>{
      this.likes = data;
      this.count = this.likes.length;
    })
    console.log(this.likes);
  }
}
