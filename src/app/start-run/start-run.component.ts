import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../sessions.service';
import { AuthService } from '../auth.service';
import { ScoresService } from '../scores.service';

@Component({
  selector: 'app-start-run',
  templateUrl: './start-run.component.html',
  styleUrls: ['./start-run.component.styl']
})
export class StartRunComponent implements OnInit {
  levels = ['Default', 'Ascension 1', 'Ascension 2', 'Ascension 3', 'Ascension 4',
    'Ascension 5', 'Ascension 6', 'Ascension 7', 'Ascension 8', 'Ascension 9', 'Ascension 10'];
  characters = ['Ironclad', 'Silent', 'Defect'];
  score = 0;
  level;
  daily = false;
  character;
  seed;
  cbSuccesses = {};
  shownSessions = [];
  sessionScores = {};

  constructor(
    public sessionsService: SessionsService,
    private authService: AuthService,
    private scoreService: ScoresService,
  ) { }

  ngOnInit() {
    this.filterSessions();
  }

  async filterSessions() {
    await this.sessionsService.getSessions();
    this.shownSessions = this.sessionsService.sessions
      .filter(x => this.character ? x.character === this.character : !!x)
      .map(x => { console.log(x); return x; })
      .filter(x => this.level ? x.level === this.levels.findIndex(y => y === this.level) : !!x)
      .map(x => { console.log(x); return x; })
      .filter(x => this.seed ? x.seed.includes(this.seed) : !!x)
      .map(x => { console.log(x); return x; });
    this.shownSessions.forEach(x => {
      if (!this.sessionScores[x._id]) {
        this.sessionScores[x._id] = 0;
      }
    });
  }

  createRun() {
    this.sessionsService.addSession({
      character: this.character,
      level: this.levels.findIndex(x => x === this.level),
      seed: this.seed
    });
  }

  cbSuccess(seed) {
    this.cbSuccesses[seed] = true;
    setTimeout(() => this.cbSuccesses[seed] = false, 4000);
  }

  submitScore(session) {
    this.scoreService.addScore(this.sessionScores[session._id], session.character, session.level, session.daily, session.seed);
    this.filterSessions();
    this.sessionScores[session.id] = 0;
  }
}
