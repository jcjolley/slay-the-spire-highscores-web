import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as sha256 from 'sha256';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService implements CanActivate {
  userId;
  username;

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private jwtService: JwtHelperService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    try {
      const token = localStorage.getItem('access-token');
      console.log('The token is: ', JSON.stringify(this.jwtService.decodeToken(token)));
      if (token) {
        const decoded = this.jwtService.decodeToken(token);
        console.log(Date.now())
        console.log(decoded.iat + decoded.expiresIn);
        return Date.now() / 1000 < decoded.iat + decoded.expiresIn;
      } else {
        this.router.navigate(['/', 'login']);
        return false;
      }
    } catch (e) {
      this.router.navigate(['/', 'login']);
      return false;
    }
  }

  async login(username: string, password: string) {
    const hashedPword = sha256.x2('sosalty' + password);
    const url = `http://jcjolley.com:3002/login`;
    try {
      const { user, token: encryptedToken } = await this.http.post<{ user, token }>(url, { username, password: hashedPword }).toPromise();
      localStorage.setItem('access-token', encryptedToken);
      this.userId = user.userId;
      this.username = user.username;
      return user.username && user.userId;
    } catch (e) {
      this.messageService.sendErrorMessage(e, 'Failed to login');
    }
  }

  async createUser(username: string, password: string) {
    const hashedPword = sha256.x2('sosalty' + password);
    const url = `http://jcjolley.com:3002/createUser`;
    try {
      const { user, token: encryptedToken } = await this.http.post<{ user, token }>(url, { username, password: hashedPword }).toPromise();
      localStorage.setItem('access-token', encryptedToken);
      this.userId = user.userId;
      this.username = user.username;
      console.log('userId: ', this.userId);
      console.log('username: ', this.username);
      const valid = !!user.userId && !!user.username;
      if (!valid) {
        throw new Error('Failed to create user');
      }
      return true;
    } catch (e) {
      this.messageService.sendErrorMessage(e, 'Failed to login');
      return false;
    }
  }
}
