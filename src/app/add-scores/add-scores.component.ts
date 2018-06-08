import { Component, OnInit } from '@angular/core';
import { ScoresService } from '../scores.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-score',
  templateUrl: './add-scores.component.html',
  styleUrls: ['./add-scores.component.styl']
})
export class AddScoreComponent implements OnInit {
  levels = ['Default', 'Ascension 1', 'Ascension 2', 'Ascension 3', 'Ascension 4',
    'Ascension 5', 'Ascension 6', 'Ascension 7', 'Ascension 8', 'Ascension 9', 'Ascension 10'];
  characters = ['Ironclad', 'Silent', 'Defect'];
  score = 0;
  level = 'Default';
  daily = false;
  character = 'Ironclad';
  seed = '';

  constructor(private scoreService: ScoresService, private router: Router) { }

  ngOnInit() {
  }

  submitScore() {
    this.scoreService.addScore(this.score, this.character, this.levels.findIndex(x => x === this.level), this.daily, this.seed);
    this.router.navigate(['/', 'display-scores']);
  }
}
