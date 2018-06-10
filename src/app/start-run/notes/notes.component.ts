import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth.service';
import { SessionsService } from '../../sessions.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.styl']
})
export class NotesComponent implements OnInit {
  @Input() session;
  newNote = {
    username: '',
    message: '',
    time: 0
  };
  showLoading = false;
  constructor(private authService: AuthService, private sessionService: SessionsService) { }

  ngOnInit() {
  }

  async addNote() {
    this.showLoading = true;
    this.newNote.username = this.authService.username;
    this.newNote.time = Date.now();
    this.session.notes.push(this.newNote);
    const res = await this.sessionService.updateSession(this.session);
    console.log(res);
    this.showLoading = false;
    return res;
  }

}
