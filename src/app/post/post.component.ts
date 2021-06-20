import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { NgForm } from '@angular/forms';
import { Post } from '../shared/post.model';

declare var M: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {

  constructor(public postService: PostService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshPostList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.postService.selectedPost = {
      _id: "",
      userName: "",
      postTitle: "",
      postBody: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.postService.savePost(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPostList();
        M.toast({ html: 'Saved Successfully', classes: 'rounded' });
      });
    }
    else {
      this.postService.putPost(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshPostList();
        M.toast({ html: 'Updated Post Successfully', classes: 'rounded' });
      });
    }
  }

  refreshPostList() {
    this.postService.getPosts().subscribe((res) => {
      this.postService.posts = res as Post[];
    });
  }

  onEdit(post: Post) {
    M.updateTextFields();
    this.postService.selectedPost = post;
  }

  onDelete(_id: string, form: NgForm){
    if(confirm('Are you sure you want to delete this post?') == true){
      this.postService.deletePost(_id).subscribe((res)=>{
        this.resetForm(form);
        this.refreshPostList();
        M.toast({ html: 'Deleted Post Successfully', classes: 'rounded' });
      })
    }
  }

}
