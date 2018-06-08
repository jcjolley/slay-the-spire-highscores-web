import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  scores;
  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.getScores();
  }

  async getScores() {
    this.scores = await this.http.get('http://jcjolley.com:3002/slay-the-spire/get-scores').toPromise();
    return this.scores;
  }

  async addScore(score, character, level = 0, daily = false, seed = '') {
    console.log('Seed when adding score is: ', seed);
    const url = 'http://jcjolley.com:3002/slay-the-spire/add-score';
    const result = await this.http.post(url, {
      username: this.authService.username,
      score,
      character,
      level,
      daily,
      seed
    }).toPromise();
    await this.getScores();
    return result;
  }
}
