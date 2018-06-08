import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as sha256 from 'sha256';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AuthService implements CanActivate {
  isLoggedIn = false;
  userId;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.isLoggedIn) {
      this.router.navigate(['/', 'login']);
      return false;
    }
    return true;
  }
  constructor(private router: Router, private http: HttpClient) { }

  async login(username: string, password: string) {
    const hashedPword = sha256.x2('sosalty' + password);
    const url = `http://jcjolley.com:3002/login`;
    const user = await this.http.post<{ username, password, _id }>(url, { username, password: hashedPword }).toPromise();
    if (!user) {
      throw new Error('Login failed.')
    }
    console.log('user: ', user);
    this.userId = user._id;
    this.isLoggedIn = true;
    return true;
  }

  async createUser(username: string, password: string) {
    const hashedPword = sha256.x2('sosalty' + password);
    const url = `http://jcjolley.com:3002/createUser`;
    const valid = await this.http.post(url, { username, password: hashedPword }).toPromise();
    if (!valid) {
      throw new Error('Failed to create user.  User already exists.');
    }
    this.isLoggedIn = true;
    return true;
  }
}
