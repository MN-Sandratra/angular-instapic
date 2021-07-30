import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public Posts=[
    {
      "userId":1,
      "id":1,
      "description":"qui est esse",
      "image":"assets/tanana.jpg",
      "like":453,
      "createAt":"3 heures"
    }
  ];
  constructor(private api:PostService) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost=()=>{
    this.Posts=this.api.getAllPost();
  }
}
