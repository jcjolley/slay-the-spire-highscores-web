import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import * as R from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  scores;
  totalWins;
  constructor(private http: HttpClient,
    private authService: AuthService) {
    this.getScores();
  }

  async getScores() {
    this.scores = await this.http.get('http://jcjolley.com:3002/slay-the-spire/get-scores').toPromise();
    this.getTotalWins();
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

  getTotalWins() {
    if (this.scores) {
      this.totalWins = R.pipe(
        R.filter(R.prop('seed')),
        R.groupBy(x => `${x.seed}-${x.character}`),
        x => { console.log(x); return x; },
        R.toPairs(),
        x => { console.log(x); return x; },
        R.map(x => x[1].sort((a, b) => parseInt(b.score, 10) - parseInt(a.score, 10))),
        x => { console.log(x); return x; },
        R.map(R.path([0, 'username'])),
        x => { console.log(x); return x; },
        R.countBy(R.identity),
        x => { console.log(x); return x; },
        R.toPairs(),
        x => { console.log(x); return x; },
        R.sortBy(R.descend(R.prop('1'))),
        x => { console.log(x); return x; },
      )(this.scores);
      return this.totalWins;
    }
  }


}
