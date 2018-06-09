import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ScoresService } from '../scores.service';
import { MatPaginator, MatSort, MatTableDataSource, MatTab, MatTable } from '@angular/material';
@Component({
  selector: 'app-display-scores',
  templateUrl: './display-scores.component.html',
  styleUrls: ['./display-scores.component.styl']
})
export class DisplayScoresComponent implements OnInit {
  displayedColumns = ['username', 'score', 'character', 'level', 'daily', 'seed'];
  dataSource: MatTableDataSource<ScoreData>;
  cbSuccesses = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public scoreService: ScoresService, private changeDetectorRef: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource(this.scoreService.scores);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getScores();
    setInterval(() => this.getScores(), 2000);
  }

  async getScores() {
    await this.scoreService.getScores();
    this.dataSource.data = this.scoreService.scores;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEntries(obj) {
    return Object.entries(obj);
  }

  cbSuccess(seed) {
    this.cbSuccesses[seed] = true;
    setTimeout(() => this.cbSuccesses[seed] = false, 4000);
  }
}

export interface ScoreData {
  username: string;
  score: number;
  character: string;
  level: number;
  daily: boolean;
  seed: string;
}


