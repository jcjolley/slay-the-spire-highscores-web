import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  sessions: any[] = [];
  constructor(private http: HttpClient) {
    this.getSessions();
  }

  async getSessions() {
    const url = 'http://jcjolley.com:3002/slay-the-spire/get-sessions';
    this.sessions = (await this.http.get<any[]>(url).toPromise()) || [];
    console.log('Sessions: ', this.sessions);
  }

  async addSession(session) {
    const url = 'http://jcjolley.com:3002/slay-the-spire/add-session';
    return await this.http.post(url, session).toPromise();
  }

  async updateSession(session) {
    const url = 'http://jcjolley.com:3002/slay-the-spire/update-session';
    return await this.http.post(url, session).toPromise();
  }
}
