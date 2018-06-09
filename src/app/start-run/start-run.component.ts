import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../sessions.service';
import { AuthService } from '../auth.service';
import { ScoresService } from '../scores.service';
import * as moment from 'moment';

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
  showArchived = false;
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
      .filter(x => this.level ? x.level === this.levels.findIndex(y => y === this.level) : !!x)
      .filter(x => this.seed ? x.seed.includes(this.seed) : !!x)
      .filter(x => this.showArchived ? !!x : x.active === true)
      .sort((a, b) => b.timestamp - a.timestamp);
    this.shownSessions.forEach(x => {
      if (!this.sessionScores[x._id]) {
        this.sessionScores[x._id] = 0;
      }
    });
  }

  async createRun() {
    await this.sessionsService.addSession({
      character: this.character,
      level: this.levels.findIndex(x => x === this.level),
      seed: this.seed
    });
    this.filterSessions();
  }

  cbSuccess(seed) {
    this.cbSuccesses[seed] = true;
    setTimeout(() => this.cbSuccesses[seed] = false, 4000);
  }

  submitScore(session) {
    const score = this.sessionScores[session._id];
    if (score > 0) {
      this.scoreService.addScore(this.sessionScores[session._id], session.character, session.level, session.daily, session.seed);
      this.sessionScores[session.id] = 0;
    }
    this.filterSessions();
  }

  archiveSession(session) {
    this.sessionsService.updateSession({
      _id: session._id,
      active: false
    });
  }

  clearFilters() {
    this.character = undefined;
    this.level = undefined;
    this.seed = undefined;
    this.showArchived = false;
    this.filterSessions();
  }

  setupDaily() {
    if (this.daily) {
      this.level = 'Default';
      this.seed = this.getDailySeed();
    } else {
      this.seed = '';
    }
    this.filterSessions();
  }

  private getDailySeed() {
    return 'Daily ' + moment().format('MM/DD/YYYY');
  }
}
