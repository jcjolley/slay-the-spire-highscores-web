import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  title = 'Login';
  isLogin = true;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() { }

  async login() {
    await this.authService.login(this.username, this.password);
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }

  async createUser() {
    await this.authService.createUser(this.username, this.password);
  }
}
