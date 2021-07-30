import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { comment } from 'src/assets/data/comment';
import { Commentaire } from '../commentaire';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() userId!:number;
  @Input() id!:number;
  @Input() image!:string;
  @Input() description!:string;
  @Input() like!:number;
  @Input() createAt!:string;


  public postuser=[{
    "id": 4,
    "username": "King James",
    "realName": "Ervin Howell",
    "bio":"Basketball player,King,Kids of akron",
    "picture":"assets/profile3.jpeg",
    "follower":925,
    "following":215,
}]

  public liked=false;
  public likeIcon = {
    white:
      'M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z',
    black:
      'M35.3 35.6c-9.2 8.2-9.8 8.9-11.3 8.9s-2.1-.7-11.3-8.9C6.5 30.1.5 25.6.5 17.8.5 9.9 6.4 3.5 13.7 3.5 20.8 3.5 24 8.8 24 8.8s3.2-5.3 10.3-5.3c7.3 0 13.2 6.4 13.2 14.3 0 7.8-6.1 12.3-12.2 17.8z',
  };
  public Commentaires=[
    {
      "postId": 1,
      "id": 1,
      "userId": 3,
      "commentaire": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    }
  ];
  public commentInput=''

  public clickLikePost(): void {
    this.liked=!this.liked;
    if(this.liked){
      this.like+=1;
    }else{
      this.like-=1;
    }
  }
  public publication=true;

  constructor(private router:Router,private api:PostService) { 
    
  }

  ngOnInit(): void { 
    this.getComment(); 
    this.postuser=this.getUser(this.userId);
    
    setInterval(()=>{
      document.querySelector('.add-comment'+this.id)?.setAttribute('data-bs-target','#static'+this.id+'');
    },
      2000
    );
    
    
  }

  onSelect=()=>{
    this.router.navigate(['/commentaire',this.id]);
  }

  changelikefromComment=(message:any)=>{
    if(this.like<parseInt(message))
      this.liked=true;
    else
      this.liked=false;
    this.like=parseInt(message);
  }
  onChangeInput(){
    if(this.commentInput.trim().length===0)
      this.publication=true;
    else
      this.publication=false;
  }
  handlePostComment(){
    if(this.commentInput.trim().length===0)
      this.publication=true;
    else
      this.publication=false;
  }

  getNbrCommentaire=(id:number)=>{
    return this.api.getCommentByPostid(id).length;
  }

  getComment(){
    this.Commentaires=this.api.getCommentByPostid(this.id);
  }

  addComment():void{
    let com =new Commentaire();
    com.userId=1;
    com.id=comment.length+1;
    com.postId=this.id;
    com.commentaire=this.commentInput;
    this.api.addComment(com);
    this.getComment();
    this.getNbrCommentaire(this.id);
    this.commentInput='';
  }

  getUser=(id:number)=>{
    return this.api.getuserById(id);
  }

  getlastComment=()=>{
    this.getComment();
    if (this.Commentaires.length<1){
      return [];
    }else{
      var el=[this.Commentaires[this.Commentaires.length-1]]
      if(this.Commentaires.length>1)
        el=[...el,this.Commentaires[this.Commentaires.length-2]];
      return el;
    }
  }
}
