import { Component, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { comment } from 'src/assets/data/comment';
import { Commentaire } from '../commentaire';
import { PostService } from '../post.service';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss']
})
export class CommentaireComponent implements OnInit {
  @Input() userId!:number;
  @Input() id!:number;
  @Input() description!:string;
  @Input() image!:string;
  @Input() like!:number;
  @Input() createAt!:string;
  @Input() liked!:boolean;
  @Input() Commentaires!:Commentaire[];

  @Output() SendChanges=new EventEmitter();
  public commentInput='';

  public likeIcon = {
    white:
      'M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z',
    black:
      'M35.3 35.6c-9.2 8.2-9.8 8.9-11.3 8.9s-2.1-.7-11.3-8.9C6.5 30.1.5 25.6.5 17.8.5 9.9 6.4 3.5 13.7 3.5 20.8 3.5 24 8.8 24 8.8s3.2-5.3 10.3-5.3c7.3 0 13.2 6.4 13.2 14.3 0 7.8-6.1 12.3-12.2 17.8z',
  };

  public publication=true;

  public postuser=[{
        "id": 4,
        "username": "King James",
        "realName": "Ervin Howell",
        "bio":"Basketball player,King,Kids of akron",
        "picture":"assets/profile3.jpeg",
        "follower":925,
        "following":215,
  }]
  public commentaireId=0;
  
  constructor(private route:ActivatedRoute,private api:PostService) { }


  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.commentaireId=parseInt(id!);
    this.postuser=this.getUser(this.userId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.getComment();
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
    this.commentInput='';
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
  getUser=(id:number)=>{
    return this.api.getuserById(id);
  }

  sendEvent=()=>{
    this.liked=!this.liked;
    if(this.liked){
      this.like+=1;
    }else{
      this.like-=1;
    }
    this.SendChanges.emit(
      ''+this.like
    )
  }

}
