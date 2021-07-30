import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute,private api:PostService) { }
  public user=[{
    "id": 1,
        "username": "Sandratra",
        "realName": "MBELO NDRIAMANAMPY Sandratra",
        "bio":"Etudiant en 5eme annee en informatique IMTICIA 5",
        "picture":"profile.jpg",
        "follower":125,
        "following":215,
  }];

  public posts=[{
    "userId":2,
        "id":1,
        "description":"qui est esse",
        "image":"assets/data/img05.jpg",
        "like":453,
        "createAt":"3 heures"
  }];

  public commentaire=0;
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    var UserId=parseInt(id!);
    this.user=this.api.getuserById(UserId);
    this.posts=this.api.getPostByUserId(UserId);

  }
  getNbrCommentaire=(id:number)=>{
    return this.api.getCommentByPostid(id).length;
  }

}
