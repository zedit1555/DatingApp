import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;
  constructor(private accountService: AccountService) { }

  ngOnInit() {
  }
  login() {
    this.accountService.login(this.model).subscribe(res => {
      console.log(res);
      this.loggedIn = true;
      // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      console.log(error);
    }
    );
  }

  logout() {
    this.loggedIn = false;
  }
}
