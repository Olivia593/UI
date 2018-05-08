import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  pageTitle: String = "List Posts";
  posts:any = [];
  showDetails:boolean = false;
  comments: any = [];
  title: String;
  likeTitle:String;
  likes: any = [];
  info: any = {};
  count: number = 1;
  newComments:any = {};
  constructor(private _postService:PostService,private _cookieService:CookieService) { }

  ngOnInit() {
    this._postService.getPosts().subscribe((data)=>{
      // console.log(data);
      this.posts = data;
    })
  }
  getComments(title:any){
    this.showDetails = true;
    this.title = title;
    this._postService.getComments(title).subscribe((data)=>{
      this.comments = data;
      // console.log(this.comments);
    });
  }
  selectedPost(title:any){
    if(this.title == title){
      return true;
    }
    return false;
  }
  selectedLike(title:any){
    if(this.likeTitle == title){
      return true;
    }
    return false;
  }
  createComments(title:any){
    this.newComments.title = title;
    this._postService.createComments(this.newComments).subscribe((data)=>{
      console.log("new comment added");
    })
    this.getComments(title);
  }
  addLike(title:any){
    this.info.email = this._cookieService.get('email');
    this.info.title = title;
    this.likeTitle = title;
    this._postService.addLike(this.info).subscribe((data)=>{
      this.likes = data;
      this.count = this.likes.length;
    })
    console.log(this.likes);
  }
}
