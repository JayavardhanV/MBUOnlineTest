import { Component, OnInit } from '@angular/core';
import { PostviewService } from '../../services/postview/postview.service'
import { AuthenticationService } from '../../services/Authenticate/authenticate.service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-postview',
  templateUrl: './postview.component.html',
  styleUrls: ['./postview.component.scss']
})
export class PostviewComponent implements OnInit {

  public cardList: any[]
  constructor(private postviewService: PostviewService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getPostViewList()

  }
  removeItem(card) {

    var status = window.confirm("Are you sure you want to do that?")
    if (status)
      this.cardList = this.cardList.filter(item => item.id !== card.id)
  }
  getPostViewList() {
    let currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      this.postviewService.getAllPosts({}).subscribe(response => {
        this.cardList = response.filter(item => item.userId === currentUser[0].id)
      },
        error => {
          console.log(error)
        }
      )
    } else {
      this.router.navigateByUrl("/login")
    }
  }
}
