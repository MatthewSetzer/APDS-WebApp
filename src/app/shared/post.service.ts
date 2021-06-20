import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';

@Injectable()
export class PostService {

  selectedPost: Post;
  posts: Post[];
  readonly baseURL = 'https://localhost:3000/posts'

  constructor(private http: HttpClient) { }

  savePost(post: Post) {
    return this.http.post(this.baseURL, post);
  }

  getPosts() {
    return this.http.get(this.baseURL);
  }

  putPost(post: Post) {
    return this.http.put(this.baseURL + `/${post._id}`, post);
  }

  deletePost(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
