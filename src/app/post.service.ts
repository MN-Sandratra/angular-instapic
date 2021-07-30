import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { post } from 'src/assets/data/post';
import { comment } from 'src/assets/data/comment';
import { Commentaire } from './commentaire';
import { user } from 'src/assets/data/user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getAllPost=()=>{
    return post;
  }

  getPostByUserId=(id:number)=>{
    return post.filter(x=>x.userId==id);
  }
  getAllComment=()=>{
    return comment;
  }
  getCommentByPostid=(id:number)=>{
    return comment.filter(x=>x.postId==id);
  }
  getAllUser=()=>{
    return user;
  }
  getuserById=(id:number)=>{
    return user.filter(x=>x.id==id);
  }

  addComment=(Commentaire:Commentaire)=>{
    comment.push(Commentaire);
  }
  getPostById=(id:number)=>{
    return post.filter(x=>x.id==id);
  }
}
