import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  ngOnInit() { }

  async login() {
    try {
      const isLoggedIn = await this.authService.login(this.username, this.password);
      if (isLoggedIn) {
        swal('Success', "You're all logged in", 'success');
        this.router.navigate(['/', 'add-score']);
      } else {
        swal('Error', 'Failed to login', 'error');
      }
    } catch (e) {
      this.messageService.sendErrorMessage(e, 'Failed to login');
    }
  }

  async createUser() {
    try {
      const isLoggedIn = await this.authService.createUser(this.username, this.password);
      if (isLoggedIn) {
        this.router.navigate(['/', 'add-score']);
      } else {
        swal('Error', 'Failed to create user', 'error');
      }
    } catch (e) {
      this.messageService.sendErrorMessage(e, 'Failed create user');
    }
  }
}
