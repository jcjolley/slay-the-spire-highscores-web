import { Component, OnInit } from '@angular/core';
import { SessionsService } from '../sessions.service';

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

  shownSessions = [];

  constructor(public sessionService: SessionsService) { }

  ngOnInit() {
    this.filterSessions();
  }

  async filterSessions() {
    await this.sessionService.getSessions();
    this.shownSessions = this.sessionService.sessions
      .filter(x => this.character ? x.character === this.character : !!x)
      .map(x => { console.log(x); return x; })
      .filter(x => this.level ? x.level === this.levels.findIndex(y => y === this.level) : !!x)
      .map(x => { console.log(x); return x; })
      .filter(x => this.seed ? x.seed.includes(this.seed) : !!x)
      .map(x => { console.log(x); return x; });
  }

  createRun() {
    this.sessionService.addSession({
      character: this.character,
      level: this.levels.findIndex(x => x === this.level),
      seed: this.seed
    });
  }


}
