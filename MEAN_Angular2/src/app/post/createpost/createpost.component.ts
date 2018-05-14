import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent implements OnInit {
  postDetails:any = {};
  constructor(private _postService:PostService) { }

  ngOnInit() {
  }
  createPost(){
    this._postService.createPost(this.postDetails).subscribe((data)=>{
      console.log('create post');
    })
  }
}
