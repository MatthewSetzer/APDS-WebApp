import { Component, OnInit, SecurityContext } from '@angular/core';
import { PostService } from '../shared/post.service';
import { NgForm } from '@angular/forms';
import { Post } from '../shared/post.model';
import { DomSanitizer } from '@angular/platform-browser'

declare var M: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {

  constructor(public postService: PostService, protected sanitizer: DomSanitizer) { }

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

  logoutUser(){
    localStorage.clear();
  }

  onSubmit(form: NgForm) {

    var x = localStorage.getItem("LoggedIn");
    if(x != "true"){
      M.toast({ html: 'Login First', classes: 'rounded' });
      return;
    }

    if (form.value._id == "") {
      this.sanitizer.sanitize(SecurityContext.HTML, form.value.postBody);
      this.postService.savePost(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({ html: 'Saved Successfully', classes: 'rounded' });
      });
    }
    else {
      this.postService.putPost(form.value).subscribe((res) => {
        this.resetForm(form);
        M.toast({ html: 'Updated Post Successfully', classes: 'rounded' });
      });
    }

    location.reload();
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
