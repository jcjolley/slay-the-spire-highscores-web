import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score-table',
  templateUrl: './score-table.component.html',
  styleUrls: ['./score-table.component.styl']
})
export class ScoreTableComponent implements OnInit {
  @Input() scores: any[];
  constructor() { }

  ngOnInit() {
  }

}
