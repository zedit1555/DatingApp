import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { Observable } from 'rxjs';
import { User } from '../_model/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$ = new Observable<User>();
  constructor(private accountService: AccountService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login() {
    this.accountService.login(this.model).subscribe(res => {
     this.router.navigateByUrl('/members');
     this.toastr.show('logged');
    },error => {
      console.log(error);
      this.toastr.error(error.error);
    }
    );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
