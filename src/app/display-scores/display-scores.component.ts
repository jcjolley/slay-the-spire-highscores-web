import { Component, OnInit } from '@angular/core';
import { ScoresService } from '../scores.service';

@Component({
  selector: 'app-display-scores',
  templateUrl: './display-scores.component.html',
  styleUrls: ['./display-scores.component.styl']
})
export class DisplayScoresComponent implements OnInit {
  constructor(public scoreService: ScoresService) { }

  headers = ['Username', 'Score', 'Character', 'Ascension Level', 'Daily', 'Seed'];
  ngOnInit() {
    this.getScores();
  }

  async getScores() {
    await this.scoreService.getScores();
  }

}
